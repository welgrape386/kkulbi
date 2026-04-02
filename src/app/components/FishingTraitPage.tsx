import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";
const COLOR = "#0284c7";

const allSkills = [
  { lv: 1, name: "물고기 신의 축복 Ⅰ", type: "패시브", desc: "낚시 시 경험치 20% 추가 획득", cost: "1,000,000원" },
  { lv: 10, name: "월척 Ⅰ", type: "패시브", desc: "낚시 시 0.5% 확률로 보물 물고기 획득", cost: "3,000,000원" },
  { lv: 20, name: "해적 Ⅰ", type: "패시브", desc: "낚시 시 진주 획득 확률 0.5% 증가", cost: "5,000,000원" },
  { lv: 40, name: "수산시장 Ⅰ", type: "패시브", desc: "물고기 판매 시 판매금의 10% 추가 획득 (일반 상점에서만 효과 적용)", cost: "7,000,000원" },
  { lv: 60, name: "성장된 물고기 Ⅰ", type: "패시브", desc: "물고기 등급업 확률 7% 증가", cost: "10,000,000원" },
  { lv: 80, name: "물고기 신의 축복 Ⅱ", type: "패시브", desc: "낚시 시 경험치 40% 추가 획득", cost: "15,000,000원" },
  { lv: 100, name: "월척 Ⅱ", type: "패시브", desc: "낚시 시 1% 확률로 보물 물고기 획득", cost: "20,000,000원" },
  { lv: 110, name: "해적 Ⅱ", type: "패시브", desc: "낚시 시 진주 획득 확률이 1% 증가", cost: "30,000,000원" },
  { lv: 120, name: "수산시장 Ⅱ", type: "패시브", desc: "물고기 판매 시 판매금의 20% 추가 획득 (일반 상점에서만 효과 적용)", cost: "50,000,000원" },
  { lv: 130, name: "성장된 물고기 Ⅱ", type: "패시브", desc: "물고기의 등급업 확률 9% 증가", cost: "70,000,000원" },
  { lv: 140, name: "물고기 신의 축복 Ⅲ", type: "패시브", desc: "낚시 시 경험치 50% 추가 획득", cost: "100,000,000원" },
  { lv: 150, name: "월척 Ⅲ", type: "패시브", desc: "낚시 시 1.5% 확률로 보물 물고기 획득", cost: "130,000,000원" },
  { lv: 160, name: "해적 Ⅲ", type: "패시브", desc: "낚시 시 진주 획득 확률이 2% 증가", cost: "170,000,000원" },
  { lv: 170, name: "수산시장 Ⅲ", type: "패시브", desc: "물고기 판매 시 판매금의 30% 추가 획득 (일반 상점에서만 효과 적용)", cost: "200,000,000원" },
  { lv: 180, name: "성장된 물고기 Ⅲ", type: "패시브", desc: "물고기의 등급업 확률 10% 증가", cost: "230,000,000원" },
  { lv: 190, name: "물고기 신의 축복 Ⅳ", type: "패시브", desc: "낚시 시 경험치 55% 추가 획득", cost: "250,000,000원" },
  { lv: 200, name: "월척 Ⅳ", type: "패시브", desc: "낚시 시 3% 확률로 보물 물고기 획득", cost: "300,000,000원" },
  { lv: 210, name: "해적 Ⅳ", type: "패시브", desc: "낚시 시 진주 획득 확률이 5% 증가", cost: "330,000,000원" },
];

const rodUpgrades = [
  { name: "자연의 낚싯대", recipe: "일반인의 낚싯대 1개 & 우아한 바다진주 10개" },
  { name: "은색 낚싯대", recipe: "자연의 낚싯대 1개 & 우아한 바다진주 30개" },
  { name: "뼈다귀 낚싯대", recipe: "은색 낚싯대 1개 & 우아한 바다진주 50개" },
  { name: "황금색 낚싯대", recipe: "뼈다귀 낚싯대 1개 & 우아한 바다진주 80개" },
  { name: "마스터 낚싯대", recipe: "황금색 낚싯대 1개 & 우아한 바다진주 120개" },
  { name: "이리듐 낚싯대", recipe: "마스터 낚싯대 1개 & 우아한 바다진주 150개" },
  { name: "우주별 낚싯대", recipe: "이리듐 낚싯대 1개 & 우아한 바다진주 200개" },
];

