import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { Search, X, ChevronRight } from "lucide-react";
import spawnImg from "../../imports/스폰.png";

// ─── Item Badge Helper ────────────────────────────────────────────────────────
function getItemStyle(item: string): string {
  if (item.includes("[화폐]")) return "bg-amber-100 text-amber-800 border border-amber-200";
  if (item.includes("강화서")) return "bg-violet-100 text-violet-800 border border-violet-200";
  if (item.includes("주문서")) return "bg-blue-100 text-blue-800 border border-blue-200";
  if (item.includes("포션")) return "bg-red-100 text-red-800 border border-red-200";
  if (item.includes("소라고동")) return "bg-cyan-100 text-cyan-800 border border-cyan-200";
  if (item.includes("꿀") || item.includes("토종") || item.includes("밀랍"))
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  if (item.includes("뼈가루") || item.includes("뼈"))
    return "bg-stone-100 text-stone-700 border border-stone-200";
  if (item.includes("도토리") || item.includes("지렁이") || item.includes("산삼"))
    return "bg-green-100 text-green-800 border border-green-200";
  return "bg-slate-100 text-slate-700 border border-slate-200";
}

// ─── Search ───────────────────────────────────────────────────────────────────
type SearchItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  emoji: string;
  route: string;
};

const searchData: SearchItem[] = [
  { id: "rank", title: "랭크 시스템", content: "등급 조건 재화 플레이타임 마인리스트 추천 권한 /밥 /창고 /자동줍기 /제단", category: "콘텐츠", emoji: "⭐", route: "/content?tab=rank" },
  { id: "traits", title: "특성 안내", content: "채광 수확 벌목 어부 요리 직업 특성 스킬 레벨 경험치 광물 낚시", category: "콘텐츠", emoji: "🔮", route: "/content?tab=traits" },
  { id: "beekeeping", title: "양봉 방법", content: "꿀 꿀벌 벌집 양봉 양봉장 꿀밀랍 천연토종꿀", category: "콘텐츠", emoji: "🐝", route: "/content?tab=beekeeping" },
  { id: "events-daily", title: "이벤트 안내", content: "낚시 대회 전체지급 신의 축복 일일 보상 마인리스트 핫타임", category: "콘텐츠", emoji: "🎉", route: "/content?tab=events" },
  { id: "daily-reward", title: "일일 보상 전체", content: "출석 체크 일일보상 보상 화폐 주괴 강화서 소라고동", category: "콘텐츠", emoji: "🎁", route: "/daily-rewards" },
  { id: "fishing", title: "어부 특성 & 낚시", content: "낚시 물고기 보물 월척 해적 진주 낚시대 수수께끼구슬 보물물고기 고래상어 만타가오리", category: "콘텐츠", emoji: "🎣", route: "/content?tab=traits" },
  { id: "mining", title: "채광 특성", content: "채광 광물 광물창고 잠광 잠수 크리스탈 다이아 에메랄드 광물변환", category: "콘텐츠", emoji: "⛏️", route: "/content?tab=traits" },
  { id: "cooking", title: "요리 특성", content: "요리 레시피 도마 프라이팬 냄비 튀김기 왕실납품 커스텀작물", category: "콘텐츠", emoji: "🍳", route: "/content?tab=traits" },
  { id: "harvest", title: "수확 특성", content: "수확 작물 농사 커스텀 허수아비 물뿌리개 스프링쿨러 비료 지렁이 산삼", category: "콘텐츠", emoji: "🌽", route: "/content?tab=traits" },
  { id: "commands", title: "명령어 안내", content: "/밥 /엔더상자 /창고 /조합대 /수산시장 /자동줍기 /캐시보내기 /자동조합 /상점열기 /제단 /광물창고 /광물변환 /랭크상점 /신호기 /발광", category: "기초설명", emoji: "💬", route: "/basics?tab=commands" },
  { id: "connect", title: "서버 접속 방법", content: "마인크래프트 서버 접속 IP 주소 Java Edition 버전", category: "기초설명", emoji: "🖥️", route: "/basics?tab=connect" },
  { id: "faq", title: "자주 묻는 질문", content: "FAQ 자주 물어보는 질문 광물변환 지렁이 산삼 허수아비 고정키", category: "기초설명", emoji: "❓", route: "/basics?tab=faq" },
  { id: "rules", title: "규칙 사항", content: "규칙 비매너 플라이 섬원 강퇴 부계정 사기 욕설 매크로", category: "기초설명", emoji: "📋", route: "/basics?tab=rules" },
  { id: "prices", title: "시세표", content: "아이템 시세 가격표 광물 물고기 보물 캐시", category: "기초설명", emoji: "💰", route: "/basics?tab=prices" },
  { id: "support-method", title: "후원 방법", content: "후원 결제 캐시 구매 방법 절차", category: "후원", emoji: "💳", route: "/support?tab=method" },
  { id: "support-ranks", title: "후원 등급 / 혜택", content: "후원 등급 VIP 혜택 캐시 아이템", category: "후원", emoji: "🎖️", route: "/support?tab=ranks" },
  { id: "law", title: "운영원칙 (법전)", content: "법전 운영원칙 규정 제재 처벌 비매너 채팅 복구 GM 유저 권리", category: "법전", emoji: "⚖️", route: "/law" },
  { id: "parkour", title: "파쿠르", content: "파쿠르 달리기 점프 스테이지 길막 잠수 방해 보상", category: "콘텐츠", emoji: "🏃", route: "/content?tab=parkour" },
  { id: "blockwars", title: "블럭워즈 (PVP)", content: "블럭워즈 PVP 전투 물 거미줄 싸움 도망 테두리", category: "콘텐츠", emoji: "⚔️", route: "/content?tab=blockwars" },
  { id: "altar", title: "제단", content: "제단 /제단 /제단열기 고급 아이템 크래프팅", category: "콘텐츠", emoji: "🏛️", route: "/content?tab=altar" },
];

