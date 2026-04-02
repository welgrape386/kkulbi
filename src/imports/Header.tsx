import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImg from "figma:asset/a6dfaffb4ba19b2c258d37ca8737770a98ab8b6b.png";

type DropdownItem = { label: string; emoji: string; tab: string; desc: string };

const contentItems: DropdownItem[] = [
  { label: "랭크", emoji: "⭐", tab: "rank", desc: "등급 조건 & 권한" },
  { label: "특성 안내", emoji: "🔮", tab: "traits", desc: "직업 특성 & 스킬" },
  { label: "상점", emoji: "🏪", tab: "shop", desc: "상점 안내" },
  { label: "섬", emoji: "🏝️", tab: "island", desc: "섬 시스템" },
  { label: "주문서 강화", emoji: "📜", tab: "enchant", desc: "강화 시스템" },
  { label: "도감", emoji: "📖", tab: "collection", desc: "수집가 도감" },
  { label: "제단", emoji: "🏛️", tab: "altar", desc: "제단 시스템" },
  { label: "파쿠르", emoji: "🏃", tab: "parkour", desc: "파쿠르 콘텐츠" },
  { label: "블럭워즈", emoji: "⚔️", tab: "blockwars", desc: "PVP 블럭워즈" },
  { label: "결혼", emoji: "💒", tab: "marriage", desc: "결혼 시스템" },
  { label: "섯다", emoji: "🃏", tab: "seotda", desc: "섯다 게임" },
  { label: "그림", emoji: "🎨", tab: "painting", desc: "그림 시스템" },
  { label: "기부왕", emoji: "👑", tab: "donation-king", desc: "기부왕 이벤트" },
  { label: "양봉 방법", emoji: "🐝", tab: "beekeeping", desc: "양봉 가이드" },
  {
    label: "왕실납품",
    emoji: "🏰",
    tab: "royal-supply",
    desc: "왕실 납품 퀘스트",
  },
  { label: "랜덤 뽑기", emoji: "🎰", tab: "gacha", desc: "길거리 뽑기" },
  { label: "이벤트 안내", emoji: "🎉", tab: "events", desc: "이벤트 일정" },
];

const basicsItems: DropdownItem[] = [
  {
    label: "서버 접속 방법",
    emoji: "🖥️",
    tab: "connect",
    desc: "서버 접속 안내",
  },
  { label: "기본 UI 사용", emoji: "📱", tab: "ui", desc: "인터페이스 안내" },
  { label: "명령어 안내", emoji: "💬", tab: "commands", desc: "전체 명령어" },
  {
    label: "금지 아이템",
    emoji: "🚫",
    tab: "banned",
    desc: "사용 금지 아이템",
  },
  { label: "규칙 사항", emoji: "📋", tab: "rules", desc: "기본 규칙" },
  { label: "자주 묻는 질문", emoji: "❓", tab: "faq", desc: "FAQ" },
  { label: "시세표", emoji: "💰", tab: "prices", desc: "아이템 시세" },
];

const supportItems: DropdownItem[] = [
  { label: "후원 방법", emoji: "💳", tab: "method", desc: "후원 절차" },
  { label: "후원 등급 / 혜택", emoji: "🎖️", tab: "ranks", desc: "등급별 혜택" },
  {
    label: "캐시 아이템 확률",
    emoji: "📦",
    tab: "cash",
    desc: "후원 아이템 확률",
  },
  {
    label: "패키지 확률",
    emoji: "🎁",
    tab: "packages",
    desc: "패키지 상품 확률",
  },
];

interface DropdownMenuProps {
  items: DropdownItem[];
  basePath: string;
  onClose: () => void;
}

