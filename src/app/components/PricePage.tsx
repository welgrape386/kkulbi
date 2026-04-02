import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function PricePage() {
  const treasureFish = [
    { name: "검정가자미", price: "50만원", tier: 1 },
    { name: "은갈치", price: "75만원", tier: 1 },
    { name: "뚱이", price: "75만원", tier: 1 },
    { name: "푸른바다거북", price: "100만원", tier: 2 },
    { name: "보름달물해파리", price: "120만원", tier: 2 },
    { name: "비단잉어", price: "150만원", tier: 2 },
    { name: "블루랍스타", price: "200만원", tier: 2 },
    { name: "우무문어", price: "200만원", tier: 2 },
    { name: "블로브피쉬", price: "250만원", tier: 3 },
    { name: "바다악어", price: "300만원", tier: 3 },
    { name: "미갈루", price: "400만원", tier: 3 },
    { name: "분홍돌고래", price: "500만원", tier: 3 },
    { name: "백상아리", price: "600만원", tier: 4 },
    { name: "만타가오리", price: "800만원", tier: 4 },
    { name: "고래상어", price: "1,000만원", tier: 4 },
  ];

  const tierInfo: Record<number, { label: string; bg: string; border: string; text: string; icon: string }> = {
    1: { label: "일반", bg: "#f8fafc", border: "#e2e8f0", text: "#64748b", icon: "🐟" },
    2: { label: "희귀", bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb", icon: "🐠" },
    3: { label: "전설", bg: "#fffbeb", border: "#fde68a", text: "#b45309", icon: "🐡" },
    4: { label: "신화", bg: "#fff1f2", border: "#fecdd3", text: "#e11d48", icon: "🦈" },
  };

  const rodUpgrades = [
    { from: "일반인의 낚싯대", to: "자연의 낚싯대", pearl: "10개" },
    { from: "자연의 낚싯대", to: "은색 낚싯대", pearl: "30개" },
    { from: "은색 낚싯대", to: "뼈다귀 낚싯대", pearl: "50개" },
    { from: "뼈다귀 낚싯대", to: "황금색 낚싯대", pearl: "80개" },
    { from: "황금색 낚싯대", to: "마스터 낚싯대", pearl: "120개" },
    { from: "마스터 낚싯대", to: "이리듐 낚싯대", pearl: "150개" },
    { from: "이리듐 낚싯대", to: "우주별 낚싯대", pearl: "200개" },
  ];

  const currencyItems = [
    { name: "자연은 주괴", desc: "가장 기본 화폐 단위", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    { name: "화려한 금 주괴", desc: "중급 화폐", color: "#d97706", bg: "#fffbef", border: "#fde68a" },
    { name: "빛나는 다이아 주괴", desc: "고급 화폐", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
    { name: "화려한 이리듐 주괴", desc: "최상급 화폐", color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff" },
  ];

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 mb-3" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-amber-700">홈</Link>
            <span>›</span>
            <span className="text-slate-600">💰 시세표</span>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Link>
            <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
              💰 시세표
            </h1>
          </div>
          <p className="text-slate-500 mt-1" style={{ fontSize: "13px", fontWeight: 500 }}>
            서버 내 아이템 시세 및 거래 가격 안내입니다.
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-amber-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
            💡 시세는 서버 상황에 따라 변경될 수 있어요. 최신 시세는 게임 내 /시세 명령어나 디스코드를 확인하세요.
          </p>
        </div>

        <div className="space-y-8">
          {/* 화폐 단위 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💎</span>
              <h2 className="text-slate-800" style={{ fontSize: "18px", fontWeight: 800 }}>화폐 종류</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currencyItems.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl p-4 border-2"
                  style={{ background: item.bg, borderColor: item.border }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 800, color: item.color }}>{item.name}</div>
                  <div className="text-slate-500 mt-1" style={{ fontSize: "11px" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 보물 물고기 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎣</span>
              <h2 className="text-slate-800" style={{ fontSize: "18px", fontWeight: 800 }}>보물 물고기 판매가</h2>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
              {[1, 2, 3, 4].map((tier) => {
                const fish = treasureFish.filter((f) => f.tier === tier);
                const info = tierInfo[tier];
                return (
                  <div key={tier} className="border-b border-slate-50 last:border-0">
                    <div
                      className="px-5 py-2.5 flex items-center gap-2"
                      style={{ background: info.bg, borderBottom: `1px solid ${info.border}` }}
                    >
                      <span>{info.icon}</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: info.text }}>{info.label} 등급</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: info.border }}>
                      {fish.map((f) => (
                        <div key={f.name} className="bg-white px-4 py-3 flex items-center justify-between">
                          <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 600 }}>🐟 {f.name}</span>
                          <span style={{ fontSize: "14px", fontWeight: 800, color: info.text }}>{f.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 낚싯대 강화 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🪝</span>
              <h2 className="text-slate-800" style={{ fontSize: "18px", fontWeight: 800 }}>낚싯대 강화 재료</h2>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-50">
                {rodUpgrades.map((r, idx) => (
                  <div key={r.to} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#eff6ff", color: "#2563eb", fontSize: "11px", fontWeight: 800 }}
                    >
                      {idx + 1}강
                    </div>
                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                      <span className="text-slate-400" style={{ fontSize: "12px" }}>{r.from}</span>
                      <span className="text-amber-400" style={{ fontSize: "14px" }}>→</span>
                      <span className="text-slate-700" style={{ fontSize: "13px", fontWeight: 700 }}>{r.to}</span>
                    </div>
                    <span
                      className="flex-shrink-0 rounded-xl px-2.5 py-1"
                      style={{ background: "#eff6ff", color: "#2563eb", fontSize: "11px", fontWeight: 700 }}
                    >
                      🔮 우아한 바다진주 {r.pearl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 캐시 시세 안내 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💳</span>
              <h2 className="text-slate-800" style={{ fontSize: "18px", fontWeight: 800 }}>캐시 거래 시세</h2>
            </div>
            <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm">
              <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4 mb-4">
                <p className="text-violet-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  ⚠️ 캐시 거래는 서버 공식 시세표를 반드시 따라야 해요. 시세 파괴 시 제재를 받을 수 있습니다.<br />
                  정확한 캐시 시세는 디스코드 공지 또는 서버 내 시세표를 확인하세요.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { tier: "소액 후원", range: "1,000 ~ 10,000원", icon: "🪙", color: "#64748b", bg: "#f8fafc" },
                  { tier: "중액 후원", range: "10,000 ~ 50,000원", icon: "💰", color: "#d97706", bg: "#fffbef" },
                  { tier: "고액 후원", range: "50,000원 이상", icon: "💎", color: "#7c3aed", bg: "#faf5ff" },
                ].map((item) => (
                  <div
                    key={item.tier}
                    className="rounded-xl p-3.5 border-2"
                    style={{ background: item.bg, borderColor: item.color }}
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: item.color }}>{item.tier}</div>
                    <div className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>{item.range}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}