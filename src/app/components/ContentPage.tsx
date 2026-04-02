import { useSearchParams, Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function ContentPage() {
  const [params] = useSearchParams();
  const activeTab = params.get("tab");

  if (!activeTab) {
    return <ContentGrid />;
  }

  return <ContentDetail activeTab={activeTab} />;
}

const tabs = [
  {
    key: "rank",
    label: "랭크",
    emoji: "⭐",
    desc: "등급별 조건, 혜택 및 권한 안내",
    color: "#d97706",
    bg: "#fffbef",
    border: "#fde68a",
  },
  {
    key: "traits",
    label: "특성 안내",
    emoji: "🔮",
    desc: "채광·수확·벌목·어부·요리 직업 특성",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
  },
  {
    key: "shop",
    label: "상점",
    emoji: "🏪",
    desc: "상점 아이템 및 시세 안내",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    key: "island",
    label: "섬",
    emoji: "🏝️",
    desc: "섬 시스템 및 운영 안내",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    key: "enchant",
    label: "주문서 강화",
    emoji: "📜",
    desc: "주문서 강화 확률 및 방법 안내",
    color: "#4f46e5",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
  {
    key: "collection",
    label: "도감",
    emoji: "📖",
    desc: "수집가 도감 완료 방법 안내",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
  },
  {
    key: "altar",
    label: "제단",
    emoji: "🏛️",
    desc: "제단 아이템 제작 및 레시피 안내",
    color: "#78716c",
    bg: "#fafaf9",
    border: "#e7e5e4",
  },
  {
    key: "parkour",
    label: "파쿠르",
    emoji: "🏃",
    desc: "파쿠르 코스 규칙 및 보상 안내",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    key: "blockwars",
    label: "블럭워즈",
    emoji: "⚔️",
    desc: "PVP 블럭워즈 규칙 및 전략",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    key: "marriage",
    label: "결혼",
    emoji: "💒",
    desc: "결혼 시스템 및 혜택 안내",
    color: "#db2777",
    bg: "#fdf2f8",
    border: "#fbcfe8",
  },
  {
    key: "seotda",
    label: "섯다",
    emoji: "🃏",
    desc: "섯다 게임 규칙 안내",
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fef08a",
  },
  {
    key: "painting",
    label: "그림",
    emoji: "🎨",
    desc: "그림 아이템 제작 안내",
    color: "#0284c7",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    key: "donation-king",
    label: "기부왕",
    emoji: "👑",
    desc: "기부왕 시스템 순위 및 보상",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    key: "beekeeping",
    label: "양봉 방법",
    emoji: "🐝",
    desc: "양봉 방법 및 꿀 아이템 안내",
    color: "#d97706",
    bg: "#fef9c3",
    border: "#fde68a",
  },
  {
    key: "royal-supply",
    label: "왕실납품",
    emoji: "🏰",
    desc: "왕실납품 아이템 및 보상 안내",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
  {
    key: "gacha",
    label: "랜덤 뽑기",
    emoji: "🎰",
    desc: "랜덤 뽑기 아이템 및 확률 안내",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  {
    key: "events",
    label: "이벤트 안내",
    emoji: "🎉",
    desc: "일일보상, 마인리스트, 핫타임 이벤트",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
  },
];

// ─── Rank Content ─────────────────────────────────────────────────────────────
function RankContent() {
  const ranks = [
    {
      tier: 1,
      emoji: "🌱",
      req: { money: "500,000원", time: null, mine: "2회" },
      perms: ["/밥"],
    },
    {
      tier: 2,
      emoji: "🌿",
      req: { money: "1,000,000원", time: null, mine: "3회" },
      perms: ["/엔더상자", "/창고 1"],
    },
    {
      tier: 3,
      emoji: "🍃",
      req: { money: "2,000,000원", time: null, mine: "5회" },
      perms: ["/창고 2", "경매장 등록 15개"],
    },
    {
      tier: 4,
      emoji: "🌳",
      req: { money: "10,000,000원", time: null, mine: "6회" },
      perms: ["/창고 3"],
    },
    {
      tier: 5,
      emoji: "⭐",
      req: { money: "40,000,000원", time: "60시간", mine: "8회" },
      perms: ["/조합대", "/수산시장"],
    },
    {
      tier: 6,
      emoji: "🌟",
      req: { money: "70,000,000원", time: "100시간", mine: "10회" },
      perms: ["/자동줍기", "/창고 4", "/캐시 보내기"],
    },
    {
      tier: 7,
      emoji: "💫",
      req: { money: "100,000,000원", time: "180시간", mine: "15회" },
      perms: ["확성기 무료", "추천 시 100캐시 지급"],
    },
    {
      tier: 8,
      emoji: "✨",
      req: { money: "250,000,000원", time: "240시간", mine: "20회" },
      perms: ["추가 권한 업데이트 예정"],
    },
    {
      tier: 9,
      emoji: "🏅",
      req: { money: "500,000,000원", time: "360시간", mine: "30회" },
      perms: ["경매장 세금 면제", "/창고 5", "/액자"],
    },
    {
      tier: 10,
      emoji: "🥇",
      req: { money: "1,000,000,000원", time: "500시간", mine: "40회" },
      perms: ["/자동조합", "/상점열기", "/창고 6"],
    },
    {
      tier: 11,
      emoji: "💎",
      req: { money: "3,000,000,000원", time: "720시간", mine: "50회" },
      perms: ["/제단", "특별 메세지", "무한플라이"],
    },
    {
      tier: 12,
      emoji: "👑",
      req: { money: "5,000,000,000원", time: "720시간", mine: "50회" },
      perms: ["특별 메세지", "커스텀 뱃지", "/암시장확인", "/제단열기"],
    },
    {
      tier: 13,
      emoji: "🔱",
      req: { money: "10,000,000,000원", time: "720시간", mine: "50회" },
      perms: ["/창고 7-8", "추천 시 300캐시"],
    },
    {
      tier: 14,
      emoji: "⚡",
      req: { money: "최고 등급", time: "720시간", mine: "50회" },
      perms: ["/창고 9-10", "/발광"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p
          className="text-amber-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          💡 랭크는 <strong>/랭크상점</strong> 명령어에서도 확인 가능합니다.
          마인리스트 추천은{" "}
          <a
            href="https://minelist.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            minelist.kr
          </a>
          에서 할 수 있어요.
        </p>
      </div>
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: "#fffbef",
                  borderBottom: "2px solid #f5e098",
                }}
              >
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  등급
                </th>
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  재화 조건
                </th>
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  플레이타임
                </th>
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  마인리스트
                </th>
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  지급 권한
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ranks.map((r) => (
                <tr
                  key={r.tier}
                  className="hover:bg-amber-50/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{r.emoji}</span>
                      <span
                        className="text-slate-700"
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      >
                        {r.tier}등급
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600"
                    style={{ fontSize: "13px" }}
                  >
                    {r.req.money}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-500"
                    style={{ fontSize: "13px" }}
                  >
                    {r.req.time ?? "-"}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-500"
                    style={{ fontSize: "13px" }}
                  >
                    {r.req.mine}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.perms.map((p) => (
                        <span
                          key={p}
                          className="bg-amber-100 text-amber-700 rounded-lg px-2 py-0.5"
                          style={{ fontSize: "11px", fontWeight: 600 }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Traits Content ───────────────────────────────────────────────────────────
function TraitsContent() {
  const traits = [
    {
      name: "채광",
      emoji: "⛏️",
      color: "#6366f1",
      desc: "섬에서 광물을 주로 캐는 직업이에요. 광물을 캐서 스킬 레벨도 올리고 광물 블럭을 판매하여 수익을 창출해 보세요! 참나무 울타리가 기본 광물 생성기입니다.",
      tips: [
        "광물 창고는 총 5만 개까지 보관 가능",
        "소라고동 아이템으로 광물창고 확장 가능",
        "잠광: 좌클릭 누른 상태에서 F3+T",
        "/광물변환: 광물 대신 크리스탈 확률 증가",
      ],
      skills: [
        {
          lv: 1,
          name: "채광신의 축복 I",
          desc: "채광 시 경험치 3% 추가 획득",
          cost: "100만원",
        },
        {
          lv: 10,
          name: "크리스탈 I",
          desc: "채광 시 0.02% 확률로 크리스탈 추가 드롭",
          cost: "300만원",
        },
        {
          lv: 20,
          name: "다이아 광부 [액티브] I",
          desc: "채광 시 0.1% 확률 발동, 다이아 생성 확률 증가 (쿨타임 30분)",
          cost: "500만원",
        },
        {
          lv: 40,
          name: "광물 수집가 I",
          desc: "광물 판매 시 판매금의 10% 추가 획득 (일반 상점)",
          cost: "700만원",
        },
        {
          lv: 60,
          name: "골드 & 아이언 I",
          desc: "철과 금 채광 시 1% 확률로 1+1 드롭",
          cost: "1000만원",
        },
      ],
    },
    {
      name: "수확",
      emoji: "🌽",
      color: "#16a34a",
      desc: "바닐라 작물을 캐거나, 커스텀 작물들을 키워서 돈을 버는 직업이에요. 도끼·곡괭이로는 작물을 캘 수 없어요 — 괭이로 캐세요! (호박·수박은 도끼 사용 가능)",
      tips: [
        "커스텀 작물은 빛이 필요 없어요!",
        "주변에 플레이어가 있어야 작물이 자라요",
        "허수아비로 까마귀 차단 (범위: 1청크)",
        "물뿌리개: 구리→철→금→이리듐, 스프링쿨러도 있어요",
      ],
      skills: [
        {
          lv: 1,
          name: "수확신의 축복 I",
          desc: "수확 시 경험치 4% 추가 획득",
          cost: "100만원",
        },
        {
          lv: 10,
          name: "드랍더 농작물 I",
          desc: "수확 시 0.2% 확률로 농작물 추가 드롭",
          cost: "300만원",
        },
        {
          lv: 20,
          name: "일확천농 [액티브] I",
          desc: "수확 시 0.1% 확률로 농작물 한 세트 드롭 (쿨타임 3분)",
          cost: "500만원",
        },
        {
          lv: 40,
          name: "파브르 I",
          desc: "수확 시 지렁이 0.15% 확률 획득",
          cost: "700만원",
        },
        {
          lv: 60,
          name: "빛나는 확률 I",
          desc: "수확 시 산삼 씨앗 0.03% 확률 획득",
          cost: "1000만원",
        },
      ],
    },
    {
      name: "벌목",
      emoji: "🪓",
      color: "#92400e",
      desc: "나무를 주로 캐는 직업이에요. 섬에 자신만의 벌목장을 만들고, 나무를 캐서 특성 레벨을 올릴 수 있어요. 참나무·가문비·자작·정글·아카시아·짙은 참나무 원목에서 XP 4씩 상승!",
      tips: [
        "벌목장을 섬에 직접 만들어요",
        "찹트리 활성화 시 나무 전체가 한 번에 제거",
        "도토리 드롭으로 추가 수익",
        "나무 판매 시 일반 상점에서 판매금 보너스",
      ],
      skills: [
        {
          lv: 1,
          name: "나무신의 축복 I",
          desc: "벌목 시 경험치 4% 추가 획득",
          cost: "100만원",
        },
        {
          lv: 10,
          name: "정령의 기운 I",
          desc: "벌목 시 정령 0.08% 확률 획득",
          cost: "300만원",
        },
        {
          lv: 20,
          name: "일확천목 [액티브] I",
          desc: "벌목 시 찹트리 확률 10%로 상승",
          cost: "500만원",
        },
        {
          lv: 40,
          name: "나무꾼과 선녀 I",
          desc: "나무 판매 시 판매금의 10% 추가 획득",
          cost: "700만원",
        },
        {
          lv: 60,
          name: "도토리 I",
          desc: "벌목 시 도토리 획득 확률 0.5% 증가",
          cost: "1000만원",
        },
      ],
    },
    {
      name: "어부",
      emoji: "🎣",
      color: "#0284c7",
      desc: "낚시터 또는 섬에서 물고기를 낚고, 낚은 물고기를 NPC에게 팔아 돈을 버는 직업이에요. 입질이 오면 우클릭 후, 미니게임에서 초록색에 우클릭!",
      tips: [
        "고정 키 끄기: 윈도우 검색창 → '고정 키' → 끔",
        "낚시대는 우아한 바다진주로 업그레이드",
        "수수께끼 구슬로 낚시대 강화 (총 7강)",
        "보물 물고기: 고래상어(1000만원) 최고가",
      ],
      skills: [
        {
          lv: 1,
          name: "물고기 신의 축복 I",
          desc: "낚시 시 경험치 20% 추가 획득",
          cost: "100만원",
        },
        {
          lv: 10,
          name: "월척 I",
          desc: "낚시 시 0.5% 확률로 보물 물고기 획득",
          cost: "300만원",
        },
        {
          lv: 20,
          name: "해적 I",
          desc: "낚시 시 진주 획득 확률 0.5% 증가",
          cost: "500만원",
        },
        {
          lv: 40,
          name: "수산시장 I",
          desc: "물고기 판매 시 판매금의 10% 추가 획득",
          cost: "700만원",
        },
        {
          lv: 60,
          name: "성장된 물고기 I",
          desc: "물고기 등급업 확률 7% 증가",
          cost: "1000만원",
        },
      ],
    },
    {
      name: "요리",
      emoji: "🍳",
      color: "#ea580c",
      desc: "커스�� 작물과 바닐라 작물을 사용하여 요리를 만드는 직업이에요. 요리 도구: 도마(식칼 필요), 프라이팬(가스레인지+뒤집개), 냄비(물병+뒤집개), 튀김기(오일+뒤집개). 레시피 순서를 반드시 지켜야 해요!",
      tips: [
        "순서를 틀리면 썩은 음식이 나와요",
        "도마: 자른당근, 김치, 수박주스 등",
        "냄비: 라면, 육개장, 시리얼, 미역국",
        "프라이팬: 타코, 애플파이, 오믈렛, 또띠아",
      ],
      skills: [
        {
          lv: 1,
          name: "빠른 성장 I",
          desc: "요리 시 경험치 30% 추가 획득",
          cost: "100만원",
        },
        {
          lv: 10,
          name: "더블 쿠킹 I",
          desc: "요리 시 4% 확률로 완성품 1+1 제작",
          cost: "300만원",
        },
        {
          lv: 20,
          name: "최고의 요리사 I",
          desc: "왕실납품에 납품 가능한 아이템 개수 10개 추가",
          cost: "500만원",
        },
        {
          lv: 40,
          name: "최종평가 I",
          desc: "요리 시 0.5% 확률로 별점 지급",
          cost: "700만원",
        },
        {
          lv: 60,
          name: "자동수리 I",
          desc: "요리 시 10% 확률로 요리도구 자동 수리",
          cost: "1000만원",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p
          className="text-amber-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          💡 2차 특성은 <strong>수집가 도감 완료</strong>를 통해 확장할 수
          있습니다. 채집·모험 특성은 미출시 예정입니다.
        </p>
      </div>
      {traits.map((trait) => (
        <div
          key={trait.name}
          className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm"
        >
          <div
            className="px-5 py-4 border-b border-slate-50 flex items-center gap-3"
            style={{ borderBottom: `2px solid ${trait.color}20` }}
          >
            <span className="text-3xl">{trait.emoji}</span>
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: trait.color,
                }}
              >
                {trait.name} 특성
              </div>
              <p className="text-slate-500" style={{ fontSize: "12px" }}>
                {trait.desc}
              </p>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div
                className="text-slate-700 mb-2"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                📌 핵심 팁
              </div>
              <ul className="space-y-1">
                {trait.tips.map((tip) => (
                  <li
                    key={tip}
                    className="text-slate-600 flex items-start gap-1.5"
                    style={{ fontSize: "12px", lineHeight: 1.6 }}
                  >
                    <span className="text-amber-400 flex-shrink-0 mt-0.5">
                      ▸
                    </span>{" "}
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                className="text-slate-700 mb-2"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                ⚡ 주요 스킬 (초반)
              </div>
              <div className="space-y-1">
                {trait.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span
                      className="rounded-full px-1.5 py-0.5 flex-shrink-0 mt-0.5"
                      style={{
                        background: trait.color + "20",
                        color: trait.color,
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      LV.{skill.lv}
                    </span>
                    <div>
                      <div
                        className="text-slate-700"
                        style={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        {skill.name}
                      </div>
                      <div
                        className="text-slate-400"
                        style={{ fontSize: "11px" }}
                      >
                        {skill.desc} · 필요 금액: {skill.cost}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Beekeeping Content ───────────────────────────────────────────────────────
function BeekeepingContent() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🐝 양봉 방법
        </h3>
        <p
          className="text-amber-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          꿀비의 숲에서는 양봉을 통해 꿀 관련 아이템을 생산할 수 있어요! 일일
          보상과 아이템 제작에 다양하게 활용됩니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: "🏠",
            title: "벌통 설치",
            desc: "섬에 벌집 블럭을 설치하고 꿀벌을 유인하세요. 근처에 꽃이 있으면 꿀벌이 활동해요.",
          },
          {
            icon: "🍯",
            title: "꿀 수확",
            desc: "벌집에 꿀이 가득 차면 병으로 꿀을 수집할 수 있어요. 분노하지 않게 캠프파이어를 아래에 설치하세요.",
          },
          {
            icon: "🕯️",
            title: "밀랍 수확",
            desc: "가위로 벌집을 우클릭하면 밀랍을 수확할 수 있어요. 자연 꿀밀랍은 다양한 아이템 제작에 사용됩니다.",
          },
          {
            icon: "💰",
            title: "꿀 판매",
            desc: "수집한 꿀과 밀랍은 상점에서 판매하거나 아이템 제작에 활용하세요. 천연 토종꿀은 고가 아이템이에요!",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div
                  className="text-slate-700 mb-1"
                  style={{ fontSize: "14px", fontWeight: 700 }}
                >
                  {item.title}
                </div>
                <p
                  className="text-slate-500"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <div
          className="text-slate-700 mb-3"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          🍯 꿀 관련 아이템
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            "자연 꿀밀랍",
            "천연 토종꿀",
            "가공된 꿀조각",
            "꿀 블럭",
            "꿀병",
            "밀랍",
          ].map((item) => (
            <div
              key={item}
              className="bg-amber-50 rounded-xl px-3 py-2 text-amber-800 text-center"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              🍯 {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Events Content ───────────────────────────────────────────────────────────
function EventsContent() {
  const dailyRewards: { day: number; items: string[] }[] = [
    { day: 1, items: ["[화폐] 자연은 주괴"] },
    {
      day: 2,
      items: [
        "[화폐] 화려한 금 주괴 2개",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "가공된 꿀조각",
      ],
    },
    {
      day: 3,
      items: [
        "황금 뼛가루 (10개)",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "은행 현금 뭉텅이",
        "허수아비",
        "산삼 씨앗",
      ],
    },
    {
      day: 4,
      items: [
        "빛 (3개)",
        "[화폐] 화려한 금 주괴",
        "가공된 꿀조각",
        "자동심기 기술 주문서 (+1000회)",
        "엘레베이터 블럭",
      ],
    },
    { day: 5, items: ["가공된 꿀조각", "산삼 씨앗", "뼈다귀 (10개)"] },
    {
      day: 6,
      items: [
        "[화폐] 화려한 금 주괴 (2개)",
        "자연 꿀밀랍",
        "꼬마의 저금통 (5개)",
      ],
    },
    {
      day: 7,
      items: [
        "꼬마의 저금통 (5개)",
        "의문의 빨강포션",
        "은행 현금 뭉텅이",
        "뼈다귀 (5개)",
        "양조기",
        "자연 꿀밀랍",
      ],
    },
    {
      day: 8,
      items: [
        "[화폐] 화려한 금 주괴",
        "자연 꿀밀랍",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
      ],
    },
    {
      day: 9,
      items: [
        "가공된 꿀조각",
        "뼈다귀 (15개)",
        "자동심기 기술 주문서 (+2000회)",
      ],
    },
    {
      day: 10,
      items: [
        "엘레베이터 블럭",
        "엔더상자",
        "양조기",
        "[화폐] 빛나는 다이아 주괴",
      ],
    },
    { day: 11, items: ["황금 뼛가루 (20개)", "제초기"] },
    {
      day: 12,
      items: [
        "반짝반짝 빛나는 거울",
        "엘레베이터 블럭",
        "블럭블럭 자동조합 큐브 [1회용] (10개)",
        "[화폐] 빛나는 다이아 주괴",
        "중급 두루마리 강화서 [60% 주문서 뽑기]",
      ],
    },
    {
      day: 13,
      items: ["천연 토종꿀", "빛 (5개)", "자동심기 기술 주문서 (+3000회)"],
    },
    {
      day: 14,
      items: [
        "의문의 파랑포션",
        "[화폐] 화려한 이리듐 주괴",
        "자동심기 기술 주문서 (+3000회)",
      ],
    },
    {
      day: 15,
      items: [
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "폭죽 로켓 (10개)",
        "자동심기 기술 주문서 (+5000회)",
      ],
    },
    {
      day: 16,
      items: [
        "[화폐] 화려한 이리듐 주괴",
        "일반 소라고동",
        "은행 현금 뭉텅이",
        "자연 꿀밀랍",
      ],
    },
    {
      day: 17,
      items: [
        "황금 뼛가루 (30개)",
        "제초기 (2개)",
        "산삼 씨앗 (3개)",
        "자동심기 기술 주문서 (+5000회)",
        "[화폐] 화려한 이리듐 주괴",
      ],
    },
    {
      day: 18,
      items: [
        "일반 소라고동",
        "상급 두루마리 강화서 [70% 주문서 뽑기]",
        "은행 현금 뭉텅이",
        "[화폐] 화려한 금 주괴 (5개)",
      ],
    },
    {
      day: 19,
      items: [
        "자연 꿀밀랍",
        "뼈다귀 (15개)",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "도토리 (15개)",
        "우아한 바다진주",
      ],
    },
    {
      day: 20,
      items: [
        "황금 뼛가루 (30개)",
        "제초기 (3개)",
        "산삼 씨앗 (5개)",
        "일반 소라고동",
        "[화폐] 화려한 이리듐 주괴",
      ],
    },
    {
      day: 21,
      items: [
        "천연 토종꿀",
        "[화폐] 빛나는 다이아 주괴",
        "의문의 벨소리",
        "반짝반짝 빛나는 거울",
      ],
    },
    {
      day: 22,
      items: [
        "도토리 (20개)",
        "폭죽 로켓 (10개)",
        "[화폐] 화려한 이리듐 주괴",
        "뼈다귀 (15개)",
        "우아한 바다진주",
        "일반 소라고동",
      ],
    },
    {
      day: 23,
      items: [
        "엘레베이터 블럭",
        "빛 (5개)",
        "황금 지렁이",
        "상급 두루마리 강화서 [70% 주문서 뽑기]",
        "자연 꿀밀랍",
        "은행 현금 뭉텅이",
      ],
    },
    {
      day: 24,
      items: [
        "[화폐] 화려한 금 주괴 (2개)",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "빛 (5개)",
        "지렁이 (10개)",
      ],
    },
    {
      day: 25,
      items: [
        "폭죽 로켓 (10개)",
        "[화폐] 화려한 이리듐 주괴",
        "양조기",
        "자연 꿀밀랍",
        "우아한 바다진주",
      ],
    },
    {
      day: 26,
      items: [
        "중급 두루마리 강화서 [60% 주문서 뽑기]",
        "상급 두루마리 강화서 [70% 주문서 뽑기]",
        "반짝반짝 빛나는 거울",
        "의문의 빨강포션",
        "[화폐] 빛나는 다이아 주괴",
      ],
    },
    {
      day: 27,
      items: [
        "중급 두루마리 강화서 [60% 주문서 뽑기]",
        "천연 토종꿀",
        "[화폐] 화려한 이리듐 주괴",
      ],
    },
    {
      day: 28,
      items: [
        "의문의 빨강포션",
        "의문의 파랑포션",
        "최상급 두루마리 강화서 [80% 주문서 뽑기]",
        "일반 소라고동",
      ],
    },
    {
      day: 29,
      items: [
        "상급 두루마리 강화서 [70% 주문서 뽑기]",
        "은행 현금 뭉텅이",
        "양조기",
        "일반 소라고동 (2개)",
        "엘레베이터 블럭",
      ],
    },
    {
      day: 30,
      items: [
        "중급 두루마리 강화서 [60% 주문서 뽑기]",
        "천연 토종꿀",
        "뼈다귀 (10개)",
        "도토리 (30개)",
      ],
    },
    {
      day: 31,
      items: [
        "의문의 빨강포션",
        "의문의 파랑포션",
        "최상급 두루마리 강화서 [80% 주문서 뽑기]",
        "의문의 벨소리",
        "마법의 소라고동",
      ],
    },
  ];

  const today = new Date().getDate();

  function getItemBadge(item: string): string {
    if (item.includes("[화폐]"))
      return "bg-amber-100 text-amber-800 border border-amber-200";
    if (item.includes("강화서"))
      return "bg-violet-100 text-violet-800 border border-violet-200";
    if (item.includes("주문서"))
      return "bg-blue-100 text-blue-800 border border-blue-200";
    if (item.includes("포션"))
      return "bg-red-100 text-red-800 border border-red-200";
    if (item.includes("소라고동"))
      return "bg-cyan-100 text-cyan-800 border border-cyan-200";
    if (item.includes("꿀") || item.includes("토종") || item.includes("밀랍"))
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    if (item.includes("뼈가루") || item.includes("뼈다귀"))
      return "bg-stone-100 text-stone-700 border border-stone-200";
    if (
      item.includes("도토리") ||
      item.includes("지렁이") ||
      item.includes("산삼")
    )
      return "bg-green-100 text-green-800 border border-green-200";
    return "bg-slate-100 text-slate-700 border border-slate-200";
  }

  const minelistRewards = [
    "클로버",
    "자동심기 기술 주문서 (+1000회)",
    "경험치 병 (64개)",
    "[화폐] 화려한 금 주괴 (5개)",
    "자연 꿀밀랍",
    "뼈다귀 (5개)",
  ];
  const hottimeRewards = [
    "자연 꿀밀랍",
    "자동심기 기술 주문서 (+1000회)",
    "금 블럭 64개",
    "다이아몬드 블럭 64개",
    "에메랄드 블럭 64개",
    "[화폐] 화려한 금 주괴 (5개)",
    "뼈다귀 (5개)",
    "경험치 병 (64개)",
    "황금 뼛가루 (15개)",
  ];
  const hottimeExtraRewards = [
    "하급 두루마리 강화서 [50% 주문서 뽑기]",
    "황금 뼛가루 (15개)",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 일일보상 */}
        <div className="lg:col-span-2 bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-amber-50">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <span
                className="text-slate-700"
                style={{ fontSize: "16px", fontWeight: 700 }}
              >
                일일보상 (출석 체크)
              </span>
              <span
                className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5"
                style={{ fontSize: "11px", fontWeight: 700 }}
              >
                1~31일차
              </span>
            </div>
          </div>

          <div
            className="divide-y divide-slate-50 overflow-y-auto"
            style={{ maxHeight: "700px" }}
          >
            {dailyRewards.map((r) => (
              <div
                key={r.day}
                className={`flex items-start gap-3 px-5 py-3.5 ${r.day === today ? "bg-amber-50" : "hover:bg-slate-50/50"}`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      r.day === today
                        ? "linear-gradient(135deg,#f5c842,#f59e0b)"
                        : "#f1f5f9",
                    color: r.day === today ? "#1a1200" : "#64748b",
                    fontSize: "13px",
                    fontWeight: 900,
                    boxShadow:
                      r.day === today
                        ? "0 2px 8px rgba(245,200,66,0.4)"
                        : "none",
                  }}
                >
                  {r.day}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-1">
                    {r.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemBadge(item)}`}
                        style={{ fontSize: "11px", fontWeight: 600 }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {r.day === today && (
                  <span
                    className="flex-shrink-0 rounded-full px-2 py-0.5"
                    style={{
                      background: "linear-gradient(135deg,#f5c842,#f59e0b)",
                      color: "#1a1200",
                      fontSize: "10px",
                      fontWeight: 800,
                    }}
                  >
                    ✨ 오늘!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: 마인리스트 + 핫타임 */}
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-amber-50"
              style={{ background: "#fffef5" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">👍</span>
                <span
                  className="text-slate-700"
                  style={{ fontSize: "15px", fontWeight: 700 }}
                >
                  마인리스트 추천 보상
                </span>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex flex-wrap gap-1.5">
                {minelistRewards.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemBadge(item)}`}
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-4 border-b border-rose-50"
              style={{ background: "#fff5f5" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span
                  className="text-slate-700"
                  style={{ fontSize: "15px", fontWeight: 700 }}
                >
                  핫타임 보상
                </span>
              </div>
            </div>
            <div className="px-4 py-4 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {hottimeRewards.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemBadge(item)}`}
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-rose-50">
                <div
                  className="text-slate-500 mb-2"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  🎁 마인리스트 추천 시 추가 보상
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hottimeExtraRewards.map((item) => (
                    <span
                      key={item}
                      className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemBadge(item)}`}
                      style={{ fontSize: "11px", fontWeight: 600 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Coming Soon ──────────────────────────────────────────────────────────────
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-12 text-center shadow-sm">
      <div className="text-4xl mb-4">🚧</div>
      <div
        className="text-slate-700 mb-2"
        style={{ fontSize: "18px", fontWeight: 700 }}
      >
        {name} 정보 준비중
      </div>
      <p className="text-slate-400" style={{ fontSize: "14px" }}>
        해당 페이지의 내용을 준비 중이에요. 곧 업데이트될 예정입니다!
      </p>
    </div>
  );
}

const contentComponents: Record<string, ReactNode> = {
  rank: <RankContent />,
  traits: <TraitsContent />,
  beekeeping: <BeekeepingContent />,
  events: <EventsContent />,
};

// ─── Content Grid (landing page) ─────────────────────────────────────────────
const contentRows = [
  {
    key: "row1",
    label: "기본 콘텐츠",
    emoji: "🌿",
    bg: "#fef3c7",
    border: "#fbbf24",
    color: "#b45309",
    items: [
      {
        key: "island",
        label: "섬",
        emoji: "🏝️",
        desc: "섬 시스템 및 운영 안내",
      },
      {
        key: "shop",
        label: "상점",
        emoji: "🏪",
        desc: "상점 아이템 및 시세 안내",
      },
      {
        key: "rank",
        label: "랭크",
        emoji: "⭐",
        desc: "등급별 조건, 혜택 및 권한 안내",
      },
      {
        key: "traits",
        label: "특성 안내",
        emoji: "🔮",
        desc: "채광·수확·벌목·어부·요리 직업 특성",
      },
    ],
  },
  {
    key: "row2",
    label: "마법 & 크래프트",
    emoji: "✨",
    bg: "#ede9fe",
    border: "#a78bfa",
    color: "#7c3aed",
    items: [
      {
        key: "altar",
        label: "제단",
        emoji: "🏛️",
        desc: "제단 아이템 제작 및 레시피 안내",
      },
      {
        key: "collection",
        label: "도감",
        emoji: "📖",
        desc: "수집가 도감 완료 방법 안내",
      },
      {
        key: "enchant",
        label: "주문서 강화",
        emoji: "📜",
        desc: "주문서 강화 확률 및 방법 안내",
      },
      {
        key: "royal-supply",
        label: "왕실납품",
        emoji: "🏰",
        desc: "왕실납품 아이템 및 보상 안내",
      },
    ],
  },
  {
    key: "row3",
    label: "생활 & 사교",
    emoji: "💝",
    bg: "#fce7f3",
    border: "#f472b6",
    color: "#be185d",
    items: [
      {
        key: "marriage",
        label: "결혼",
        emoji: "💒",
        desc: "결혼 시스템 및 혜택 안내",
      },
      {
        key: "donation-king",
        label: "기부왕",
        emoji: "👑",
        desc: "기부왕 시스템 순위 및 보상",
      },
      {
        key: "beekeeping",
        label: "양봉 방법",
        emoji: "🐝",
        desc: "양봉 방법 및 꿀 아이템 안내",
      },
      {
        key: "painting",
        label: "그림",
        emoji: "🎨",
        desc: "그림 아이템 제작 안내",
      },
    ],
  },
  {
    key: "row4",
    label: "미니게임",
    emoji: "🎮",
    bg: "#ffedd5",
    border: "#fb923c",
    color: "#c2410c",
    items: [
      {
        key: "parkour",
        label: "파쿠르",
        emoji: "🏃",
        desc: "파쿠르 코스 규칙 및 보상 안내",
      },
      {
        key: "blockwars",
        label: "블럭워즈",
        emoji: "⚔️",
        desc: "PVP 블럭워즈 규칙 및 전략",
      },
      {
        key: "seotda",
        label: "섯다",
        emoji: "🃏",
        desc: "섯다 게임 규칙 안내",
      },
      {
        key: "gacha",
        label: "랜덤 뽑기",
        emoji: "🎰",
        desc: "랜덤 뽑기 아이템 및 확률 안내",
      },
    ],
  },
];

function ContentGrid() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div
            className="flex items-center gap-2 text-amber-600 mb-2"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-700">
              홈
            </Link>
            <span>›</span>
            <span className="text-slate-600">🎮 콘텐츠</span>
          </div>
          <h1
            className="text-slate-800 mb-1"
            style={{ fontSize: "26px", fontWeight: 900 }}
          >
            🎮 콘텐츠 안내
          </h1>
          <p
            className="text-slate-500"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            원하는 콘텐츠 카드를 클릭하면 자세한 정보를 확인할 수 있어요
          </p>
        </div>

        <div className="space-y-5">
          {contentRows.map((row) => (
            <div
              key={row.key}
              className="rounded-2xl p-5"
              style={{ background: row.bg, border: `2px solid ${row.border}` }}
            >
              {/* Row header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{row.emoji}</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: row.color,
                  }}
                >
                  {row.label}
                </span>
                <div
                  className="flex-1 border-b-2"
                  style={{ borderColor: row.border + "80" }}
                />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {row.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => navigate(`/content?tab=${item.key}`)}
                    className="group bg-white rounded-2xl p-4 border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center cursor-pointer"
                    style={{ borderColor: row.border }}
                  >
                    <div className="text-3xl mb-2.5 group-hover:scale-110 transition-transform duration-200">
                      {item.emoji}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: row.color,
                      }}
                    >
                      {item.label}
                    </div>
                    <p
                      className="text-slate-400 mt-1"
                      style={{ fontSize: "11px", lineHeight: 1.5 }}
                    >
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Content Detail ───────────────────────────────────────────────────────────
function ContentDetail({ activeTab }: { activeTab: string }) {
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-amber-600 mb-3"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-700">
              홈
            </Link>
            <span>›</span>
            <Link to="/content" className="hover:text-amber-700">
              콘텐츠
            </Link>
            <span>›</span>
            <span className="text-slate-600">
              {current.emoji} {current.label}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/content"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors flex-shrink-0"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Link>
            <h1
              className="text-slate-800"
              style={{ fontSize: "24px", fontWeight: 900 }}
            >
              {current.emoji} {current.label}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div>
          {contentComponents[activeTab] ?? <ComingSoon name={current.label} />}
        </div>
      </div>
    </div>
  );
}
