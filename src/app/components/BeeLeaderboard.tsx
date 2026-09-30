import { useCallback, useEffect, useState, type ReactNode } from "react";

// 꿀벌 잡기 랭킹: API 호출 + 랭킹 패널. 실패해도 게임에는 영향 없이 패널만 안내 문구로 바뀝니다.
export type RankEntry = { nickname: string; score: number };

const NICKNAME_KEY = "kkulbi-bee-nickname";

export function readSavedNickname(): string | null {
  try {
    return localStorage.getItem(NICKNAME_KEY);
  } catch {
    return null;
  }
}

export function saveNickname(nickname: string) {
  try {
    localStorage.setItem(NICKNAME_KEY, nickname);
  } catch {
    // 저장이 막힌 환경에서는 다음 판에 닉네임을 다시 입력하게 됩니다.
  }
}

export type SubmitResult =
  | { ok: true; nickname: string; best: number; updated: boolean }
  | { ok: false; error: string };

export async function submitScore(nickname: string, score: number): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nickname, score }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error ?? "랭킹 등록에 실패했어요." };
    return { ok: true, ...data };
  } catch {
    return { ok: false, error: "랭킹 서버에 연결할 수 없어요." };
  }
}

/** entries: null = 불러오는 중, "error" = 실패 */
export function useLeaderboard(pollMs: number | null) {
  const [entries, setEntries] = useState<RankEntry[] | null | "error">(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setEntries(Array.isArray(data.entries) ? data.entries : "error");
    } catch {
      setEntries("error");
    }
  }, []);

  useEffect(() => {
    refresh();
    if (!pollMs) return;
    const t = setInterval(refresh, pollMs);
    return () => clearInterval(t);
  }, [refresh, pollMs]);

  return { entries, refresh };
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function LeaderboardPanel({
  entries,
  myNickname,
}: {
  entries: RankEntry[] | null | "error";
  myNickname: string | null;
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 text-amber-900"
        style={{
          fontSize: "13px",
          fontWeight: 900,
          background: "linear-gradient(to bottom, #fde68a, #f5c842)",
          borderBottom: "2px solid #d4a017",
        }}
      >
        🏆 실시간 랭킹
        <span className="text-amber-700" style={{ fontSize: "11px", fontWeight: 700 }}>
          TOP 10
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-2">
        {entries === null && <Notice>불러오는 중…</Notice>}
        {entries === "error" && <Notice>랭킹을 불러올 수 없습니다.</Notice>}
        {Array.isArray(entries) && entries.length === 0 && <Notice>아직 등록된 기록이 없어요. 첫 번째 주인공이 되어 보세요!</Notice>}
        {Array.isArray(entries) && entries.length > 0 && (
          <ol className="space-y-1">
            {entries.map((e, i) => {
              const mine = e.nickname === myNickname;
              return (
                <li
                  key={e.nickname}
                  className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 border ${
                    mine ? "bg-amber-200 border-amber-500" : "bg-white border-amber-200"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  <span className="w-6 text-center flex-shrink-0 text-amber-800" style={{ fontWeight: 900 }}>
                    {MEDALS[i] ?? i + 1}
                  </span>
                  <span className="flex-1 min-w-0 truncate text-slate-700" style={{ fontWeight: mine ? 900 : 600 }}>
                    {e.nickname}
                    {mine && <span className="text-amber-700"> (나)</span>}
                  </span>
                  <span className="flex-shrink-0 text-amber-800" style={{ fontWeight: 800 }}>
                    {e.score}점
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-slate-500 px-2 py-6" style={{ fontSize: "12px", lineHeight: 1.6 }}>
      {children}
    </p>
  );
}