function DropdownMenu({ items, basePath, onClose }: DropdownMenuProps) {
  const cols = items.length > 8 ? 3 : 2;
  return (
    <div
      className="absolute top-full left-0 mt-1 rounded-2xl border shadow-xl overflow-hidden z-50"
      style={{
        background: "white",
        borderColor: "#f5e0a0",
        minWidth: cols === 3 ? "520px" : "320px",
        boxShadow: "0 8px 30px rgba(180,120,0,0.15)",
      }}
    >
      <div
        className={`grid gap-0.5 p-2`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {items.map((item) => (
          <Link
            key={item.tab}
            to={`${basePath}?tab=${item.tab}`}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-amber-50 transition-colors group"
          >
            <span className="text-lg flex-shrink-0">{item.emoji}</span>
            <div className="min-w-0">
              <div
                className="text-slate-700 group-hover:text-amber-700 transition-colors"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {item.label}
              </div>
              <div className="text-slate-400" style={{ fontSize: "11px" }}>
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.search]);

  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const navBtnClass = (href: string) =>
    `flex items-center gap-1 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
      isActive(href)
        ? "bg-amber-500 text-white shadow-sm"
        : "text-slate-700 hover:text-amber-700 hover:bg-amber-50"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-sm shadow-md border-b border-amber-100"
          : "bg-white/95 backdrop-blur-sm border-b border-amber-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <img
              src={logoImg}
              alt="꿀비의 숲"
              className="h-10 w-10 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-amber-700"
                style={{
                  fontSize: "15px",
                  fontWeight: 900,
                  letterSpacing: "-0.3px",
                }}
              >
                꿀비의 숲
              </span>
              <span className="text-slate-400 text-[10px] font-normal">
                공식 위키
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={navBtnClass("/")}
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              🏠 홈
            </Link>

            {/* 콘텐츠 dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("content")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`${navBtnClass("/content")} cursor-pointer`}
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                🎮 콘텐츠
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "content" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "content" && (
                <DropdownMenu
                  items={contentItems}
                  basePath="/content"
                  onClose={() => setActiveDropdown(null)}
                />
              )}
            </div>

            {/* 기초설명 dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("basics")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`${navBtnClass("/basics")} cursor-pointer`}
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                📚 기초설명
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "basics" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "basics" && (
                <DropdownMenu
                  items={basicsItems}
                  basePath="/basics"
                  onClose={() => setActiveDropdown(null)}
                />
              )}
            </div>

            {/* 후원 dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("support")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`${navBtnClass("/support")} cursor-pointer`}
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                💎 후원
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${activeDropdown === "support" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "support" && (
                <DropdownMenu
                  items={supportItems}
                  basePath="/support"
                  onClose={() => setActiveDropdown(null)}
                />
              )}
            </div>

            {/* 법전 */}
            <Link
              to="/law"
              className={`${navBtnClass("/law")} border ${
                isActive("/law")
                  ? "border-amber-500"
                  : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              ⚖️ 법전
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-amber-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 text-amber-800"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              🏠 홈
            </Link>

            {/* 콘텐츠 group */}
            <div>
              <div
                className="px-4 py-2 text-amber-700"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                🎮 콘텐츠
              </div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {contentItems.map((item) => (
                  <Link
                    key={item.tab}
                    to={`/content?tab=${item.tab}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-amber-50 transition-colors"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span>{item.emoji}</span> {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 기초설명 group */}
            <div>
              <div
                className="px-4 py-2 text-green-700"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                📚 기초설명
              </div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {basicsItems.map((item) => (
                  <Link
                    key={item.tab}
                    to={`/basics?tab=${item.tab}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-green-50 transition-colors"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span>{item.emoji}</span> {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 후원 group */}
            <div>
              <div
                className="px-4 py-2 text-violet-700"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                💎 후원
              </div>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {supportItems.map((item) => (
                  <Link
                    key={item.tab}
                    to={`/support?tab=${item.tab}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-violet-50 transition-colors"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span>{item.emoji}</span> {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/law"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-100 text-amber-800"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              ⚖️ 원영원칙 (법전)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
