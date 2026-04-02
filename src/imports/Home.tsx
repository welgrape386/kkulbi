import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { Search, X, ChevronRight, Clock } from "lucide-react";
import serverBg from "figma:asset/3fcced9b96b426213e9c3be50040f4f4b1276658.png";
import logoImg from "figma:asset/a6dfaffb4ba19b2c258d37ca8737770a98ab8b6b.png";

// ─── Search ──────────────────────────────────────────────────────────────────
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
  { id: "events-daily", title: "이벤트 안내", content: "낚시 대회 전체지급 신의 축복 생존자 이벤트 신호기 추첨 일일 보상", category: "콘텐츠", emoji: "🎉", route: "/content?tab=events" },
  { id: "daily-reward", title: "일일 보상", content: "출석 체크 일일보상 보상 화폐 주괴 강화서 소라고동", category: "콘텐츠", emoji: "🎁", route: "/content?tab=events" },
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
  { id: "law", title: "원영원칙 (법전)", content: "법전 운영원칙 규정 제재 처벌 비매너 채팅 복구 GM 유저 권리", category: "법전", emoji: "⚖️", route: "/law" },
  { id: "parkour", title: "파쿠르", content: "파쿠르 달리기 점프 스테이지 길막 잠수 방해 보상", category: "콘텐츠", emoji: "🏃", route: "/content?tab=parkour" },
  { id: "blockwars", title: "블럭워즈 (PVP)", content: "블럭워즈 PVP 전투 물 거미줄 싸움 도망 테두리", category: "콘텐츠", emoji: "⚔️", route: "/content?tab=blockwars" },
  { id: "altar", title: "제단", content: "제단 /제단 /제단열기 고급 아이템 크래프팅", category: "콘텐츠", emoji: "🏛️", route: "/content?tab=altar" },
  { id: "royal-supply", title: "왕실납품", content: "왕실 납품 요리 납품 퀘스트 보상 최고의요리사 스킬", category: "콘텐츠", emoji: "🏰", route: "/content?tab=royal-supply" },
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
        style={{ background: "rgba(255,255,255,0.95)" }}
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
          style={{ fontSize: "15px" }}
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
                <span className="text-slate-400" style={{ fontSize: "12px", fontWeight: 500 }}>검색 결과</span>
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
                      <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{item.title}</span>
                      <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5 flex-shrink-0" style={{ fontSize: "10px", fontWeight: 600 }}>
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

