import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";
const COLOR = "#ea580c";

const allSkills = [
  { lv: 1, name: "빠른 성장 Ⅰ", type: "패시브", desc: "요리 시 경험치 30% 추가 획득", cost: "1,000,000원" },
  { lv: 10, name: "더블 쿠킹 Ⅰ", type: "패시브", desc: "요리 시 4% 확률로 완성품 1+1 제작", cost: "3,000,000원" },
  { lv: 20, name: "최고의 요리사 Ⅰ", type: "패시브", desc: "왕실납품에 납품 가능한 아이템 개수 10개 추가", cost: "5,000,000원" },
  { lv: 40, name: "최종평가 Ⅰ", type: "패시브", desc: "요리 시 0.5% 확률로 별점 지급", cost: "7,000,000원" },
  { lv: 60, name: "자동수리 Ⅰ", type: "패시브", desc: "요리 시 10% 확률로 요리도구 자동 수리", cost: "10,000,000원" },
];

const cookingTools = [
  { name: "도마", icon: "🔪", material: "식칼 필요", examples: ["자른당근", "김치", "수박주스"] },
  { name: "프라이팬", icon: "🍳", material: "가스레인지 + 뒤집개", examples: ["타코", "애플파이", "오믈렛", "또띠아"] },
  { name: "냄비", icon: "🍲", material: "물병 + 뒤집개", examples: ["라면", "육개장", "시리얼", "미역국"] },
  { name: "튀김기", icon: "🍟", material: "오일 + 뒤집개", examples: ["튀김류"] },
];

const INITIAL_SHOW = 5;

function SkillCard({ skill, color }: { skill: typeof allSkills[0]; color: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border-2 bg-white" style={{ borderColor: color + "30" }}>
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span className="rounded-xl px-2 py-1 text-white" style={{ background: color, fontSize: "11px", fontWeight: 800 }}>
          LV.{skill.lv}
        </span>
        <span
          className="rounded-full px-1.5 py-0.5"
          style={{
            background: skill.type === "액티브" ? "#fef3c7" : "#fff7ed",
            color: skill.type === "액티브" ? "#92400e" : "#9a3412",
            fontSize: "9px",
            fontWeight: 700,
          }}
        >
          {skill.type}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b" }}>{skill.name}</div>
        <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5, marginTop: "3px" }}>{skill.desc}</p>
        <div className="mt-1.5 inline-block rounded-lg px-2 py-0.5" style={{ background: "#fef9c3", color: "#854d0e", fontSize: "11px", fontWeight: 700 }}>
          💰 {skill.cost}
        </div>
      </div>
    </div>
  );
}

export function CookingTraitPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? allSkills : allSkills.slice(0, INITIAL_SHOW);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-3" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-amber-800">홈</Link>
            <span>›</span>
            <Link to="/content" className="hover:text-amber-800">콘텐츠</Link>
            <span>›</span>
            <Link to="/content/traits" className="hover:text-amber-800">특성 안내</Link>
            <span>›</span>
            <span className="text-slate-600">🍳 요리</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <Link
              to="/content/traits"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              <ArrowLeft className="w-4 h-4" />
              특성 목록
            </Link>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>🍳 요리 특성</h1>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border-2 p-5" style={{ background: "#fff7ed", borderColor: "#fdba74" }}>
          <p style={{ fontSize: "14px", color: "#7c2d12", lineHeight: 1.8, fontWeight: 600 }}>
            커스텀 작물과 바닐라 작물을 사용하여 요리를 만드는 직업이에요.
            레시피 순서를 반드시 지켜야 해요! 순서를 틀리면 <strong>썩은 음식</strong>이 나와요 🚫
          </p>
        </div>

        {/* Cooking Tools */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">🔧</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>요리 도구 & 예시 메뉴</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cookingTools.map((tool) => (
              <div key={tool.name} className="p-4 rounded-xl border-2 border-orange-100 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{tool.icon}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#9a3412" }}>{tool.name}</div>
                    <div style={{ fontSize: "11px", color: "#c2410c", fontWeight: 600 }}>{tool.material}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tool.examples.map((ex) => (
                    <span key={ex} className="rounded-lg px-2 py-0.5" style={{ background: "#fed7aa", color: "#7c2d12", fontSize: "11px", fontWeight: 700 }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>스킬 목록</span>
              <span className="rounded-full px-2 py-0.5" style={{ background: COLOR + "20", color: COLOR, fontSize: "11px", fontWeight: 700 }}>
                총 {allSkills.length}개
              </span>
            </div>
            <span className="rounded-full px-2 py-0.5 bg-slate-100 text-slate-500" style={{ fontSize: "11px", fontWeight: 700 }}>
              🚧 고레벨 스킬 추가 예정
            </span>
          </div>
          <div className="p-5 space-y-3">
            {visibleSkills.map((skill) => (
              <SkillCard key={skill.lv} skill={skill} color={COLOR} />
            ))}
          </div>
          {allSkills.length > INITIAL_SHOW && (
            <div className="px-5 pb-5">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all"
                style={{
                  background: showAll ? "#f8fafc" : COLOR + "15",
                  borderColor: showAll ? "#e2e8f0" : COLOR + "50",
                  color: showAll ? "#64748b" : COLOR,
                  fontSize: "14px",
                  fontWeight: 800,
                }}
              >
                {showAll ? <><ChevronUp className="w-4 h-4" /> 접기</> : <><ChevronDown className="w-4 h-4" /> 더보기</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
