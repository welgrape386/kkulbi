import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import logoImg from "../../imports/logo.png";

const navItems = [
  { to: "/", label: "🏠 홈" },
  { to: "/content", label: "🎮 콘텐츠" },
  { to: "/basics", label: "📚 기초설명" },
  { to: "/content?tab=shop", label: "💰 상점가" },
  { to: "/support", label: "💎 후원" },
  { to: "/law", label: "⚖️ 운영원칙" },
];

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // 상점가·캐시상점은 콘텐츠 페이지의 탭이지만 메뉴에서는 따로 표시합니다.
  const shopTab =
    location.pathname === "/content" &&
    ["shop", "cash-shop"].includes(new URLSearchParams(location.search).get("tab") ?? "")
      ? `/content?tab=${new URLSearchParams(location.search).get("tab")}`
      : null;

  const isActive = (href: string) => {
    if (href.startsWith("/content?tab=")) return href === shopTab;
    if (href === "/content") return location.pathname.startsWith("/content") && !shopTab;
    // 일일보상·추석 착용샷은 홈 이벤트 안내에서 들어가는 하위 페이지입니다.
    if (href === "/")
      return (
        location.pathname === "/" ||
        location.pathname.startsWith("/daily-rewards") ||
        location.pathname.startsWith("/chuseok-event")
      );
    return location.pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
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
            <div className="h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={logoImg}
                alt="꿀비의 숲"
                className="w-full h-full object-contain"
              />
            </div>
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
              <span
                className="text-slate-500"
                style={{ fontSize: "10px", fontWeight: 500 }}
              >
                공식 위키
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkClass(item.to)}
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-amber-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
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
        <div className="md:hidden bg-white border-t border-amber-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                  isActive(item.to)
                    ? "bg-amber-500 text-white"
                    : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                }`}
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