const pearls = [
  { name: "해조의 구슬", emoji: "🌿", effect: "우아한 바다 진주 확률 증가", color: "#16a34a" },
  { name: "해류의 구슬", emoji: "🌊", effect: "물고기 등급 업 확률 증가", color: "#0284c7" },
  { name: "해심의 구슬", emoji: "💎", effect: "보물 물고기 확률 증가", color: "#7c3aed" },
];

const customFish = [
  { name: "농어", emoji: "🐟" },
  { name: "개복치", emoji: "🐡" },
  { name: "갯장어", emoji: "🐍" },
  { name: "숭어", emoji: "🐟" },
  { name: "적색통돔", emoji: "🐠" },
  { name: "철갑상어", emoji: "🦈" },
  { name: "공허의 연어", emoji: "🐟" },
  { name: "금붕어", emoji: "🐠" },
  { name: "우드스킵", emoji: "🐟" },
  { name: "메기", emoji: "🐟" },
  { name: "잉어", emoji: "🐟" },
  { name: "정어리", emoji: "🐟" },
  { name: "참치", emoji: "🐟" },
  { name: "해파리", emoji: "🪼" },
  { name: "푸른 해파리", emoji: "🪼" },
  { name: "문어", emoji: "🐙" },
  { name: "방사능 물고기", emoji: "☢️" },
  { name: "레인보우 피쉬", emoji: "🌈" },
];

