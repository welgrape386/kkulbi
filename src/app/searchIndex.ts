// ─── 메인 검색 인덱스 ─────────────────────────────────────────────────────────
// 메인페이지 검색창은 이 파일의 searchIndex 하나만 검색합니다.
//
// ✅ 자동 반영: 아래에서 import 하는 데이터 배열(상점가, 캐시상점, 특성 스킬, 물고기,
//    낚싯대 강화, 섬 권한/업그레이드, 접속시간 보상, 명령어, 법전 조항, 후원 등급 등)에
//    항목을 추가하면 별도 작업 없이 검색에 바로 잡힙니다.
// ✍️ 수동 등록: 새 "데이터 배열"이나 새 페이지를 만들었다면 아래 searchIndex 에
//    한 줄(…배열.map(...)) 추가해 주세요. 키워드만 있는 안내 페이지는 pages 에 추가합니다.
//
// 이동 위치: route 의 #해시는 해당 페이지 요소의 id 로 스크롤됩니다 (AppRoot 에서 처리).

import { tabs as contentTabs, shopSections, cashShopSections, utilShopGroups, catPets } from "./components/ContentPage";
import { allSkills as fishingSkills, rodUpgrades, customFish, treasureFish } from "./components/FishingTraitPage";
import { allSkills as harvestSkills, customCrops, sprinklers, fertilizers, wateringCans, harvestTools, harvestToolTiers } from "./components/HarvestTraitPage";
import { allSkills as cookingSkills, cookingTools } from "./components/CookingTraitPage";
import { allSkills as miningSkills } from "./components/MiningTraitPage";
import { allSkills as loggingSkills } from "./components/LoggingTraitPage";
import { permissions, islandSettings, upgrades } from "./components/IslandPage";
import { minelistRewards, playtimeRewards, playtimeCompleteRewards, SHOW_DAILY_REWARDS } from "./components/EventRewards";
import { tabs as basicsTabs, commands } from "./components/BasicsPage";
import { tabs as supportTabs, donationRanks, cashLootboxes, packageLootboxes } from "./components/SupportPage";
import { articles } from "./components/LawPage";
import { probItems } from "./components/ChuseokEventContent";

export type SearchItem = {
  title: string;
  content: string; // 검색에도 쓰이는 보조 설명/키워드
  where: string; // 결과에 보여줄 위치 (예: "콘텐츠 › 상점 › 블록")
  emoji: string;
  route: string;
};

