import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";
const COLOR = "#16a34a";
const LIGHT_BG = "#f0fdf4";
const BORDER = "#86efac";

const allSkills = [
  {
    lv: 1,
    name: "수확신의 축복 Ⅰ",
    type: "패시브",
    desc: "수확 시 경험치 4% 추가 획득 (사탕수수에는 작동하지 않음)",
    cost: "1,000,000원",
  },
  {
    lv: 10,
    name: "드랍더 농작물 Ⅰ",
    type: "패시브",
    desc: "수확 시 0.2% 확률로 농작물 추가 드롭 (사탕수수에는 작동하지 않음)",
    cost: "3,000,000원",
  },
  {
    lv: 20,
    name: "일확천농 [작물] [액티브] Ⅰ",
    type: "액티브",
    desc: "수확 시 0.1% 확률로 스킬 발동 (스킬 발동 시 농작물 한 세트 드롭). 쿨타임: 3분",
    cost: "5,000,000원",
  },
  {
    lv: 40,
    name: "파브르 Ⅰ",
    type: "패시브",
    desc: "수확 시 지렁이 0.15% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "7,000,000원",
  },
  {
    lv: 60,
    name: "빛나는 확률 Ⅰ",
    type: "패시브",
    desc: "수확 시 산삼 씨앗 0.03% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "10,000,000원",
  },
  {
    lv: 80,
    name: "수확신의 축복 Ⅱ",
    type: "패시브",
    desc: "수확 시 경험치 7.5% 추가 획득 (사탕수수에는 작동하지 않음)",
    cost: "15,000,000원",
  },
  {
    lv: 100,
    name: "드랍더 농작물 Ⅱ",
    type: "패시브",
    desc: "수확 시 0.45% 확률로 농작물 추가 드롭 (사탕수수에는 작동하지 않음)",
    cost: "20,000,000원",
  },
  {
    lv: 110,
    name: "일확천농 [작물] [액티브] Ⅱ",
    type: "액티브",
    desc: "수확 시 0.2% 확률로 스킬 발동 (스킬 발동 시 농작물 한 세트 드롭). 쿨타임: 3분",
    cost: "30,000,000원",
  },
  {
    lv: 120,
    name: "파브르 Ⅱ",
    type: "패시브",
    desc: "수확 시 지렁이 0.25% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "50,000,000원",
  },
  {
    lv: 130,
    name: "빛나는 확률 Ⅱ",
    type: "패시브",
    desc: "수확 시 산삼 씨앗 0.25% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "70,000,000원",
  },
  {
    lv: 140,
    name: "수확신의 축복 Ⅲ",
    type: "패시브",
    desc: "수확 시 경험치 9% 추가 획득 (사탕수수에는 작동하지 않음)",
    cost: "100,000,000원",
  },
  {
    lv: 150,
    name: "드랍더 농작물 Ⅲ",
    type: "패시브",
    desc: "수확 시 0.7% 확률로 농작물 추가 드롭 (사탕수수에는 작동하지 않음)",
    cost: "130,000,000원",
  },
  {
    lv: 160,
    name: "일확천농 [작물] [액티브] Ⅲ",
    type: "액티브",
    desc: "수확 시 0.25% 확률로 스킬 발동 (스킬 발동 시 농작물 한 세트 드롭). 쿨타임: 3분",
    cost: "170,000,000원",
  },
  {
    lv: 170,
    name: "파브르 Ⅲ",
    type: "패시브",
    desc: "수확 시 지렁이 0.3% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "200,000,000원",
  },
  {
    lv: 180,
    name: "빛나는 확률 Ⅲ",
    type: "패시브",
    desc: "수확 시 산삼 씨앗 0.3% 확률로 획득 (모든 작물에서 효과 적용)",
    cost: "230,000,000원",
  },
  {
    lv: 190,
    name: "수확신의 축복 Ⅳ",
    type: "패시브",
    desc: "수확 시 경험치 12% 추가 획득 (사탕수수에는 작동하지 않음)",
    cost: "250,000,000원",
  },
  {
    lv: 200,
    name: "드랍더 농작물 Ⅳ",
    type: "패시브",
    desc: "수확 시 0.8% 확률로 농작물 추가 드롭 (사탕수수에는 작동하지 않음)",
    cost: "300,000,000원",
  },
  {
    lv: 210,
    name: "일확천농 [작물] [액티브] Ⅳ",
    type: "액티브",
    desc: "수확 시 0.5% 확률로 스킬 발동 (스킬 발동 시 농작물 한 세트 드롭). 쿨타임: 3분",
    cost: "330,000,000원",
  },
];