// ─── Quick Nav Cards ─────────────────────────────────────────────────────────
const quickCards = [
  {
    emoji: "🎮",
    title: "콘텐츠",
    desc: "랭크, 특성, 파쿠르, 블럭워즈, 제단 등 17가지 콘텐츠",
    href: "/content?tab=rank",
    items: ["랭크", "특성안내", "블럭워즈", "양봉", "이벤트"],
    color: "#f5c842",
    bg: "#fffbef",
    border: "#f5e098",
  },
  {
    emoji: "📚",
    title: "기초설명",
    desc: "접속 방법부터 명령어, 규칙까지 신규 유저 필독",
    href: "/basics?tab=connect",
    items: ["서버접속", "명령어", "금지아이템", "FAQ", "시세표"],
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    emoji: "💎",
    title: "후원",
    desc: "후원 방법, 등급별 혜택, 아이템 확률 안내",
    href: "/support?tab=method",
    items: ["후원방법", "등급혜택", "캐시확률", "패키지"],
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
  },
  {
    emoji: "⚖️",
    title: "원영원칙 (법전)",
    desc: "서버 운영 원칙, 제재 기준, 유저 권리 전문",
    href: "/law",
    items: ["비매너플레이", "채팅규정", "복구규정", "GM 책무"],
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
];

function QuickNavSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickCards.map((card) => (
        <Link
          key={card.title}
          to={card.href}
          className="group rounded-2xl p-5 border-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: card.bg, borderColor: card.border }}
        >
          <div className="text-3xl mb-3">{card.emoji}</div>
          <div className="mb-1" style={{ fontSize: "16px", fontWeight: 800, color: card.color }}>
            {card.title}
          </div>
          <p className="text-slate-500 mb-3" style={{ fontSize: "12px", lineHeight: 1.6 }}>
            {card.desc}
          </p>
          <div className="flex flex-wrap gap-1">
            {card.items.map((item) => (
              <span
                key={item}
                className="rounded-full px-2 py-0.5"
                style={{ background: card.color + "20", color: card.color, fontSize: "10px", fontWeight: 600 }}
              >
                {item}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── Events Section ───────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0"); }

type EventEntry = {
  name: string; emoji: string; hour: number; minute: number; duration: number;
  desc: string; tip: string; color: string; weekendOnly?: boolean;
};

const allEvents: EventEntry[] = [
  { name: "낚시 대회", emoji: "🎣", hour: 20, minute: 0, duration: 60, desc: "가장 비싼 물고기를 낚아 상위 입상자에게 보상 지급!", tip: "잠수 낚시는 대회 미참여에요", color: "blue" },
  { name: "전체지급", emoji: "🎁", hour: 21, minute: 0, duration: 5, desc: "우편함으로 보상이 즉시 지급돼요!", tip: "로그인 상태라면 자동 수령", color: "amber" },
  { name: "신의 축복", emoji: "✨", hour: 21, minute: 0, duration: 60, desc: "21:00~22:00 신의 축복 버프 적용!", tip: "작물 성장 속도 · 낚시 확률 UP", color: "purple" },
  { name: "생존자 이벤트", emoji: "🛡️", hour: 1, minute: 0, duration: 10, desc: "전체채팅에 '살아있다'를 입력하면 보상!", tip: "우편함에서 보상 확인", color: "green" },
  { name: "신호기 추첨", emoji: "🎰", hour: 1, minute: 0, duration: 5, desc: "자동 추첨으로 당첨자에게 보상 지급!", tip: "/신호기 명령어로 참여", color: "rose" },
  { name: "생존자 이벤트 (주말)", emoji: "🛡️", hour: 13, minute: 0, duration: 10, desc: "주말 오후 생존자 이벤트! '살아있다' 입력", tip: "주말에만 진행돼요", color: "green", weekendOnly: true },
  { name: "신호기 추첨 (주말)", emoji: "🎰", hour: 21, minute: 0, duration: 5, desc: "주말 신호기 추첨! 당첨되면 특별 보상!", tip: "주말 추가 추첨이에요", color: "rose", weekendOnly: true },
];

const colorMap: Record<string, { live: string; badge: string; dot: string }> = {
  blue:   { live: "bg-blue-50 border-l-4 border-blue-300",   badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-400" },
  green:  { live: "bg-green-50 border-l-4 border-green-300", badge: "bg-green-100 text-green-700", dot: "bg-green-400" },
  purple: { live: "bg-purple-50 border-l-4 border-purple-300", badge: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
  amber:  { live: "bg-amber-50 border-l-4 border-amber-300",  badge: "bg-amber-100 text-amber-700",  dot: "bg-amber-400" },
  rose:   { live: "bg-rose-50 border-l-4 border-rose-300",    badge: "bg-rose-100 text-rose-700",    dot: "bg-rose-400" },
};

function EventsSection() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const cur = now.getHours() * 60 + now.getMinutes();
  const isWeekend = [0, 6].includes(now.getDay());

  const events = allEvents
    .filter((ev) => !ev.weekendOnly || isWeekend)
    .map((ev) => {
      const startMin = ev.hour * 60 + ev.minute;
      const endMin = startMin + ev.duration;
      const adjCur = ev.hour < 6 && cur > 18 * 60 ? cur - 1440 : cur;
      const isLive = adjCur >= startMin && adjCur < endMin;
      const minutesUntil = startMin - adjCur;
      const isUpcoming = !isLive && minutesUntil > 0 && minutesUntil <= 60;
      return { ...ev, isLive, isUpcoming, startMin, endMin, minutesUntil };
    })
    .sort((a, b) => a.startMin - b.startMin);

  return (
    <section className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-50">
        <Clock className="w-4 h-4 text-amber-500" />
        <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>이벤트 일정</span>
        {isWeekend && (
          <span className="bg-rose-100 text-rose-600 rounded-full px-2.5 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>🎉 주말</span>
        )}
        <span className="ml-auto text-slate-400" style={{ fontSize: "12px" }}>
          현재 {pad(now.getHours())}:{pad(now.getMinutes())}
        </span>
      </div>

      <div className="divide-y divide-slate-50">
        {events.map((ev, i) => {
          const c = colorMap[ev.color] ?? colorMap.amber;
          return (
            <div key={i} className={`flex items-start gap-4 px-5 py-3.5 ${ev.isLive ? c.live : ""}`}>
              <span className="text-xl flex-shrink-0 mt-0.5">{ev.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-800" style={{ fontSize: "14px", fontWeight: 600 }}>{ev.name}</span>
                  {ev.isLive && (
                    <span className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> 진행중
                    </span>
                  )}
                  {ev.isUpcoming && (
                    <span className={`${c.badge} rounded-full px-2 py-0.5`} style={{ fontSize: "10px", fontWeight: 600 }}>
                      {ev.minutesUntil}분 후
                    </span>
                  )}
                  {ev.weekendOnly && (
                    <span className="bg-rose-100 text-rose-500 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 600 }}>주말</span>
                  )}
                </div>
                <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>{ev.desc}</p>
                <p className="text-slate-400" style={{ fontSize: "11px" }}>💡 {ev.tip}</p>
              </div>
              <span className="text-slate-400 flex-shrink-0 text-right" style={{ fontSize: "12px" }}>
                {pad(ev.hour)}:{pad(ev.minute)}
                <br />
                <span style={{ fontSize: "10px" }}>~ {pad(Math.floor(ev.endMin / 60) % 24)}:{pad(ev.endMin % 60)}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Daily Reward Preview ────────────────────────────────────────────────────
const dailyRewards: { day: number; items: string }[] = [
  { day: 1, items: "자연은 주괴" },
  { day: 2, items: "화려한 금 주괴 2개 · 하급 두루마리 강화서 · 가공된 꿀조각" },
  { day: 3, items: "황금 뼛가루 10개 · 하급 강화서 · 은행 현금 뭉텅이 · 허수아비 · 산삼씨앗" },
  { day: 4, items: "빛 3개 · 화려한 금 주괴 · 가공된 꿀조각 · 자동심기 주문서 (+1000회) · 엘리베이터 블럭" },
  { day: 5, items: "가공된 꿀조각 · 산삼씨앗 · 뼈다귀 10개" },
  { day: 6, items: "화려한 금 주괴 2개 · 자연 꿀밀랍 · 꼬마의 저금통 5개" },
  { day: 7, items: "꼬마의 저금통 5개 · 의문의 빨강포션 · 은행 현금 뭉텅이 · 양조기 · 자연 꿀밀랍" },
];

function DailyRewardPreview() {
  const today = new Date().getDate();
  const todayReward = dailyRewards.find((r) => r.day === today) ?? dailyRewards[0];

  return (
    <section className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-amber-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>일일 보상 (출석 체크)</span>
        </div>
        <Link
          to="/content?tab=events"
          className="text-amber-600 hover:text-amber-700"
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          전체 보기 →
        </Link>
      </div>

      {/* Today highlight */}
      <div className="px-5 py-4 bg-amber-50/60 border-b border-amber-100">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: "#f5c842", fontSize: "14px", fontWeight: 900 }}
          >
            {today}
          </div>
          <div>
            <div className="text-amber-700 mb-0.5" style={{ fontSize: "13px", fontWeight: 700 }}>오늘 ({today}일차) 보상</div>
            <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.6 }}>{todayReward.items}</p>
          </div>
        </div>
      </div>

      {/* Preview list */}
      <div className="divide-y divide-slate-50">
        {dailyRewards.slice(0, 5).map((reward) => (
          <div key={reward.day} className={`flex items-start gap-3 px-5 py-3 ${reward.day === today ? "bg-amber-50/40" : ""}`}>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: reward.day === today ? "#f5c842" : "#f1f5f9",
                color: reward.day === today ? "#1a1200" : "#64748b",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {reward.day}
            </div>
            <p className="text-slate-600 flex-1" style={{ fontSize: "12px", lineHeight: 1.6 }}>
              {reward.items}
            </p>
            {reward.day === today && (
              <span className="text-amber-500 flex-shrink-0" style={{ fontSize: "11px", fontWeight: 700 }}>오늘!</span>
            )}
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-amber-50 text-center">
        <Link to="/content?tab=events" className="text-amber-600 hover:text-amber-700" style={{ fontSize: "12px", fontWeight: 600 }}>
          1일~31일 전체 보상 보기 →
        </Link>
      </div>
    </section>
  );
}

// ─── Rank Preview ────────────────────────────────────────────────────────────
const rankPreview = [
  { tier: 1, req: "재화 50만원, 마인리스트 2회", perm: "/밥", emoji: "🌱" },
  { tier: 2, req: "재화 100만원, 마인리스트 3회", perm: "/엔더상자, /창고1", emoji: "🌿" },
  { tier: 3, req: "재화 200만원, 마인리스트 5회", perm: "/창고2, 경매장 15개", emoji: "🍃" },
  { tier: 4, req: "재화 1000만원, 마인리스트 6회", perm: "/창고3", emoji: "🌳" },
  { tier: 5, req: "재화 4000만원, 60시간, 마인리스트 8회", perm: "/조합대, /수산시장", emoji: "⭐" },
];

function RankPreview() {
  return (
    <section className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-amber-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>랭크 미리보기</span>
        </div>
        <Link to="/content?tab=rank" className="text-amber-600 hover:text-amber-700" style={{ fontSize: "12px", fontWeight: 500 }}>
          전체 보기 →
        </Link>
      </div>
      <div className="divide-y divide-slate-50">
        {rankPreview.map((r) => (
          <div key={r.tier} className="flex items-center gap-3 px-5 py-3">
            <span className="text-lg flex-shrink-0">{r.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>{r.tier}등급</div>
              <div className="text-slate-400" style={{ fontSize: "11px" }}>{r.req}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="bg-amber-100 text-amber-700 rounded-lg px-2 py-1" style={{ fontSize: "11px", fontWeight: 600 }}>
                {r.perm}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "380px" }}>
        <img
          src={serverBg}
          alt="꿀비의 숲 서버"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(20,12,0,0.5) 0%, rgba(20,12,0,0.75) 60%, #fffbef 100%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-center">
          <img
            src={logoImg}
            alt="꿀비의 숲"
            className="w-36 h-36 mx-auto mb-4 object-contain drop-shadow-2xl"
            style={{ imageRendering: "pixelated" }}
          />
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.5px", lineHeight: 1.15, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            꿀비의 숲 위키
          </h1>
          <p
            className="text-amber-200 mb-8"
            style={{ fontSize: "15px", lineHeight: 1.7, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
          >
            마인크래프트 멀티팜 서버 · 비공식 유저 위키
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-10" style={{ marginTop: "-20px", position: "relative", zIndex: 1 }}>
        {/* Quick Nav */}
        <QuickNavSection />

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EventsSection />
          <DailyRewardPreview />
        </div>

        {/* Rank Preview */}
        <RankPreview />

        {/* Traits Overview */}
        <section className="rounded-2xl overflow-hidden border border-amber-100 shadow-sm" style={{ background: "white" }}>
          <div className="px-5 py-4 border-b border-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔮</span>
              <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>특성 안내</span>
              <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>6가지 직업</span>
            </div>
            <Link to="/content?tab=traits" className="text-amber-600 hover:text-amber-700" style={{ fontSize: "12px", fontWeight: 500 }}>
              자세히 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 divide-x divide-y divide-slate-50">
            {[
              { emoji: "⛏️", name: "채광", desc: "광물 캐기 & 판매", color: "#6366f1" },
              { emoji: "🌽", name: "수확", desc: "커스텀 농사 & 작물", color: "#16a34a" },
              { emoji: "🪓", name: "벌목", desc: "나무 캐기 & 판매", color: "#92400e" },
              { emoji: "🎣", name: "어부", desc: "낚시 & 물고기 판매", color: "#0284c7" },
              { emoji: "🍳", name: "요리", desc: "요리 제작 & 왕실납품", color: "#ea580c" },
              { emoji: "🌿", name: "채집 / 모험", desc: "미출시 예정", color: "#64748b" },
            ].map((trait) => (
              <Link
                key={trait.name}
                to="/content?tab=traits"
                className="flex flex-col items-center justify-center gap-2 p-5 hover:bg-amber-50/50 transition-colors group"
              >
                <span className="text-3xl">{trait.emoji}</span>
                <div className="text-center">
                  <div style={{ fontSize: "14px", fontWeight: 700, color: trait.color }}>{trait.name}</div>
                  <div className="text-slate-400" style={{ fontSize: "11px" }}>{trait.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
