import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronDown, ChevronUp, X } from "lucide-react";

const BG = "#fff8dc";
const COLOR = "#6366f1";
const LIGHT_BG = "#f5f3ff";
const BORDER = "#c4b5fd";

const allSkills = [
  {
    lv: 1,
    name: "채광신의 축복 Ⅰ",
    type: "패시브",
    desc: "채광 시 경험치 3% 추가 획득 (돌과 조약돌에는 작동하지 않음)",
    cost: "1,000,000원",
  },
  {
    lv: 10,
    name: "크리스탈 Ⅰ",
    type: "패시브",
    desc: "채광 시 0.02% 확률로 크리스탈 추가 드롭. 행운에 따라 확률 상승, 시간당 수량 제한.",
    cost: "3,000,000원",
  },
  {
    lv: 20,
    name: "다이아 광부 [액티브] Ⅰ",
    type: "액티브",
    desc: "채광 시 0.1% 확률로 스킬 발동 (스킬 발동 시 다이아 생성 확률 증가). 쿨타임: 30분 / 발동시간: 30초",
    cost: "5,000,000원",
  },
  {
    lv: 40,
    name: "광물 수집가 Ⅰ",
    type: "패시브",
    desc: "광물 판매 시 판매금의 10% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "7,000,000원",
  },
  {
    lv: 60,
    name: "골드 & 아이언 Ⅰ",
    type: "패시브",
    desc: "철과 금 채광 시 1% 확률로 1+1 드롭",
    cost: "10,000,000원",
  },
  {
    lv: 80,
    name: "채광신의 축복 Ⅱ",
    type: "패시브",
    desc: "채광 시 경험치 6% 추가 획득 (돌과 조약돌에는 작동하지 않음)",
    cost: "15,000,000원",
  },
  {
    lv: 100,
    name: "크리스탈 Ⅱ",
    type: "패시브",
    desc: "채광 시 0.04% 확률로 크리스탈 추가 드롭. 행운에 따라 확률 상승, 시간당 수량 제한.",
    cost: "20,000,000원",
  },
  {
    lv: 110,
    name: "에메랄드 광부 [액티브] Ⅰ",
    type: "액티브",
    desc: "채광 시 0.1% 확률로 스킬 발동 (스킬 발동 시 에메랄드 생성 확률 증가). 쿨타임: 30분 / 발동시간: 30초 / 다른 액티브 스킬과 별도로 작동함",
    cost: "30,000,000원",
  },
  {
    lv: 120,
    name: "광물 수집가 Ⅱ",
    type: "패시브",
    desc: "광물 판매 시 판매금의 20% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "50,000,000원",
  },
  {
    lv: 130,
    name: "골드 & 아이언 Ⅱ",
    type: "패시브",
    desc: "철과 금 채광 시 1.7% 확률로 1+1 드롭",
    cost: "70,000,000원",
  },
  {
    lv: 140,
    name: "채광신의 축복 Ⅲ",
    type: "패시브",
    desc: "채광 시 경험치 8% 추가 획득 (돌과 조약돌에는 작동하지 않음)",
    cost: "100,000,000원",
  },
  {
    lv: 150,
    name: "크리스탈 Ⅲ",
    type: "패시브",
    desc: "채광 시 0.06% 확률로 크리스탈 추가 드롭. 행운에 따라 확률 상승, 시간당 수량 제한.",
    cost: "130,000,000원",
  },
  {
    lv: 160,
    name: "글로벌 광부 [액티브] Ⅰ",
    type: "액티브",
    desc: "채광 시 0.2% 확률로 스킬 발동 (스킬 발동 시 다이아, 에메랄드 생성 확률 증가). 쿨타임: 30분 / 발동시간: 30초 / 다른 액티브 스킬과 별도로 작동함",
    cost: "170,000,000원",
  },
  {
    lv: 170,
    name: "광물 수집가 Ⅲ",
    type: "패시브",
    desc: "광물 판매 시 판매금의 25% 추가 획득 (일반 상점에서만 효과 적용)",
    cost: "200,000,000원",
  },
  {
    lv: 180,
    name: "골드 & 아이언 Ⅲ",
    type: "패시브",
    desc: "철과 금 채광 시 2% 확률로 1+1 드롭",
    cost: "230,000,000원",
  },
  {
    lv: 190,
    name: "채광신의 축복 Ⅳ",
    type: "패시브",
    desc: "채광 시 경험치 9% 추가 획득 (돌과 조약돌에는 작동하지 않음)",
    cost: "250,000,000원",
  },
  {
    lv: 200,
    name: "크리스탈 Ⅳ",
    type: "패시브",
    desc: "채광 시 0.1% 확률로 크리스탈 추가 드롭. 행운에 따라 확률 상승, 시간당 수량 제한.",
    cost: "300,000,000원",
  },
  {
    lv: 210,
    name: "글로벌 광부 [액티브] Ⅱ",
    type: "액티브",
    desc: "다이아, 에메랄드 생성 확률 증가. 쿨타임: 30분 / 발동시간: 30초 / 다른 액티브 스킬과 별도로 작동함",
    cost: "330,000,000원",
  },
];

const INITIAL_SHOW = 5;

type ModalType = "transform" | "generator" | null;

const modalContent: Record<
  NonNullable<ModalType>,
  { title: string; content: React.ReactNode }
