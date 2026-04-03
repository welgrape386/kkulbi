import { useSearchParams, useLocation, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
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
          벌집과 꿀벌 생성알을 이용해 꿀을 채집할 수 있어요! 꿀은 다양한 아이템
          제작 및 판매에 활용됩니다.
        </p>
      </div>
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
        <div
          className="text-slate-700 mb-4"
          style={{ fontSize: "15px", fontWeight: 800 }}
        >
          📋 양봉 순서
        </div>
        <div className="space-y-3">
          {[
            {
              step: 1,
              title: "벌집 & 꿀벌 생성알 구매",
              desc: "상점에서 벌집과 꿀벌 생성알을 구매합니다.",
            },
            {
              step: 2,
              title: "벌집 설치 & 꿀벌 소환",
              desc: "벌집을 설치한 뒤 꿀벌을 소환하고, 벌집 근처에 꽃을 설치합니다.",
            },
            {
              step: 3,
              title: "꿀 채집",
              desc: "꿀이 가득 차면 가위를 들고 벌집을 우클릭하여 벌꿀을 채집할 수 있습니다!",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "#f5c842",
                  color: "#1a1200",
                  fontSize: "13px",
                  fontWeight: 900,
                }}
              >
                {s.step}
              </div>
              <div>
                <div
                  className="text-slate-700 mb-0.5"
                  style={{ fontSize: "13px", fontWeight: 700 }}
                >
                  {s.title}
                </div>
                <p
                  className="text-slate-500"
                  style={{ fontSize: "12px", lineHeight: 1.6 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div
            className="text-blue-800 mb-1"
            style={{ fontSize: "13px", fontWeight: 700 }}
          >
            💡 벌집 확인
          </div>
          <p
            className="text-blue-700"
            style={{ fontSize: "12px", lineHeight: 1.6 }}
          >
            벌집을 맨손으로 우클릭하면 벌집 안을 확인할 수 있어요!
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div
            className="text-red-800 mb-1"
            style={{ fontSize: "13px", fontWeight: 700 }}
          >
            ⚠️ 모닥불 주의
          </div>
          <p
            className="text-red-700"
            style={{ fontSize: "12px", lineHeight: 1.6 }}
          >
            벌집 아래 모닥불에 불을 지피지 않은 채로 꿀을 채집하면 꿀벌이 화가
            나서 독침을 쏘고 죽어버려요!
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Royal Supply Content ─────────────────────────────────────────────────────
function RoyalSupplyContent() {
  const royalShopItems = [
    { name: "상급 두루마리 강화서 [ 70% 뽑기 ]", price: "60 포인트" },
    { name: "프리미엄 닉네임 변경권", price: "400 포인트" },
    { name: "신호기", price: "240 포인트" },
    { name: "자유로운 왕꿀벌", price: "640 포인트" },
    { name: "칭호 랜덤 뽑기권", price: "300 포인트" },
    { name: "공룡 치장팩", price: "200 포인트" },
    { name: "일반 치장팩", price: "200 포인트" },
    { name: "아기 드라코니 부화알", price: "400 포인트" },
    { name: "아기 고양이 털뭉치", price: "400 포인트" },
    { name: "미가공 복구석ㆍ거친 원석", price: "45 포인트" },
    { name: "미가공 복구석ㆍ고급 원석", price: "300 포인트" },
    { name: "지구의 머리", price: "30 포인트" },
    { name: "왕대두 지구", price: "1,500 포인트" },
    { name: "왕대두 꿀떡", price: "1,500 포인트" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-purple-100"
          style={{ background: "linear-gradient(135deg, #f5f3ff, #ede9fe)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#6d28d9" }}
            >
              왕실경매
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {[
            "왕실경매는 1~3일 마다 진행되며, 랜덤한 아이템을 재화 또는 왕실포인트 중 하나의 방식으로 경매가 진행됩니다.",
            "경매는 정해진 시간에 종료되며, 종료 직전까지 가장 높은 입찰가를 적은 유저의 우편함에 보상이 지급됩니다.",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-slate-600"
              style={{ fontSize: "13px", lineHeight: 1.7 }}
            >
              <span className="text-purple-400 flex-shrink-0 mt-0.5">▸</span>{" "}
              {text}
            </div>
          ))}
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
            <code
              className="text-purple-700"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              /왕실경매
            </code>
            <span className="text-slate-500 ml-2" style={{ fontSize: "12px" }}>
              명령어로도 경매창을 열 수 있습니다.
            </span>
          </div>
          <div
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-400"
            style={{ fontSize: "13px" }}
          >
            🖼️ 경매 입찰 이미지 (추후 추가 예정)
          </div>
        </div>
      </div>
      <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-100"
          style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#b45309" }}
            >
              왕실납품
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {[
            "왕실납품은 본인의 숙련도 / 스킬에 따라 하루마다 납품할 수 있는 개수가 정해져 있습니다.",
            "숙련도 50 당 1개의 아이템을 납품할 수 있으며 해당 포인트로 상점 이용 또는 왕실 경매에서 사용하실 수 있습니다.",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-slate-600"
              style={{ fontSize: "13px", lineHeight: 1.7 }}
            >
              <span className="text-amber-400 flex-shrink-0 mt-0.5">▸</span>{" "}
              {text}
            </div>
          ))}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <code
              className="text-amber-700"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              /왕실포인트
            </code>
            <span className="text-slate-500 ml-2" style={{ fontSize: "12px" }}>
              명령어로 왕실 포인트를 확인할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-100"
          style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#b45309" }}
            >
              왕실상점
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: "#fffbef",
                  borderBottom: "2px solid #fde68a",
                }}
              >
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  아이템 이름
                </th>
                <th
                  className="px-4 py-3 text-left text-amber-800"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  구매 가격
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {royalShopItems.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-amber-50/40 transition-colors"
                >
                  <td
                    className="px-4 py-2.5 text-slate-700"
                    style={{ fontSize: "13px" }}
                  >
                    {item.name}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      {item.price}
                    </span>
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

// ─── Marriage Content ─────────────────────────────────────────────────────────
function MarriageContent() {
  const commands = [
    { cmd: "/결혼 청혼 [닉네임] [커플이름]", desc: "상대방에게 청혼합니다." },
    { cmd: "/결혼 수락 [닉네임]", desc: "상대방의 청혼을 수락합니다." },
    { cmd: "/결혼 거절 [닉네임]", desc: "상대방에게 청혼을 거절합니다." },
    { cmd: "/결혼 이혼", desc: "결혼한 상대방과 이혼합니다." },
    { cmd: "/결혼 애정도", desc: "애정도를 확인합니다." },
    { cmd: "/결혼 텔레포트", desc: "결혼한 상대방에게 텔레포트합니다." },
    { cmd: "/결혼 채팅", desc: "결혼한 상대방과 채팅합니다." },
    {
      cmd: "/결혼 정보 [닉네임]",
      desc: "다른 유저의 결혼 정보를 확인할 수 있습니다.",
    },
  ];
  const rings = [
    { name: "사랑의 인장 프리미엄 커플링", price: "29,900 캐시", type: "cash" },
    { name: "서로의 약속 일반 커플링", price: "50,000,000원", type: "money" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4">
        <p
          className="text-pink-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          💒 <strong>/결혼</strong> 명령어를 통해 다양한 결혼 관련 명령어를 알
          수 있어요. 결혼 애정도에 따른 숙련도 및 다양한 혜택을 받으실 수
          있습니다.
        </p>
      </div>
      <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-pink-100"
          style={{ background: "linear-gradient(135deg, #fdf2f8, #fce7f3)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#be185d" }}
            >
              결혼 명령어
            </span>
          </div>
        </div>
        <div className="divide-y divide-pink-50">
          {commands.map((c) => (
            <div
              key={c.cmd}
              className="flex items-start gap-3 px-5 py-3 hover:bg-pink-50/40 transition-colors"
            >
              <code
                className="rounded-lg px-2 py-0.5 flex-shrink-0"
                style={{
                  background: "#fce7f3",
                  color: "#be185d",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {c.cmd}
              </code>
              <span className="text-slate-600" style={{ fontSize: "13px" }}>
                {c.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-pink-100"
          style={{ background: "linear-gradient(135deg, #fdf2f8, #fce7f3)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💍</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#be185d" }}
            >
              반지 (커플링)
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-slate-500" style={{ fontSize: "13px" }}>
            커플링은 결혼식장에서 구매하실 수 있어요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rings.map((r) => (
              <div
                key={r.name}
                className="p-4 rounded-xl border-2"
                style={{
                  borderColor: r.type === "cash" ? "#f9a8d4" : "#fbcfe8",
                  background: r.type === "cash" ? "#fdf2f8" : "#fff0f5",
                }}
              >
                <div
                  className="text-slate-700 mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 700 }}
                >
                  💍 {r.name}
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{
                    background: "#be185d20",
                    color: "#be185d",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {r.price}
                </span>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-400"
            style={{ fontSize: "13px" }}
          >
            💍 반지 이미지 (추후 추가 예정)
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Donation King Content ────────────────────────────────────────────────────
function DonationKingContent() {
  const traitBenefits = [
    {
      trait: "채광",
      emoji: "⛏️",
      benefit: "크리스탈 획득 확률 증가",
      color: "#6366f1",
    },
    {
      trait: "수확",
      emoji: "🌽",
      benefit: "산삼씨앗 획득 확률 증가",
      color: "#16a34a",
    },
    {
      trait: "벌목",
      emoji: "🪓",
      benefit: "도토리 획득 확률 증가",
      color: "#92400e",
    },
    {
      trait: "낚시",
      emoji: "🎣",
      benefit: "진주 획득 확률 증가",
      color: "#0284c7",
    },
    {
      trait: "요리",
      emoji: "🍳",
      benefit: "요리 별점 획득 확률 증가",
      color: "#ea580c",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p
          className="text-amber-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          👑 기부왕은 매달 <strong>1일</strong>과 <strong>16일</strong>에
          종료됩니다. 기부왕에 가장 많은 돈을 기부한 <strong>1등</strong>에게 약{" "}
          <strong>15일간</strong>의 기부왕 혜택이 부여됩니다.
        </p>
      </div>
      <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-100"
          style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#b45309" }}
            >
              기부왕 혜택
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 mb-4">
            <div
              className="text-amber-800"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              ✨ 특성 경험치 15% 추가 획득 + 특성별 효과
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {traitBenefits.map((t) => (
              <div
                key={t.trait}
                className="flex items-center gap-3 p-3 rounded-xl border-2"
                style={{
                  borderColor: t.color + "40",
                  background: t.color + "0a",
                }}
              >
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: t.color,
                    }}
                  >
                    {t.trait} 특성
                  </div>
                  <div className="text-slate-500" style={{ fontSize: "12px" }}>
                    {t.benefit}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100">
            <p
              className="text-green-700"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              🍀 기부왕 혜택의 확률은 기본 드랍 확률의 약{" "}
              <strong>30% 추가</strong>입니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Parkour Content ──────────────────────────────────────────────────────────
function ParkourContent() {
  const rankRewards = [
    { rank: "🥇 1등", coins: 30 },
    { rank: "🥈 2등", coins: 20 },
    { rank: "🥉 3등", coins: 10 },
    { rank: "4~10등", coins: 5 },
  ];
  const shopItems = [
    { name: "스킨 제거 가위", price: "10개" },
    { name: "다이너마이트", price: "3개" },
    { name: "천연 토종꿀", price: "1개" },
    { name: "최상급 두루마리 강화서 [ 80% ]", price: "10개" },
    { name: "프리미엄 닉네임 변경권 ( 1회용 )", price: "50개" },
    { name: "엘레베이터 블럭", price: "2개" },
    { name: "엔더 상자", price: "3개" },
    { name: "[ 경작 ] 허수아비 괭이", price: "30개" },
    { name: "마술봉 원터치 막대", price: "35개" },
    { name: "무한의 겉날개", price: "25개" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
        <p
          className="text-orange-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          🏃 스폰 파쿠르는 매주 <strong>일요일 오후 10시</strong>에 자동으로
          순위가 초기화됩니다!
        </p>
      </div>
      <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-orange-100"
          style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#c2410c" }}
            >
              순위별 보상
            </span>
            <span
              className="bg-orange-100 text-orange-600 rounded-full px-2 py-0.5"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              점핑 점핑 파쿠르 번개 코인
            </span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rankRewards.map((r) => (
            <div
              key={r.rank}
              className="p-4 rounded-xl text-center"
              style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}
            >
              <div
                className="text-slate-700 mb-1"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                {r.rank}
              </div>
              <div
                style={{ fontSize: "22px", fontWeight: 900, color: "#ea580c" }}
              >
                {r.coins}
              </div>
              <div className="text-slate-400" style={{ fontSize: "11px" }}>
                번개 코인
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-orange-100"
          style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#c2410c" }}
            >
              파쿠르 상점
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  background: "#fff7ed",
                  borderBottom: "2px solid #fed7aa",
                }}
              >
                <th
                  className="px-4 py-3 text-left text-orange-800"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  아이템 이름
                </th>
                <th
                  className="px-4 py-3 text-left text-orange-800"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  구매 가격 (번개 코인)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {shopItems.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-orange-50/40 transition-colors"
                >
                  <td
                    className="px-4 py-2.5 text-slate-700"
                    style={{ fontSize: "13px" }}
                  >
                    {item.name}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="bg-orange-100 text-orange-700 rounded-full px-2 py-0.5"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      {item.price}
                    </span>
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

// ─── Blockwars Content ────────────────────────────────────────────────────────
function BlockwarsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-red-100"
          style={{ background: "linear-gradient(135deg, #fef2f2, #fecaca)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#dc2626" }}
            >
              블럭워즈란?
            </span>
          </div>
        </div>
        <div className="p-5">
          <p
            className="text-slate-600"
            style={{ fontSize: "14px", lineHeight: 1.8 }}
          >
            블럭워즈는 특정 맵에서 모든 블럭을 설치 및 파괴를 하며 유저들과{" "}
            <strong>PVP</strong>를 즐길 수 있는 공간입니다.
          </p>
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <div
          className="text-red-800 mb-3"
          style={{ fontSize: "14px", fontWeight: 800 }}
        >
          🚫 금지 행위
        </div>
        <div className="space-y-2">
          {["잠금 또는 입구 막기 금지", "물 테러 금지"].map((rule) => (
            <div
              key={rule}
              className="flex items-center gap-2 text-red-700"
              style={{ fontSize: "13px" }}
            >
              <span
                className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 text-red-700"
                style={{ fontSize: "10px", fontWeight: 800 }}
              >
                ✕
              </span>
              {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Altar Content ────────────────────────────────────────────────────────────
function AltarContent() {
  const [subTab, setSubTab] = useState<"points" | "rank" | "level" | "priest">(
    "points",
  );
  const { hash } = useLocation();

  // hash → sub-tab 전환
  useEffect(() => {
    const h = hash.slice(1);
    if (h.startsWith("sect-altar-rank")) setSubTab("rank");
    else if (h.startsWith("sect-altar-level")) setSubTab("level");
    else if (h.startsWith("sect-altar-priest")) setSubTab("priest");
    else if (h.startsWith("sect-altar-")) setSubTab("points");
  }, [hash]);

  // sub-tab 렌더 후 해당 요소로 스크롤
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(timer);
  }, [subTab, hash]);

  const basicPoints = [
    { name: "구운 감자", pts: "1.5" },
    { name: "당근", pts: "1" },
    { name: "감자", pts: "1" },
    { name: "대나무", pts: "1" },
    { name: "사탕수수", pts: "1" },
    { name: "네더사마귀", pts: "1.5" },
    { name: "네더사마귀 블록", pts: "13.5" },
    { name: "호박", pts: "2" },
    { name: "코코아콩", pts: "2" },
    { name: "독이 있는 감자", pts: "5" },
    { name: "수박", pts: "2.5" },
    { name: "황금 당근", pts: "6" },
    { name: "사탕무", pts: "8" },
    { name: "밀", pts: "6" },
    { name: "빵", pts: "20" },
    { name: "사과", pts: "30" },
    { name: "사탕무 수프", pts: "40" },
    { name: "건초 더미", pts: "54" },
    { name: "정령", pts: "5,000" },
    { name: "미식가의 별", pts: "70,000" },
  ];
  const customCropPoints = [
    ["토마토", "80", "160", "400"],
    ["옥수수", "80", "160", "400"],
    ["가지", "80", "160", "400"],
    ["고구마", "80", "160", "400"],
    ["파프리카", "80", "160", "400"],
    ["양배추", "100", "200", "450"],
    ["쌀", "100", "200", "450"],
    ["양파", "100", "200", "450"],
    ["고추", "60", "120", "300"],
    ["배추", "120", "250", "600"],
    ["무", "120", "250", "600"],
    ["콩", "50", "100", "240"],
    ["마늘", "70", "140", "300"],
    ["파", "70", "140", "300"],
    ["산삼", "6,000", "12,000", "40,000"],
  ];
  const rareGiantPoints = [
    ["토마토", "1,200", "5,000"],
    ["옥수수", "1,200", "5,000"],
    ["가지", "1,200", "5,000"],
    ["고구마", "1,200", "5,000"],
    ["파프리카", "1,200", "5,000"],
    ["양배추", "1,600", "7,000"],
    ["쌀", "1,600", "7,000"],
    ["양파", "1,600", "7,000"],
    ["고추", "900", "3,000"],
    ["배추", "2,200", "10,000"],
    ["무", "2,200", "10,000"],
    ["콩", "1,000", "5,000"],
    ["마늘", "1,250", "4,000"],
    ["파", "1,250", "4,000"],
    ["산삼", "100,000", "500,000"],
  ];
  const cookingPoints = [
    { name: "김치", pts: "1,500" },
    { name: "깍두기", pts: "1,200" },
    { name: "수박주스", pts: "60" },
    { name: "시리얼", pts: "540" },
    { name: "코울슬로", pts: "330" },
    { name: "또띠아", pts: "400" },
    { name: "타코", pts: "1,000" },
    { name: "애플파이", pts: "3,000" },
    { name: "감자튀김", pts: "188" },
    { name: "야채튀김", pts: "750" },
    { name: "자른당근", pts: "30" },
    { name: "라면", pts: "630" },
    { name: "미역국", pts: "225" },
    { name: "육개장", pts: "420" },
    { name: "오믈렛", pts: "600" },
  ];
  const rankRewards: {
    rank: string;
    emoji: string;
    cash?: string;
    scroll?: string;
    items: string[];
  }[] = [
    {
      rank: "1등",
      emoji: "🥇",
      cash: "50,000캐시",
      scroll: "증폭된 주문서 [ 70% | 성공70 실패30 파괴0 ] 1개",
      items: [
        "천연 토종꿀 8개",
        "마법의 소라고동 10개",
        "의문의 빨강포션 4개",
        "신호기 1개",
        "미스틱 프로텍트 배리어 2개",
        "폭죽 로켓 60개",
        "의문의 벨소리 4개",
        "[ 화폐 ] 빛나는 다이아 주괴 128개",
        "빛 블록 40개",
        "최상급 두루마리 강화서 [ 80% ] 10개",
        "의문의 파랑포션 4개",
        "반짝반짝 빛나는 거울 2개",
        "엘레베이터 블럭 6개",
        "명장 복구석ㆍ불멸의 빛 3개",
        "경쟁전 트로피 토큰 100개",
        "은행 현금 뭉텅이 10개",
      ],
    },
    {
      rank: "2등",
      emoji: "🥈",
      cash: "30,000캐시",
      scroll: "증폭된 주문서 [ 60% | 성공60 실패40 파괴0 ] 1개",
      items: [
        "천연 토종꿀 8개",
        "의문의 빨강포션 2개",
        "신호기 1개",
        "럭키 프로텍트 쉴드 1개",
        "최상급 두루마리 강화서 [ 80% ] 7개",
        "빛 블록 30개",
        "은행 현금 뭉텅이 6개",
        "의문의 파랑포션 2개",
        "엘레베이터 블럭 5개",
        "명장 복구석 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 100개",
        "경쟁전 트로피 토큰 60개",
        "폭죽 로켓 40개",
        "마법의 소라고동 8개",
        "의문의 벨소리 2개",
        "반짝반짝 빛나는 거울 2개",
        "장인의 복구석 2개",
      ],
    },
    {
      rank: "3등",
      emoji: "🥉",
      cash: "10,000캐시",
      scroll: "증폭된 주문서 [ 50% | 성공50 실패50 파괴0 ] 1개",
      items: [
        "천연 토종꿀 6개",
        "최상급 두루마리 강화서 [ 80% ] 3개",
        "빛 블록 15개",
        "폭죽 로켓 40개",
        "엘레베이터 블럭 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 80개",
        "경쟁전 트로피 토큰 50개",
        "장인의 복구석 3개",
        "마법의 소라고동 6개",
        "은행 현금 뭉텅이 3개",
        "의문의 빨강포션 1개",
        "의문의 파랑포션 1개",
        "의문의 벨소리 1개",
        "반짝반짝 빛나는 거울 1개",
      ],
    },
    {
      rank: "4등",
      emoji: "4️⃣",
      items: [
        "폭죽 로켓 20개",
        "상급 두루마리 강화서 [ 70% ] 3개",
        "최상급 두루마리 강화서 [ 80% ] 3개",
        "의문의 파랑포션 1개",
        "엘레베이터 블럭 1개",
        "경쟁전 트로피 토큰 40개",
        "마법의 소라고동 4개",
        "빛 블록 15개",
        "천연 토종꿀 4개",
        "의문의 빨강포션 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 70개",
        "은행 현금 뭉텅이 2개",
        "장인의 복구석 2개",
      ],
    },
    {
      rank: "5등",
      emoji: "5️⃣",
      items: [
        "폭죽 로켓 10개",
        "최상급 두루마리 강화서 [ 80% ] 3개",
        "상급 두루마리 강화서 [ 70% ] 2개",
        "엘레베이터 블럭 1개",
        "경쟁전 트로피 토큰 40개",
        "마법의 소라고동 3개",
        "빛 블록 15개",
        "의문의 빨강포션 1개",
        "의문의 파랑포션 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 70개",
        "은행 현금 뭉텅이 2개",
        "장인의 복구석 2개",
      ],
    },
    {
      rank: "6등",
      emoji: "6️⃣",
      items: [
        "폭죽 로켓 10개",
        "상급 두루마리 강화서 [ 70% ] 2개",
        "최상급 두루마리 강화서 [ 80% ] 2개",
        "경쟁전 트로피 토큰 30개",
        "빛 블록 6개",
        "천연 토종꿀 2개",
        "은행 현금 뭉텅이 2개",
        "전문가 복구석ㆍ장인의 손길 4개",
        "의문의 빨강포션 1개",
        "의문의 파랑포션 1개",
        "마법의 소라고동 2개",
        "[ 화폐 ] 빛나는 다이아 주괴 60개",
      ],
    },
    {
      rank: "7등",
      emoji: "7️⃣",
      items: [
        "폭��� 로켓 8개",
        "상급 두루마리 강화서 [ 70% ] 2개",
        "최상급 두루마리 강화서 [ 80% ] 2개",
        "경쟁전 트로피 토큰 30개",
        "빛 블록 2개",
        "천연 토종꿀 1개",
        "은행 현금 뭉텅이 1개",
        "일반 소라고동 2개",
        "의문의 빨강포션 1개",
        "의문의 파랑포션 1개",
        "전문가 복구석ㆍ장인의 손길 3개",
        "[ 화폐 ] 빛나는 다이아 주괴 60개",
      ],
    },
    {
      rank: "8~10등",
      emoji: "🎖️",
      items: [
        "폭죽 로켓 6개",
        "상급 두루마리 강화서 [ 70% ] 2개",
        "최상급 두루마리 강화서 [ 80% ] 1개",
        "경쟁전 트로피 토큰 20개",
        "빛 블록 2개",
        "전문가 복구석ㆍ장인의 손길 2개",
        "천연 토종꿀 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 50개",
        "은행 현금 뭉텅이 1개",
        "일반 소라고동 2개",
        "의문의 파랑포션 1개",
      ],
    },
  ];
  const levelRewards = [
    {
      pts: "1,000",
      items: ["뼈다귀 3개", "[ 화폐 ] 자연동 주괴 3개", "경험치 병 7개"],
    },
    {
      pts: "5,000",
      items: ["뼈다귀 5개", "[ 화폐 ] 자연은 주괴 1개", "경험치 병 1개"],
    },
    {
      pts: "10,000",
      items: ["뼈다귀 5개", "[ 화폐 ] 화려한 금 주괴 1개", "경험치 병 2개"],
    },
    {
      pts: "50,000",
      items: [
        "뼈다귀 5개",
        "[ 화폐 ] 화려한 금 주괴 3개",
        "경험치 병 5개",
        "폭죽 로켓 3개",
      ],
    },
    {
      pts: "100,000",
      items: [
        "뼈다귀 5개",
        "[ 화폐 ] 화려한 금 주괴 4개",
        "경험치 병 1개",
        "폭죽 로켓 3개",
        "가공된 꿀조각 1개",
      ],
    },
    {
      pts: "300,000",
      items: [
        "뼈다귀 5개",
        "경험치 병 20개",
        "폭죽 로켓 3개",
        "자동심기 기술 주문서 (+1000회) 1개",
        "엘레베이터 블럭 1개",
      ],
    },
    {
      pts: "500,000",
      items: [
        "뼈다귀 2개",
        "경험치 병 4개",
        "폭죽 로켓 3개",
        "자연 꿀밀랍 1개",
        "은행 현금 뭉텅이 1개",
        "일반 복구석ㆍ깨진 조각의 희망 5개",
      ],
    },
    {
      pts: "1,000,000",
      items: [
        "[ 화폐 ] 화려한 이리듐 주괴 1개",
        "천연 토종꿀 1개",
        "뼈다귀 4개",
        "일반 소라고동 1개",
      ],
    },
    {
      pts: "1,500,000",
      items: [
        "하급 두루마리 강화서 [ 50% ] 1개",
        "빛 블럭 1개",
        "천연 토종꿀 1개",
        "[ 화폐 ] 화려한 금 주괴 3개",
        "폭죽 로켓 5개",
      ],
    },
    {
      pts: "2,000,000",
      items: [
        "빛 블럭 3개",
        "폭죽 로켓 5개",
        "뼈다귀 21개",
        "경험치 병 3개",
        "일반 소라고동 2개",
        "중급 두루마리 강화서 [ 60% ] 1개",
      ],
    },
    {
      pts: "2,500,000",
      items: [
        "자동심기 기술 주문서 (+3000회) 1개",
        "천연 토종꿀 1개",
        "폭죽 로켓 5개",
        "[ 화폐 ] 화려한 이리듐 주괴 1개",
        "반짝반짝 빛나는 거울 1개",
        "일반 복구석ㆍ깨진 조각의 희망 10개",
      ],
    },
    {
      pts: "3,000,000",
      items: [
        "양조기 1개",
        "하급 두루마리 강화서 [ 50% ] 1개",
        "경험치 병 2개",
        "빛 블럭 3개",
        "엘레베이터 블럭 1개",
        "은행 현금 뭉텅이 1개",
      ],
    },
    {
      pts: "3,500,000",
      items: [
        "[ 화폐 ] 화려한 이리듐 주괴 1개",
        "중급 두루마리 강화서 [ 60% ] 1개",
        "뼈다귀 1개",
        "경험치 병 2개",
        "천연 토종꿀 2개",
        "엘레베이터 블럭 1개",
      ],
    },
    {
      pts: "4,000,000",
      items: [
        "엔더상자 1개",
        "하급 두루마리 강화서 [ 50% ] 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 1개",
        "자연 꿀밀랍 1개",
        "천연 토종꿀 2개",
      ],
    },
    {
      pts: "5,000,000",
      items: [
        "중급 두루마리 강화서 [ 60% ] 1개",
        "빛 블럭 3개",
        "뼈다귀 7개",
        "경험치 병 10개",
        "하급 두루마리 강화서 [ 50% ] 1개",
        "[ 화폐 ] 화려한 이리듐 주괴 1개",
        "일반 복구석ㆍ깨진 조각의 희망 15개",
      ],
    },
    {
      pts: "6,000,000",
      items: [
        "은행 현금 뭉텅이 1개",
        "엘레베이터 블럭 1개",
        "빛 블럭 5개",
        "양조기 1개",
        "의문의 빨강포션 1개",
      ],
    },
    {
      pts: "7,000,000",
      items: [
        "상급 두루마리 강화서 [ 70% ] 1개",
        "엔더상자 1개",
        "일반 소라고동 3개",
        "천연 토종꿀 3개",
        "양조기 1개",
      ],
    },
    {
      pts: "10,000,000",
      items: [
        "의문의 빨강포션 1개",
        "은행 현금 뭉텅이 2개",
        "반짝반짝 빛나는 거울 1개",
        "뼈다귀 1개",
        "중급 두루마리 강화서 [ 60% ] 1개",
        "전문가 복구석ㆍ장인의 손길 1개",
      ],
    },
    {
      pts: "12,000,000",
      items: [
        "일반 소라고동 3개",
        "[ 화폐 ] 빛나는 다이아 주괴 1개",
        "천연 토종꿀 3개",
        "은행 현금 뭉텅이 3개",
        "상급 두루마리 강화서 [ 70% ] 1개",
        "엘레베이터 블럭 1개",
        "전문가 복구석ㆍ장인의 손길 1개",
      ],
    },
    {
      pts: "15,000,000",
      items: [
        "최상급 두루마리 강화서 [ 80% ] 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 2개",
        "엘레베이터 블럭 1개",
        "의문의 파랑포션 1개",
        "마법의 소라고동 1개",
        "폭죽 로켓 10개",
      ],
    },
    {
      pts: "20,000,000",
      items: [
        "마법의 소라고동 1개",
        "최상급 두루마리 강화서 [ 80% ] 1개",
        "은행 현금 뭉텅이 3개",
        "의문의 벨소리 1개",
        "[ 화폐 ] 빛나는 다이아 주괴 3개",
        "럭키 프로텍트 쉴드 1개",
        "장인의 복구석ㆍ세월이 깃든 연마 1개",
      ],
    },
  ];

  function getBadge(item: string) {
    if (item.includes("화폐") || item.includes("주괴"))
      return "bg-amber-100 text-amber-800 border border-amber-200";
    if (item.includes("강화서") || item.includes("주문서"))
      return "bg-violet-100 text-violet-800 border border-violet-200";
    if (item.includes("소라고동"))
      return "bg-cyan-100 text-cyan-800 border border-cyan-200";
    if (
      item.includes("토종꿀") ||
      item.includes("꿀밀랍") ||
      item.includes("꿀조각")
    )
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    if (item.includes("복구석"))
      return "bg-purple-100 text-purple-800 border border-purple-200";
    if (item.includes("트로피") || item.includes("토큰"))
      return "bg-orange-100 text-orange-800 border border-orange-200";
    if (item.includes("포션"))
      return "bg-red-100 text-red-800 border border-red-200";
    if (item.includes("캐시"))
      return "bg-pink-100 text-pink-800 border border-pink-200";
    if (item.includes("폭죽") || item.includes("빛 블"))
      return "bg-sky-100 text-sky-800 border border-sky-200";
    if (item.includes("현금"))
      return "bg-green-100 text-green-800 border border-green-200";
    return "bg-slate-100 text-slate-700 border border-slate-200";
  }

  const subTabs = [
    { key: "points" as const, label: "공물 포인트", emoji: "📊" },
    { key: "rank" as const, label: "순위 보상", emoji: "🏆" },
    { key: "level" as const, label: "레벨 보상", emoji: "🌟" },
    { key: "priest" as const, label: "사제 상점", emoji: "⚜️" },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p
          className="text-slate-600"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          🏛️ 제단에 공물을 바쳐 <strong>경쟁 포인트</strong>를 획득하고 순위를
          올려보세요. 시즌 종료 시 순위 보상과 레벨별 보상을 받을 수 있습니다.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 p-2 bg-white border-2 border-stone-200 rounded-2xl">
        {subTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
            style={{
              background: subTab === t.key ? "#78716c" : "transparent",
              color: subTab === t.key ? "#fff" : "#78716c",
              border: "2px solid #78716c40",
              fontSize: "13px",
              fontWeight: subTab === t.key ? 700 : 500,
            }}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {subTab === "points" && (
        <div className="space-y-4">
          <div
            id="sect-altar-basic-items"
            className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <div
              className="px-5 py-3.5 border-b border-stone-100"
              style={{ background: "linear-gradient(135deg,#fafaf9,#f5f5f4)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌾</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#44403c",
                  }}
                >
                  기본 아이템
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#fafaf9",
                      borderBottom: "2px solid #e7e5e4",
                    }}
                  >
                    <th
                      className="px-4 py-2.5 text-left text-stone-600"
                      style={{ fontSize: "11px", fontWeight: 700 }}
                    >
                      아이템 이름
                    </th>
                    <th
                      className="px-4 py-2.5 text-right text-stone-600"
                      style={{ fontSize: "11px", fontWeight: 700 }}
                    >
                      경쟁 포인트
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {basicPoints.map((r) => (
                    <tr
                      key={r.name}
                      className="hover:bg-stone-50/50 transition-colors"
                    >
                      <td
                        className="px-4 py-2 text-slate-700"
                        style={{ fontSize: "13px" }}
                      >
                        {r.name}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span
                          className="bg-stone-100 text-stone-700 rounded-full px-2 py-0.5"
                          style={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          {r.pts}pt
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="sect-altar-custom-crops"
            className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <div
              className="px-5 py-3.5 border-b border-green-100"
              style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌽</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#15803d",
                  }}
                >
                  커스텀 농작물 (일반/실버/골드)
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#f0fdf4",
                      borderBottom: "2px solid #bbf7d0",
                    }}
                  >
                    {["작물 이름", "일반", "실버", "골드"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-2.5 text-green-700 ${i === 0 ? "text-left" : "text-right"}`}
                        style={{ fontSize: "11px", fontWeight: 700 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {customCropPoints.map((r) => (
                    <tr
                      key={r[0]}
                      className="hover:bg-green-50/40 transition-colors"
                    >
                      <td
                        className="px-4 py-2 text-slate-700"
                        style={{ fontSize: "13px" }}
                      >
                        {r[0]}
                      </td>
                      {[r[1], r[2], r[3]].map((v, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 text-right"
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: ["#16a34a", "#0284c7", "#d97706"][i],
                          }}
                        >
                          {v}pt
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-5 py-3.5 border-b border-amber-100"
              style={{ background: "linear-gradient(135deg,#fffbeb,#fef3c7)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#b45309",
                  }}
                >
                  커스텀 농작물 (희귀/대형)
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#fffbef",
                      borderBottom: "2px solid #fde68a",
                    }}
                  >
                    {["작물 이름", "희귀", "대형"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-2.5 text-amber-700 ${i === 0 ? "text-left" : "text-right"}`}
                        style={{ fontSize: "11px", fontWeight: 700 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {rareGiantPoints.map((r) => (
                    <tr
                      key={r[0]}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      <td
                        className="px-4 py-2 text-slate-700"
                        style={{ fontSize: "13px" }}
                      >
                        {r[0]}
                      </td>
                      <td
                        className="px-4 py-2 text-right"
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#d97706",
                        }}
                      >
                        {r[1]}pt
                      </td>
                      <td
                        className="px-4 py-2 text-right"
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#dc2626",
                        }}
                      >
                        {r[2]}pt
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="sect-altar-cooking"
            className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <div
              className="px-5 py-3.5 border-b border-orange-100"
              style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🍳</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#c2410c",
                  }}
                >
                  요리
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#fff7ed",
                      borderBottom: "2px solid #fed7aa",
                    }}
                  >
                    <th
                      className="px-4 py-2.5 text-left text-orange-700"
                      style={{ fontSize: "11px", fontWeight: 700 }}
                    >
                      요리 이름
                    </th>
                    <th
                      className="px-4 py-2.5 text-right text-orange-700"
                      style={{ fontSize: "11px", fontWeight: 700 }}
                    >
                      경쟁 포인트
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                  {cookingPoints.map((r) => (
                    <tr
                      key={r.name}
                      className="hover:bg-orange-50/40 transition-colors"
                    >
                      <td
                        className="px-4 py-2 text-slate-700"
                        style={{ fontSize: "13px" }}
                      >
                        {r.name}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span
                          className="bg-orange-100 text-orange-700 rounded-full px-2 py-0.5"
                          style={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          {r.pts}pt
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {subTab === "rank" && (
        <div id="sect-altar-rank-rewards" className="space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
            <p className="text-slate-500" style={{ fontSize: "12px" }}>
              🏆 시즌 종료 후 최종 순위에 따라 보상이 우편함으로 지급됩니다.
            </p>
          </div>
          {rankRewards.map((r) => (
            <div
              key={r.rank}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <div
                className="px-5 py-3 border-b border-slate-100 flex items-center gap-2.5"
                style={{ background: "#f8fafc" }}
              >
                <span className="text-xl">{r.emoji}</span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1e293b",
                  }}
                >
                  {r.rank} 보상
                </span>
                {r.cash && (
                  <span
                    className="ml-auto text-slate-500"
                    style={{ fontSize: "12px" }}
                  >
                    💎 {r.cash}
                  </span>
                )}
              </div>
              <div className="px-5 py-3">
                {r.scroll && (
                  <div
                    className="mb-2.5 pb-2.5 border-b border-slate-100 text-slate-500"
                    style={{ fontSize: "12px" }}
                  >
                    📜 {r.scroll}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {r.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-slate-600"
                      style={{ fontSize: "13px" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "level" && (
        <div id="sect-altar-level-rewards" className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3">
            <p className="text-yellow-700" style={{ fontSize: "12px" }}>
              🌟 누적 경쟁 점수가 특정 구간에 도달하면 자동으로 보상이
              지급됩니다. (총 21단계)
            </p>
          </div>
          <div className="space-y-2">
            {levelRewards.map((r) => (
              <div
                key={r.pts}
                className="bg-white border-2 border-yellow-200 rounded-2xl overflow-hidden"
              >
                <div
                  className="flex items-center gap-3 px-4 py-2.5 border-b border-yellow-50"
                  style={{
                    background: "linear-gradient(135deg,#fefce8,#fef9c3)",
                  }}
                >
                  <span
                    className="bg-yellow-300 text-yellow-900 rounded-full px-3 py-0.5 flex-shrink-0"
                    style={{ fontSize: "13px", fontWeight: 800 }}
                  >
                    {r.pts} pt
                  </span>
                </div>
                <div className="px-4 py-3 flex flex-wrap gap-1.5">
                  {r.items.map((item, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getBadge(item)}`}
                      style={{ fontSize: "11px", fontWeight: 600 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "priest" && (
        <div
          id="sect-altar-priest-shop"
          className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div
            className="px-5 py-3.5 border-b border-stone-100"
            style={{ background: "linear-gradient(135deg,#fafaf9,#f5f5f4)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⚜️</span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#44403c" }}
              >
                사제 상점
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: "#fafaf9",
                    borderBottom: "2px solid #e7e5e4",
                  }}
                >
                  <th
                    className="px-4 py-2.5 text-left text-stone-600"
                    style={{ fontSize: "11px", fontWeight: 700 }}
                  >
                    아이템 이름
                  </th>
                  <th
                    className="px-4 py-2.5 text-left text-stone-600"
                    style={{ fontSize: "11px", fontWeight: 700 }}
                  >
                    구매 가격
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td
                    className="px-4 py-3 text-slate-700"
                    style={{ fontSize: "13px" }}
                  >
                    미가공 복구석ㆍ거친 원석
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="bg-stone-100 text-stone-700 rounded-full px-2.5 py-0.5"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      2,000,000 포인트
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
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
  "royal-supply": <RoyalSupplyContent />,
  marriage: <MarriageContent />,
  "donation-king": <DonationKingContent />,
  parkour: <ParkourContent />,
  blockwars: <BlockwarsContent />,
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
                      if (item.key === "island") {
                        navigate("/content/island");
                      } else if (item.key === "traits") {
                        navigate("/content/traits");
                      } else if (item.key === "shop") {
                        navigate("/content/shop");
                      } else {
                        navigate(`/content?tab=${item.key}`);
                      }
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
  const { hash } = useLocation();

  // AltarContent 외 탭: hash 위치로 스크롤
  useEffect(() => {
    if (!hash || activeTab === "altar") return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(timer);
  }, [hash, activeTab]);

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
