import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";
const COLOR = "#92400e";

const allSkills = [
  {
    lv: 1,
    name: "나무신의 축복 Ⅰ",
    type: "패시브",
    desc: "벌목 시 경험치 4% 추가 획득",
    cost: "1,000,000원",
  },
  {
    lv: 10,
    name: "정령의 기운 Ⅰ",
    type: "패시브",
    desc: "벌목 시 정령 0.08% 확률 획득",
    cost: "3,000,000원",
  },
  {
    lv: 20,
    name: "일확천목 [액티브] Ⅰ",
    type: "액티브",
    desc: "벌목 시 찹트리 확률 10%로 상승",
    cost: "5,000,000원",
  },
  {
    lv: 40,
    name: "나무꾼과 선녀 Ⅰ",
    type: "패시브",
    desc: "나무 판매 시 판매금의 10% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "7,000,000원",
  },
  {
    lv: 60,
    name: "도토리 Ⅰ",
    type: "패시브",
    desc: "벌목 시 도토리 획득 확률 0.5% 증가",
    cost: "10,000,000원",
  },
  {
    lv: 80,
    name: "나무신의 축복 Ⅱ",
    type: "패시브",
    desc: "벌목 시 경험치 7.5% 추가 획득",
    cost: "15,000,000원",
  },
  {
    lv: 100,
    name: "정령의 기운 Ⅱ",
    type: "패시브",
    desc: "벌목 시 정령 0.12% 확률로 획득",
    cost: "20,000,000원",
  },
  {
    lv: 110,
    name: "일확천목 [액티브] Ⅱ",
    type: "액티브",
    desc: "벌목 시 찹트리 확률 20%로 상승",
    cost: "30,000,000원",
  },
  {
    lv: 120,
    name: "나무꾼과 선녀 Ⅱ",
    type: "패시브",
    desc: "나무 판매 시 판매금의 20% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "50,000,000원",
  },
  {
    lv: 130,
    name: "도토리 Ⅱ",
    type: "패시브",
    desc: "벌목 시 도토리 획득 확률 0.8% 증가",
    cost: "70,000,000원",
  },
  {
    lv: 140,
    name: "나무신의 축복 Ⅲ",
    type: "패시브",
    desc: "벌목 시 경험치 9% 추가 획득",
    cost: "100,000,000원",
  },
  {
    lv: 150,
    name: "정령의 기운 Ⅲ",
    type: "패시브",
    desc: "벌목 시 정령 0.3% 확률로 획득",
    cost: "130,000,000원",
  },
  {
    lv: 160,
    name: "일확천목 [액티브] Ⅲ",
    type: "액티브",
    desc: "벌목 시 찹트리 확률이 25%로 상승",
    cost: "170,000,000원",
  },
  {
    lv: 170,
    name: "나무꾼과 선녀 Ⅲ",
    type: "패시브",
    desc: "나무 판매 시 판매금의 30% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "200,000,000원",
  },
  {
    lv: 180,
    name: "도토리 Ⅲ",
    type: "패시브",
    desc: "벌목 시 도토리 획득 확률 1.5% 증가",
    cost: "230,000,000원",
  },
  {
    lv: 190,
    name: "나무신의 축복 Ⅳ",
    type: "패시브",
    desc: "벌목 시 경험치 12% 추가 획득",
    cost: "250,000,000원",
  },
  {
    lv: 200,
    name: "정령의 기운 Ⅳ",
    type: "패시브",
    desc: "벌목 시 정령 0.5% 확률로 획득",
    cost: "300,000,000원",
  },
  {
    lv: 210,
    name: "일확천목 [액티브] Ⅳ",
    type: "액티브",
    desc: "벌목 시 찹트리 확률이 30%로 상승",
    cost: "330,000,000원",
  },
];

const INITIAL_SHOW = 5;

function SkillCard({
  skill,
  color,
}: {
  skill: (typeof allSkills)[0];
  color: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl border-2 bg-white"
      style={{ borderColor: color + "30" }}
    >
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span
          className="rounded-xl px-2 py-1 text-white"
          style={{ background: color, fontSize: "11px", fontWeight: 800 }}
        >
          LV.{skill.lv}
        </span>
        <span
          className="rounded-full px-1.5 py-0.5"
          style={{
            background: skill.type === "액티브" ? "#fef3c7" : "#fdf2eb",
            color: skill.type === "액티브" ? "#92400e" : "#78350f",
            fontSize: "9px",
            fontWeight: 700,
          }}
        >
          {skill.type}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: "13px", fontWeight: 800, color: "#1e293b" }}>
          {skill.name}
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#64748b",
            lineHeight: 1.5,
            marginTop: "3px",
          }}
        >
          {skill.desc}
        </p>
        <div
          className="mt-1.5 inline-block rounded-lg px-2 py-0.5"
          style={{
            background: "#fef9c3",
            color: "#854d0e",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          💰 {skill.cost}
        </div>
      </div>
    </div>
  );
}

export function LoggingTraitPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? allSkills : allSkills.slice(0, INITIAL_SHOW);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Breadcrumb */}
        <div>
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
            <Link to="/content/traits" className="hover:text-amber-800">
              특성 안내
            </Link>
            <span>›</span>
            <span className="text-slate-600">🪓 벌목</span>
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
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>
              🪓 벌목 특성
            </h1>
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-2xl border-2 p-5"
          style={{ background: "#fffbeb", borderColor: "#fcd34d" }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#78350f",
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            나무를 주로 캐는 직업이에요. 섬에 자신만의 벌목장을 만들고, 나무를
            캐서 특성 레벨을 올릴 수 있어요.
            참나무·가문비·자작·정글·아카시아·짙은 참나무 원목에서 XP 4씩
            상승합니다!
          </p>
        </div>

        {/* Tips */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">📌</span>
            <span
              style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}
            >
              핵심 팁
            </span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🏕️", text: "벌목장을 섬에 직접 만들어요!" },
              {
                icon: "🌳",
                text: "찹트리 활성화 시 나무 전체가 한 번에 제거됩니다.",
              },
              {
                icon: "🌰",
                text: "도토리 드롭으로 추가 수익을 얻을 수 있어요!",
              },
              {
                icon: "💰",
                text: "나무 판매 시 일반 상점에서 판매금 보너스가 적용됩니다.",
              },
            ].map((tip) => (
              <div
                key={tip.text}
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100"
              >
                <span className="text-lg flex-shrink-0">{tip.icon}</span>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#78350f",
                    lineHeight: 1.5,
                    fontWeight: 600,
                  }}
                >
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}
              >
                스킬 목록
              </span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  background: COLOR + "20",
                  color: COLOR,
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                총 {allSkills.length}개
              </span>
            </div>
            <span
              style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}
            >
              {showAll ? "전체 표시 중" : `${INITIAL_SHOW}개 표시 중`}
            </span>
          </div>
          <div className="p-5 space-y-3">
            {visibleSkills.map((skill) => (
              <SkillCard key={skill.lv} skill={skill} color={COLOR} />
            ))}
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all duration-200 hover:shadow-md"
              style={{
                background: showAll ? "#f8fafc" : COLOR + "15",
                borderColor: showAll ? "#e2e8f0" : COLOR + "50",
                color: showAll ? "#64748b" : COLOR,
                fontSize: "14px",
                fontWeight: 800,
              }}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" /> 접기
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> 더보기 (
                  {allSkills.length - INITIAL_SHOW}개 더 보기)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