> = {
  transform: {
    title: "🔄 광물 변환 안내",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-indigo-50 border-2 border-indigo-200">
          <div className="flex items-start gap-2 mb-2">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white flex-shrink-0">
              Q
            </span>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#3730a3" }}>
              광물변환은 어떤 기능인가요?
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-amber-500 text-white flex-shrink-0">
              A
            </span>
            <p style={{ fontSize: "13px", color: "#4338ca", lineHeight: 1.7 }}>
              광물변환 활성화 시 광물들이 드랍되지 않는 대신,{" "}
              <strong>크리스탈 확률이 상승</strong>합니다.
              <br />
              태양열의 경우, 태양열 효과가 강화된 비율만큼 크리스탈 확률이
              증가합니다.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-2 mb-2">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white flex-shrink-0">
              Q
            </span>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#92400e" }}>
              광물변환 활성화를 했는데 광물이 나와요.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-amber-500 text-white flex-shrink-0">
              A
            </span>
            <p style={{ fontSize: "13px", color: "#b45309", lineHeight: 1.7 }}>
              특성 효과로 인해 드랍되는 광물입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  generator: {
    title: "⛏️ 광물 창고 사용법",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7 }}>
            📦 광물 창고는 총 <strong>5만 개</strong>까지만 보관됩니다.
          </p>
          <p
            className="mt-2"
            style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7 }}
          >
            🐚 <strong>소라고동</strong> 아이템을 활용하면 광물창고를 늘릴 수
            있어요.
          </p>
        </div>
        <div className="rounded-xl border-2 border-indigo-200 overflow-hidden">
          <div className="px-4 py-2 bg-indigo-50">
            <span
              style={{ fontSize: "12px", fontWeight: 800, color: "#4338ca" }}
            >
              🖱️ 마우스 조작법
            </span>
          </div>
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                key: "좌클릭",
                action: "한 개의 아이템 빼기",
                color: "#6366f1",
              },
              {
                key: "우클릭",
                action: "한 세트 아이템 빼기",
                color: "#8b5cf6",
              },
              {
                key: "쉬프트 + 좌클릭",
                action: "모든 아이템 빼기",
                color: "#7c3aed",
              },
              {
                key: "쉬프트 + 우클릭",
                action: "모든 아이템 집어넣기",
                color: "#6d28d9",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50"
              >
                <code
                  className="rounded px-2 py-0.5 text-white"
                  style={{
                    background: item.color,
                    fontSize: "10px",
                    fontWeight: 800,
                  }}
                >
                  {item.key}
                </code>
                <span style={{ fontSize: "12px", color: "#374151" }}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (!type) return null;
  const { title, content } = modalContent[type];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border-2 border-amber-200 w-full shadow-2xl"
        style={{ maxWidth: "480px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-amber-100">
          <span style={{ fontSize: "16px", fontWeight: 900, color: "#78350f" }}>
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-colors"
          >
            <X className="w-4 h-4 text-amber-600" />
          </button>
        </div>
        {/* Body */}
        <div className="p-5">{content}</div>
      </div>
    </div>
  );
}

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

export function MiningTraitPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const visibleSkills = showAll ? allSkills : allSkills.slice(0, INITIAL_SHOW);

  const tips = [
    {
      icon: "⛏️",
      title: "광물 생성기 만드는 법",
      desc: "광물 창고 사용법 및 조작법 확인",
      clickable: true,
      modal: "generator" as ModalType,
    },
    {
      icon: "🔒",
      title: "잠광 돌리는 법",
      desc: "좌클릭을 누른 상태에서 F3+T를 활용하는 방법이 있습니다.",
      clickable: false,
      modal: null as ModalType,
    },
    {
      icon: "🔄",
      title: "광물 변환",
      desc: "클릭하여 광물변환 기능 자세히 보기",
      clickable: true,
      modal: "transform" as ModalType,
    },
  ];

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Modal type={activeModal} onClose={() => setActiveModal(null)} />

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
            <span className="text-slate-600">⛏️ 채광</span>
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
              ⛏️ 채광 특성
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
              color: "#3730a3",
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            섬에서 광물을 주로 캐는 직업이에요. 광물을 캐서 스킬 레벨도 올리고
            광물 블럭을 판매하여 수익을 창출해 보세요!
          </p>
          <p
            className="mt-2"
            style={{
              fontSize: "13px",
              color: "#4338ca",
              lineHeight: 1.6,
              fontWeight: 600,
            }}
          >
            🪨 <strong>참나무 울타리</strong>가 기본 광물 생성기입니다.
          </p>
        </div>

        {/* Tips */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">📌</span>
            <span
              style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}
            >
              핵심 정보 & 팁
            </span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tips.map((tip) =>
              tip.clickable ? (
                <button
                  key={tip.title}
                  onClick={() => setActiveModal(tip.modal)}
                  className="p-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-left hover:bg-indigo-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{tip.icon}</span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#4338ca",
                      }}
                    >
                      {tip.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6366f1",
                      lineHeight: 1.5,
                    }}
                  >
                    {tip.desc}
                  </p>
                  <div
                    className="mt-2 rounded-full px-2 py-0.5 inline-block"
                    style={{
                      background: "#e0e7ff",
                      color: "#4338ca",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    클릭하여 보기 →
                  </div>
                </button>
              ) : (
                <div
                  key={tip.title}
                  className="p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{tip.icon}</span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#4338ca",
                      }}
                    >
                      {tip.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#4c4889",
                      lineHeight: 1.5,
                    }}
                  >
                    {tip.desc}
                  </p>
                </div>
              ),
            )}
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
