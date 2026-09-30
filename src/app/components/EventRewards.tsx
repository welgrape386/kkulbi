// 홈 / 콘텐츠(이벤트 안내) / 일일보상 페이지가 함께 쓰는 이벤트 보상 데이터와 카드

// 일일보상이 확정되면 true로 바꾸면 홈·이벤트 안내·바로가기·검색에 다시 노출됩니다.
export const SHOW_DAILY_REWARDS = false;

export function getItemStyle(item: string): string {
  if (item.includes("[화폐]") || item.includes("주괴"))
    return "bg-amber-100 text-amber-800 border border-amber-200";
  if (item.includes("강화서"))
    return "bg-violet-100 text-violet-800 border border-violet-200";
  if (item.includes("주문서") || item.includes("자동심기"))
    return "bg-blue-100 text-blue-800 border border-blue-200";
  if (item.includes("포션"))
    return "bg-red-100 text-red-800 border border-red-200";
  if (item.includes("소라고동") || item.includes("진주"))
    return "bg-cyan-100 text-cyan-800 border border-cyan-200";
  if (item.includes("꿀") || item.includes("토종") || item.includes("밀랍"))
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  if (item.includes("뼈"))
    return "bg-stone-100 text-stone-700 border border-stone-200";
  if (item.includes("도토리") || item.includes("지렁이") || item.includes("산삼"))
    return "bg-green-100 text-green-800 border border-green-200";
  return "bg-slate-100 text-slate-700 border border-slate-200";
}

export const dailyRewards: { day: number; items: string[] }[] = Array.from(
  { length: 31 },
  (_, i) => ({ day: i + 1, items: ["보상 미정 (업데이트예정)"] }),
);

const minelistRewards = [
  "클로버",
  "자동심기 기술 주문서 (+1000회)",
  "경험치 병 (64개)",
  "[화폐] 화려한 금 주괴 (5개)",
  "자연 꿀밀랍",
  "뼈 (5개)",
];

const playtimeRewards = [
  { time: "30분", items: ["자연은 주괴", "뼈다귀 3개"] },
  { time: "1시간", items: ["가공된 꿀조각", "경험치 병 64개"] },
  { time: "2시간", items: ["화려한 금 주괴", "뼈다귀 5개"] },
  { time: "3시간", items: ["일반 복구석", "자동심기 500회"] },
  { time: "5시간", items: ["자연 꿀밀랍", "화려한 금 주괴", "일반 복구석"] },
  { time: "8시간", items: ["일반 복구석 2개", "화려한 금 주괴 2개", "뼈다귀 5개"] },
];

const playtimeCompleteRewards = [
  "천연 토종꿀",
  "바다의 진주",
  "화려한 금 주괴",
  "뼈다귀 10개",
];

export function ItemBadge({ item, size = 11 }: { item: string; size?: number }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
      style={{ fontSize: `${size}px`, fontWeight: 600 }}
    >
      {item}
    </span>
  );
}

export function MinelistRewardsCard() {
  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">👍</span>
        <div className="text-slate-700" style={{ fontSize: "15px", fontWeight: 800 }}>
          마인리스트 추천 보상
        </div>
      </div>
      <p className="text-slate-500 mb-3" style={{ fontSize: "12px", lineHeight: 1.6 }}>
        마인리스트 추천 참여 시 받을 수 있는 전체지급 보상이에요.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {minelistRewards.map((item) => (
          <ItemBadge key={item} item={item} />
        ))}
      </div>
    </div>
  );
}

export function PlaytimeRewardsCard() {
  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">⏱️</span>
        <div className="text-slate-700" style={{ fontSize: "15px", fontWeight: 800 }}>
          접속시간 보상
        </div>
      </div>
      <p className="text-slate-500 mb-3" style={{ fontSize: "12px", lineHeight: 1.6 }}>
        접속 시간에 따라 단계별로 받을 수 있는 보상이에요.
      </p>
      <div className="space-y-1.5 mb-2">
        {playtimeRewards.map(({ time, items }) => (
          <div key={time} className="flex items-start gap-2">
            <span
              className="flex-shrink-0 w-12 text-center rounded-lg px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200"
              style={{ fontSize: "11px", fontWeight: 800 }}
            >
              {time}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <ItemBadge key={item} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
        <div className="text-amber-800 mb-2" style={{ fontSize: "12px", fontWeight: 800 }}>
          🏆 완성보상{" "}
          <span className="text-amber-700" style={{ fontWeight: 600 }}>
            [모든 보상 수령 시]
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {playtimeCompleteRewards.map((item) => (
            <ItemBadge key={item} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
