import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import logoImg from "../../imports/image-removebg-preview.png";

export function Header() {
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

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
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
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src={logoImg}
              alt="꿀비의 숲"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-amber-700"
                style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "-0.3px" }}
              >
                꿀비의 숲
              </span>
              <span className="text-slate-400" style={{ fontSize: "10px", fontWeight: 400 }}>
                비공식 위키
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={navLinkClass("/")} style={{ fontSize: "13px", fontWeight: 600 }}>
              🏠 홈
            </Link>
            <Link to="/content" className={navLinkClass("/content")} style={{ fontSize: "13px", fontWeight: 600 }}>
              🎮 콘텐츠
            </Link>
            <Link to="/basics" className={navLinkClass("/basics")} style={{ fontSize: "13px", fontWeight: 600 }}>
              📚 기초설명
            </Link>
            <Link to="/prices" className={navLinkClass("/prices")} style={{ fontSize: "13px", fontWeight: 600 }}>
              💰 시세표
            </Link>
            <Link to="/support" className={navLinkClass("/support")} style={{ fontSize: "13px", fontWeight: 600 }}>
              💎 후원
            </Link>
            <Link
              to="/law"
              className={`${navLinkClass("/law")} border ${
                isActive("/law")
                  ? "border-amber-500"
                  : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              ⚖️ 운영원칙
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-amber-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 text-amber-800"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              🏠 홈
            </Link>
            <Link
              to="/content"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              🎮 콘텐츠
            </Link>
            <Link
              to="/basics"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-green-50 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              📚 기초설명
            </Link>
            <Link
              to="/prices"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              💰 시세표
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-50 transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              💎 후원
            </Link>
            <Link
              to="/law"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-100 text-amber-800"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              ⚖️ 운영원칙 (법전)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}