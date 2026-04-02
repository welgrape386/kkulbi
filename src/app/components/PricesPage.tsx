import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";

const BG = "#fff8dc";

type PriceItem = {
  name: string;
  buy?: string;
  sell: string;
  note?: string;
};

type PriceCategory = {
  key: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  items: PriceItem[];
};

const categories: PriceCategory[] = [
  {
    key: "minerals",
    label: "광물",
    emoji: "⛏️",
    color: "#6366f1",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    items: [
      { name: "석탄", sell: "1,000원", note: "기본 광물" },
      { name: "철 주괴", sell: "3,000원", note: "기본 광물" },
      { name: "금 주괴", sell: "8,000원", note: "기본 광물" },
      { name: "다이아몬드", sell: "50,000원", note: "고급 광물" },
      { name: "에메랄드", sell: "30,000원", note: "고급 광물" },
      { name: "청금석", sell: "5,000원", note: "기본 광물" },
      { name: "레드스톤", sell: "4,000원", note: "기본 광물" },
      { name: "석영", sell: "2,000원", note: "기본 광물" },
      { name: "크리스탈", sell: "500,000원~", note: "희귀 광물" },
    ],
  },
  {
    key: "fish",
    label: "물고기",
    emoji: "🎣",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#7dd3fc",
    items: [
      { name: "대구", sell: "15,000원", note: "일반" },
      { name: "연어", sell: "20,000원", note: "일반" },
      { name: "복어", sell: "25,000원", note: "일반" },
      { name: "열대어", sell: "30,000원", note: "일반" },
      { name: "농어", sell: "40,000원", note: "커스텀" },
      { name: "참치", sell: "80,000원", note: "커스텀" },
      { name: "문어", sell: "100,000원", note: "커스텀" },
      { name: "철갑상어", sell: "150,000원", note: "커스텀" },
      { name: "레인보우 피쉬", sell: "200,000원", note: "커스텀 희귀" },
    ],
  },
  {
    key: "treasure_fish",
    label: "보물 물고기",
    emoji: "💎",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fcd34d",
    items: [
      { name: "검정가자미", sell: "500,000원" },
      { name: "뚱이", sell: "750,000원" },
      { name: "은갈치", sell: "750,000원" },
      { name: "푸른바다거북", sell: "1,000,000원" },
      { name: "보름달물해파리", sell: "1,200,000원" },
      { name: "비단잉어", sell: "1,500,000원" },
      { name: "블루랍스타", sell: "2,000,000원" },
      { name: "우무문어", sell: "2,000,000원" },
      { name: "블로브피쉬", sell: "2,500,000원" },
      { name: "바다악어", sell: "3,000,000원" },
      { name: "미갈루", sell: "4,000,000원" },
      { name: "분홍돌고래", sell: "5,000,000원" },
      { name: "백상아리", sell: "6,000,000원" },
      { name: "만타가오리", sell: "8,000,000원" },
      { name: "고래상어", sell: "10,000,000원", note: "최고가" },
    ],
  },
  {
    key: "crops",
    label: "작물",
    emoji: "🌽",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    items: [
      { name: "밀", sell: "1,000원", note: "바닐라" },
      { name: "감자", sell: "1,200원", note: "바닐라" },
      { name: "당근", sell: "1,500원", note: "바닐라" },
      { name: "사탕수수", sell: "1,000원", note: "바닐라" },
      { name: "호박", sell: "2,000원", note: "바닐라" },
      { name: "수박", sell: "2,000원", note: "바닐라" },
      { name: "토마토", sell: "5,000원", note: "커스텀" },
      { name: "옥수수", sell: "6,000원", note: "커스텀" },
      { name: "고추", sell: "7,000원", note: "커스텀" },
      { name: "양배추", sell: "7,000원", note: "커스텀" },
      { name: "산삼", sell: "300,000원~", note: "희귀" },
      { name: "지렁이", sell: "200,000원~", note: "희귀 재료" },
    ],
  },
  {
    key: "wood",
    label: "나무",
    emoji: "🪵",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    items: [
      { name: "참나무 원목", sell: "500원", note: "기본" },
      { name: "자작나무 원목", sell: "500원", note: "기본" },
      { name: "가문비나무 원목", sell: "600원", note: "기본" },
      { name: "정글나무 원목", sell: "600원", note: "기본" },
      { name: "아카시아 원목", sell: "700원", note: "기본" },
      { name: "짙은참나무 원목", sell: "700원", note: "기본" },
      { name: "도토리", sell: "50,000원~", note: "희귀 재료" },
    ],
  },
  {
    key: "honey",
    label: "꿀 / 양봉",
    emoji: "🍯",
    color: "#d97706",
    bg: "#fef9c3",
    border: "#fde68a",
    items: [
      { name: "꿀병", sell: "30,000원", note: "양봉" },
      { name: "자연 꿀밀랍", sell: "80,000원", note: "양봉" },
      { name: "가공된 꿀조각", sell: "50,000원", note: "가공품" },
      { name: "천연 토종꿀", sell: "500,000원~", note: "희귀" },
    ],
  },
  {
    key: "currency",
    label: "화폐 / 재화",
    emoji: "💰",
    color: "#b45309",
    bg: "#fef3c7",
    border: "#fbbf24",
    items: [
      { name: "[화폐] 자연은 주괴", sell: "협의", note: "1등급 화폐" },
      { name: "[화폐] 화려한 금 주괴", sell: "협의", note: "2등급 화폐" },
      { name: "[화폐] 빛나는 다이아 주괴", sell: "협의", note: "3등급 화폐" },
      { name: "[화폐] 화려한 이리듐 주괴", sell: "협의", note: "4등급 화폐" },
      { name: "일반 소라고동", sell: "협의", note: "광물창고 확장" },
      { name: "마법의 소라고동", sell: "협의", note: "희귀" },
      { name: "우아한 바다진주", sell: "협의", note: "낚시대 강화" },
    ],
  },
  {
    key: "enchants",
    label: "강화서 / 주문서",
    emoji: "📜",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
    items: [
      {
        name: "하급 두루마리 강화서 [50%]",
        sell: "협의",
        note: "강화 확률 50%",
      },
      {
        name: "중급 두루마리 강화서 [60%]",
        sell: "협의",
        note: "강화 확률 60%",
      },
      {
        name: "상급 두루마리 강화서 [70%]",
        sell: "협의",
        note: "강화 확률 70%",
      },
      {
        name: "최상급 두루마리 강화서 [80%]",
        sell: "협의",
        note: "강화 확률 80%",
      },
      { name: "자동심기 기술 주문서 (+1000회)", sell: "협의" },
      { name: "자동심기 기술 주문서 (+2000회)", sell: "협의" },
      { name: "자동심기 기술 주문서 (+5000회)", sell: "협의" },
    ],
  },
];

