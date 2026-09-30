// 꿀도둑 최고 수입 랭킹 API (Vercel Function)
//   GET  /api/leaderboard            → 상위 10명
//   POST /api/leaderboard {nickname, score} → 닉네임별 최고 점수만 저장(UPSERT)
// 로컬 `npm run dev`에서는 vite.config.ts의 개발용 미들웨어가 이 파일을 그대로 실행합니다.
import { neon } from "@neondatabase/serverless";

const NICKNAME_MAX = 12;
const SCORE_MAX = 9999;

// 한글·영문·숫자·공백·_·- 만 허용 (태그/스크립트 문자는 전부 제거)
export function sanitizeNickname(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const cleaned = input
    .normalize("NFC")
    .replace(/[^0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ _-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NICKNAME_MAX)
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

export function parseScore(input: unknown): number | null {
  return typeof input === "number" &&
    Number.isInteger(input) &&
    input >= 0 &&
    input <= SCORE_MAX
    ? input
    : null;
}

function getSql() {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("POSTGRES_URL 환경변수가 없습니다.");
  return neon(url);
}

// 인스턴스당 한 번만 테이블 존재 확인
let tableReady: Promise<unknown> | null = null;
function ensureTable(sql: ReturnType<typeof neon>) {
  tableReady ??= sql`
    CREATE TABLE IF NOT EXISTS honey_leaderboard_v1 (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(12) NOT NULL UNIQUE,
      score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 9999),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `.catch((err) => {
    tableReady = null; // 실패하면 다음 요청에서 다시 시도
    throw err;
  });
  return tableReady;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export async function GET() {
  try {
    const sql = getSql();
    await ensureTable(sql);
    const entries = await sql`
      SELECT nickname, score FROM honey_leaderboard_v1
      ORDER BY score DESC, created_at ASC
      LIMIT 10
    `;
    return json({ entries });
  } catch (err) {
    console.error("[leaderboard GET]", err);
    return json({ error: "랭킹을 불러올 수 없습니다." }, 500);
  }
}

export async function POST(request: Request) {
  let body: { nickname?: unknown; score?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "잘못된 요청입니다." }, 400);
  }

  const nickname = sanitizeNickname(body.nickname);
  const score = parseScore(body.score);
  if (!nickname)
    return json(
      { error: "닉네임은 한글·영문·숫자 1~12자로 입력해 주세요." },
      400,
    );
  if (score === null)
    return json({ error: `점수는 0~${SCORE_MAX} 사이 정수여야 합니다.` }, 400);

  try {
    const sql = getSql();
    await ensureTable(sql);
    // 기존 기록보다 높을 때만 갱신. 갱신/추가되면 한 행이 반환됩니다.
    const changed = await sql`
      INSERT INTO honey_leaderboard_v1 (nickname, score) VALUES (${nickname}, ${score})
      ON CONFLICT (nickname) DO UPDATE
        SET score = EXCLUDED.score, created_at = now()
        WHERE honey_leaderboard_v1.score < EXCLUDED.score
      RETURNING score
    `;
    const [{ score: best }] = (await sql`
      SELECT score FROM honey_leaderboard_v1 WHERE nickname = ${nickname}
    `) as { score: number }[];
    return json({ nickname, best, updated: changed.length > 0 });
  } catch (err) {
    console.error("[leaderboard POST]", err);
    return json({ error: "랭킹 등록에 실패했습니다." }, 500);
  }
}