const treasureFish = [
  { name: "검정가자미", price: "500,000원", emoji: "🐟" },
  { name: "뚱이", price: "750,000원", emoji: "🐡" },
  { name: "은갈치", price: "750,000원", emoji: "🐟" },
  { name: "보름달물해파리", price: "1,200,000원", emoji: "🪼" },
  { name: "푸른바다거북", price: "1,000,000원", emoji: "🐢" },
  { name: "우무문어", price: "2,000,000원", emoji: "🐙" },
  { name: "비단잉어", price: "1,500,000원", emoji: "🐟" },
  { name: "바다악어", price: "3,000,000원", emoji: "🐊" },
  { name: "블루랍스타", price: "2,000,000원", emoji: "🦞" },
  { name: "백상아리", price: "6,000,000원", emoji: "🦈" },
  { name: "블로브피쉬", price: "2,500,000원", emoji: "🐡" },
  { name: "만타가오리", price: "8,000,000원", emoji: "🐟" },
  { name: "미갈루", price: "4,000,000원", emoji: "🐋" },
  { name: "고래상어", price: "10,000,000원", emoji: "🦈" },
  { name: "분홍돌고래", price: "5,000,000원", emoji: "🐬" },
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
            background: skill.type === "액티브" ? "#fef3c7" : "#f0f9ff",
            color: skill.type === "액티브" ? "#92400e" : "#0369a1",
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

export function FishingTraitPage() {
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
            <span className="text-slate-600">🎣 어부</span>
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
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>🎣 어부 특성</h1>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border-2 p-5" style={{ background: "#f0f9ff", borderColor: "#7dd3fc" }}>
          <p style={{ fontSize: "14px", color: "#0c4a6e", lineHeight: 1.8, fontWeight: 600 }}>
            낚시터 또는 섬에서 물고기를 낚고, 낚은 물고기를 NPC에게 팔아 돈을 버는 직업이에요.
          </p>
        </div>

        {/* 낚시 하는 방법 */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">🎣</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>낚시 하는 방법</span>
          </div>
          <div className="p-5 space-y-2">
            {[
              { icon: "1️⃣", text: "입질이 오면 우클릭을 한 번 누른 다음, 미니게임이 뜨면 초록색에 우클릭 해줍니다." },
              { icon: "2️⃣", text: "물고기는 낚시터 근처에 있는 NPC에게 판매할 수 있어요." },
              { icon: "3️⃣", text: "움직이는 속도는 랜덤이고, 움직이는 하얀 선을 기준으로 잡으시면 됩니다." },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-3 p-3 rounded-xl bg-sky-50 border border-sky-100">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <p style={{ fontSize: "13px", color: "#0c4a6e", lineHeight: 1.6, fontWeight: 600 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 미니게임 */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-blue-100 flex items-center gap-2">
            <span className="text-lg">🎮</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#1e40af" }}>미니게임</span>
          </div>
          <div className="p-5 space-y-2">
            {[
              "레이싱 선 위에 보이는 네모 테두리가 빨간 게이지를 넘어서면 실패합니다.",
              "쉬프트 누르기 / 떼기로 컨트롤하여 물고기를 잡아보세요!",
              "위에 뜨는 색에 우클릭을 하면 물고기가 낚입니다.",
              "미니게임 속도는 랜덤입니다.",
              "화면에 뜨는 숫자만큼 정해진 시간 동안 우클릭을 꾹 누르거나 클릭하면 물고기가 낚입니다.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontSize: "10px", fontWeight: 800 }}>
                  {i + 1}
                </span>
                <p style={{ fontSize: "13px", color: "#1e40af", lineHeight: 1.6, fontWeight: 600 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 참고 사항 */}
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⚠️</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>미니게임 전 참고 사항</span>
          </div>
          <div className="space-y-2">
            <p style={{ fontSize: "13px", color: "#78350f", lineHeight: 1.7, fontWeight: 600 }}>
              쉬프트를 5번 누르면 <strong>고정 키</strong> 라는 창이 떠서 방해가 되는데, 끄고 하면 낚시가 편해져요!
            </p>
            <div className="flex items-center gap-2 mt-2 p-3 rounded-xl bg-white border border-amber-200">
              <span className="text-base">💻</span>
              <p style={{ fontSize: "12px", color: "#92400e", fontWeight: 700 }}>
                윈도우 검색창에 <strong>'고정 키'</strong> 검색 → 첫번째 클릭 → 고정키 사용을 <strong>'끔'</strong>으로 변경
              </p>
            </div>
          </div>
        </div>

        {/* 스킬 목록 */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>스킬 목록</span>
              <span className="rounded-full px-2 py-0.5" style={{ background: COLOR + "20", color: COLOR, fontSize: "11px", fontWeight: 700 }}>
                총 {allSkills.length}개
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
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
              {showAll ? <><ChevronUp className="w-4 h-4" /> 접기</> : <><ChevronDown className="w-4 h-4" /> 더보기 ({allSkills.length - INITIAL_SHOW}개 더 보기)</>}
            </button>
          </div>
        </div>

        {/* 낚시대 강화 */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-100 flex items-center gap-2">
            <span className="text-lg">🐟</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#92400e" }}>낚시대 강화</span>
          </div>
          <div className="p-5">
            <p className="mb-4" style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, fontWeight: 600 }}>
              🪸 <strong>우아한 바다진주</strong>를 사용하여 낚시대를 업그레이드 해보세요!
            </p>
            <div className="rounded-2xl border-2 border-sky-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#e0f2fe" }}>
                    <th className="px-4 py-3 text-left" style={{ fontSize: "12px", fontWeight: 800, color: "#0369a1" }}>낚싯대 이름</th>
                    <th className="px-4 py-3 text-left" style={{ fontSize: "12px", fontWeight: 800, color: "#0369a1" }}>필요 재료</th>
                  </tr>
                </thead>
                <tbody>
                  {rodUpgrades.map((rod, i) => (
                    <tr key={rod.name} className="border-t border-sky-100" style={{ background: i % 2 === 0 ? "#fff" : "#f0f9ff" }}>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-white" style={{ background: `hsl(${200 + i * 15}, 70%, ${40 + i * 5}%)`, fontSize: "12px", fontWeight: 800 }}>
                          🎣 {rod.name}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ fontSize: "12px", color: "#374151" }}>{rod.recipe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 수수께끼 구슬 */}
        <div className="rounded-2xl border-2 border-purple-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-purple-100 flex items-center gap-2">
            <span className="text-lg">🔮</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#7c3aed" }}>수수께끼 구슬 강화</span>
          </div>
          <div className="p-5 space-y-4">
            <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, fontWeight: 600 }}>
              수수께끼 구슬로 낚시대를 강화할 수 있어요!
              빈칸에 낚시대를 올리고 <strong>강화하기</strong>를 누르면 됩니다!
            </p>
            <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>
              수수께끼 구슬에서는 <strong>해조, 해류, 해심</strong> 총 3가지 종류의 구슬 중 하나의 구슬이 나옵니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pearls.map((p) => (
                <div key={p.name} className="p-4 rounded-xl border-2 text-center" style={{ borderColor: p.color + "40", background: p.color + "10" }}>
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: p.color }}>{p.name}</div>
                  <p className="mt-1" style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>{p.effect}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-200 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">📈</span>
                <p style={{ fontSize: "13px", color: "#5b21b6", lineHeight: 1.6, fontWeight: 600 }}>
                  강화는 종류별로 총 <strong>7강</strong>까지 있으며, 강화 단계가 높아질수록 강화 확률이 낮아집니다.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">⚠️</span>
                <p style={{ fontSize: "13px", color: "#5b21b6", lineHeight: 1.6, fontWeight: 600 }}>
                  강화 실패 시, 구슬의 효과가 <strong>1단계 하락</strong>됩니다. 단, <strong>1강 이하로는 떨어지지 않습니다.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 커스텀 물고기 */}
        <div className="rounded-2xl border-2 border-teal-200 bg-white">
          <div className="px-5 py-4 border-b-2 border-teal-100 flex items-center gap-2">
            <span className="text-lg">🐟</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#0f766e" }}>커스텀 물고기</span>
            <span className="rounded-full px-2 py-0.5" style={{ background: "#ccfbf1", color: "#0f766e", fontSize: "11px", fontWeight: 700 }}>
              {customFish.length}종
            </span>
          </div>
          <div className="p-5">
            <p className="mb-4" style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, fontWeight: 600 }}>
              🌊 커스텀 물고기의 종류를 알려드릴게요. (각 물고기 이미지 추가 예정)
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {customFish.map((fish) => (
                <div key={fish.name} className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-teal-100 bg-teal-50 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl border border-teal-200">
                    {fish.emoji}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#0f766e" }}>{fish.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 보물 물고기 */}
        <div className="rounded-2xl border-2 border-amber-300 bg-white">
          <div className="px-5 py-4 border-b-2 border-amber-200 flex items-center gap-2">
            <span className="text-lg">💎</span>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "#b45309" }}>보물 물고기</span>
            <span className="rounded-full px-2 py-0.5" style={{ background: "#fef3c7", color: "#b45309", fontSize: "11px", fontWeight: 700 }}>
              {treasureFish.length}종
            </span>
          </div>
          <div className="p-5">
            <p className="mb-4" style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, fontWeight: 600 }}>
              ✨ 보물 물고기는 낚시 시 확률로 획득할 수 있는 희귀 물고기예요. (각 물고기 이미지 추가 예정)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {treasureFish.map((fish) => (
                <div key={fish.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-amber-200 bg-amber-50 text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-3xl border border-amber-200">
                    {fish.emoji}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#92400e" }}>{fish.name}</span>
                  <span className="rounded-full px-2 py-0.5" style={{ background: "#fde68a", color: "#78350f", fontSize: "11px", fontWeight: 800 }}>
                    💰 {fish.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
