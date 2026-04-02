import { useNavigate, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const BG = "#fff8dc";

const traits = [
  {
    key: "mining",
    name: "채광",
    emoji: "⛏️",
    desc: "광물을 캐서 스킬 레벨을 올리고 수익을 창출하는 직업",
    color: "#6366f1",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    available: true,
  },
  {
    key: "harvest",
    name: "수확",
    emoji: "🌽",
    desc: "작물을 수확하고 커스텀 농사로 수익을 창출하는 직업",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    available: true,
  },
  {
    key: "logging",
    name: "벌목",
    emoji: "🪓",
    desc: "나무를 채취하고 찹트리로 빠르게 수익을 창출하는 직업",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    available: true,
  },
  {
    key: "fishing",
    name: "어부",
    emoji: "🎣",
    desc: "낚시터에서 물고기를 낚아 판매하는 직업",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#7dd3fc",
    available: true,
  },
  {
    key: "cooking",
    name: "요리",
    emoji: "🍳",
    desc: "커스텀·바닐라 작물로 요리를 만들어 납품하는 직업",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fdba74",
    available: true,
  },
  {
    key: "gathering",
    name: "채집",
    emoji: "🌿",
    desc: "다양한 재료를 채집하여 활용하는 직업",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#6ee7b7",
    available: false,
  },
  {
    key: "adventure",
    name: "모험",
    emoji: "⚔️",
    desc: "던전과 필드를 탐험하며 전투하는 직업",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    available: false,
  },
];

export function TraitsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-amber-600 mb-3"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-800">
              홈
            </Link>
            <span>›</span>
            <Link to="/content" className="hover:text-amber-800">
              콘텐츠
            </Link>
            <span>›</span>
            <span className="text-slate-600">🔮 특성 안내</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <Link
              to="/content"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Link>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>
              🔮 특성 안내
            </h1>
          </div>
          <p style={{ fontSize: "14px", color: "#78716c", fontWeight: 600 }}>
            원하는 특성 카드를 클릭하면 해당 특성의 자세한 스킬과 팁을 확인할 수
            있어요!
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-6 p-4 rounded-2xl border-2 border-amber-200 bg-amber-50">
          <p
            style={{
              fontSize: "13px",
              color: "#92400e",
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            💡 2차 특성은 <strong>수집가 도감 완료</strong>를 통해 확장할 수
            있습니다. 채집·모험 특성은 아직 출시 전입니다.
          </p>
        </div>

        {/* Trait cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {traits.map((trait) => (
            <button
              key={trait.key}
              onClick={() =>
                trait.available && navigate(`/content/traits/${trait.key}`)
              }
              disabled={!trait.available}
              className={`group relative rounded-2xl border-2 p-5 flex flex-col items-center text-center transition-all duration-200 ${
                trait.available
                  ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  : "cursor-not-allowed opacity-60"
              }`}
              style={{
                background: trait.bg,
                borderColor: trait.border,
              }}
            >
              {!trait.available && (
                <div
                  className="absolute top-2 right-2 rounded-full px-2 py-0.5"
                  style={{
                    background: "#e2e8f0",
                    color: "#64748b",
                    fontSize: "10px",
                    fontWeight: 800,
                  }}
                >
                  출시 예정
                </div>
              )}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {trait.emoji}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: trait.color,
                }}
              >
                {trait.name}
              </div>
              <p
                className="mt-1.5"
                style={{ fontSize: "11px", color: "#78716c", lineHeight: 1.5 }}
              >
                {trait.desc}
              </p>
              {trait.available && (
                <div
                  className="mt-3 rounded-full px-3 py-1"
                  style={{
                    background: trait.color + "20",
                    color: trait.color,
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  자세히 보기 →
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