const INITIAL_SHOW = 5;

const customCrops = [
  "토마토",
  "양배추",
  "고추",
  "옥수수",
  "배추",
  "마늘",
  "가지",
  "양파",
  "쌀",
  "고구마",
  "콩",
  "파",
  "파프리카",
  "무",
  "산삼",
];

const sprinklers = [
  { name: "기본 스프링쿨러", range: "3×3" },
  { name: "고급 스프링쿨러", range: "5×5" },
  { name: "최고급 스프링쿨러", range: "7×7" },
];

const fertilizers = [
  {
    name: "기본 비료",
    rates: "1등급 70% / 2등급 20% / 3등급 10%",
    color: "#86efac",
  },
  {
    name: "고급 비료",
    rates: "1등급 55% / 2등급 30% / 3등급 15%",
    color: "#4ade80",
  },
  {
    name: "디럭스 비료",
    rates: "1등급 40% / 2등급 40% / 3등급 20%",
    color: "#16a34a",
  },
];

const wateringCans = [
  { name: "구리 물뿌리개", range: "1×1", color: "#b45309" },
  { name: "철 물뿌리개", range: "1×2", color: "#6b7280" },
  { name: "금 물뿌리개", range: "2×2", color: "#d97706" },
  { name: "이리듐 물뿌리개", range: "3×3", color: "#7c3aed" },
];

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
            background: skill.type === "액티브" ? "#fef3c7" : "#f0fdf4",
            color: skill.type === "액티브" ? "#92400e" : "#166534",
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

