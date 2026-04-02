import { useSearchParams, Link } from "react-router";

const tabs = [
  { key: "method", label: "후원 방법", emoji: "💳" },
  { key: "ranks", label: "후원 등급 / 혜택", emoji: "🎖️" },
  { key: "cash", label: "캐시 아이템 확률", emoji: "📦" },
  { key: "packages", label: "패키지 확률", emoji: "🎁" },
];

function MethodContent() {
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-violet-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          💎 후원은 서버 운영에 직접적인 도움이 돼요! 후원 시 캐시를 받아 다양한 아이템과 혜택을 누릴 수 있어요.
          <br />⚠️ 후원한 금액은 환불이 불가능하니 신중히 결정해주세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { step: 1, icon: "🌐", title: "후원 페이지 접속", desc: "공식 디스코드 서버의 공지 또는 네이버 카페에서 후원 링크를 확인하세요." },
          { step: 2, icon: "💳", title: "금액 선택 및 결제", desc: "원하는 후원 금액을 선택하고 카드/계좌이체 등으로 결제해요." },
          { step: 3, icon: "💎", title: "캐시 수령", desc: "결제 완료 후 인게임 캐시가 지급돼요. /캐시 명령어로 잔액을 확인할 수 있어요." },
          { step: 4, icon: "🏪", title: "캐시 상점 이용", desc: "캐시 상점에서 다양한 아이템, 등급 업그레이드, 특별 혜택 등을 구매하세요." },
        ].map((s) => (
          <div key={s.step} className="bg-white border border-violet-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
              style={{ background: "#7c3aed20" }}
            >
              {s.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="bg-violet-100 text-violet-600 rounded-full px-1.5 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>{s.step}</span>
                <span className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>{s.title}</span>
              </div>
              <p className="text-slate-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-violet-100 rounded-2xl p-5 shadow-sm">
        <div className="text-slate-700 mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>📋 후원 유의사항</div>
        <ul className="space-y-2">
          {[
            "후원한 금액은 절대 환불이 불가능합니다.",
            "캐시는 인게임 캐시 상점에서만 사용 가능해요.",
            "캐시 거래(유저 간 캐시 교환)는 허용되지만, 서버 시세표 기준을 따라야 해요.",
            "후원 문의는 공식 디스코드 또는 네이버 카페를 통해 해주세요.",
            "이벤트/업데이트에 따라 캐시 상품이 변경될 수 있어요.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-slate-600" style={{ fontSize: "13px" }}>
              <span className="text-violet-400 flex-shrink-0 mt-0.5">▸</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RanksContent() {
  const supportRanks = [
    {
      name: "기본 후원자",
      emoji: "🌟",
      desc: "첫 후원을 완료한 유저",
      perks: ["후원자 칭호", "전용 채팅 색상", "감사 인사"],
      color: "#f59e0b",
    },
    {
      name: "실버 후원자",
      emoji: "🥈",
      desc: "일정 금액 이상 후원한 유저",
      perks: ["실버 칭호", "추가 캐시 보너스", "전용 이모티콘"],
      color: "#94a3b8",
    },
    {
      name: "골드 후원자",
      emoji: "🥇",
      desc: "높은 금액을 후원한 유저",
      perks: ["골드 칭호", "VIP 전용 채널 접근", "추가 혜택"],
      color: "#f59e0b",
    },
    {
      name: "다이아 후원자",
      emoji: "💎",
      desc: "최고 등급 후원자",
      perks: ["다이아 칭호", "특별 VIP 혜택", "전용 아이템", "GM 직통 문의"],
      color: "#60a5fa",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-violet-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          💡 후원 등급 및 혜택은 운영진에 의해 업데이트될 수 있어요. 자세한 정보는 디스코드 공지를 확인하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportRanks.map((r) => (
          <div key={r.name} className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: r.color + "30" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{r.emoji}</span>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: r.color }}>{r.name}</div>
                <div className="text-slate-400" style={{ fontSize: "12px" }}>{r.desc}</div>
              </div>
            </div>
            <ul className="space-y-1">
              {r.perks.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-slate-600" style={{ fontSize: "13px" }}>
                  <span style={{ color: r.color }}>✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function CashContent() {
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-violet-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          📦 캐시(후원) 아이템의 확률은 상품에 따라 다르며, 운영진에 의해 공지됩니다.
          최신 확률 정보는 후원 페이지 또는 디스코드 공지를 확인하세요.
        </p>
      </div>
      <div className="bg-white border border-violet-100 rounded-2xl p-6 shadow-sm text-center">
        <div className="text-4xl mb-3">📦</div>
        <div className="text-slate-700 mb-2" style={{ fontSize: "16px", fontWeight: 700 }}>캐시 아이템 확률 안내</div>
        <p className="text-slate-500 mb-4" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          캐시 아이템별 확률은 서버 업데이트에 따라 변경될 수 있어요.<br />
          구체적인 확률은 후원 페이지 또는 인게임 캐시 상점에서 확인 가능합니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { tier: "일반", color: "#64748b", items: ["기본 아이템 묶음", "소라고동", "일반 소라고동", "뼈다귀 묶음"] },
            { tier: "희귀", color: "#3b82f6", items: ["강화서 묶음", "커스텀 도구 재료", "특수 씨앗", "포션 묶음"] },
            { tier: "전설", color: "#f59e0b", items: ["마법의 소라고동", "천연 토종꿀", "특별 칭호 아이템", "한정판 꾸미기"] },
          ].map((tier) => (
            <div key={tier.tier} className="rounded-2xl p-4" style={{ background: tier.color + "10", border: `1px solid ${tier.color}30` }}>
              <div className="mb-2" style={{ fontSize: "13px", fontWeight: 700, color: tier.color }}>{tier.tier} 등급</div>
              {tier.items.map((item) => (
                <div key={item} className="text-slate-600" style={{ fontSize: "12px" }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackagesContent() {
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-violet-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          🎁 패키지 상품은 기간 한정으로 판매되며, 포함 아이템과 확률은 패키지마다 다를 수 있어요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            name: "신규 유저 스타터 패키지",
            emoji: "🌱",
            desc: "서버를 처음 시작하는 분들을 위한 기본 아이템 패키지",
            items: ["기본 농기구 세트", "씨앗 묶음", "초보자 가이드북", "은행 현금 뭉텅이"],
            color: "#16a34a",
          },
          {
            name: "채광꾼 패키지",
            emoji: "⛏️",
            desc: "채광 특성 유저를 위한 특별 패키지",
            items: ["강화된 곡괭이", "광물창고 확장권", "크리스탈 확률 부스터", "황금 뼛가루 묶음"],
            color: "#6366f1",
          },
          {
            name: "농부의 패키지",
            emoji: "🌽",
            desc: "수확·요리 특성 유저를 위한 패키지",
            items: ["이리듐 물뿌리개", "고급 비료 묶음", "커스텀 씨앗 세트", "스프링쿨러"],
            color: "#f59e0b",
          },
          {
            name: "바다꾼 패키지",
            emoji: "🎣",
            desc: "어부 특성 유저를 위한 낚시 패키지",
            items: ["황금색 낚싯대", "우아한 바다진주 묶음", "수수께끼 구슬", "낚시 미끼 세트"],
            color: "#0284c7",
          },
        ].map((pkg) => (
          <div key={pkg.name} className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: pkg.color + "30" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{pkg.emoji}</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: pkg.color }}>{pkg.name}</div>
                <div className="text-slate-400" style={{ fontSize: "12px" }}>{pkg.desc}</div>
              </div>
            </div>
            <div className="space-y-1">
              {pkg.items.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-slate-600" style={{ fontSize: "12px" }}>
                  <span style={{ color: pkg.color }}>▸</span> {item}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-50">
              <span className="text-slate-400" style={{ fontSize: "11px" }}>* 실제 패키지 구성 및 확률은 판매 페이지에서 확인하세요</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const contentComponents: Record<string, React.ReactNode> = {
  method: <MethodContent />,
  ranks: <RanksContent />,
  cash: <CashContent />,
  packages: <PackagesContent />,
};

export function SupportPage() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get("tab") ?? "method";
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div style={{ background: "#fffbef", minHeight: "100vh" }}>
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
            {current.emoji} {current.label}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-8 p-3 rounded-2xl" style={{ background: "white", border: "1px solid #e9d5ff" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setParams({ tab: tab.key })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === tab.key
                  ? "bg-violet-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
              style={{ fontSize: "13px", fontWeight: activeTab === tab.key ? 700 : 500 }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div>{contentComponents[activeTab] ?? null}</div>
      </div>
    </div>
  );
}