function getNoteColor(note?: string): { bg: string; color: string } {
  if (!note) return { bg: "#f1f5f9", color: "#64748b" };
  if (note.includes("희귀")) return { bg: "#fef3c7", color: "#92400e" };
  if (note.includes("커스텀")) return { bg: "#f0fdf4", color: "#166534" };
  if (note.includes("바닐라")) return { bg: "#eff6ff", color: "#1e40af" };
  if (note.includes("기본")) return { bg: "#f8fafc", color: "#475569" };
  return { bg: "#f1f5f9", color: "#64748b" };
}

export function PricesPage() {
  const [activeCategory, setActiveCategory] = useState("minerals");
  const [searchQuery, setSearchQuery] = useState("");

  const current =
    categories.find((c) => c.key === activeCategory) ?? categories[0];

  const filteredItems = searchQuery.trim()
    ? categories.flatMap((cat) =>
        cat.items
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((item) => ({
            ...item,
            catLabel: cat.label,
            catEmoji: cat.emoji,
            catColor: cat.color,
          })),
      )
    : [];

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-amber-600 mb-2"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-700">
              홈
            </Link>
            <span>›</span>
            <span className="text-slate-600">💰 시세표</span>
          </div>
          <h1
            className="text-slate-800 mb-1"
            style={{ fontSize: "26px", fontWeight: 900 }}
          >
            💰 아이템 시세표
          </h1>
          <p
            className="text-slate-500"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            서버 내 아이템의 대략적인 시세를 안내합니다. 실제 시세는 변동될 수
            있어요.
          </p>
        </div>

        {/* Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p
            className="text-amber-800"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            ⚠️ 본 시세표는 참고용이며, 실제 거래 시세는 서버 경제 상황에 따라
            다를 수 있습니다.
            <strong> '협의'</strong> 항목은 유저 간 합의로 거래됩니다.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border-2 border-amber-200 shadow-sm">
            <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="아이템 이름 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none"
              style={{ fontSize: "14px" }}
            />
          </div>
        </div>

        {isSearching ? (
          /* Search results */
          <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-amber-50"
              style={{ background: "#fffef5" }}
            >
              <span
                style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}
              >
                "{searchQuery}" 검색 결과 ({filteredItems.length}개)
              </span>
            </div>
            {filteredItems.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-400" style={{ fontSize: "14px" }}>
                  검색 결과가 없어요
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredItems.map((item) => {
                  const noteStyle = getNoteColor(item.note);
                  return (
                    <div
                      key={item.name + item.catLabel}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-amber-50/30 transition-colors"
                    >
                      <span className="text-lg flex-shrink-0">
                        {item.catEmoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-slate-700"
                          style={{ fontSize: "13px", fontWeight: 600 }}
                        >
                          {item.name}
                        </span>
                        {item.note && (
                          <span
                            className="ml-2 rounded-full px-2 py-0.5"
                            style={{
                              background: noteStyle.bg,
                              color: noteStyle.color,
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                        <div
                          className="text-slate-400"
                          style={{ fontSize: "11px" }}
                        >
                          {item.catLabel}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: item.catColor,
                          }}
                        >
                          {item.sell}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Category sidebar */}
            <div className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap lg:w-48 flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-left"
                  style={{
                    background:
                      activeCategory === cat.key ? cat.color : "white",
                    color: activeCategory === cat.key ? "white" : "#374151",
                    border: `2px solid ${activeCategory === cat.key ? cat.color : cat.border}`,
                    fontSize: "13px",
                    fontWeight: activeCategory === cat.key ? 700 : 500,
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Price table */}
            <div
              className="flex-1 bg-white border-2 rounded-2xl overflow-hidden shadow-sm"
              style={{ borderColor: current.border }}
            >
              {/* Table header */}
              <div
                className="px-5 py-4 border-b-2 flex items-center gap-3"
                style={{ background: current.bg, borderColor: current.border }}
              >
                <span className="text-2xl">{current.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: current.color,
                    }}
                  >
                    {current.label} 시세
                  </div>
                  <div className="text-slate-400" style={{ fontSize: "11px" }}>
                    {current.items.length}개 아이템
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        background: current.bg + "80",
                        borderBottom: `2px solid ${current.border}`,
                      }}
                    >
                      <th
                        className="px-5 py-3 text-left"
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: current.color,
                          textTransform: "uppercase",
                        }}
                      >
                        아이템
                      </th>
                      <th
                        className="px-5 py-3 text-left"
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: current.color,
                          textTransform: "uppercase",
                        }}
                      >
                        판매가
                      </th>
                      <th
                        className="px-5 py-3 text-left"
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: current.color,
                          textTransform: "uppercase",
                        }}
                      >
                        비고
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {current.items.map((item) => {
                      const noteStyle = getNoteColor(item.note);
                      return (
                        <tr
                          key={item.name}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td
                            className="px-5 py-3.5 text-slate-700"
                            style={{ fontSize: "13px", fontWeight: 600 }}
                          >
                            {item.name}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: current.color,
                              }}
                            >
                              {item.sell}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            {item.note && (
                              <span
                                className="inline-flex items-center rounded-full px-2 py-0.5"
                                style={{
                                  background: noteStyle.bg,
                                  color: noteStyle.color,
                                  fontSize: "11px",
                                  fontWeight: 600,
                                }}
                              >
                                {item.note}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 border-t border-slate-50">
                <p className="text-slate-400" style={{ fontSize: "11px" }}>
                  * 위 시세는 일반 상점 기준 참고가입니다. 경매장 및 유저 거래
                  시세는 다를 수 있어요.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