export function HarvestTraitPage() {
  const [showAll, setShowAll] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

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
            <span className="text-slate-600">🌽 수확</span>
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
              🌽 수확 특성
            </h1>
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-2xl border-2 p-5"
          style={{ background: LIGHT_BG, borderColor: BORDER }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#14532d",
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            바닐라 작물을 캐거나, 커스텀 작물들을 키워서 돈을 버는 직업이에요!
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-green-100 border border-green-200">
              <p
                style={{ fontSize: "12px", color: "#166534", fontWeight: 700 }}
              >
                🚫 도끼·곡괭이로는 작물을 캘 수 없어요. 작물은{" "}
                <strong>괭이로 캐는 걸</strong> 추천드려요!
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-orange-100 border border-orange-200">
              <p
                style={{ fontSize: "12px", color: "#9a3412", fontWeight: 700 }}
              >
                🎃 <strong>호박, 수박</strong>만 도끼로 캘 수 있어요!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">❓</span>
            <span
              style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}
            >
              자주 묻는 질문
            </span>
          </div>
          <div className="p-5 space-y-3">
            <div className="p-4 rounded-xl border-2 border-green-100 bg-green-50">
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#166534",
                  marginBottom: "6px",
                }}
              >
                Q. 지렁이와 산삼에 관하여
              </div>
              <div
                style={{ fontSize: "13px", color: "#4b7c5e", lineHeight: 1.7 }}
              >
                A. 수확 특성인 유저분들은 <strong>지렁이</strong>와{" "}
                <strong>산삼씨앗</strong>을 더 많이 획득할 수 있어요!
                <br />
                <strong>지렁이</strong>는 <strong>섬세한 손길</strong> 인챈트가
                있을 때만 드랍돼요. 추가로, 지렁이의 경우에는{" "}
                <strong>행운</strong> 수치가 높을수록 확률이 올라가요!
              </div>
            </div>
            <div className="p-4 rounded-xl border-2 border-blue-100 bg-blue-50">
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#1e40af",
                  marginBottom: "6px",
                }}
              >
                Q. 커스텀 농사 경험치 적용 여부
              </div>
              <div
                style={{ fontSize: "13px", color: "#3b5bb5", lineHeight: 1.7 }}
              >
                A. 수확 특성의 경우, 커스텀 작물 수확 시 특성 경험치를 획득할 수
                있습니다. 단, 스킬 추가 경험치는 적용되지 않습니다. 커스텀
                낫으로 수확 가능한 모든 작물에서 경험치가 지급됩니다.
                <br />
                <span
                  style={{
                    fontSize: "11px",
                    color: "#6b82c8",
                    fontWeight: 700,
                  }}
                >
                  추후 커스텀 도구 강화 시스템 업데이트 예정입니다
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 커스텀 농사 */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🐥</span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}
              >
                커스텀 농사 안내
              </span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                농사 기초 · 도구 · 비료 · 작물
              </span>
            </div>
            {showCustom ? (
              <ChevronUp className="w-5 h-5 text-amber-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-amber-600" />
            )}
          </button>

          {showCustom && (
            <div className="border-t-2 border-amber-100 p-5 space-y-5">
              {/* 기초 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🐥</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#16a34a",
                    }}
                  >
                    커스텀 농사의 기초
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { icon: "💡", text: "커스텀 농작물은 빛이 필요없어요!" },
                    {
                      icon: "👤",
                      text: "주변에 플레이어가 있어야 작물이 자라요!",
                    },
                    {
                      icon: "🔄",
                      text: "커스텀 농사 씨앗은 한 번 수확했다면 다시 심어줘야 해요!",
                    },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="p-3 rounded-xl bg-green-50 border-2 border-green-200 flex flex-col items-center justify-center text-center min-h-[80px]"
                    >
                      <span className="text-xl mb-1">{item.icon}</span>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#166534",
                          lineHeight: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 허수아비 */}
              <div className="p-4 rounded-xl border-2 border-yellow-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧸</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#854d0e",
                    }}
                  >
                    허수아비
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#713f12",
                    lineHeight: 1.6,
                  }}
                >
                  커스텀 농사를 할 때, 까마귀가 와서 작물을 먹고 도망가요. 그때
                  허수아비를 설치해놓으면 까마귀를 막을 수 있어요! 허수아비의
                  범위는 <strong>한 청크</strong>입니다.
                </p>
              </div>

              {/* 물뿌리개 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">💧</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#0369a1",
                    }}
                  >
                    물뿌리개
                  </span>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    lineHeight: 1.6,
                  }}
                >
                  커스텀 농작물을 키우기 위해서는 경작지에 물을 뿌려줘야 해요.
                  물뿌리개를 들고 <strong>물에 우클릭</strong>하면 물뿌리개에
                  물을 채울 수 있어요.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {wateringCans.map((w) => (
                    <div
                      key={w.name}
                      className="p-3 rounded-xl text-center border-2"
                      style={{
                        borderColor: w.color + "40",
                        background: w.color + "10",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: w.color,
                        }}
                      >
                        {w.name}
                      </div>
                      <div
                        className="mt-1 rounded-full px-2 py-0.5 inline-block"
                        style={{
                          background: w.color + "20",
                          color: w.color,
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {w.range} 범위
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 스프링쿨러 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌊</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#0284c7",
                    }}
                  >
                    스프링쿨러
                  </span>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    lineHeight: 1.6,
                  }}
                >
                  물뿌리개로 물 주기 힘드시죠? 그럴 땐 스프링쿨러를
                  사용해보세요! 맨손으로 스프링쿨러를 우클릭하면 물이 얼마나
                  채워져 있는지 확인할 수 있어요. 경작지에 물이 없다면,
                  스프링쿨러를 사용하기 전에 물을 한 번씩 줘야 작동합니다.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {sprinklers.map((s) => (
                    <div
                      key={s.name}
                      className="p-3 rounded-xl text-center bg-sky-50 border-2 border-sky-200"
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#0369a1",
                        }}
                      >
                        {s.name}
                      </div>
                      <div
                        className="mt-1 rounded-full px-2 py-0.5 inline-block bg-sky-200"
                        style={{
                          color: "#0369a1",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        작동범위 {s.range}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 비료 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌱</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#15803d",
                    }}
                  >
                    비료
                  </span>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    lineHeight: 1.6,
                  }}
                >
                  비료를 사용하면 높은 등급의 농작물이 나올 확률이 증가합니다.
                  비료는 마인크래프트 시간으로 <strong>28일 (약 9시간)</strong>
                  간 유지됩니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {fertilizers.map((f) => (
                    <div
                      key={f.name}
                      className="p-3 rounded-xl border-2"
                      style={{
                        borderColor: f.color + "60",
                        background: f.color + "15",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 800,
                          color: "#166534",
                        }}
                      >
                        {f.name}
                      </div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#4b7c5e",
                          marginTop: "4px",
                          lineHeight: 1.5,
                        }}
                      >
                        {f.rates}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 커스텀 작물 목록 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🥕</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#15803d",
                    }}
                  >
                    커스텀 작물 종류
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customCrops.map((crop) => (
                    <span
                      key={crop}
                      className="rounded-xl px-3 py-1.5 border-2 border-green-200"
                      style={{
                        background: "#f0fdf4",
                        color: "#15803d",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      🌿 {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
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

          {/* 더보기 / 접기 버튼 */}
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
                  <ChevronUp className="w-4 h-4" />
                  접기
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  더보기 ({allSkills.length - INITIAL_SHOW}개 더 보기)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
