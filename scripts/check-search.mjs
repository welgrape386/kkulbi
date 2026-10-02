// 메인 검색 인덱스 점검: node scripts/check-search.mjs
import { createServer } from "vite";
import assert from "node:assert";
const s = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  const { search, searchIndex } = await s.ssrLoadModule("/src/app/searchIndex.ts");
  const titles = (q) => search(q).map((r) => r.title);
  const has = (q, t) => assert(titles(q).includes(t), `${q} -> ${t} missing; got ${titles(q).slice(0, 8)}`);
  has("자연낚싯대", "자연 낚싯대"); has("자연 낚싯대", "자연 낚싯대"); has("고래상어", "고래상어");
  has("bronze", "BRONZE 후원 등급"); has("천연 토종꿀", "천연 토종꿀"); has("유러피안", "유러피안 고양이 펫");
  has("/밥", "/밥"); has("java", "서버 접속 방법"); has("접속시간", "접속 30분 보상"); has("유틸", "유틸상점");
  assert(search("   ").length === 0);
  assert(search("자연낚싯대")[0].route.endsWith("#rod-upgrade"));
  const routes = searchIndex.map((r) => r.route + r.title + r.where);
  const dup = routes.filter((r, i) => routes.indexOf(r) !== i); assert(dup.length === 0, "dupes: " + dup.slice(0, 5));
  for (const q of ["상점", "접속", "다이아", "블록", "제1조"]) console.log(q, search(q).length, "|", titles(q).slice(0, 4).join(" | "), "|", search(q)[0]?.route);
  console.log("index size", searchIndex.length, "OK");
} finally { await s.close(); }