function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? searchData.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.route);
    setQuery("");
    setFocused(false);
  };

  const showResults = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-all duration-200 ${
          focused
            ? "border-2 border-amber-400 shadow-lg shadow-amber-100"
            : "border-2 border-amber-200 shadow-md hover:border-amber-300"
        }`}
        style={{ background: "rgba(255,255,255,30)" }}
      >
        <Search className={`w-5 h-5 flex-shrink-0 transition-colors ${focused ? "text-amber-500" : "text-slate-400"}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder="랭크, 명령어, 이벤트, 후원, 법전 등 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 outline-none"
          style={{ fontSize: "15px", fontWeight: 500 }}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden z-40 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-slate-400" style={{ fontSize: "14px" }}>
                "<span className="text-slate-600">{query}</span>"에 대한 결과가 없어요
              </p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
                <span className="text-slate-400" style={{ fontSize: "12px", fontWeight: 600 }}>검색 결과</span>
                <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                  {results.length}개
                </span>
              </div>
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-amber-50 transition-colors text-left border-b border-slate-50 last:border-0"
                >
                  <span className="text-xl flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 700 }}>{item.title}</span>
                      <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5 flex-shrink-0" style={{ fontSize: "10px", fontWeight: 700 }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quick Nav Cards ──────────────────────────────────────────────────────────
