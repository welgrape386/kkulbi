import { useSearchParams, Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

// ─── Tab definitions ───────────────────────────────────────────────────────────
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
                {[
                  "등급",
                  "재화 조건",
                  "플레이타임",
                  "마인리스트",
                  "지급 권한",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-amber-800"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
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
      desc: "나무를 주로 캐는 직업이에요. 섬에 자신만의 벌목장을 만들고, 나무를 캐서 특성 레벨을 올릴 수 있어요.",
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
      desc: "커스텀 작물과 바닐라 작물을 사용하여 요리를 만드는 직업이에요. 레시피 순서를 반드시 지켜야 해요! 순서를 틀리면 썩은 음식이 나와요.",
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
          양봉 방법을 알려드릴게요!
          <br />
          벌집과 꿀벌을 이용하여 벌꿀을 생산할 수 있습니다.
        </p>
      </div>

      <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Acd72353e-b7a8-4af7-97de-834c13f19c76%3Aimage.png?table=block&id=2d101bc3-8f0f-80bc-b5d1-fff35691c371&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1410&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="양봉 방법"
          className="w-full rounded-2xl"
        />
      </div>

      <div className="space-y-4">
        {[
          {
            step: "STEP 1",
            desc: "벌집과 꿀벌 생성알을 상점에서 구매합니다.",
          },
          {
            step: "STEP 2",
            desc: "벌집을 설치한 후 꿀벌을 소환하고 벌집 근처에 꽃을 설치합니다.",
          },
          {
            step: "STEP 3",
            desc: "꿀이 가득 차면 가위를 들고 벌집을 우클릭하여 벌꿀을 채집합니다.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm"
          >
            <div
              className="text-amber-700 mb-2"
              style={{ fontSize: "13px", fontWeight: 800 }}
            >
              {item.step}
            </div>

            <div
              className="text-slate-700"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
        <h3
          className="text-sky-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💡 꿀팁
        </h3>

        <p
          className="text-sky-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          벌집을 맨손으로 우클릭하면 벌집 내부 상태를 확인할 수 있어요!
        </p>
      </div>

      <div className="bg-white border border-red-100 rounded-2xl p-4 shadow-sm">
        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A0d91cbc4-2a16-44cf-ad93-1036bfffab57%3Aimage.png?table=block&id=2d101bc3-8f0f-80ea-a90d-f8764b16f3de&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=400&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="양봉 주의사항"
          className="rounded-2xl"
        />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <h3
          className="text-red-700 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ⚠️ 주의사항
        </h3>

        <p
          className="text-red-600"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          벌집 아래에 있는 모닥불에 불을 지피지 않은 상태로 꿀을 채집하면
          꿀벌들이 화가 나 독침을 쏘고 죽어버립니다.
          <br />
          반드시 모닥불에 불을 붙인 후 벌꿀을 채집해주세요.
        </p>
      </div>
    </div>
  );
}

function RoyalContent() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <h3
          className="text-yellow-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          👑 왕실납품
        </h3>

        <p
          className="text-yellow-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          왕실에 아이템을 납품하여 왕실 포인트를 획득할 수 있습니다.
          획득한 포인트는 왕실 상점 이용 및 왕실 경매 참여에 사용됩니다.
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
        <h3
          className="text-purple-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏛️ 왕실경매
        </h3>

        <ul
          className="text-purple-700 space-y-2"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          <li>• 왕실경매는 1~3일마다 진행됩니다.</li>
          <li>• 랜덤한 아이템이 재화 또는 왕실포인트 경매로 등록됩니다.</li>
          <li>• 종료 시점 최고 입찰자에게 우편함으로 보상이 지급됩니다.</li>
          <li>• /왕실경매 명령어로도 이용 가능합니다.</li>
        </ul>
      </div>

      <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Ad783971e-c71a-4e54-902a-1d7cb11f5fee%3Aimage.png?table=block&id=2d101bc3-8f0f-8031-ae59-f742a6b831c3&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="왕실 경매"
          className="w-full rounded-2xl"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3
          className="text-blue-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📦 왕실납품
        </h3>

        <div
          className="text-blue-700"
          style={{ fontSize: "14px", lineHeight: 1.9 }}
        >
          • 본인의 숙련도 및 스킬에 따라 하루 납품 가능 개수가 결정됩니다.
          <br />
          • 숙련도 50당 아이템 1개를 추가 납품할 수 있습니다.
          <br />
          • 납품 시 왕실 포인트를 획득합니다.
          <br />
          • 왕실 포인트는 왕실 상점 및 왕실 경매에서 사용됩니다.
          <br />
          • 현재 보유 포인트는 /왕실포인트 명령어로 확인 가능합니다.
        </div>
      </div>

      <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🛒 왕실상점
        </h3>

        <div className="space-y-3">
          {[
            ["지구의 머리", "30 포인트"],
            ["미가공 복구석ㆍ거친 원석", "45 포인트"],
            ["상급 두루마리 강화서 [70% 뽑기]", "60 포인트"],
            ["공룡 치장팩", "200 포인트"],
            ["일반 치장팩", "200 포인트"],
            ["신호기", "240 포인트"],
            ["칭호 랜덤 뽑기권", "300 포인트"],
            ["미가공 복구석ㆍ고급 원석", "300 포인트"],
            ["프리미엄 닉네임 변경권", "400 포인트"],
            ["아기 드라코니 부화알", "400 포인트"],
            ["아기 고양이 털뭉치", "400 포인트"],
            ["자유로운 왕꿀벌", "640 포인트"],
            ["왕대두 지구", "1500 포인트"],
            ["왕대두 꿀떡", "1500 포인트"],
          ].map(([name, price]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <span
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {name}
              </span>

              <span
                className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-800"
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaintingContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3
          className="text-blue-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🎨 그림
        </h3>

        <p
          className="text-blue-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          다양한 도구를 사용하여 그림을 제작할 수 있습니다.
          아래 순서대로 따라하면 쉽게 그림을 완성할 수 있어요!
        </p>
      </div>

      {/* 받침대 */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ① 받침대
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          받침대를 우클릭하여 설치합니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Ae5bb7820-234b-4c77-ac0c-c780abd7caf1%3Aimage.png?table=block&id=2d101bc3-8f0f-80e1-8b3d-cafb8739b455&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="받침대"
          className="w-full rounded-2xl mb-4"
        />

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A8df73927-409b-4cb6-9d1d-2d6d8d47335a%3Aimage.png?table=block&id=2d101bc3-8f0f-8040-ba78-c5f313dbf06d&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="받침대 설치"
          className="w-full rounded-2xl"
        />
      </div>

      {/* 캔버스 */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ② 캔버스
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          캔버스를 손에 들고 받침대에 우클릭합니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Af0e88cde-1896-4ad8-8de9-e13f89f0f424%3Aimage.png?table=block&id=2d101bc3-8f0f-8070-892b-e884a347d51b&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="캔버스"
          className="w-full rounded-2xl"
        />
      </div>

      {/* 브러쉬 */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ③ 브러쉬
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          원하는 색상의 브러쉬를 들고 좌클릭 또는 우클릭하면 그림을
          그릴 수 있습니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A216d6552-2689-4d40-b7d4-b48bf7a6da84%3Aimage.png?table=block&id=2d101bc3-8f0f-80dc-8128-f7bec92fcb4e&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="브러쉬"
          className="w-full rounded-2xl"
        />
      </div>

      {/* 밝게 어둡게 */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ④ 밝게 / 어둡게
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          밝게 / 어둡게 아이템을 들고 좌클릭하면 색상을 더 밝거나 어둡게
          변경할 수 있습니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A6b357bef-a8f5-43e1-8985-e906d54596fd%3Aimage.png?table=block&id=2d101bc3-8f0f-80f7-8dfd-cfb3ef5e92c1&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="밝게 어둡게"
          className="w-full rounded-2xl"
        />
      </div>

      {/* 양동이 */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ⑤ 양동이
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          왼손에 색상 브러쉬를 들고 오른손에 양동이를 든 후 좌클릭하면
          배경 전체를 채울 수 있습니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Ae71dc52c-765c-41e6-9609-6e7fc1231844%3Aimage.png?table=block&id=2d101bc3-8f0f-8041-b33a-f0ecb9b60107&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1330&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="양동이"
          className="w-full rounded-2xl"
        />
      </div>

      {/* 기타 기능 */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <h3
          className="text-green-800 mb-4"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🧰 기타 기능
        </h3>

        <div className="space-y-4">
          <div>
            <div style={{ fontWeight: 700 }}>💾 저장</div>
            <p
              className="text-green-700"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              저장 아이템을 손에 들고 원하는 이름으로 변경하여 저장할 수
              있습니다.
              <br />
              TIP! 우클릭으로 사용하면 아이템이 사라집니다.
              좌클릭으로 사용하면 사라지지 않아 영구적으로 사용할 수 있습니다.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>🧽 스펀지</div>
            <p
              className="text-green-700"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              원하는 색상에 좌클릭하여 색을 복사한 후 우클릭으로 캔버스에
              칠할 수 있습니다.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>📋 그림 복사기</div>
            <p
              className="text-green-700"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              그림을 조합대에 올리면 복사됩니다.
              <br />
              완성된 그림도 다시 받침대에 올려 수정할 수 있습니다.
              <br />
              본인이 저장한 그림만 수정 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 팔레트 */}
      <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🎨 팔레트 색상
        </h3>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A93189bfa-be9d-4bd8-ba76-b7e1112a4c7c%3Aimage.png?table=block&id=2d101bc3-8f0f-8087-b9d3-decdd8f0dad0&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=940&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="팔레트 색상"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
}

function AltarContent() {
  return (
    <div className="space-y-6">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
        <h3
          className="text-stone-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏛️ 제단
        </h3>

        <p
          className="text-stone-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          다양한 아이템을 공물로 바쳐 경쟁 포인트를 획득할 수 있습니다.
          획득한 포인트와 순위에 따라 다양한 보상을 받을 수 있습니다.
        </p>
      </div>

      {/* 경쟁 포인트 */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📈 경쟁 포인트
        </h3>

        <p
          className="text-amber-700 mb-5"
          style={{ fontSize: "13px", lineHeight: 1.8 }}
        >
          제단에 공물을 바치면 경쟁 포인트를 획득할 수 있습니다.
          <br />
          경쟁 포인트에 따라 순위 보상과 레벨 보상을 획득할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* 일반 공물 */}
          <div className="bg-white border border-green-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-green-50 px-4 py-3 border-b border-green-100">
              <div
                className="text-green-700"
                style={{ fontSize: "14px", fontWeight: 800 }}
              >
                🌱 일반 공물
              </div>
            </div>

            <div className="p-4 space-y-2">
              {[
                ["당근", "1P"],
                ["감자", "1P"],
                ["대나무", "1P"],
                ["사탕수수", "1P"],
                ["구운 감자", "1.5P"],
                ["네더사마귀", "1.5P"],
                ["호박", "2P"],
                ["코코아콩", "2P"],
                ["수박", "2.5P"],
                ["독이 있는 감자", "5P"],
                ["황금 당근", "6P"],
                ["밀", "6P"],
                ["사탕무", "8P"],
                ["네더사마귀 블록", "13.5P"],
              ].map(([name, point]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-green-100 px-3 py-2"
                >
                  <span
                    className="text-slate-700"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {name}
                  </span>

                  <span
                    className="px-2 py-1 rounded-lg bg-green-50 text-green-700"
                    style={{ fontSize: "12px", fontWeight: 800 }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 고급 공물 */}
          <div className="bg-white border border-orange-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-orange-50 px-4 py-3 border-b border-orange-100">
              <div
                className="text-orange-700"
                style={{ fontSize: "14px", fontWeight: 800 }}
              >
                ⭐ 고급 공물
              </div>
            </div>

            <div className="p-4 space-y-2">
              {[
                ["빵", "20P"],
                ["사과", "30P"],
                ["사탕무 수프", "40P"],
                ["건초 더미", "54P"],
              ].map(([name, point]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-orange-100 px-3 py-2"
                >
                  <span
                    className="text-slate-700"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {name}
                  </span>

                  <span
                    className="px-2 py-1 rounded-lg bg-orange-50 text-orange-700"
                    style={{ fontSize: "12px", fontWeight: 800 }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 특수 공물 */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-violet-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-violet-50 px-4 py-3 border-b border-violet-100">
                <div
                  className="text-violet-700"
                  style={{ fontSize: "14px", fontWeight: 800 }}
                >
                  ✨ 특수 공물
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center">
                  <div className="text-3xl mb-2">👻</div>

                  <div
                    className="text-slate-700"
                    style={{ fontSize: "15px", fontWeight: 800 }}
                  >
                    정령
                  </div>

                  <div
                    className="text-violet-700 mt-2"
                    style={{ fontSize: "22px", fontWeight: 900 }}
                  >
                    5,000P
                  </div>
                </div>

                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-center">
                  <div className="text-3xl mb-2">🌟</div>

                  <div
                    className="text-slate-700"
                    style={{ fontSize: "15px", fontWeight: 800 }}
                  >
                    미식가의 별
                  </div>

                  <div
                    className="text-yellow-700 mt-2"
                    style={{ fontSize: "22px", fontWeight: 900 }}
                  >
                    70,000P
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 커스텀 농작물 */}
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🌽 커스텀 농작물
        </h3>

        <p
          className="text-slate-500 mb-5"
          style={{ fontSize: "13px", lineHeight: 1.8 }}
        >
          농작물 등급에 따라 획득 가능한 경쟁 포인트가 달라집니다.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            ["토마토", 80, 160, 400],
            ["옥수수", 80, 160, 400],
            ["가지", 80, 160, 400],
            ["고구마", 80, 160, 400],
            ["파프리카", 80, 160, 400],
            ["양배추", 100, 200, 450],
            ["쌀", 100, 200, 450],
            ["양파", 100, 200, 450],
            ["고추", 60, 120, 300],
            ["배추", 120, 250, 600],
            ["무", 120, 250, 600],
            ["콩", 50, 100, 240],
            ["마늘", 70, 140, 300],
            ["파", 70, 140, 300],
          ].map(([name, normal, silver, gold]) => (
            <div
              key={String(name)}
              className="border border-amber-100 rounded-2xl overflow-hidden bg-white"
            >
              <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
                <div
                  className="text-amber-700"
                  style={{ fontSize: "14px", fontWeight: 800 }}
                >
                  🌱 {name}
                </div>
              </div>

              <div className="p-3">
                <div className="grid grid-cols-3 gap-2">

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                    <div
                      className="text-slate-500"
                      style={{ fontSize: "11px" }}
                    >
                      일반
                    </div>

                    <div
                      className="text-slate-700 mt-1"
                      style={{ fontSize: "14px", fontWeight: 800 }}
                    >
                      {normal}
                    </div>
                  </div>

                  <div className="rounded-xl bg-gray-50 border border-gray-300 p-3 text-center">
                    <div
                      className="text-gray-500"
                      style={{ fontSize: "11px" }}
                    >
                      실버
                    </div>

                    <div
                      className="text-gray-700 mt-1"
                      style={{ fontSize: "14px", fontWeight: 800 }}
                    >
                      {silver}
                    </div>
                  </div>

                  <div className="rounded-xl bg-yellow-50 border border-yellow-300 p-3 text-center">
                    <div
                      className="text-yellow-700"
                      style={{ fontSize: "11px" }}
                    >
                      골드
                    </div>

                    <div
                      className="text-yellow-800 mt-1"
                      style={{ fontSize: "14px", fontWeight: 800 }}
                    >
                      {gold}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 산삼 특별 카드 */}
        <div className="mt-5 border-2 border-red-200 rounded-2xl overflow-hidden">
          <div className="bg-red-50 px-4 py-3 border-b border-red-100">
            <div
              className="text-red-700"
              style={{ fontSize: "15px", fontWeight: 900 }}
            >
              ⭐ 산삼
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 p-4">

            <div className="text-center rounded-xl bg-slate-50 border p-3">
              <div style={{ fontSize: "11px" }}>일반</div>
              <div className="font-black mt-1">6,000</div>
            </div>

            <div className="text-center rounded-xl bg-gray-50 border p-3">
              <div style={{ fontSize: "11px" }}>실버</div>
              <div className="font-black mt-1">12,000</div>
            </div>

            <div className="text-center rounded-xl bg-yellow-50 border border-yellow-300 p-3">
              <div style={{ fontSize: "11px" }}>골드</div>
              <div className="font-black mt-1">40,000</div>
            </div>

            <div className="text-center rounded-xl bg-violet-50 border border-violet-300 p-3">
              <div style={{ fontSize: "11px" }}>희귀</div>
              <div className="font-black mt-1">100,000</div>
            </div>

            <div className="text-center rounded-xl bg-red-50 border border-red-300 p-3">
              <div style={{ fontSize: "11px" }}>대형</div>
              <div className="font-black mt-1">500,000</div>
            </div>

          </div>
        </div>
      </div>

      {/* 요리 */}
      <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🍳 요리 경쟁 포인트
        </h3>

        <p
          className="text-slate-500 mb-5"
          style={{ fontSize: "13px", lineHeight: 1.8 }}
        >
          직접 제작한 요리를 제단에 공물로 바쳐 경쟁 포인트를 획득할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["자른당근", 30],
            ["수박주스", 60],
            ["감자튀김", 188],
            ["미역국", 225],
            ["코울슬로", 330],
            ["또띠아", 400],
            ["육개장", 420],
            ["시리얼", 540],
            ["오믈렛", 600],
            ["라면", 630],
            ["야채튀김", 750],
            ["타코", 1000],
            ["깍두기", 1200],
            ["김치", 1500],
            ["애플파이", 3000],
          ].map(([name, point]) => {
            let color =
              "bg-slate-50 border-slate-200 text-slate-700";

            if (Number(point) >= 1000) {
              color =
                "bg-violet-50 border-violet-200 text-violet-700";
            } else if (Number(point) >= 500) {
              color =
                "bg-orange-50 border-orange-200 text-orange-700";
            }

            return (
              <div
                key={String(name)}
                className="rounded-2xl border border-orange-100 overflow-hidden bg-white"
              >
                <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                  <div
                    className="text-orange-700"
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                    }}
                  >
                    🍽️ {name}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <span
                    className="text-slate-500"
                    style={{ fontSize: "12px" }}
                  >
                    경쟁 포인트
                  </span>

                  <span
                    className={`px-3 py-2 rounded-xl border ${color}`}
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                    }}
                  >
                    {Number(point).toLocaleString()} P
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <div
            className="text-orange-800 mb-2"
            style={{
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            💡 고득점 요리
          </div>

          <div
            className="text-orange-700"
            style={{
              fontSize: "13px",
              lineHeight: 1.8,
            }}
          >
            애플파이(3,000P), 김치(1,500P), 깍두기(1,200P),
            타코(1,000P)는 제단 경쟁에서 효율이 좋은 요리입니다.
          </div>
        </div>
      </div>

      {/* 순위 보상 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <h3
          className="text-yellow-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏆 순위 보상
        </h3>

        <p
          className="text-yellow-700 mb-5"
          style={{
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          시즌 종료 시 경쟁 포인트 순위에 따라 보상이 지급됩니다.
        </p>

        <div className="space-y-4">
          {[
            {
              rank: "🥇 1등",
              color: "yellow",
              rewards: [
                "천연 토종꿀 8개",
                "마법의 소라고동 10개",
                "의문의 빨강포션 4개",
                "신호기 1개",
                "미스틱 프로텍트 배리어 2개",
                "최상급 두루마리 강화서 10개",
                "경쟁전 랭커 50,000캐시",
                "엘레베이터 블럭 6개",
                "경쟁전 트로피 토큰 100개",
                "은행 현금 뭉텅이 10개",
              ],
            },
            {
              rank: "🥈 2등",
              color: "slate",
              rewards: [
                "천연 토종꿀 8개",
                "신호기 1개",
                "럭키 프로텍트 쉴드 1개",
                "최상급 두루마리 강화서 7개",
                "명장 복구석 1개",
                "경쟁전 랭커 30,000캐시",
                "경쟁전 트로피 토큰 60개",
                "은행 현금 뭉텅이 6개",
              ],
            },
            {
              rank: "🥉 3등",
              color: "orange",
              rewards: [
                "천연 토종꿀 6개",
                "최상급 두루마리 강화서 3개",
                "경쟁전 랭커 10,000캐시",
                "경쟁전 트로피 토큰 50개",
                "장인의 복구석 3개",
                "은행 현금 뭉텅이 3개",
              ],
            },
            {
              rank: "🏅 4등",
              color: "blue",
              rewards: [
                "최상급 두루마리 강화서 3개",
                "상급 두루마리 강화서 3개",
                "경쟁전 트로피 토큰 40개",
                "장인의 복구석 2개",
              ],
            },
            {
              rank: "🏅 5등",
              color: "blue",
              rewards: [
                "최상급 두루마리 강화서 3개",
                "상급 두루마리 강화서 2개",
                "경쟁전 트로피 토큰 40개",
                "장인의 복구석 2개",
              ],
            },
            {
              rank: "🏅 6등",
              color: "green",
              rewards: [
                "최상급 두루마리 강화서 2개",
                "상급 두루마리 강화서 2개",
                "경쟁전 트로피 토큰 30개",
                "전문가 복구석 4개",
              ],
            },
            {
              rank: "🏅 7등",
              color: "green",
              rewards: [
                "최상급 두루마리 강화서 2개",
                "상급 두루마리 강화서 2개",
                "경쟁전 트로피 토큰 30개",
                "전문가 복구석 3개",
              ],
            },
            {
              rank: "🏅 8~10등",
              color: "purple",
              rewards: [
                "최상급 두루마리 강화서 1개",
                "상급 두루마리 강화서 2개",
                "경쟁전 트로피 토큰 20개",
                "전문가 복구석 2개",
              ],
            },
          ].map((item) => (
            <div
              key={item.rank}
              className="bg-white border border-yellow-100 rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-100">
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                  }}
                >
                  {item.rank}
                </div>
              </div>

              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-2">
                  {item.rewards.map((reward) => (
                    <div
                      key={reward}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      {reward}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-white border border-yellow-100 rounded-2xl p-4">
          <div
            className="text-yellow-700 mb-2"
            style={{
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            💡 보상 안내
          </div>

          <p
            className="text-slate-600"
            style={{
              fontSize: "13px",
              lineHeight: 1.8,
            }}
          >
            실제 게임 내 보상은 매우 많기 때문에 핵심 보상만 표시했습니다.
            상세 보상은 게임 내 제단 메뉴에서 확인할 수 있습니다.
          </p>
        </div>
      </div>
      
      {/* 레벨 보상 */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
        <h3
          className="text-emerald-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📈 레벨 보상
        </h3>

        <p
          className="text-emerald-700 mb-5"
          style={{
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          경쟁 포인트를 누적하면 구간별 보상을 획득할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["1,000", "뼈다귀 3개 · 자연동 주괴 3개 · 경험치 병 7개"],
            ["5,000", "뼈다귀 5개 · 자연은 주괴 1개 · 경험치 병 1개"],
            ["10,000", "뼈다귀 5개 · 화려한 금 주괴 1개 · 경험치 병 2개"],
            ["50,000", "화려한 금 주괴 3개 · 경험치 병 5개 · 폭죽 로켓 3개"],
            ["100,000", "화려한 금 주괴 4개 · 가공된 꿀조각 1개"],
            ["300,000", "자동심기 기술 주문서(+1000회) · 엘레베이터 블럭"],
            ["500,000", "자연 꿀밀랍 · 은행 현금 뭉텅이"],
            ["1,000,000", "화려한 이리듐 주괴 · 천연 토종꿀"],
            ["1,500,000", "하급 강화서 · 빛 블럭"],
            ["2,000,000", "중급 강화서 · 일반 소라고동 2개"],
            ["2,500,000", "자동심기 기술 주문서(+3000회)"],
            ["3,000,000", "양조기 · 엘레베이터 블럭"],
            ["3,500,000", "중급 강화서 · 천연 토종꿀 2개"],
            ["4,000,000", "엔더상자 · 자연 꿀밀랍"],
            ["5,000,000", "중급 강화서 · 화려한 이리듐 주괴"],
            ["6,000,000", "양조기 · 의문의 빨강포션"],
            ["7,000,000", "상급 강화서 · 일반 소라고동 3개"],
            ["10,000,000", "반짝반짝 거울 · 중급 강화서"],
            ["12,000,000", "상급 강화서 · 엘레베이터 블럭"],
            ["15,000,000", "최상급 강화서 · 마법의 소라고동"],
            ["20,000,000", "럭키 프로텍트 쉴드 · 장인 복구석"],
          ].map(([point, reward]) => (
            <div
              key={point}
              className="bg-white border border-emerald-100 rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
                <div
                  className="text-emerald-700"
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                >
                  {point} 포인트
                </div>
              </div>

              <div className="p-4">
                <div
                  className="text-slate-600"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                  }}
                >
                  {reward}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 사제 상점 */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
        <h3
          className="text-violet-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🛒 사제 상점
        </h3>

        <p
          className="text-violet-700 mb-5"
          style={{
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          제단 경쟁 포인트를 사용하여 다양한 아이템을 구매할 수 있습니다.
        </p>

        <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-violet-50 border-b border-violet-100">
            <div
              className="text-violet-700"
              style={{
                fontSize: "14px",
                fontWeight: 800,
              }}
            >
              🪨 판매 아이템
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-4 bg-violet-50 border border-violet-100 rounded-xl p-4">
              <div>
                <div
                  className="text-slate-700"
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  미가공 복구석ㆍ거친 원석
                </div>

                <div
                  className="text-slate-500 mt-1"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  사제 상점 전용 아이템
                </div>
              </div>

              <div
                className="px-3 py-2 rounded-xl bg-violet-100 text-violet-800"
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                2,000,000 P
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function SeotdaContent() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <h3
          className="text-yellow-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🃏 섯다
        </h3>

        <p
          className="text-yellow-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          섯다를 통해 다른 유저와 승부를 겨루어 보세요.
          <br />
          아래 족보 순서를 확인하고 더욱 유리하게 플레이할 수 있습니다.
        </p>
      </div>

      <div className="bg-white border border-yellow-100 rounded-2xl p-4 shadow-sm">
        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Aa55dfea3-3152-474f-ba50-398cdb605ee4%3Aimage.png?table=block&id=2d101bc3-8f0f-804c-90bf-cdfe4fe82f14&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=880&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="섯다"
          className="w-full rounded-2xl"
        />
      </div>

      <div className="bg-white border border-yellow-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏆 섯다 승리 순서
        </h3>

        <div className="space-y-3">
          {[
            "3,8 광땡 / 1,8 광땡",
            "땡 (같은 카드)",
            "1,2 알리",
            "1,4 독사",
            "1,9 구삥",
            "10,1 장삥",
            "10,4 장사",
            "4,6 세륙",
            "끗 (높은 수)",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div
                className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800"
                style={{ fontSize: "13px", fontWeight: 800 }}
              >
                {index + 1}
              </div>

              <div
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
        <h3
          className="text-sky-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💡 땡잡이 규칙
        </h3>

        <p
          className="text-sky-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          땡이 승리 패일 경우에는
          <strong> 땡잡이 패가 승리</strong>합니다.
          <br />
          높은 땡이라도 땡잡이에게는 패배할 수 있으니 주의하세요.
        </p>
      </div>
    </div>
  );
}

function DonationKingContent() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          👑 기부왕
        </h3>

        <p
          className="text-amber-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          기부왕은 매달 1일과 16일에 종료되며,
          가장 많은 돈을 기부한 1등 유저에게 약 15일간
          기부왕 혜택이 부여됩니다.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <h3
          className="text-yellow-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏆 기부왕 혜택
        </h3>

        <div
          className="text-yellow-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          • 특성 경험치 15% 추가 획득
          <br />
          • 특성별 추가 효과 적용
          <br />
          • 약 15일 동안 혜택 유지
        </div>
      </div>

      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ✨ 특성별 혜택
        </h3>

        <div className="space-y-3">
          {[
            ["⛏️ 채광", "크리스탈 획득 확률 증가"],
            ["🌾 수확", "산삼씨앗 획득 확률 증가"],
            ["🪵 벌목", "도토리 획득 확률 증가"],
            ["🎣 낚시", "진주 획득 확률 증가"],
            ["🍳 요리", "요리 별점 획득 확률 증가"],
          ].map(([trait, benefit]) => (
            <div
              key={trait}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <span
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                {trait}
              </span>

              <span
                className="text-amber-700 text-right"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <h3
          className="text-green-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📈 추가 효과
        </h3>

        <p
          className="text-green-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          기부왕 혜택의 확률은
          <strong> 기본 드랍 확률의 약 30% 추가</strong>로 적용됩니다.
        </p>
      </div>
    </div>
  );
}

function MarriageContent() {
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5">
        <h3
          className="text-pink-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💒 결혼
        </h3>

        <p
          className="text-pink-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          /결혼 명령어를 통해 다양한 결혼 관련 기능을 이용할 수 있습니다.
          <br />
          결혼 후 애정도를 쌓아 숙련도 및 다양한 혜택을 획득해보세요.
        </p>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
        <h3
          className="text-rose-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💕 결혼 혜택
        </h3>

        <p
          className="text-rose-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          결혼 애정도에 따라 숙련도 보너스와 다양한 혜택을 받을 수 있습니다.
        </p>
      </div>

      <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📜 결혼 명령어
        </h3>

        <div className="space-y-3">
          {[
            ["/결혼 청혼 [닉네임] [커플이름]", "상대방에게 청혼합니다."],
            ["/결혼 수락 [닉네임]", "상대방의 청혼을 수락합니다."],
            ["/결혼 거절 [닉네임]", "상대방의 청혼을 거절합니다."],
            ["/결혼 이혼", "결혼한 상대방과 이혼합니다."],
            ["/결혼 애정도", "현재 애정도를 확인합니다."],
            ["/결혼 텔레포트", "배우자에게 텔레포트합니다."],
            ["/결혼 채팅", "배우자와 전용 채팅을 사용합니다."],
            ["/결혼 정보 [닉네임]", "다른 유저의 결혼 정보를 확인합니다."],
          ].map(([command, desc]) => (
            <div
              key={command}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div
                className="text-pink-700 mb-2"
                style={{ fontSize: "13px", fontWeight: 800 }}
              >
                {command}
              </div>

              <div
                className="text-slate-600"
                style={{ fontSize: "13px", lineHeight: 1.7 }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💍 커플링
        </h3>

        <p
          className="text-slate-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          커플링은 결혼식장에서 구매할 수 있습니다.
        </p>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3Aaa76b111-6ab9-4d4f-93d7-6535493fbb4f%3Aimage.png?table=block&id=2d101bc3-8f0f-80e5-899b-d88cc9284370&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=590&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="커플링"
          className="w-32 rounded-2xl mb-4"
        />

        <div className="space-y-3">
          {[
            ["사랑의 인장 프리미엄 커플링", "29,900 캐시"],
            ["서로의 약속 일반 커플링", "50,000,000원"],
          ].map(([name, price]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <span
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {name}
              </span>

              <span
                className="px-3 py-1 rounded-lg bg-pink-100 text-pink-800"
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParkourContent() {
  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
        <h3
          className="text-cyan-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏃 파쿠르
        </h3>

        <p
          className="text-cyan-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          스폰 파쿠르는 매주 일요일 오후 10시에 자동으로 순위가
          초기화됩니다.
          <br />
          순위에 따라 점핑 점핑 파쿠르 번개 코인을 획득할 수 있습니다.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <h3
          className="text-yellow-800 mb-4"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏆 순위 보상
        </h3>

        <div className="space-y-3">
          {[
            ["🥇 1등", "점핑 점핑 파쿠르 번개 코인 30개"],
            ["🥈 2등", "점핑 점핑 파쿠르 번개 코인 20개"],
            ["🥉 3등", "점핑 점핑 파쿠르 번개 코인 10개"],
            ["🏅 4~10등", "점핑 점핑 파쿠르 번개 코인 5개"],
          ].map(([rank, reward]) => (
            <div
              key={rank}
              className="bg-white border border-yellow-100 rounded-xl p-4 flex justify-between items-center"
            >
              <span
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                {rank}
              </span>

              <span
                className="text-yellow-700"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                {reward}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-cyan-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          ⚡ 파쿠르 코인 상점
        </h3>

        <div className="space-y-3">
          {[
            ["천연 토종꿀", "1개"],
            ["엘레베이터 블럭", "2개"],
            ["다이너마이트", "3개"],
            ["엔더 상자", "3개"],
            ["스킨 제거 가위", "10개"],
            ["최상급 두루마리 강화서 [80%]", "10개"],
            ["무한의 겉날개", "25개"],
            ["[ 경작 ] 허수아비 괭이", "30개"],
            ["마술봉 원터치 막대", "35개"],
            ["프리미엄 닉네임 변경권 (1회용)", "50개"],
          ].map(([name, price]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <span
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {name}
              </span>

              <span
                className="px-3 py-1 rounded-lg bg-cyan-100 text-cyan-800"
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                코인 {price}
              </span>
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
        "황금 뼈가루 (10개)",
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
    { day: 5, items: ["가공된 꿀조각", "산삼 씨앗", "뼈 (10개)"] },
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
        "뼈 (5개)",
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
      items: ["가공된 꿀조각", "뼈 (15개)", "자동심기 기술 주문서 (+2000회)"],
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
    { day: 11, items: ["황금 뼈가루 (20개)", "제초기"] },
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
        "자동심기 기술 주문서 (+3000회) (2개)",
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
        "황금 뼈가루 (30개)",
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
        "뼈 (15개)",
        "하급 두루마리 강화서 [50% 주문서 뽑기]",
        "도토리 (15개)",
        "우아한 바다진주",
      ],
    },
    {
      day: 20,
      items: [
        "황금 뼈가루 (30개)",
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
        "뼈 (15개)",
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
        "뼈 (10개)",
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
    if (item.includes("뼈가루") || item.includes("뼈"))
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
    "뼈 (5개)",
  ];
  const hottimeRewards = [
    "자연 꿀밀랍",
    "자동심기 기술 주문서 (+1000회)",
    "금 블럭 64개",
    "다이아몬드 블럭 64개",
    "에메랄드 블럭 64개",
    "[화폐] 화려한 금 주괴 (5개)",
    "뼈 (5개)",
    "경험치 병 (64개)",
    "황금 뼈가루 (15개)",
  ];
  const hottimeExtraRewards = [
    "하급 두루마리 강화서 [50% 주문서 뽑기]",
    "황금 뼈가루 (15개)",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 일일보상 */}
        <div className="lg:col-span-2 bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-amber-50 flex-shrink-0">
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
          <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
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

          <div className="bg-white border-2 border-rose-200 rounded-2xl overflow-hidden shadow-sm">
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
type ShopRow = {
  name: string;
  buy: string;
  sell: string;
};

type ShopSection = {
  key: string;
  label: string;
  emoji: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
  items: ShopRow[];
};

const shopSections: ShopSection[] = [
  {
    key: "general",
    label: "광물",
    emoji: "⛏️",
    desc: "광물 관련 고정 상점가",
    color: "#6366f1",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    items: [
      { name: "석탄", buy: "구매 불가", sell: "4원" },
      { name: "석탄 광석", buy: "구매 불가", sell: "15원" },
      { name: "석탄 블록", buy: "구매 불가", sell: "36원" },
      { name: "구리 원석", buy: "구매 불가", sell: "5원" },
      { name: "구리 주괴", buy: "구매 불가", sell: "6원" },
      { name: "구리 원석 블록", buy: "구매 불가", sell: "18원" },
      { name: "구리 블록", buy: "구매 불가", sell: "54원" },
      { name: "네더라이트 파편", buy: "구매 불가", sell: "판매 불가" },
      { name: "네더라이트 주괴", buy: "구매 불가", sell: "판매 불가" },
      { name: "네더라이트 블록", buy: "구매 불가", sell: "판매 불가" },
      { name: "철 원석", buy: "구매 불가", sell: "8원" },
      { name: "철 주괴", buy: "구매 불가", sell: "10원" },
      { name: "철 광석", buy: "구매 불가", sell: "35원" },
      { name: "철 블록", buy: "구매 불가", sell: "90원" },
      { name: "철 원석 블록", buy: "구매 불가", sell: "80원" },
      { name: "금 원석", buy: "구매 불가", sell: "12원" },
      { name: "금 주괴", buy: "구매 불가", sell: "15원" },
      { name: "금 광석", buy: "구매 불가", sell: "45원" },
      { name: "금 블록", buy: "구매 불가", sell: "135원" },
      { name: "금 원석 블록", buy: "구매 불가", sell: "108원" },
      { name: "다이아몬드", buy: "구매 불가", sell: "27원" },
      { name: "다이아몬드 블록", buy: "구매 불가", sell: "243원" },
      { name: "다이아몬드 광석", buy: "구매 불가", sell: "120원" },
      { name: "에메랄드", buy: "구매 불가", sell: "50원" },
      { name: "에메랄드 블록", buy: "구매 불가", sell: "450원" },
      { name: "에메랄드 광석", buy: "구매 불가", sell: "200원" },
      { name: "돌", buy: "구매 불가", sell: "2원" },
      { name: "조약돌", buy: "구매 불가", sell: "1원" },
      { name: "청금석", buy: "구매 불가", sell: "1원" },
      { name: "청금석 광석", buy: "구매 불가", sell: "9원" },
      { name: "청금석 블록", buy: "구매 불가", sell: "9원" },
    ],
  },
  {
    key: "crops",
    label: "농작물",
    emoji: "🌽",
    desc: "농작물 및 씨앗 고정 상점가",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    items: [
      { name: "밀 씨앗", buy: "12원", sell: "1원" },
      { name: "비트 씨앗", buy: "12원", sell: "1원" },
      { name: "호박씨", buy: "20원", sell: "판매 불가" },
      { name: "수박씨", buy: "20원", sell: "판매 불가" },
      { name: "네더 사마귀", buy: "100원", sell: "26원" },
      { name: "코코아콩", buy: "150원", sell: "28원" },
      { name: "당근", buy: "150원", sell: "25원" },
      { name: "감자", buy: "150원", sell: "27원" },
      { name: "독이 있는 감자", buy: "구매 불가", sell: "2,000원" },
      { name: "밀", buy: "구매 불가", sell: "110원" },
      { name: "비트", buy: "구매 불가", sell: "110원" },
      { name: "호박", buy: "구매 불가", sell: "90원" },
      { name: "수박", buy: "구매 불가", sell: "95원" },
      { name: "수박 조각", buy: "구매 불가", sell: "11원" },
      { name: "달콤한 열매", buy: "150원", sell: "19원" },
      { name: "대나무", buy: "150원", sell: "20원" },
      { name: "대나무 블록", buy: "구매 불가", sell: "198원" },
      { name: "건초더미", buy: "구매 불가", sell: "990원" },
      { name: "사탕수수", buy: "150원", sell: "25원" },
      { name: "지렁이", buy: "구매 불가", sell: "7,000원" },
      { name: "물 양동이", buy: "100원", sell: "판매 불가" },
      { name: "네더 사마귀 블록", buy: "구매 불가", sell: "279원" },
      { name: "도토리", buy: "구매 불가", sell: "5,000원" },
      { name: "발광 열매", buy: "150원", sell: "판매 불가" },
      { name: "벌집", buy: "구매 불가", sell: "판매 불가" },
      { name: "꿀벌 생성알", buy: "구매 불가", sell: "판매 불가" },
      { name: "벌집 조각", buy: "구매 불가", sell: "판매 불가" },
    ],
  },
  {
    key: "food",
    label: "음식",
    emoji: "🍞",
    desc: "음식 및 조리 재료 고정 상점가",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fdba74",
    items: [
      { name: "사과", buy: "구매 불가", sell: "5,000원" },
      { name: "익히지 않은 양고기", buy: "250원", sell: "판매 불가" },
      { name: "익힌 양고기", buy: "300원", sell: "판매 불가" },
      { name: "익히지 않은 소고기", buy: "250원", sell: "판매 불가" },
      { name: "스테이크", buy: "300원", sell: "판매 불가" },
      { name: "익히지 않은 돼지고기", buy: "250원", sell: "판매 불가" },
      { name: "익힌 돼지고기", buy: "300원", sell: "판매 불가" },
      { name: "익히지 않은 닭고기", buy: "250원", sell: "판매 불가" },
      { name: "익힌 닭고기", buy: "300원", sell: "판매 불가" },
      { name: "구운 감자", buy: "200원", sell: "32원" },
      { name: "호박 파이", buy: "구매 불가", sell: "판매 불가" },
      { name: "익히지 않은 토끼고기", buy: "250원", sell: "판매 불가" },
      { name: "익힌 토끼고기", buy: "300원", sell: "판매 불가" },
      { name: "익힌 대구", buy: "구매 불가", sell: "판매 불가" },
      { name: "익힌 연어", buy: "구매 불가", sell: "판매 불가" },
      { name: "빵", buy: "구매 불가", sell: "판매 불가" },
      { name: "케이크", buy: "구매 불가", sell: "판매 불가" },
      { name: "쿠키", buy: "구매 불가", sell: "판매 불가" },
      { name: "꿀이 든 병", buy: "구매 불가", sell: "판매 불가" },
      { name: "버섯 스튜", buy: "구매 불가", sell: "판매 불가" },
      { name: "비트 수프", buy: "구매 불가", sell: "판매 불가" },
      { name: "토끼 스튜", buy: "구매 불가", sell: "판매 불가" },
    ],
  },
  {
    key: "wood",
    label: "나무",
    emoji: "🪵",
    desc: "원목, 잎, 묘목, 껍질 벗긴 원목 고정 상점가",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    items: [
      { name: "참나무 원목", buy: "200원", sell: "100원" },
      { name: "가문비나무 원목", buy: "200원", sell: "100원" },
      { name: "자작나무 원목", buy: "200원", sell: "100원" },
      { name: "정글나무 원목", buy: "200원", sell: "100원" },
      { name: "아카시아나무 원목", buy: "200원", sell: "100원" },
      { name: "짙은 참나무 원목", buy: "200원", sell: "100원" },
      { name: "맹그로브나무 원목", buy: "200원", sell: "100원" },
      { name: "벚나무 원목", buy: "200원", sell: "100원" },
      { name: "진홍빛 자루", buy: "구매 불가", sell: "100원" },
      { name: "뒤틀린 자루", buy: "구매 불가", sell: "100원" },
      { name: "참나무 잎", buy: "100원", sell: "10원" },
      { name: "가문비나무 잎", buy: "100원", sell: "10원" },
      { name: "자작나무 잎", buy: "100원", sell: "10원" },
      { name: "정글나무 잎", buy: "100원", sell: "10원" },
      { name: "아카시아나무 잎", buy: "100원", sell: "10원" },
      { name: "짙은 참나무 잎", buy: "100원", sell: "10원" },
      { name: "맹그로브나무 잎", buy: "100원", sell: "10원" },
      { name: "벚나무 잎", buy: "100원", sell: "10원" },
      { name: "진달래 잎", buy: "100원", sell: "10원" },
      { name: "꽃 핀 진달래 잎", buy: "100원", sell: "10원" },
      { name: "참나무 묘목", buy: "100원", sell: "30원" },
      { name: "가문비나무 묘목", buy: "100원", sell: "30원" },
      { name: "자작나무 묘목", buy: "100원", sell: "30원" },
      { name: "정글나무 묘목", buy: "100원", sell: "30원" },
      { name: "아카시아나무 묘목", buy: "100원", sell: "30원" },
      { name: "짙은 참나무 묘목", buy: "100원", sell: "30원" },
      { name: "벚나무 묘목", buy: "100원", sell: "30원" },
      { name: "맹그로브나무 주아", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 참나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 가문비나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 자작나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 정글나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 아카시아나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 짙은 참나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 맹그로브나무 원목", buy: "100원", sell: "30원" },
      { name: "껍질 벗긴 벚나무 원목", buy: "100원", sell: "30원" },
    ],
  },
  {
    key: "flowers",
    label: "꽃",
    emoji: "🌸",
    desc: "꽃, 산호, 덩굴류 고정 상점가",
    color: "#db2777",
    bg: "#fdf2f8",
    border: "#f9a8d4",
    items: [
      { name: "민들레", buy: "100원", sell: "판매 불가" },
      { name: "양귀비", buy: "100원", sell: "판매 불가" },
      { name: "파란색 난초", buy: "100원", sell: "판매 불가" },
      { name: "알리움", buy: "100원", sell: "판매 불가" },
      { name: "선애기별꽃", buy: "100원", sell: "판매 불가" },
      { name: "빨간색 튤립", buy: "100원", sell: "판매 불가" },
      { name: "주황색 튤립", buy: "100원", sell: "판매 불가" },
      { name: "하얀색 튤립", buy: "100원", sell: "판매 불가" },
      { name: "분홍색 튤립", buy: "100원", sell: "판매 불가" },
      { name: "데이지", buy: "100원", sell: "판매 불가" },
      { name: "수레국화", buy: "100원", sell: "판매 불가" },
      { name: "은방울꽃", buy: "100원", sell: "판매 불가" },
      { name: "분홍 꽃잎", buy: "100원", sell: "판매 불가" },
      { name: "해바라기", buy: "100원", sell: "판매 불가" },
      { name: "장미 덤불", buy: "100원", sell: "판매 불가" },
      { name: "라일락", buy: "100원", sell: "판매 불가" },
      { name: "덩굴", buy: "100원", sell: "판매 불가" },
      { name: "늘어진 덩굴", buy: "100원", sell: "판매 불가" },
      { name: "휘어진 덩굴", buy: "100원", sell: "판매 불가" },
      { name: "발광 이끼", buy: "100원", sell: "판매 불가" },
      { name: "매달린 뿌리", buy: "100원", sell: "판매 불가" },
      { name: "모란", buy: "100원", sell: "판매 불가" },
      { name: "포자 꽃", buy: "100원", sell: "판매 불가" },
      { name: "수련잎", buy: "100원", sell: "판매 불가" },
      { name: "큰 흘림잎", buy: "100원", sell: "판매 불가" },
      { name: "작은 흘림잎", buy: "100원", sell: "판매 불가" },
      { name: "해초", buy: "100원", sell: "판매 불가" },
      { name: "관 산호", buy: "100원", sell: "판매 불가" },
      { name: "뇌 산호", buy: "100원", sell: "판매 불가" },
      { name: "거품 산호", buy: "100원", sell: "판매 불가" },
      { name: "불 산호", buy: "100원", sell: "판매 불가" },
      { name: "사방산호", buy: "100원", sell: "판매 불가" },
      { name: "부채형 관 산호", buy: "100원", sell: "판매 불가" },
      { name: "부채형 뇌 산호", buy: "100원", sell: "판매 불가" },
      { name: "부채형 거품 산호", buy: "100원", sell: "판매 불가" },
      { name: "부채형 불 산호", buy: "100원", sell: "판매 불가" },
      { name: "부채형 사방산호", buy: "100원", sell: "판매 불가" },
      { name: "불우렁쉥이", buy: "100원", sell: "판매 불가" },
      { name: "사방산호 블록", buy: "100원", sell: "판매 불가" },
      { name: "불 블록", buy: "100원", sell: "판매 불가" },
      { name: "거품 산호 블록", buy: "100원", sell: "판매 불가" },
      { name: "뇌 산호 블록", buy: "100원", sell: "판매 불가" },
      { name: "관 산호 블록", buy: "100원", sell: "판매 불가" },
      { name: "켈프", buy: "200원", sell: "50원" },
      { name: "마른 덤불", buy: "100원", sell: "판매 불가" },
    ],
  },
  {
    key: "currency",
    label: "화폐",
    emoji: "💰",
    desc: "화폐 및 기본 장비, 유틸 아이템 고정 상점가",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    items: [
      { name: "[ 화폐 ] 자연동 주괴", buy: "10,000원", sell: "10,000원" },
      { name: "[ 화폐 ] 자연은 주괴", buy: "50,000원", sell: "50,000원" },
      { name: "[ 화폐 ] 화려한 금 주괴", buy: "100,000원", sell: "100,000원" },
      {
        name: "[ 화폐 ] 화려한 이리듐 주괴",
        buy: "500,000원",
        sell: "500,000원",
      },
      {
        name: "[ 화폐 ] 빛나는 다이아 주괴",
        buy: "1,000,000원",
        sell: "1,000,000원",
      },
      {
        name: "[ 기본 ] 입주민 상징 [ 헬멧 ]",
        buy: "15,000원",
        sell: "판매 불가",
      },
      {
        name: "[ 기본 ] 입주민 상징 [ 상의 ]",
        buy: "15,000원",
        sell: "판매 불가",
      },
      {
        name: "[ 기본 ] 입주민 상징 [ 하의 ]",
        buy: "15,000원",
        sell: "판매 불가",
      },
      {
        name: "[ 기본 ] 입주민 상징 [ 신발 ]",
        buy: "15,000원",
        sell: "판매 불가",
      },
      { name: "[ 기본 ] 입주민의 곡괭이", buy: "15,000원", sell: "판매 불가" },
      { name: "[ 기본 ] 입주민의 도끼", buy: "15,000원", sell: "판매 불가" },
      { name: "[ 기본 ] 입주민의 삽", buy: "15,000원", sell: "판매 불가" },
      { name: "[ 기본 ] 입주민의 괭이", buy: "15,000원", sell: "판매 불가" },
      { name: "일반인의 낚싯대", buy: "15,000원", sell: "판매 불가" },
      { name: "나만의 특성 재선택권", buy: "7,000,000원", sell: "판매 불가" },
      {
        name: "랜덤 두루마리 강화서 [ 50~80% ]",
        buy: "4,000,000원",
        sell: "판매 불가",
      },
      {
        name: "일반 복구석 깨진 조각의 희망",
        buy: "500,000원",
        sell: "판매 불가",
      },
      { name: "특성 및 레벨 복구권", buy: "10,000,000원", sell: "판매 불가" },
    ],
  },
  {
    key: "blocks",
    label: "블록",
    emoji: "🧱",
    desc: "기본 건축 블록 고정 상점가",
    color: "#475569",
    bg: "#f8fafc",
    border: "#cbd5e1",
    items: [
      { name: "돌", buy: "10원", sell: "2원" },
      { name: "조약돌", buy: "10원", sell: "1원" },
      { name: "이끼 낀 조약돌", buy: "100원", sell: "30원" },
      { name: "단단한 진흙", buy: "100원", sell: "30원" },
      { name: "흙", buy: "100원", sell: "30원" },
      { name: "잔디 블록", buy: "100원", sell: "30원" },
      { name: "회백토", buy: "100원", sell: "30원" },
      { name: "균사체", buy: "100원", sell: "30원" },
      { name: "흙 길", buy: "100원", sell: "30원" },
      { name: "섬록암", buy: "100원", sell: "30원" },
      { name: "안산암", buy: "100원", sell: "30원" },
      { name: "심층암", buy: "100원", sell: "30원" },
      { name: "심층암 조약돌", buy: "100원", sell: "30원" },
      { name: "현무암", buy: "100원", sell: "30원" },
      { name: "흑암", buy: "100원", sell: "30원" },
      { name: "프리즈머린", buy: "100원", sell: "30원" },
      { name: "프리즈머린 벽돌", buy: "100원", sell: "30원" },
      { name: "짙은 프리즈머린", buy: "100원", sell: "30원" },
      { name: "네더랙", buy: "100원", sell: "30원" },
      { name: "네더 벽돌", buy: "100원", sell: "30원" },
      { name: "엔드 돌", buy: "100원", sell: "30원" },
      { name: "퍼퍼 블록", buy: "100원", sell: "30원" },
      { name: "석영 블록", buy: "100원", sell: "30원" },
      { name: "화강암", buy: "100원", sell: "30원" },
      { name: "벽돌", buy: "100원", sell: "30원" },
      { name: "사암", buy: "100원", sell: "30원" },
      { name: "붉은 사암", buy: "100원", sell: "30원" },
      { name: "모래", buy: "100원", sell: "30원" },
      { name: "붉은 모래", buy: "100원", sell: "30원" },
      { name: "뒤틀린 네사체", buy: "100원", sell: "30원" },
      { name: "진홍빛 네사체", buy: "100원", sell: "30원" },
      { name: "흑요석", buy: "100원", sell: "30원" },
      { name: "응회암", buy: "100원", sell: "30원" },
      { name: "점토", buy: "100원", sell: "30원" },
      { name: "뿌리내린 흙", buy: "100원", sell: "30원" },
      { name: "자갈", buy: "100원", sell: "30원" },
      { name: "진흙", buy: "100원", sell: "30원" },
      { name: "거친 흙", buy: "100원", sell: "30원" },
      { name: "마그마 블록", buy: "100원", sell: "30원" },
      { name: "영혼 흙", buy: "100원", sell: "30원" },
      { name: "영혼 모래", buy: "100원", sell: "30원" },
      { name: "점적석 블록", buy: "100원", sell: "30원" },
      { name: "이끼 블록", buy: "100원", sell: "30원" },
      { name: "방해석", buy: "100원", sell: "30원" },
      { name: "눈 블록", buy: "100원", sell: "30원" },
      { name: "유리", buy: "100원", sell: "30원" },
      { name: "차광 유리", buy: "100원", sell: "30원" },
      { name: "스펀지", buy: "100원", sell: "30원" },
      { name: "빨간색 버섯 블록", buy: "100원", sell: "30원" },
      { name: "갈색 버섯 블록", buy: "100원", sell: "30원" },
      { name: "바다 랜턴", buy: "100원", sell: "30원" },
      { name: "잔딧빛 개구리불", buy: "100원", sell: "30원" },
      { name: "진줏빛 개구리불", buy: "100원", sell: "30원" },
      { name: "황톳빛 개구리불", buy: "100원", sell: "30원" },
      { name: "버섯불", buy: "100원", sell: "30원" },
      { name: "발광석", buy: "100원", sell: "30원" },
      { name: "얼음", buy: "100원", sell: "30원" },
      { name: "꽁꽁 언 얼음", buy: "100원", sell: "30원" },
      { name: "푸른얼음", buy: "100원", sell: "30원" },
      { name: "매끄러운 석영 블록", buy: "100원", sell: "30원" },
      { name: "매끄러운 사암", buy: "100원", sell: "30원" },
      { name: "자수정 블록", buy: "100원", sell: "30원" },
      { name: "꿀 블록", buy: "100원", sell: "30원" },
      { name: "슬라임 블록", buy: "100원", sell: "30원" },
      { name: "벌집 조각 블록", buy: "100원", sell: "30원" },
      { name: "뒤틀린 사마귀 블록", buy: "100원", sell: "30원" },
      { name: "엔드 석재 벽돌", buy: "100원", sell: "30원" },
      { name: "매끄러운 돌", buy: "100원", sell: "판매 불가" },
      { name: "금 간 네더 벽돌", buy: "100원", sell: "판매 불가" },
      { name: "매끄러운 붉은 사암", buy: "100원", sell: "30원" },
      { name: "윤나는 흑암", buy: "100원", sell: "30원" },
      { name: "윤나는 심층암", buy: "100원", sell: "30원" },
      { name: "석재 벽돌", buy: "100원", sell: "판매 불가" },
    ],
  },
  {
    key: "colored-blocks",
    label: "색깔 블록",
    emoji: "🎨",
    desc: "색상 계열 건축 블록 고정 상점가",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe",
    items: [
      { name: "하얀색 양털", buy: "100원", sell: "30원" },
      { name: "회백색 양털", buy: "100원", sell: "30원" },
      { name: "회색 양털", buy: "100원", sell: "30원" },
      { name: "검은색 양털", buy: "100원", sell: "30원" },
      { name: "갈색 양털", buy: "100원", sell: "30원" },
      { name: "빨간색 양털", buy: "100원", sell: "30원" },
      { name: "주황색 양털", buy: "100원", sell: "30원" },
      { name: "노란색 양털", buy: "100원", sell: "30원" },
      { name: "연두색 양털", buy: "100원", sell: "30원" },
      { name: "초록색 양털", buy: "100원", sell: "30원" },
      { name: "청록색 양털", buy: "100원", sell: "30원" },
      { name: "하늘색 양털", buy: "100원", sell: "30원" },
      { name: "파란색 양털", buy: "100원", sell: "30원" },
      { name: "보라색 양털", buy: "100원", sell: "30원" },
      { name: "자홍색 양털", buy: "100원", sell: "30원" },
      { name: "분홍색 양털", buy: "100원", sell: "30원" },
      { name: "하얀색 테라코타", buy: "100원", sell: "30원" },
      { name: "회백색 테라코타", buy: "100원", sell: "30원" },
      { name: "회색 테라코타", buy: "100원", sell: "30원" },
      { name: "검은색 테라코타", buy: "100원", sell: "30원" },
      { name: "갈색 테라코타", buy: "100원", sell: "30원" },
      { name: "빨간색 테라코타", buy: "100원", sell: "30원" },
      { name: "주황색 테라코타", buy: "100원", sell: "30원" },
      { name: "노란색 테라코타", buy: "100원", sell: "30원" },
      { name: "연두색 테라코타", buy: "100원", sell: "30원" },
      { name: "초록색 테라코타", buy: "100원", sell: "30원" },
      { name: "테라코타", buy: "100원", sell: "30원" },
      { name: "청록색 테라코타", buy: "100원", sell: "30원" },
      { name: "하늘색 테라코타", buy: "100원", sell: "30원" },
      { name: "파란색 테라코타", buy: "100원", sell: "30원" },
      { name: "보라색 테라코타", buy: "100원", sell: "30원" },
      { name: "자홍색 테라코타", buy: "100원", sell: "30원" },
      { name: "분홍색 테라코타", buy: "100원", sell: "30원" },
      { name: "하얀색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "회백색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "회색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "검은색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "갈색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "빨간색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "주황색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "노란색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "연두색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "초록색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "청록색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "하늘색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "파란색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "보라색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "자홍색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "분홍색 유광 테라코타", buy: "100원", sell: "30원" },
      { name: "하얀색 콘크리트", buy: "100원", sell: "30원" },
      { name: "회백색 콘크리트", buy: "100원", sell: "30원" },
      { name: "회색 콘크리트", buy: "100원", sell: "30원" },
      { name: "검은색 콘크리트", buy: "100원", sell: "30원" },
      { name: "갈색 콘크리트", buy: "100원", sell: "30원" },
      { name: "빨간색 콘크리트", buy: "100원", sell: "30원" },
      { name: "주황색 콘크리트", buy: "100원", sell: "30원" },
      { name: "노란색 콘크리트", buy: "100원", sell: "30원" },
      { name: "연두색 콘크리트", buy: "100원", sell: "30원" },
      { name: "초록색 콘크리트", buy: "100원", sell: "30원" },
      { name: "청록색 콘크리트", buy: "100원", sell: "30원" },
      { name: "하늘색 콘크리트", buy: "100원", sell: "30원" },
      { name: "파란색 콘크리트", buy: "100원", sell: "30원" },
      { name: "보라색 콘크리트", buy: "100원", sell: "30원" },
      { name: "자홍색 콘크리트", buy: "100원", sell: "30원" },
      { name: "분홍색 콘크리트", buy: "100원", sell: "30원" },
      { name: "하얀색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "회백색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "회색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "검은색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "갈색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "빨간색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "주황색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "노란색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "연두색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "초록색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "청록색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "하늘색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "파란색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "보라색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "자홍색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "분홍색 콘크리트 가루", buy: "100원", sell: "30원" },
      { name: "하얀색 색유리", buy: "100원", sell: "30원" },
      { name: "회백색 색유리", buy: "100원", sell: "30원" },
      { name: "회색 색유리", buy: "100원", sell: "30원" },
      { name: "검은색 색유리", buy: "100원", sell: "30원" },
      { name: "갈색 색유리", buy: "100원", sell: "30원" },
      { name: "빨간색 색유리", buy: "100원", sell: "30원" },
      { name: "주황색 색유리", buy: "100원", sell: "30원" },
      { name: "노란색 색유리", buy: "100원", sell: "30원" },
      { name: "연두색 색유리", buy: "100원", sell: "30원" },
      { name: "초록색 색유리", buy: "100원", sell: "30원" },
      { name: "청록색 색유리", buy: "100원", sell: "30원" },
      { name: "하늘색 색유리", buy: "100원", sell: "30원" },
      { name: "파란색 색유리", buy: "100원", sell: "30원" },
      { name: "보라색 색유리", buy: "100원", sell: "30원" },
      { name: "자홍색 색유리", buy: "100원", sell: "30원" },
      { name: "분홍색 색유리", buy: "100원", sell: "30원" },
    ],
  },
  {
    key: "etc",
    label: "기타",
    emoji: "📦",
    desc: "기타 장식/재료/도구 고정 상점가",
    color: "#0f766e",
    bg: "#f0fdfa",
    border: "#99f6e4",
    items: [
      { name: "엔드 막대기", buy: "300원", sell: "판매 불가" },
      { name: "사슬", buy: "300원", sell: "판매 불가" },
      { name: "랜턴", buy: "1,000원", sell: "판매 불가" },
      { name: "영혼 랜턴", buy: "2,000원", sell: "판매 불가" },
      { name: "발광 아이템 액자", buy: "100,000원", sell: "판매 불가" },
      { name: "아이템 액자", buy: "100,000원", sell: "판매 불가" },
      { name: "숫돌", buy: "100,000원", sell: "판매 불가" },
      { name: "용광로", buy: "100,000원", sell: "판매 불가" },
      { name: "훈연기", buy: "100,000원", sell: "판매 불가" },
      { name: "마법 부여대", buy: "50,000원", sell: "판매 불가" },
      { name: "조각된 책장", buy: "10,000원", sell: "판매 불가" },
      { name: "책장", buy: "3,000원", sell: "판매 불가" },
      { name: "영혼 모닥불", buy: "5,000원", sell: "판매 불가" },
      { name: "모닥불", buy: "3,000원", sell: "판매 불가" },
      { name: "초", buy: "100원", sell: "판매 불가" },
      { name: "종", buy: "5,000원", sell: "판매 불가" },
      { name: "호퍼", buy: "10,000원", sell: "판매 불가" },
      { name: "상자", buy: "100원", sell: "판매 불가" },
      { name: "비계", buy: "100원", sell: "판매 불가" },
      { name: "통", buy: "100원", sell: "판매 불가" },
      { name: "하얀색 염료", buy: "100원", sell: "판매 불가" },
      { name: "회백색 염료", buy: "100원", sell: "판매 불가" },
      { name: "회색 염료", buy: "100원", sell: "판매 불가" },
      { name: "검은색 염료", buy: "100원", sell: "판매 불가" },
      { name: "갈색 염료", buy: "100원", sell: "판매 불가" },
      { name: "빨간색 염료", buy: "100원", sell: "판매 불가" },
      { name: "주황색 염료", buy: "100원", sell: "판매 불가" },
      { name: "노란색 염료", buy: "100원", sell: "판매 불가" },
      { name: "연두색 염료", buy: "100원", sell: "판매 불가" },
      { name: "초록색 염료", buy: "100원", sell: "판매 불가" },
      { name: "청록색 염료", buy: "100원", sell: "판매 불가" },
      { name: "하늘색 염료", buy: "100원", sell: "판매 불가" },
      { name: "파란색 염료", buy: "100원", sell: "판매 불가" },
      { name: "보라색 염료", buy: "100원", sell: "판매 불가" },
      { name: "자홍색 염료", buy: "100원", sell: "판매 불가" },
      { name: "분홍색 염료", buy: "100원", sell: "판매 불가" },
      { name: "발광 먹물 주머니", buy: "100원", sell: "판매 불가" },
      { name: "블레이즈 가루", buy: "1,000원", sell: "판매 불가" },
      { name: "베틀", buy: "100,000원", sell: "판매 불가" },
      { name: "팬텀 막", buy: "1,000원", sell: "판매 불가" },
      { name: "마그마 크림", buy: "1,000원", sell: "판매 불가" },
      { name: "가스트 눈물", buy: "1,000원", sell: "판매 불가" },
      { name: "거미줄", buy: "1,000원", sell: "판매 불가" },
      { name: "화약", buy: "1,500원", sell: "판매 불가" },
      { name: "화살", buy: "10원", sell: "판매 불가" },
      { name: "부싯돌과 부시", buy: "200,000원", sell: "판매 불가" },
      { name: "발효된 거미 눈", buy: "1,000원", sell: "판매 불가" },
      { name: "활", buy: "15,000원", sell: "판매 불가" },
      { name: "책과 깃펜", buy: "50,000원", sell: "판매 불가" },
      { name: "화분", buy: "1,000원", sell: "판매 불가" },
      { name: "거미 눈", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 꽃 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 크리퍼 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 해골 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 무언가 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 지구 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "현수막 무늬 [ 돼지 코 ]", buy: "1,000원", sell: "판매 불가" },
      { name: "그림", buy: "10,000원", sell: "판매 불가" },
      { name: "작은 자수정 봉오리", buy: "1,000원", sell: "판매 불가" },
      { name: "중간 자수정 봉오리", buy: "1,000원", sell: "판매 불가" },
      { name: "큰 자수정 봉오리", buy: "1,000원", sell: "판매 불가" },
      { name: "자수정 군집", buy: "1,000원", sell: "판매 불가" },
      { name: "망원경", buy: "100,000원", sell: "판매 불가" },
      { name: "소리 블록", buy: "300원", sell: "판매 불가" },
      { name: "크리스탈", buy: "구매 불가", sell: "100,000원" },
      { name: "크리스탈(NEW)", buy: "구매 불가", sell: "150,000원" },
    ],
  },
];
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

function EnchantContent() {
  return (
    <div className="space-y-6">
      {/* 상단 소개 */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
        <h3
          className="text-violet-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📜 주문서 강화
        </h3>
        <p
          className="text-violet-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          주문서를 이용하여 도구를 더욱 강력하게 강화할 수 있습니다.
          강화 성공 시 능력치가 상승하지만 실패하거나 파괴될 수도 있으니
          신중하게 사용하세요.
        </p>
      </div>

      {/* 주문서 종류 */}
      <div className="bg-white border border-violet-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🎫 주문서 종류
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "하급 두루마리 강화서",
              chance: "50% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252FFKcE6qU5BMkYDuXHP2qH%252Fimage.png%3Falt%3Dmedia%26token%3De018ec88-8f83-46ae-b93a-36a3843f9296&width=300&dpr=4&quality=100&sign=55ef0d91&sv=2",
            },
            {
              title: "중급 두루마리 강화서",
              chance: "60% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252F8qC3U3f4uhvy6XvO4HkU%252Fimage.png%3Falt%3Dmedia%26token%3Dbf2e01a6-a3d9-4577-9b0c-0b5319cc5bca&width=300&dpr=4&quality=100&sign=703c3064&sv=2",
            },
            {
              title: "상급 두루마리 강화서",
              chance: "70% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252FCjpoto98rwSwx3pNvuPW%252Fimage.png%3Falt%3Dmedia%26token%3D061e61e3-a3d0-48cf-81a1-abe5235ad850&width=300&dpr=4&quality=100&sign=a79de4fc&sv=2",
            },
            {
              title: "최상급 두루마리 강화서",
              chance: "80% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252FWTt2rsi4oLa2gy8GQRcc%252Fimage.png%3Falt%3Dmedia%26token%3D6b1ed210-fe64-4a5c-918f-408fa0e80fe6&width=300&dpr=4&quality=100&sign=ead0cf1d&sv=2",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-violet-50/40 border border-violet-100 rounded-2xl p-3 flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain mb-2"
              />

              <div
                className="text-slate-700"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </div>

              <div
                className="mt-2 px-2 py-1 rounded-lg bg-violet-100 text-violet-700"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {item.chance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 주문서 확률 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
        <h3
          className="text-indigo-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📊 주문서 확률
        </h3>

        <ul
          className="text-indigo-700 space-y-2"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          <li>• 성공 확률은 50%, 60%, 70%, 80%로 고정됩니다.</li>
          <li>• 실패 확률과 파괴 확률은 10% ~ 70% 사이에서 랜덤입니다.</li>
          <li>• 강화 시 성공 / 실패 / 파괴 중 하나의 결과가 발생합니다.</li>
        </ul>
      </div>

      {/* 획득처 */}
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-3 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🛒 주문서 획득처
        </h3>

        <div className="flex flex-wrap gap-2">
          {[
            "캐시 유틸상점",
            "잠수상점",
            "진주상점",
            "마인리스트 상점",
            "랭킹코인 상점",
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 사용 방법 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "원하는 강화서를 손에 들고 우클릭",
          "증폭된 두루마리 주문서 획득",
          "주문서를 우클릭",
          "강화할 도구 클릭",
        ].map((step, index) => (
          <div
            key={step}
            className="bg-white border border-violet-100 rounded-2xl p-4 shadow-sm"
          >
            <div
              className="text-violet-700 mb-2"
              style={{ fontSize: "13px", fontWeight: 800 }}
            >
              STEP {index + 1}
            </div>
            <div
              className="text-slate-700"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* 경고 */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <h3
          className="text-red-700 mb-2"
          style={{ fontSize: "15px", fontWeight: 800 }}
        >
          ⚠️ 주의
        </h3>

        <p
          className="text-red-600"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          실패 확률과 파괴 확률이 높을 경우 아이템이 파괴되거나 강화에 실패할 수
          있습니다.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
        <h3
          className="text-emerald-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🛡️ 프로텍트 아이템
        </h3>

        <p
          className="text-emerald-700 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          주문서 파괴 확률이 너무 높아 불안하시다고요?
          <br />
          럭키 프로텍트 쉴드 또는 미스틱 프로텍트 배리어를 먼저 사용한 뒤
          주문서를 사용하면 아이템 파괴를 방지할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "럭키 프로텍트 쉴드",
              desc: "효율 / 내구성 / 행운 중 15 이상 시 사용 불가",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3A161413ed-6e45-43fe-a0ae-aa21ef4031cb%3Aimage.png?table=block&id=2ce01bc3-8f0f-8068-8276-d8531426ec21&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=90&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
            {
              title: "미스틱 프로텍트 배리어",
              desc: "효율 / 내구성 / 행운 중 20 이상 시 사용 불가",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3A724c659e-e3f7-4175-ac9b-8281ee5d7962%3Aimage.png?table=block&id=2ce01bc3-8f0f-80c5-a1b5-ec29dfcf171a&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mx-auto mb-3"
              />

              <div
                className="text-center text-slate-700"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                {item.title}
              </div>

              <p
                className="text-center text-slate-500 mt-2"
                style={{ fontSize: "12px", lineHeight: 1.6 }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 강화 복구 방법 */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
        <h3
          className="text-sky-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🔨 강화 복구 방법
        </h3>

        <p
          className="text-sky-700 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          아이템이 파괴되었다고요?
          <br />
          걱정하지 마세요! 복구석을 이용하여 아이템을 복구할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            "복구석을 소지한다",
            "복구할 아이템을 손에 든다",
            "/강화복구 명령어를 입력한다",
            "사용할 복구석을 선택한다",
          ].map((step, index) => (
            <div
              key={step}
              className="bg-white border border-sky-100 rounded-2xl p-4"
            >
              <div
                className="text-sky-700 mb-2"
                style={{ fontSize: "12px", fontWeight: 800 }}
              >
                STEP {index + 1}
              </div>

              <div
                className="text-slate-700"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>

        <img
          src="https://curvy-potential-338.notion.site/image/attachment%3A14618787-778a-4c75-ac68-43909049276e%3Aimage.png?table=block&id=2ce01bc3-8f0f-803b-99c4-f783c538e1b7&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=640&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl"
          alt="강화 복구"
          className="w-full max-w-xl mx-auto rounded-2xl border border-sky-200"
        />
      </div>

      {/* 복구석 종류 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3
          className="mb-4 text-slate-700"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💎 복구석 종류
        </h3>

        <div className="space-y-4">
          {[
            {
              title: "일반 복구석",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3Ae9cd665f-7ae6-4646-bb73-e98fcb673dd9%3Aimage.png?table=block&id=2ce01bc3-8f0f-80cc-82ab-e2a0900d8912&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
            {
              title: "전문가 복구석",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3Ac9518313-f8d7-4e0e-93d3-ed81d68f8563%3Aimage.png?table=block&id=2ce01bc3-8f0f-808a-b553-dbc756b1d802&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
            {
              title: "장인 복구석",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3A2e4dcf9b-e9fd-434f-b7c8-f0d16efd3894%3Aimage.png?table=block&id=2ce01bc3-8f0f-80e3-9c9c-c14437043f8d&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
            {
              title: "명장 복구석",
              image:
                "https://curvy-potential-338.notion.site/image/attachment%3A4d1ae519-433c-4026-b737-8e13a235a12b%3Aimage.png?table=block&id=2ce01bc3-8f0f-8008-8996-c2464b460f51&spaceId=9e601bc3-8f0f-8170-8f3d-00035295a93b&width=1020&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-slate-100 rounded-2xl p-4 bg-slate-50"
            >
              <img
                src={item.image}
                alt={item.title}
               className="w-full max-w-md rounded-xl"
              />

              <div
                className="text-slate-700"
                style={{ fontSize: "15px", fontWeight: 800 }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 복구석 획득처 */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📦 복구석 획득처
        </h3>

        <div className="flex flex-wrap gap-2">
          {[
            "수집가 도감",
            "토큰 도감",
            "사제 상점",
            "랭킹코인 상점",
            "순위 보상",
            "화폐 상점",
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-2 rounded-xl bg-white border border-amber-200 text-amber-800"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const contentComponents: Record<string, ReactNode> = {
  rank: <RankContent />,
  traits: <TraitsContent />,
  shop: <ShopContent />,
  beekeeping: <BeekeepingContent />,
  enchant: <EnchantContent />,
  "royal-supply": <RoyalContent />,
  events: <EventsContent />,
  parkour: <ParkourContent />,
  "donation-king": <DonationKingContent />,
  marriage: <MarriageContent />,
  painting: <PaintingContent />,
  seotda: <SeotdaContent />,
  altar: <AltarContent />,
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

function ShopContent() {
  const [params, setParams] = useSearchParams();
  const selectedKey = params.get("s") ?? "general";

  const selectedShop =
    shopSections.find((section) => section.key === selectedKey) ??
    shopSections[0];

  const updateShopParam = (shopKey: string) => {
    const next = new URLSearchParams(params);
    next.set("tab", "shop");
    next.set("s", shopKey);
    setParams(next);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p
          className="text-blue-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          🏪 해당 상점가는 변동되지 않는 고정 가격입니다.
          <br />
          변동되는 가격은 시세표 페이지에서 따로 확인할 수 있도록 분리하는
          구성이 좋습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {shopSections.map((section) => {
          const isActive = selectedKey === section.key;

          return (
            <button
              key={section.key}
              onClick={() => updateShopParam(section.key)}
              className="rounded-2xl p-4 border-2 text-left transition-all duration-200 hover:shadow-md"
              style={{
                background: section.bg,
                borderColor: isActive ? section.color : section.border,
                boxShadow: isActive ? `0 0 0 2px ${section.color}20` : "none",
              }}
            >
              <div className="text-2xl mb-2">{section.emoji}</div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: section.color,
                }}
              >
                {section.label}
              </div>
              <p
                className="text-slate-500 mt-1"
                style={{ fontSize: "11px", lineHeight: 1.5 }}
              >
                {section.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div
        className="bg-white border-2 rounded-2xl overflow-hidden shadow-sm"
        style={{
          borderColor: selectedShop.border,
        }}
      >
        <div className="p-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedShop.emoji}</span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: selectedShop.color,
              }}
            >
              {selectedShop.label} 상점가
            </span>
          </div>

          <p
            className="text-slate-500 mt-1"
            style={{ fontSize: "12px", lineHeight: 1.6 }}
          >
            {selectedShop.desc}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: selectedShop.border + "20", // 연한 배경
                  borderBottom: `2px solid ${selectedShop.border}`, // 진한 구분선
                }}
              >
                <th
                  className="px-4 py-3 text-left"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: selectedShop.color,
                  }}
                >
                  아이템 이름
                </th>
                <th
                  className="px-4 py-3 text-left"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: selectedShop.color,
                  }}
                >
                  구매 가격 (개당)
                </th>
                <th
                  className="px-4 py-3 text-left"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: selectedShop.color,
                  }}
                >
                  판매 가격 (개당)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {selectedShop.items.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-amber-50/30 transition-colors"
                >
                  <td
                    className="px-4 py-3 text-slate-700"
                    style={{ fontSize: "13px" }}
                  >
                    {item.name}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600"
                    style={{ fontSize: "13px" }}
                  >
                    {item.buy}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600"
                    style={{ fontSize: "13px" }}
                  >
                    {item.sell}
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {row.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                    const routeMap: Record<string, string> = {
                      // 🔵 라우터 방식 (페이지 이동)
                      island: "/content/island",
                      traits: "/content/traits",

                      // 🟡 쿼리 방식 (ContentPage 내부 처리)
                      shop: "/content?tab=shop&s=general",
                      rank: "/content?tab=rank",
                      enchant: "/content?tab=enchant",
                      collection: "/content?tab=collection",
                      altar: "/content?tab=altar",
                      parkour: "/content?tab=parkour",
                      blockwars: "/content?tab=blockwars",
                      marriage: "/content?tab=marriage",
                      seotda: "/content?tab=seotda",
                      painting: "/content?tab=painting",
                      "donation-king": "/content?tab=donation-king",
                      beekeeping: "/content?tab=beekeeping",
                      "royal-supply": "/content?tab=royal-supply",
                      gacha: "/content?tab=gacha",
                      events: "/content?tab=events",
                    };

                    navigate(routeMap[item.key]);
                  }}
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
        <div>
          {contentComponents[activeTab] ?? <ComingSoon name={current.label} />}
        </div>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ContentPage() {
  const [params] = useSearchParams();
  const activeTab = params.get("tab");

  if (!activeTab) {
    return <ContentGrid />;
  }

  return <ContentDetail activeTab={activeTab} />;
}
