import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { Search, X, ChevronRight } from "lucide-react";
import spawnImg from "../../imports/스폰.png";
import { ChuseokEventContent } from "./ChuseokEventContent";
import { BeeEasterEgg } from "./BeeEasterEgg";
import { search, type SearchItem } from "../searchIndex";
import {
  SHOW_DAILY_REWARDS,
  MinelistRewardsCard,
  PlaytimeRewardsCard,
} from "./EventRewards";

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = search(query);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.route);
    // #해시가 있으면 AppRoot 가 해당 섹션으로 스크롤합니다.
    if (!item.route.includes("#")) window.scrollTo(0, 0);
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
        style={{ background: "rgba(255,255,255,0.92)" }}
      >
        <Search
          className={`w-5 h-5 flex-shrink-0 transition-colors ${
            focused ? "text-amber-500" : "text-slate-400"
          }`}
        />
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
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="검색어 지우기"
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
              <p className="text-slate-500" style={{ fontSize: "14px" }}>
                "<span className="text-slate-600">{query}</span>"에 대한 결과가
                없어요
              </p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
                <span
                  className="text-slate-500"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  검색 결과 {results.length}개
                </span>
              </div>

              {results.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-3.5 hover:bg-amber-50 transition-colors border-b border-slate-50 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-slate-700"
                          style={{ fontSize: "14px", fontWeight: 700 }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="bg-slate-100 text-slate-500 rounded-full px-2 py-0.5"
                          style={{ fontSize: "10px", fontWeight: 700 }}
                        >
                          {item.where}
                        </span>
                      </div>
                      <p
                        className="text-slate-500 truncate"
                        style={{ fontSize: "12px" }}
                      >
                        {item.content}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quick Links ──────────────────────────────────────────────────────────────
const quickLinks = [
  {
    title: "콘텐츠",
    desc: "랭크, 특성, 양봉, 이벤트, 제단 등",
    emoji: "🎮",
    to: "/content",
    color: "#c2410c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    title: "기초설명",
    desc: "서버 접속, 명령어, 규칙, FAQ",
    emoji: "📚",
    to: "/basics",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    title: "상점가",
    desc: "일반 상점 아이템 고정 가격 확인",
    emoji: "💰",
    to: "/content?tab=shop",
    color: "#a16207",
    bg: "#fefce8",
    border: "#fef08a",
  },
  {
    title: "후원",
    desc: "후원 방법과 아이템 확률 안내",
    emoji: "💎",
    to: "/support",
    color: "#c2410c",
    bg: "#fff7ed",
    border: "#fdba74",
  },
  {
    title: "운영원칙",
    desc: "서버 규칙과 법전 확인",
    emoji: "⚖️",
    to: "/law",
    color: "#92400e",
    bg: "#fef3c7",
    border: "#fcd34d",
  },
  ...(SHOW_DAILY_REWARDS
    ? [
        {
          title: "일일보상",
          desc: "1일부터 31일까지 전체 보상 확인",
          emoji: "🎁",
          to: "/daily-rewards",
          color: "#b45309",
          bg: "#fffbeb",
          border: "#fde68a",
        },
      ]
    : []),
];

function QuickLinksSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <BeeEasterEgg />
        <h2
          className="text-slate-800"
          style={{ fontSize: "20px", fontWeight: 800 }}
        >
          바로가기
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-2xl border-2 px-5 py-4 shadow-sm hover:shadow-md transition-all"
            style={{
              background: item.bg,
              borderColor: item.border,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-0.5" style={{ fontSize: "26px", lineHeight: 1.2 }}>
                  {item.emoji}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: item.color,
                  }}
                >
                  {item.title}
                </div>
                <p
                  className="mt-1 text-slate-500"
                  style={{ fontSize: "12px", lineHeight: 1.6 }}
                >
                  {item.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Events Section ───────────────────────────────────────────────────────────
function EventsSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎉</span>
        <h2
          className="text-slate-800"
          style={{ fontSize: "20px", fontWeight: 800 }}
        >
          이벤트 안내
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ChuseokEventContent />
        </div>

        <div className="space-y-4">
          <MinelistRewardsCard />
          <PlaytimeRewardsCard />
        </div>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative">
        <img
          src={spawnImg}
          alt="꿀비의 숲 스폰"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,8,0,0.25) 0%, rgba(15,8,0,0.5) 78%, #fff8dc 100%)",
          }}
        />

        {/* 헤더(64px) + 바로가기 2줄(약 300px)을 뺀 나머지 화면을 히어로가 채웁니다.
            ponytail: 380px은 바로가기 카드 높이 기준 추정치 — 카드 구성이 바뀌면 같이 조정 */}
        <div
          className="relative z-10 py-8 flex items-center justify-center"
          style={{ minHeight: "clamp(360px, calc(100svh - 380px), 600px)" }}
        >
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1
              className="text-white mb-2"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                lineHeight: 1.15,
                textShadow: "0 2px 16px rgba(0,0,0,0.8)",
              }}
            >
              꿀비의 숲 위키
            </h1>

            <p
              className="text-amber-200 mb-5"
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                fontWeight: 500,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              마인팜 꿀비의 숲 공식 위키
            </p>

            <SearchBar />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-10 space-y-10">
        <QuickLinksSection />
        <EventsSection />
      </div>
    </div>
  );
}