function QuickNavSection() {
  const cards = [
    {
      emoji: "🎮",
      title: "콘텐츠",
      desc: "랭크, 특성, 파쿠르, 블럭워즈, 제단 등 다양한 콘텐츠 안내",
      href: "/content",
      color: "#d97706",
      bg: "#fffbef",
      border: "#f5e098",
    },
    {
      emoji: "📚",
      title: "기초설명",
      desc: "접속 방법부터 명령어, 규칙까지 신규 유저 필독",
      href: "/basics",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      emoji: "💎",
      title: "후원",
      desc: "후원 방법, 등급별 혜택, 아이템 확률 안내",
      href: "/support",
      color: "#7c3aed",
      bg: "#faf5ff",
      border: "#e9d5ff",
    },
    {
      emoji: "⚖️",
      title: "운영원칙 (법전)",
      desc: "서버 운영 원칙, 제재 기준, 유저 권리 전문",
      href: "/law",
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link
          key={card.title}
          to={card.href}
          className="group rounded-2xl p-5 border-2 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center"
          style={{ background: card.bg, borderColor: card.border }}
        >
          <div className="text-4xl mb-3">{card.emoji}</div>
          <div className="mb-2" style={{ fontSize: "16px", fontWeight: 800, color: card.color }}>
            {card.title}
          </div>
          <p className="text-slate-500 mb-4" style={{ fontSize: "12px", lineHeight: 1.6 }}>
            {card.desc}
          </p>
          <div
            className="flex items-center gap-1 rounded-full px-3 py-1"
            style={{ background: card.color + "18", color: card.color, fontSize: "12px", fontWeight: 700 }}
          >
            바로가기 <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── Event Section ────────────────────────────────────────────────────────────
const allDailyRewards: { day: number; items: string[] }[] = [
  { day: 1, items: ["[화폐] 자연은 주괴"] },
  { day: 2, items: ["[화폐] 화려한 금 주괴 2개", "하급 두루마리 강화서 [50% 주문서 뽑기]", "가공된 꿀조각"] },
  { day: 3, items: ["황금 뼈가루 (10개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "은행 현금 뭉텅이", "허수아비", "산삼 씨앗"] },
  { day: 4, items: ["빛 (3개)", "[화폐] 화려한 금 주괴", "가공된 꿀조각", "자동심기 기술 주문서 (+1000회)", "엘레베이터 블럭"] },
  { day: 5, items: ["가공된 꿀조각", "산삼 씨앗", "뼈 (10개)"] },
  { day: 6, items: ["[화폐] 화려한 금 주괴 (2개)", "자연 꿀밀랍", "꼬마의 저금통 (5개)"] },
  { day: 7, items: ["꼬마의 저금통 (5개)", "의문의 빨강포션", "은행 현금 뭉텅이", "뼈 (5개)", "양조기", "자연 꿀밀랍"] },
  { day: 8, items: ["[화폐] 화려한 금 주괴", "자연 꿀밀랍", "하급 두루마리 강화서 [50% 주문서 뽑기]"] },
  { day: 9, items: ["가공된 꿀조각", "뼈 (15개)", "자동심기 기술 주문서 (+2000회)"] },
  { day: 10, items: ["엘레베이터 블럭", "엔더상자", "양조기", "[화폐] 빛나는 다이아 주괴"] },
  { day: 11, items: ["황금 뼈가루 (20개)", "제초기"] },
  { day: 12, items: ["반짝반짝 빛나는 거울", "엘레베이터 블럭", "블럭블럭 자동조합 큐브 [1회용] (10개)", "[화폐] 빛나는 다이아 주괴", "중급 두루마리 강화서 [60% 주문서 뽑기]"] },
  { day: 13, items: ["천연 토종꿀", "빛 (5개)", "자동심기 기술 주문서 (+3000회)"] },
  { day: 14, items: ["의문의 파랑포션", "[화폐] 화려한 이리듐 주괴", "자동심기 기술 주문서 (+3000회) (2개)"] },
  { day: 15, items: ["하급 두루마리 강화서 [50% 주문서 뽑기]", "폭죽 로켓 (10개)", "자동심기 기술 주문서 (+5000회)"] },
  { day: 16, items: ["[화폐] 화려한 이리듐 주괴", "일반 소라고동", "은행 현금 뭉텅이", "자연 꿀밀랍"] },
  { day: 17, items: ["황금 뼈가루 (30개)", "제초기 (2개)", "산삼 씨앗 (3개)", "자동심기 기술 주문서 (+5000회)", "[화폐] 화려한 이리듐 주괴"] },
  { day: 18, items: ["일반 소라고동", "상급 두루마리 강화서 [70% 주문서 뽑기]", "은행 현금 뭉텅이", "[화폐] 화려한 금 주괴 (5개)"] },
  { day: 19, items: ["자연 꿀밀랍", "뼈 (15개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "도토리 (15개)", "우아한 바다진주"] },
  { day: 20, items: ["황금 뼈가루 (30개)", "제초기 (3개)", "산삼 씨앗 (5개)", "일반 소라고동", "[화폐] 화려한 이리듐 주괴"] },
  { day: 21, items: ["천연 토종꿀", "[화폐] 빛나는 다이아 주괴", "의문의 벨소리", "반짝반짝 빛나는 거울"] },
  { day: 22, items: ["도토리 (20개)", "폭죽 로켓 (10개)", "[화폐] 화려한 이리듐 주괴", "뼈 (15개)", "우아한 바다진주", "일반 소라고동"] },
  { day: 23, items: ["엘레베이터 블럭", "빛 (5개)", "황금 지렁이", "상급 두루마리 강화서 [70% 주문서 뽑기]", "자연 꿀밀랍", "은행 현금 뭉텅이"] },
  { day: 24, items: ["[화폐] 화려한 금 주괴 (2개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "빛 (5개)", "지렁이 (10개)"] },
  { day: 25, items: ["폭죽 로켓 (10개)", "[화폐] 화려한 이리듐 주괴", "양조기", "자연 꿀밀랍", "우아한 바다진주"] },
  { day: 26, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "상급 두루마리 강화서 [70% 주문서 뽑기]", "반짝반짝 빛나는 거울", "의문의 빨강포션", "[화폐] 빛나는 다이아 주괴"] },
  { day: 27, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "천연 토종꿀", "[화폐] 화려한 이리듐 주괴"] },
  { day: 28, items: ["의문의 빨강포션", "의문의 파랑포션", "최상급 두루마리 강화서 [80% 주문서 뽑기]", "일반 소라고동"] },
  { day: 29, items: ["상급 두루마리 강화서 [70% 주문서 뽑기]", "은행 현금 뭉텅이", "양조기", "일반 소라고동 (2개)", "엘레베이터 블럭"] },
  { day: 30, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "천연 토종꿀", "뼈 (10개)", "도토리 (30개)"] },
  { day: 31, items: ["의문의 빨강포션", "의문의 파랑포션", "최상급 두루마리 강화서 [80% 주문서 뽑기]", "의문의 벨소리", "마법의 소라고동"] },
];

const minelistRewards = [
  "클로버",
  "자동심기 기술 주문서 (+1000회)",
  "경험치 병 (64개)",
  "[화폐] 화려한 금 주괴 (5개)",
  "자연 꿀밀랍",
  "뼈 (5개)",
];

const hottimeRewards = [
  "자연 꿀밀랍",
  "자동심기 기술 주문서 (+1000회)",
  "금 블럭 64개",
  "다이아몬드 블럭 64개",
  "에메랄드 블럭 64개",
  "[화폐] 화려한 금 주괴 (5개)",
  "뼈 (5개)",
  "경험치 병 (64개)",
  "황금 뼈가루 (15개)",
];

const hottimeExtraRewards = [
  "하급 두루마리 강화서 [50% 주문서 뽑기]",
  "황금 뼈가루 (15개)",
];

function EventsSection() {
  const today = new Date().getDate();

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎉</span>
        <h2 className="text-slate-800" style={{ fontSize: "20px", fontWeight: 800 }}>이벤트 안내</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left: 일일보상 전체 ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>일일보상</span>
              <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                1~31일차
              </span>
            </div>
            <Link
              to="/daily-rewards"
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors px-2.5 py-1 rounded-lg hover:bg-amber-50"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              전체보기 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-50 overflow-y-auto" style={{ maxHeight: "520px" }}>
            {allDailyRewards.map((r) => (
              <div
                key={r.day}
                className={`flex items-start gap-3 px-5 py-3 transition-colors ${
                  r.day === today ? "bg-amber-50" : "hover:bg-slate-50/50"
                }`}
              >
                {/* Day Badge */}
                <div
                  className="w-9 h-9 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      r.day === today
                        ? "linear-gradient(135deg, #f5c842, #f59e0b)"
                        : "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                    color: r.day === today ? "#1a1200" : "#64748b",
                    fontSize: "13px",
                    fontWeight: 900,
                    boxShadow:
                      r.day === today
                        ? "0 2px 8px rgba(245,200,66,0.4)"
                        : "none",
                  }}
                >
                  {r.day}
                </div>

                {/* Items */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1 pt-1">
                    {r.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                        style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.5 }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {r.day === today && (
                  <span
                    className="flex-shrink-0 rounded-full px-2 py-0.5 mt-1"
                    style={{
                      background: "linear-gradient(135deg, #f5c842, #f59e0b)",
                      color: "#1a1200",
                      fontSize: "10px",
                      fontWeight: 800,
                    }}
                  >
                    오늘!
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-amber-50 flex-shrink-0">
            <Link
              to="/daily-rewards"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "#92400e", fontSize: "13px", fontWeight: 700 }}
            >
              📅 1일 ~ 31일 전체 보상 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Right: 마인리스트 + 핫타임 ──────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {/* 마인리스트 추천 보상 */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3.5 border-b border-amber-100" style={{ background: "linear-gradient(135deg, #fffef5, #fef9c3)" }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">👍</span>
                <div>
                  <div className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>마인리스트 추천 보상</div>
                  <div className="text-amber-600" style={{ fontSize: "10px", fontWeight: 600 }}>minelist.kr 추천 시 지급</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {minelistRewards.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 핫타임 보상 */}
          <div className="bg-white border-2 border-rose-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3.5 border-b border-rose-100" style={{ background: "linear-gradient(135deg, #fff5f5, #fee2e2)" }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <div>
                  <div className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>핫타임 보상</div>
                  <div className="text-rose-500" style={{ fontSize: "10px", fontWeight: 600 }}>핫타임 접속 시 지급</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {hottimeRewards.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-rose-50">
                <div className="text-slate-500 mb-1.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                  🎁 마인리스트 추천 시 추가 보상
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hottimeExtraRewards.map((item) => (
                    <span
                      key={item}
                      className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                      style={{ fontSize: "11px", fontWeight: 600 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "820px" }}>
        <img
          src={spawnImg}
          alt="꿀비의 숲 서버"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,8,0,0.35) 0%, rgba(15,8,0,0.65) 55%, #fff8dc 100%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center">
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.5px", lineHeight: 1.15, textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
          >
            꿀비의 숲 위키
          </h1>
          <p
            className="text-amber-200 mb-8"
            style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 500, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
          >
            마인크래프트 멀티팜 서버 · 비공식 유저 위키
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-10"
        style={{ marginTop: "-20px", position: "relative", zIndex: 1 }}
      >
        {/* Quick Nav */}
        <QuickNavSection />

        {/* Events Section */}
        <EventsSection />
      </div>
    </div>
  );
}