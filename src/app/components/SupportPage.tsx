import { useSearchParams, Link } from "react-router";

const BG = "#fff8dc";

const tabs = [
  { key: "method", label: "후원 방법", emoji: "💳" },
  { key: "ranks", label: "후원 등급 / 혜택", emoji: "🎖️" },
];

function MethodContent() {
  const steps = [
    { step: 1, icon: "🌐", title: "사이트 접속", desc: "서버 후원 사이트 또는 디스코드 공지를 통해 후원 페이지에 접속하세요." },
    { step: 2, icon: "🔑", title: "닉네임 입력", desc: "마인크래프트 닉네임(정확히 입력)을 입력하세요. 오타 시 후원 아이템이 지급되지 않을 수 있어요." },
    { step: 3, icon: "🛒", title: "상품 선택", desc: "원하는 캐시 패키지 또는 후원 등급을 선택하세요." },
    { step: 4, icon: "💳", title: "결제 진행", desc: "결제 수단을 선택하고 결제를 완료하세요. (신용카드, 계좌이체 등 지원)" },
    { step: 5, icon: "📦", title: "아이템 수령", desc: "결제 완료 후 게임 내 우편함으로 캐시 또는 아이템이 지급됩니다. /우편 명령어로 확인하세요!" },
  ];

  const notices = [
    "후원 전 반드시 닉네임을 정확하게 입력하세요.",
    "후원은 비환불 정책입니다. 결제 전 신중하게 결정해주세요.",
    "후원 관련 문의는 디스코드 후원 문의 채널을 이용해 주세요.",
    "후원 아이템은 우편함으로 지급되며, 접속 후 /우편 명령어로 수령 가능합니다.",
    "서버 점검 시간에는 후원 처리가 지연될 수 있어요.",
  ];

  return (
    <div className="space-y-6">
      {/* Steps */}
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-amber-50" style={{ background: "#fffef5" }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#92400e" }}>후원 절차</span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {steps.map((s) => (
            <div key={s.step} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: "linear-gradient(135deg, #f5c842, #f59e0b)", color: "#1a1200", fontSize: "16px", fontWeight: 900 }}
              >
                {s.step}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>{s.title}</span>
                </div>
                <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-amber-50" style={{ background: "#fffef5" }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#92400e" }}>결제 수단</span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "💳", name: "신용카드" },
              { icon: "🏦", name: "계좌이체" },
              { icon: "📱", name: "간편결제" },
              { icon: "🎁", name: "문화상품권" },
            ].map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-amber-100 bg-amber-50 text-center">
                <span className="text-3xl">{m.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#92400e" }}>{m.name}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 mt-3 text-center" style={{ fontSize: "12px" }}>
            지원 결제 수단은 후원 사이트에서 확인하세요.
          </p>
        </div>
      </div>

      {/* Notices */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">⚠️</span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#991b1b" }}>주의 사항</span>
        </div>
        <ul className="space-y-2">
          {notices.map((n) => (
            <li key={n} className="flex items-start gap-2 text-red-700" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              <span className="flex-shrink-0 mt-0.5">▸</span>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const donationRanks = [
  {
    name: "브론즈",
    emoji: "🥉",
    price: "5,000원",
    color: "#cd7f32",
    bg: "#fdf6ee",
    border: "#e8d0b0",
    benefits: [
      "브론즈 칭호 지급",
      "캐시 500 지급",
      "인벤토리 확장 아이템",
    ],
  },
  {
    name: "실버",
    emoji: "🥈",
    price: "10,000원",
    color: "#6b7280",
    bg: "#f9fafb",
    border: "#d1d5db",
    benefits: [
      "실버 칭호 지급",
      "캐시 1,200 지급",
      "인벤토리 확장 아이템",
      "전용 닉네임 색상",
    ],
  },
  {
    name: "골드",
    emoji: "🥇",
    price: "20,000원",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    benefits: [
      "골드 칭호 지급",
      "캐시 3,000 지급",
      "인벤토리 확장 아이템",
      "전용 닉네임 색상",
      "후원 전용 아이템 지급",
    ],
  },
  {
    name: "다이아",
    emoji: "💎",
    price: "30,000원",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
    benefits: [
      "다이아 칭호 지급",
      "캐시 5,000 지급",
      "인벤토리 확장 아이템",
      "전용 닉네임 색상",
      "후원 전용 아이템 지급",
      "VIP 채널 접근",
    ],
  },
  {
    name: "VIP",
    emoji: "👑",
    price: "50,000원",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
    benefits: [
      "VIP 칭호 지급",
      "캐시 10,000 지급",
      "인벤토리 확장 아이템",
      "전용 닉네임 색상 & 이펙트",
      "후원 전용 아이템 지급",
      "VIP 채널 접근",
      "추가 창고 슬롯",
      "확성기 무제한 (30일)",
    ],
  },
];

function RanksContent() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-amber-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          💡 후원 등급은 1회성 후원으로 지급됩니다. 후원 등급별 혜택은 서버 업데이트에 따라 변경될 수 있으며,
          최신 혜택은 디스코드 공지를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {donationRanks.map((rank) => (
          <div
            key={rank.name}
            className="rounded-2xl overflow-hidden shadow-sm border-2 flex flex-col"
            style={{ background: rank.bg, borderColor: rank.border }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b-2" style={{ borderColor: rank.border }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{rank.emoji}</span>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 900, color: rank.color }}>{rank.name}</div>
                  <div
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 mt-1"
                    style={{ background: rank.color + "20", color: rank.color, fontSize: "13px", fontWeight: 800 }}
                  >
                    {rank.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="p-4 flex-1">
              <div className="text-slate-500 mb-2" style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                혜택
              </div>
              <ul className="space-y-2">
                {rank.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ fontSize: "13px", color: "#374151" }}>
                    <span style={{ color: rank.color, flexShrink: 0, marginTop: "1px" }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Cash info */}
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💰</span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>캐시 안내</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "🎁", title: "캐시 사용처", desc: "확성기, 아이템 구매, 커스텀 아이템 제작 등에 활용 가능합니다." },
            { icon: "🔄", title: "캐시 전송", desc: "6등급 이상부터 /캐시 보내기 명령어로 다른 유저에게 캐시를 전송할 수 있어요." },
            { icon: "📦", title: "캐시 아이템", desc: "캐시로 구매 가능한 전용 아이템은 디스코드 상점 채널에서 확인하세요." },
          ].map((item) => (
            <div key={item.title} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{item.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#92400e" }}>{item.title}</span>
              </div>
              <p className="text-slate-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupportPage() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get("tab") ?? "method";
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-violet-600 mb-2" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-violet-700">홈</Link>
            <span>›</span>
            <span>후원</span>
            <span>›</span>
            <span className="text-slate-600">{current.emoji} {current.label}</span>
          </div>
          <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
            💎 후원 안내
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-8 p-3 rounded-2xl" style={{ background: "white", border: "2px solid #ddd6fe" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setParams({ tab: tab.key })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
              style={{
                background: activeTab === tab.key ? "#7c3aed" : "transparent",
                color: activeTab === tab.key ? "white" : "#6b7280",
                fontSize: "13px",
                fontWeight: activeTab === tab.key ? 700 : 500,
              }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div>
          {activeTab === "method" ? <MethodContent /> : <RanksContent />}
        </div>
      </div>
    </div>
  );
}