// 키워드로만 찾는 안내 페이지 (데이터 배열이 없는 섹션)
const pages: SearchItem[] = [
  { title: "랭크 시스템", content: "등급 조건 재화 플레이타임 마인리스트 추천 권한 /밥 /창고 /자동줍기 /제단", where: "콘텐츠", emoji: "⭐", route: "/content?tab=rank" },
  { title: "특성 안내", content: "채광 수확 벌목 어부 요리 직업 특성 스킬 레벨 경험치 광물 낚시", where: "콘텐츠", emoji: "🔮", route: "/content/traits" },
  { title: "섬", content: "섬 권한 설정 업그레이드 은행 워프 프리뷰 /섬 /is", where: "콘텐츠", emoji: "🏝️", route: "/content/island" },
  { title: "추석 이벤트", content: "추석 랜덤 뽑기권 확률표 도구스킨 코스튬 펫 착용샷", where: "이벤트", emoji: "🎑", route: "/#chuseok-event" },
  { title: "양봉 방법", content: "꿀 꿀벌 벌집 양봉 양봉장 꿀밀랍 천연토종꿀", where: "콘텐츠", emoji: "🐝", route: "/content?tab=beekeeping" },
  { title: "이벤트 안내", content: "낚시 대회 전체지급 신의 축복 마인리스트 추천 접속시간 보상", where: "콘텐츠", emoji: "🎉", route: "/content?tab=events" },
  { title: "어부 특성 & 낚시", content: "낚시 물고기 보물 월척 해적 진주 낚싯대 보물물고기", where: "콘텐츠 › 특성", emoji: "🎣", route: "/content/traits/fishing" },
  { title: "채광 특성", content: "채광 광물 광물창고 잠광 잠수 크리스탈 다이아 에메랄드 광물변환", where: "콘텐츠 › 특성", emoji: "⛏️", route: "/content/traits/mining" },
  { title: "벌목 특성", content: "벌목 나무 원목 도끼", where: "콘텐츠 › 특성", emoji: "🪓", route: "/content/traits/logging" },
  { title: "요리 특성", content: "요리 레시피 왕실납품 커스텀작물", where: "콘텐츠 › 특성", emoji: "🍳", route: "/content/traits/cooking" },
  { title: "수확 특성", content: "수확 작물 농사 커스텀 허수아비 지렁이 산삼", where: "콘텐츠 › 특성", emoji: "🌽", route: "/content/traits/harvest" },
  { title: "명령어 안내", content: "명령어 커맨드 / 랭크별 사용 가능 명령어", where: "기초설명", emoji: "💬", route: "/basics?tab=commands" },
  { title: "서버 접속 방법", content: "마인크래프트 서버 접속 IP 주소 Java Edition 버전", where: "기초설명", emoji: "🖥️", route: "/basics?tab=connect" },
  { title: "상점가", content: "일반 상점 아이템 고정 가격표 구매 판매", where: "콘텐츠", emoji: "💰", route: "/content?tab=shop" },
  { title: "후원 방법", content: "후원 결제 캐시 구매 방법 절차", where: "후원", emoji: "💳", route: "/support?tab=method" },
  { title: "후원 등급 / 혜택", content: "후원 등급 혜택 캐시 아이템 BRONZE SILVER GOLD DIAMOND RUBY", where: "후원", emoji: "🎖️", route: "/support?tab=ranks" },
  { title: "자주 묻는 질문", content: "FAQ 자주 물어보는 질문 광물변환 지렁이 산삼 허수아비 고정 키", where: "기초설명", emoji: "❓", route: "/basics?tab=faq" },
  { title: "규칙 사항", content: "규칙 비매너 플라이 섬원 강퇴 부계정 사기 욕설 매크로", where: "기초설명", emoji: "📋", route: "/basics?tab=rules" },
  { title: "운영원칙 (법전)", content: "법전 운영원칙 규정 제재 처벌 비매너 채팅 복구 GM 유저 권리", where: "법전", emoji: "⚖️", route: "/law" },
  { title: "제단", content: "제단 /제단 /제단열기 고급 아이템 크래프팅", where: "콘텐츠", emoji: "🏛️", route: "/content?tab=altar" },
  ...(SHOW_DAILY_REWARDS
    ? [{ title: "일일보상 전체", content: "출석 체크 일일보상 보상 화폐 주괴 강화서 소라고동", where: "이벤트", emoji: "🎁", route: "/daily-rewards" }]
    : []),
];

const skillsOf = (skills: { lv: number; name: string; desc: string }[], trait: string, emoji: string, path: string) =>
  skills.map((s) => ({ title: s.name, content: `LV.${s.lv} ${s.desc}`, where: `콘텐츠 › 특성 › ${trait} › 스킬`, emoji, route: `/content/traits/${path}#skills` }));

const FISH = "/content/traits/fishing";
const HARVEST = "/content/traits/harvest";

