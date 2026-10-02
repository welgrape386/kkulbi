import { useSearchParams, Link, useNavigate, Navigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { shopCategories, NOT_TRADABLE } from "./shopData";
import { ChuseokEventContent } from "./ChuseokEventContent";
import {
  SHOW_DAILY_REWARDS,
  dailyRewards,
  ItemBadge,
  MinelistRewardsCard,
  PlaytimeRewardsCard,
} from "./EventRewards";
import cat1 from "../../imports/cat1.png";
import cat2 from "../../imports/cat2.png";
import cat3 from "../../imports/cat3.png";
import cat4 from "../../imports/cat4.png";
import cat5 from "../../imports/cat5.png";
import cat6 from "../../imports/cat6.png";
import cat7 from "../../imports/cat7.png";

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
    desc: "상점 아이템 및 가격 안내",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd",
  },
  {
    key: "cash-shop",
    label: "캐시상점",
    emoji: "🛍️",
    desc: "캐시로 구매하는 유틸·도구·펫·칭호",
    color: "#db2777",
    bg: "#fdf2f8",
    border: "#f9a8d4",
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
    label: "도감 (업데이트예정)",
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
    label: "파쿠르 (업데이트예정)",
    emoji: "🏃",
    desc: "파쿠르 코스 규칙 및 보상 안내",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
  {
    key: "blockwars",
    label: "블럭워즈 (업데이트예정)",
    emoji: "⚔️",
    desc: "PVP 블럭워즈 규칙 및 전략",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    key: "marriage",
    label: "결혼 (업데이트예정)",
    emoji: "💒",
    desc: "결혼 시스템 및 혜택 안내",
    color: "#db2777",
    bg: "#fdf2f8",
    border: "#fbcfe8",
  },
  {
    key: "seotda",
    label: "섯다 (업데이트예정)",
    emoji: "🃏",
    desc: "섯다 게임 규칙 안내",
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fef08a",
  },
  {
    key: "painting",
    label: "그림 (업데이트예정)",
    emoji: "🎨",
    desc: "그림 아이템 제작 안내",
    color: "#0284c7",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    key: "donation-king",
    label: "기부왕 (업데이트예정)",
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
    label: "왕실납품 (업데이트예정)",
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
    desc: "추석 이벤트, 마인리스트, 접속시간 보상",
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
      name: "새싹",
      emoji: "🌱",
      req: { money: "500,000원", time: null, mine: "2회" },
      perms: ["/밥"],
    },
    {
      tier: 2,
      name: "잎",
      emoji: "🌿",
      req: { money: "1,000,000원", time: null, mine: "3회" },
      perms: ["/창고 2 (54칸)", "/엔더상자"],
    },
    {
      tier: 3,
      name: "꽃",
      emoji: "🌸",
      req: { money: "2,000,000원", time: null, mine: "5회" },
      perms: ["유저상점 등록 20개 (10→20)"],
    },
    {
      tier: 4,
      name: "숲",
      emoji: "🌳",
      req: { money: "10,000,000원", time: null, mine: "8회" },
      perms: ["/창고 3 (54칸)", "/가구염색"],
    },
    {
      tier: 5,
      name: "벌",
      emoji: "⭐",
      req: { money: "40,000,000원", time: "60시간", mine: "12회" },
      perms: ["/조합대", "/이모지", "그림 기능"],
    },
    {
      tier: 6,
      name: "벌집",
      emoji: "🌟",
      req: { money: "70,000,000원", time: "100시간", mine: "15회" },
      perms: ["/창고 4 (54칸)", "캐시 보내기 무료", "더블점프"],
    },
    {
      tier: 7,
      name: "꿀",
      emoji: "💫",
      req: { money: "100,000,000원", time: null, mine: null },
      perms: ["/확성기 무료", "추천 시 100캐시 지급"],
    },
    {
      tier: 8,
      name: "진꿀",
      emoji: "✨",
      req: { money: "250,000,000원", time: "240시간", mine: "25회" },
      perms: ["/창고 5", "/액자", "/수산시장"],
    },
    {
      tier: 9,
      name: "황꿀",
      emoji: "🏅",
      req: { money: "500,000,000원", time: "360시간", mine: "30회" },
      perms: ["/자동조합", "/상점열기"],
    },
    {
      tier: 10,
      name: "군락",
      emoji: "🥇",
      req: { money: "1,000,000,000원", time: "500시간", mine: "40회" },
      perms: ["/창고 6 (54칸)", "특별 메시지", "무한 플라이", "원격제단"],
    },
    {
      tier: 11,
      name: "꿀비",
      emoji: "💎",
      req: { money: "3,000,000,000원", time: "720시간", mine: "50회" },
      perms: [
        "특별 메시지",
        "꿀비 전용 엠블럼",
        "꿀비 전용 뱃지",
        "꿀비 전용 발자국",
        "꿀비 전용 펫",
      ],
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
                        {r.name}
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
                    {r.req.mine ?? "-"}
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

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💡 꿀팁
        </h3>

        <p
          className="text-amber-700"
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

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📦 납품 규칙
        </h3>

        <div
          className="text-amber-700"
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
            ["상급 두루마리 강화서 [60% 뽑기]", "60 포인트"],
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
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🎨 그림
        </h3>

        <p
          className="text-amber-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          다양한 도구를 사용하여 그림을 제작할 수 있습니다.
          아래 순서대로 따라하면 쉽게 그림을 완성할 수 있어요!
        </p>
      </div>

      {/* 받침대 */}
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
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
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
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
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
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
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
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
      <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
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

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-4">

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
                "장인 복구석 3개",
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
                "장인 복구석 2개",
              ],
            },
            {
              rank: "🏅 5등",
              color: "blue",
              rewards: [
                "최상급 두루마리 강화서 3개",
                "상급 두루마리 강화서 2개",
                "경쟁전 트로피 토큰 40개",
                "장인 복구석 2개",
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

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          💡 땡잡이 규칙
        </h3>

        <p
          className="text-amber-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          <strong>땡잡이(3·7)</strong>는 상대가 1땡~9땡일 때 승리합니다.
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
            ["🌽 수확", "산삼씨앗 획득 확률 증가"],
            ["🪓 벌목", "도토리 획득 확률 증가"],
            ["🎣 어부", "진주 획득 확률 증가"],
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
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
        <h3
          className="text-orange-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🏃 파쿠르
        </h3>

        <p
          className="text-orange-700"
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

      <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
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
            ["최상급 두루마리 강화서 [70%]", "10개"],
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
                className="px-3 py-1 rounded-lg bg-orange-100 text-orange-800"
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
  const today = new Date().getDate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {SHOW_DAILY_REWARDS ? (
          <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-50">
              <span className="text-xl">🎁</span>
              <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>
                일일보상 (출석 체크)
              </span>
              <Link
                to="/daily-rewards"
                className="ml-auto text-amber-700 hover:text-amber-900"
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                전체보기 ›
              </Link>
            </div>
            <div className="divide-y divide-slate-50 overflow-y-auto" style={{ maxHeight: "700px" }}>
              {dailyRewards.map((r) => (
                <div
                  key={r.day}
                  className={`flex items-start gap-3 px-5 py-3.5 ${r.day === today ? "bg-amber-50" : ""}`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: r.day === today ? "linear-gradient(135deg,#f5c842,#f59e0b)" : "#f1f5f9",
                      color: r.day === today ? "#1a1200" : "#475569",
                      fontSize: "13px",
                      fontWeight: 900,
                    }}
                  >
                    {r.day}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {r.items.map((item) => (
                      <ItemBadge key={item} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ChuseokEventContent />
        )}
      </div>

      <div className="space-y-4">
        <MinelistRewardsCard />
        <PlaytimeRewardsCard />
      </div>
    </div>
  );
}

const shopSections = shopCategories.map((c) => ({
  key: c.key,
  label: c.label,
  emoji: c.emoji,
  desc: c.desc,
  color: c.color,
  bg: c.bg,
  border: c.border,
  items: c.rows.map(([name, buy, sell]) => ({ name, buy, sell })),
}));
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
      <p className="text-slate-500" style={{ fontSize: "14px" }}>
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
              chance: "40% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252FFKcE6qU5BMkYDuXHP2qH%252Fimage.png%3Falt%3Dmedia%26token%3De018ec88-8f83-46ae-b93a-36a3843f9296&width=300&dpr=4&quality=100&sign=55ef0d91&sv=2",
            },
            {
              title: "중급 두루마리 강화서",
              chance: "50% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252F8qC3U3f4uhvy6XvO4HkU%252Fimage.png%3Falt%3Dmedia%26token%3Dbf2e01a6-a3d9-4577-9b0c-0b5319cc5bca&width=300&dpr=4&quality=100&sign=703c3064&sv=2",
            },
            {
              title: "상급 두루마리 강화서",
              chance: "60% 주문서 뽑기",
              image:
                "https://kkulbi-farm.gitbook.io/kkulbi-forest-season-1/~gitbook/image?url=https%3A%2F%2F1465514990-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F10hHnnzC9NsLN7yFlly7%252Fuploads%252FCjpoto98rwSwx3pNvuPW%252Fimage.png%3Falt%3Dmedia%26token%3D061e61e3-a3d0-48cf-81a1-abe5235ad850&width=300&dpr=4&quality=100&sign=a79de4fc&sv=2",
            },
            {
              title: "최상급 두루마리 강화서",
              chance: "70% 주문서 뽑기",
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
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          📊 주문서 확률
        </h3>

        <ul
          className="text-amber-700 space-y-2"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          <li>• 성공 확률은 40%, 50%, 60%, 70%로 고정됩니다.</li>
          <li>• 파괴 확률은 10% ~ 50% 사이에서 랜덤입니다. (아래 랜덤 뽑기 탭의 두루마리 확률표 참고)</li>
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
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🔨 강화 복구 방법
        </h3>

        <p
          className="text-amber-700 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          아이템이 파괴되었다고요?
          <br />
          걱정하지 마세요! 복구석을 이용하여 아이템을 복구할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            "복구석을 준비합니다",
            "복구할 아이템을 손에 듭니다",
            "/강화복구 명령어를 입력합니다",
            "사용할 복구석을 선택합니다",
          ].map((step, index) => (
            <div
              key={step}
              className="bg-white border border-amber-100 rounded-2xl p-4"
            >
              <div
                className="text-amber-700 mb-2"
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
          className="w-full max-w-xl mx-auto rounded-2xl border border-amber-200"
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

// ─── 랜덤 뽑기 Content ─────────────────────────────────────────────────────────
function GachaProbTable({
  color,
  cols,
  rows,
}: {
  color: string;
  cols: [string, string];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full">
        <thead>
          <tr style={{ background: color + "22" }}>
            <th
              className="px-4 py-2.5 text-left"
              style={{ fontSize: "11px", fontWeight: 700, color }}
            >
              {cols[0]}
            </th>
            <th
              className="px-4 py-2.5 text-right"
              style={{ fontSize: "11px", fontWeight: 700, color }}
            >
              {cols[1]}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              <td
                className="px-4 py-2.5 text-slate-700"
                style={{ fontSize: "12px" }}
              >
                {row[0]}
              </td>
              <td
                className="px-4 py-2.5 text-right"
                style={{ fontSize: "12px", fontWeight: 800, color }}
              >
                {row[1]}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const gachaSections = [
  {
    title: "40%/50%/60%/70% 두루마리",
    subtitle: "파괴 확률별 등장 비율",
    desc: "각 두루마리에서 나오는 아이템의 확률은 동일하며, 주문서의 성공 확률은 두루마리 등급에 따라 40%/50%/60%/70%입니다.",
    icon: "📜",
    color: "#7c3aed",
    cols: ["파괴 확률", "확률 (%)"] as [string, string],
    rows: [
      ["10%", "3.7"],
      ["20%", "9.26"],
      ["30%", "16.67"],
      ["40%", "25.93"],
      ["50%", "44.44"],
    ],
  },
  {
    title: "자동심기 뽑기",
    subtitle: "의문의 파랑포션",
    icon: "🧪",
    color: "#2563eb",
    cols: ["아이템 이름", "확률 (%)"] as [string, string],
    rows: [
      ["자동심기 [영구제]", "1.85"],
      ["자동심기 [500회]", "9.25"],
      ["자동심기 [1000회]", "53.7"],
      ["자동심기 [2000회]", "27.75"],
      ["자동심기 [3000회]", "7.4"],
    ],
  },
  {
    title: "고급광산 뽑기확률",
    subtitle: "의문의 벨소리",
    icon: "🔔",
    color: "#6366f1",
    cols: ["아이템 이름", "확률 (%)"] as [string, string],
    rows: [
      ["청금석 제거 고급 광산", "1.85"],
      ["석탄 제거 고급 광산", "1.85"],
      ["확률업 고급 광산", "1.85"],
      ["태양열 조각[50%]·강화 효과[1%]", "12.95"],
      ["태양열 조각[50%]·강화 효과[2%]", "11.1"],
      ["태양열 조각[60%]·강화 효과[1%]", "12.95"],
      ["태양열 조각[60%]·강화 효과[2%]", "11.1"],
      ["태양열 조각[70%]·강화 효과[1%]", "12.95"],
      ["태양열 조각[70%]·강화 효과[2%]", "11.1"],
      ["태양열 조각[80%]·강화 효과[1%]", "11.1"],
      ["태양열 조각[80%]·강화 효과[2%]", "11.1"],
    ],
  },
  {
    title: "자동조합 뽑기 확률",
    subtitle: "의문의 빨강포션",
    icon: "🧴",
    color: "#dc2626",
    cols: ["아이템 이름", "확률 (%)"] as [string, string],
    rows: [
      ["자동조합 [영구제]", "1.85"],
      ["판매스틱 [100회]", "16.65"],
      ["판매스틱 [200회]", "16.65"],
      ["판매스틱 [300회]", "16.65"],
      ["판매스틱 [500회]", "16.65"],
      ["판매스틱 [800회]", "16.65"],
      ["판매스틱 [1000회]", "14.8"],
    ],
  },
  {
    title: "고귀한 나무 정령",
    subtitle: "의문의 솔방울",
    icon: "🌲",
    color: "#16a34a",
    cols: ["아이템 이름", "확률 (%)"] as [string, string],
    rows: [
      ["고귀한 나무 정령", "1.85"],
      ["허수아비 5x5청크 1시간", "42.55"],
      ["허수아비 5x5청크 3시간", "33.3"],
      ["허수아비 5x5청크 6시간", "22.2"],
    ],
  },
];

function GachaContent() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3
          className="text-amber-800 mb-3"
          style={{ fontSize: "16px", fontWeight: 800 }}
        >
          🎰 랜덤 뽑기
        </h3>
        <p
          className="text-amber-700"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          캐시 아이템 뽑기에서 나올 수 있는 아이템의 확률표예요.
          <br />
          아래 확률표를 참고해서 원하는 아이템을 뽑아보세요!
        </p>
      </div>

      <Link
        to="/#chuseok-event"
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border-2 border-orange-200 transition-all hover:shadow-md"
      >
        <span className="text-xl">🎑</span>
        <span className="flex-1">
          <span className="block text-orange-700" style={{ fontSize: "14px", fontWeight: 800 }}>
            추석 랜덤 뽑기권 확률표
          </span>
          <span className="block text-slate-500" style={{ fontSize: "12px" }}>
            추석 이벤트 기간 한정 뽑기권의 아이템과 확률 보기
          </span>
        </span>
        <span className="text-orange-700" style={{ fontWeight: 800 }}>›</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {gachaSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl border-2 overflow-hidden shadow-sm"
            style={{ borderColor: section.color + "55" }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2 flex-wrap"
              style={{ background: section.color + "28" }}
            >
              <span className="text-xl">{section.icon}</span>
              <span
                style={{ fontSize: "14px", fontWeight: 800, color: section.color }}
              >
                {section.title}
              </span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  background: section.color + "38",
                  color: section.color,
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                {section.subtitle}
              </span>
            </div>
            {section.desc && (
              <p
                className="px-4 pt-3 bg-white text-slate-500"
                style={{ fontSize: "12px", lineHeight: 1.6 }}
              >
                {section.desc}
              </p>
            )}
            <div className={section.desc ? "pt-2 bg-white" : ""}>
              <GachaProbTable
                color={section.color}
                cols={section.cols}
                rows={section.rows}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p
          className="text-slate-500"
          style={{ fontSize: "12px", lineHeight: 1.6 }}
        >
          ※ 소수점 3번째 자리는 제외했기 때문에 99.9%도 나올 수 있습니다
        </p>
      </div>
    </div>
  );
}

const contentComponents: Record<string, ReactNode> = {
  rank: <RankContent />,
  shop: <ShopContent />,
  "cash-shop": <CashShopContent />,
  beekeeping: <BeekeepingContent />,
  enchant: <EnchantContent />,
  gacha: <GachaContent />,
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
        desc: "상점 아이템 및 가격 안내",
      },
      {
        key: "cash-shop",
        label: "캐시상점",
        emoji: "🛍️",
        desc: "캐시로 구매하는 유틸·도구·펫·칭호",
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
        label: "도감 (업데이트예정)",
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
        label: "왕실납품 (업데이트예정)",
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
        label: "결혼 (업데이트예정)",
        emoji: "💒",
        desc: "결혼 시스템 및 혜택 안내",
      },
      {
        key: "donation-king",
        label: "기부왕 (업데이트예정)",
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
        label: "그림 (업데이트예정)",
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
        label: "파쿠르 (업데이트예정)",
        emoji: "🏃",
        desc: "파쿠르 코스 규칙 및 보상 안내",
      },
      {
        key: "blockwars",
        label: "블럭워즈 (업데이트예정)",
        emoji: "⚔️",
        desc: "PVP 블럭워즈 규칙 및 전략",
      },
      {
        key: "seotda",
        label: "섯다 (업데이트예정)",
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

type ShopSectionData = (typeof shopSections)[number];

// 대소문자 무시 + 한글 자모 단위 부분 일치 (입력 중인 "도"도 "돌"에 매칭)
const normalizeSearch = (text: string) => text.normalize("NFD").toLowerCase();

function ShopItemsCard({
  section,
  items,
  title,
}: {
  section: ShopSectionData;
  items: ShopSectionData["items"];
  title: string;
}) {
  const thStyle = { fontSize: "12px", fontWeight: 700, color: section.color };

  return (
    <div
      className="bg-white border-2 rounded-2xl overflow-hidden shadow-sm"
      style={{ borderColor: section.border }}
    >
      <div className="px-5 py-4 flex items-center gap-2">
        <span className="text-xl">{section.emoji}</span>
        <span style={{ fontSize: "16px", fontWeight: 800, color: section.color }}>
          {title}
        </span>
        <span
          className="rounded-full px-2 py-0.5 bg-amber-100 text-amber-800"
          style={{ fontSize: "11px", fontWeight: 700 }}
        >
          {items.length}개
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: section.bg, borderBottom: `2px solid ${section.border}` }}>
              <th className="px-4 py-3 text-left" style={thStyle}>아이템 이름</th>
              <th className="px-4 py-3 text-left" style={thStyle}>구매 가격 (개당)</th>
              <th className="px-4 py-3 text-left" style={thStyle}>판매 가격 (개당)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr key={item.name} className="hover:bg-amber-50/30 transition-colors">
                <td className="px-4 py-3 text-slate-700" style={{ fontSize: "13px" }}>
                  {item.name}
                </td>
                {item.buy === NOT_TRADABLE ? (
                  <td colSpan={2} className="px-4 py-3">
                    <span
                      className="inline-block rounded-lg px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200"
                      style={{ fontSize: "11px", fontWeight: 600 }}
                    >
                      {NOT_TRADABLE}
                    </span>
                  </td>
                ) : (
                  <>
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: item.buy === "구매 불가" ? "#6b7280" : "#b45309",
                      }}
                    >
                      {item.buy}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: item.sell === "판매 불가" ? "#6b7280" : "#16a34a",
                      }}
                    >
                      {item.sell}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShopContent() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const selectedKey = params.get("s") ?? shopSections[0].key;

  const selectedShop =
    shopSections.find((section) => section.key === selectedKey) ??
    shopSections[0];

  const updateShopParam = (shopKey: string) => {
    const next = new URLSearchParams(params);
    next.set("tab", "shop");
    next.set("s", shopKey);
    setParams(next);
  };

  const q = normalizeSearch(query.trim());
  const results = q
    ? shopSections
        .map((section) => ({
          section,
          items: section.items.filter((item) => normalizeSearch(item.name).includes(q)),
        }))
        .filter((r) => r.items.length > 0)
    : [];
  const resultCount = results.reduce((n, r) => n + r.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p
          className="text-amber-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          🏪 해당 상점가는 변동되지 않는 고정 가격입니다.
        </p>
      </div>

      {/* 검색 */}
      <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border-2 border-amber-200 shadow-sm focus-within:border-amber-400 transition-colors">
        <Search className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="아이템 이름으로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-slate-700 placeholder-slate-500 outline-none"
          style={{ fontSize: "14px" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="검색어 지우기"
            className="flex-shrink-0 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {q ? (
        <div className="space-y-4">
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
            "{query.trim()}" 검색 결과 {resultCount}개
          </div>
          {results.length === 0 ? (
            <div
              className="bg-white border border-amber-100 rounded-2xl py-12 text-center text-slate-500"
              style={{ fontSize: "14px" }}
            >
              검색 결과가 없어요 🔍
            </div>
          ) : (
            results.map(({ section, items }) => (
              <ShopItemsCard key={section.key} section={section} items={items} title={section.label} />
            ))
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {shopSections.map((section) => {
              const isActive = selectedShop.key === section.key;

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
                  <div style={{ fontSize: "13px", fontWeight: 800, color: section.color }}>
                    {section.label}
                  </div>
                  <p className="text-slate-500 mt-1" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                    {section.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <ShopItemsCard
            section={selectedShop}
            items={selectedShop.items}
            title={`${selectedShop.label} 상점가`}
          />
        </>
      )}
    </div>
  );
}

// 캐시상점: 아이템 데이터는 추후 추가 예정
const cashShopSections = [
  { key: "util", emoji: "🧰", label: "유틸상점", desc: "편의 기능 아이템", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
  { key: "tool", emoji: "⛏️", label: "도구상점", desc: "도구 및 도구 스킨", color: "#92400e", bg: "#fffbeb", border: "#fcd34d" },
  { key: "pet", emoji: "🐾", label: "펫 상점", desc: "펫 아이템", color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  { key: "title", emoji: "🏷️", label: "칭호상점", desc: "칭호 아이템", color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
];

const catPets = [
  { name: "유러피안", img: cat1 },
  { name: "왕국", img: cat2 },
  { name: "메인쿤", img: cat3 },
  { name: "봄베이", img: cat4 },
  { name: "먼치킨", img: cat5 },
  { name: "스코티시폴드", img: cat6 },
  { name: "샴", img: cat7 },
];

function CatPetGallery() {
  return (
    <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 flex items-center gap-2">
        <span className="text-xl">🐱</span>
        <span style={{ fontSize: "16px", fontWeight: 800, color: "#16a34a" }}>고양이 펫 미리보기</span>
        <span className="rounded-full px-2 py-0.5 bg-green-100 text-green-800" style={{ fontSize: "11px", fontWeight: 700 }}>
          {catPets.length}종
        </span>
      </div>
      <p className="px-5 pb-4 text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>
        캐시상점에서 구매할 수 있는 고양이 펫이에요. 인게임에서 보이는 실제 모습입니다.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-5 pb-5">
        {catPets.map((cat) => (
          <figure key={cat.name} className="rounded-xl border-2 border-green-100 overflow-hidden bg-green-50">
            <img src={cat.img} alt={`${cat.name} 고양이 펫`} loading="lazy" className="w-full aspect-[854/497] object-cover" />
            <figcaption className="px-3 py-2 text-center" style={{ fontSize: "13px", fontWeight: 800, color: "#166534" }}>
              🐾 {cat.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function CashShopContent() {
  const [params, setParams] = useSearchParams();
  const selected =
    cashShopSections.find((section) => section.key === params.get("s")) ??
    cashShopSections[0];

  const select = (key: string) => {
    const next = new URLSearchParams(params);
    next.set("tab", "cash-shop");
    next.set("s", key);
    setParams(next);
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4">
        <p className="text-pink-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          🛍️ 캐시상점은 <strong>캐시</strong>로 구매하는 상점이에요. 일반 상점가와는 별도로 운영됩니다.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cashShopSections.map((section) => {
          const isActive = selected.key === section.key;

          return (
            <button
              key={section.key}
              onClick={() => select(section.key)}
              className="rounded-2xl p-4 border-2 text-left transition-all duration-200 hover:shadow-md"
              style={{
                background: section.bg,
                borderColor: isActive ? section.color : section.border,
                boxShadow: isActive ? `0 0 0 2px ${section.color}20` : "none",
              }}
            >
              <div className="text-2xl mb-2">{section.emoji}</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: section.color }}>
                {section.label}
              </div>
              <p className="text-slate-500 mt-1" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                {section.desc}
              </p>
            </button>
          );
        })}
      </div>

      {selected.key === "pet" ? (
        <CatPetGallery />
      ) : (
        <ComingSoon name={`캐시상점 › ${selected.label}`} />
      )}
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
            className="flex items-center gap-2 text-amber-700 mb-2"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-700">
              홈
            </Link>
            <span>›</span>
            <span className="text-slate-600">🎮 콘텐츠</span>
          </div>
          <h1
            className="mb-1"
            style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}
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
                      shop: "/content?tab=shop",
                      "cash-shop": "/content?tab=cash-shop",
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
                      className="text-slate-500 mt-1"
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
  const current = tabs.find((t) => t.key === activeTab)!;

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-amber-700 mb-3"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors flex-shrink-0"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Link>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>
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

  // 섬·특성은 별도 페이지로 이동했습니다.
  if (activeTab === "traits" || activeTab === "island") {
    return <Navigate to={`/content/${activeTab}`} replace />;
  }

  if (!tabs.some((t) => t.key === activeTab)) {
    return <Navigate to="/content" replace />;
  }

  return <ContentDetail activeTab={activeTab} />;
}