export const searchIndex: SearchItem[] = [
  ...pages,

  // 각 페이지 탭 (탭을 추가하면 자동 반영, pages 에 이미 있는 탭은 건너뜀)
  ...[
    ...contentTabs.map((t) => ({ title: t.label, content: t.desc, where: "콘텐츠", emoji: t.emoji, route: `/content?tab=${t.key}` })),
    ...basicsTabs.map((t) => ({ title: t.label, content: "", where: "기초설명", emoji: t.emoji, route: `/basics?tab=${t.key}` })),
    ...supportTabs.map((t) => ({ title: t.label, content: "후원 캐시", where: "후원", emoji: t.emoji, route: `/support?tab=${t.key}` })),
  ].filter((t) => !pages.some((p) => p.route === t.route)),

  // 상점가 (일반 상점)
  ...shopSections.flatMap((sec) =>
    sec.items.map((item) => ({
      title: item.name,
      content: `구매 ${item.buy} · 판매 ${item.sell}`,
      where: `콘텐츠 › 상점 › ${sec.label}`,
      emoji: sec.emoji,
      route: `/content?tab=shop&s=${sec.key}&q=${encodeURIComponent(item.name)}`,
    })),
  ),

  // 캐시상점
  ...cashShopSections.map((s) => ({ title: s.label, content: `캐시상점 ${s.desc}`, where: "콘텐츠 › 캐시상점", emoji: s.emoji, route: `/content?tab=cash-shop&s=${s.key}` })),
  ...utilShopGroups.flatMap((g) =>
    g.items.map(([name, desc, price]) => ({ title: name, content: `${price} · ${desc}`, where: `콘텐츠 › 캐시상점 › 유틸상점 › ${g.title}`, emoji: g.emoji, route: "/content?tab=cash-shop&s=util" })),
  ),
  ...catPets.map((c) => ({ title: `${c.name} 고양이 펫`, content: "펫 고양이", where: "콘텐츠 › 캐시상점 › 펫 상점", emoji: "🐱", route: "/content?tab=cash-shop&s=pet" })),

  // 특성
  ...skillsOf(fishingSkills, "어부", "🎣", "fishing"),
  ...skillsOf(miningSkills, "채광", "⛏️", "mining"),
  ...skillsOf(loggingSkills, "벌목", "🪓", "logging"),
  ...skillsOf(cookingSkills, "요리", "🍳", "cooking"),
  ...skillsOf(harvestSkills, "수확", "🌽", "harvest"),
  ...rodUpgrades.map((r) => ({ title: r.name, content: `${r.material} · ${r.cost} · 성공 ${r.chance}`, where: "콘텐츠 › 특성 › 어부 › 낚싯대 강화", emoji: "🎣", route: `${FISH}#rod-upgrade` })),
  ...customFish.map((f) => ({ title: f.name, content: "커스텀 물고기", where: "콘텐츠 › 특성 › 어부 › 커스텀 물고기", emoji: f.emoji, route: `${FISH}#custom-fish` })),
  ...treasureFish.map((f) => ({ title: f.name, content: `보물 물고기 ${f.price}`, where: "콘텐츠 › 특성 › 어부 › 보물 물고기", emoji: "💎", route: `${FISH}#treasure-fish` })),
  ...customCrops.map((c) => ({ title: c, content: "커스텀 작물", where: "콘텐츠 › 특성 › 수확 › 커스텀 작물", emoji: "🌱", route: `${HARVEST}#custom-crops` })),
  ...sprinklers.map((s) => ({ title: s.name, content: `범위 ${s.range}`, where: "콘텐츠 › 특성 › 수확 › 스프링클러", emoji: "💦", route: `${HARVEST}#sprinklers` })),
  ...fertilizers.map((f) => ({ title: f.name, content: f.rates, where: "콘텐츠 › 특성 › 수확 › 비료", emoji: "🧪", route: `${HARVEST}#fertilizers` })),
  ...wateringCans.map((w) => ({ title: w.name, content: `범위 ${w.range}`, where: "콘텐츠 › 특성 › 수확 › 물뿌리개", emoji: "🚿", route: `${HARVEST}#watering-cans` })),
  ...harvestTools.map((t) => ({ title: t.name, content: `${t.desc} ${harvestToolTiers.map((r) => `${r.name} ${r.range}`).join(" · ")}`, where: "콘텐츠 › 특성 › 수확 › 커스텀 낫 · 갈퀴", emoji: t.icon, route: `${HARVEST}#harvest-tools` })),
  ...cookingTools.map((t) => ({ title: t.name, content: `${t.material} · ${t.examples.join(" ")}`, where: "콘텐츠 › 특성 › 요리 › 요리 도구", emoji: t.icon, route: "/content/traits/cooking#tools" })),

  // 섬
  ...permissions.map((p) => ({ title: `${p.name} 권한`, content: p.desc, where: "콘텐츠 › 섬 › 섬 권한 설정", emoji: "🔐", route: "/content/island#settings" })),
  ...islandSettings.map((s) => ({ title: s.name, content: s.desc, where: "콘텐츠 › 섬 › 섬 환경 설정", emoji: "🌦️", route: "/content/island#settings" })),
  ...upgrades.map((u) => ({ title: u.title, content: "섬 업그레이드 /강화", where: "콘텐츠 › 섬 › 섬 업그레이드", emoji: u.icon, route: "/content/island#upgrades" })),

  // 이벤트 보상
  ...minelistRewards.map((r) => ({ title: r, content: "마인리스트 추천 보상", where: "콘텐츠 › 이벤트 › 마인리스트 추천 보상", emoji: "👍", route: "/content?tab=events#minelist-rewards" })),
  ...playtimeRewards.map((r) => ({ title: `접속 ${r.time} 보상`, content: `접속시간 보상 ${r.items.join(" ")}`, where: "콘텐츠 › 이벤트 › 접속시간 보상", emoji: "⏰", route: "/content?tab=events#playtime-rewards" })),
  ...playtimeCompleteRewards.map((r) => ({ title: r, content: "접속시간 보상 전체 달성", where: "콘텐츠 › 이벤트 › 접속시간 보상", emoji: "⏰", route: "/content?tab=events#playtime-rewards" })),
  ...probItems.map((p) => ({ title: p.name, content: `추석 랜덤 뽑기권 ${p.pct}%`, where: "이벤트 › 추석 이벤트", emoji: "🎑", route: "/#chuseok-event" })),

  // 기초설명 · 후원 · 법전
  ...commands.map((c) => ({ title: c.cmd, content: `${c.desc} · ${c.req}`, where: "기초설명 › 명령어 안내", emoji: "💬", route: "/basics?tab=commands" })),
  ...donationRanks.map((r) => ({ title: `${r.name} 후원 등급`, content: `${r.price} · ${r.benefits.join(" ")}`, where: "후원 › 후원 등급 / 혜택", emoji: r.emoji, route: "/support?tab=ranks" })),
  ...[...cashLootboxes, ...packageLootboxes].flatMap((box) => [
    { title: box.title, content: box.subtitle ?? "", where: "후원 › 아이템 확률", emoji: "🎲", route: "/support?tab=probability" },
    ...box.rows.map((row) => ({ title: row.name, content: `${box.title} ${row.prob}%`, where: `후원 › 아이템 확률 › ${box.title}`, emoji: "🎲", route: "/support?tab=probability" })),
  ]),
  ...articles.map((a) => ({ title: `${a.no} ${a.title}`, content: a.content.map((c) => c.text).join(" "), where: "법전", emoji: a.emoji, route: `/law#${a.no.replace(/\s+/g, "")}` })),
];

// 대소문자·공백 무시 부분 일치. "자연낚싯대" → "자연 낚싯대"
export const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "");

export function search(query: string): SearchItem[] {
  const q = normalize(query);
  if (!q) return [];
  const titleHits: SearchItem[] = [];
  const otherHits: SearchItem[] = [];
  for (const item of searchIndex) {
    if (normalize(item.title).includes(q)) titleHits.push(item);
    else if (normalize(item.content).includes(q)) otherHits.push(item);
  }
  // 제목 일치를 먼저 보여줍니다.
  return [...titleHits, ...otherHits];
}
