import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

function getItemStyle(item: string): string {
  if (item.includes("[화폐]")) return "bg-amber-100 text-amber-800 border border-amber-200";
  if (item.includes("강화서")) return "bg-violet-100 text-violet-800 border border-violet-200";
  if (item.includes("주문서")) return "bg-blue-100 text-blue-800 border border-blue-200";
  if (item.includes("포션")) return "bg-red-100 text-red-800 border border-red-200";
  if (item.includes("소라고동")) return "bg-cyan-100 text-cyan-800 border border-cyan-200";
  if (item.includes("꿀") || item.includes("토종") || item.includes("밀랍"))
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  if (item.includes("뼈가루") || item.includes("뼈"))
    return "bg-stone-100 text-stone-700 border border-stone-200";
  if (item.includes("도토리") || item.includes("지렁이") || item.includes("산삼"))
    return "bg-green-100 text-green-800 border border-green-200";
  return "bg-slate-100 text-slate-700 border border-slate-200";
}

const dailyRewards: { day: number; items: string[] }[] = [
  { day: 1, items: ["[화폐] 자연은 주괴"] },
  { day: 2, items: ["[화폐] 화려한 금 주괴 2개", "하급 두루마리 강화서 [50% 주문서 뽑기]", "가공된 꿀조각"] },
  { day: 3, items: ["황금 뼈가루 (10개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "은행 현금 뭉텅이", "허수아비", "산삼 씨앗"] },
  { day: 4, items: ["빛 (3개)", "[화폐] 화려한 금 주괴", "가공된 꿀조각", "자동심기 기술 주문서 (+1000회)", "엘레베이터 블럭"] },
  { day: 5, items: ["가공된 꿀조각", "산삼 씨앗", "뼈 (10개)"] },
  { day: 6, items: ["[화폐] 화려한 금 주괴 (2개)", "자연 꿀밀랍", "꼬마의 저금통 (5개)"] },
  { day: 7, items: ["꼬마의 저금통 (5개)", "의문의 빨강포션", "은행 현금 뭉텅이", "뼈 (5개)", "양조기", "자연 꿀밀랍"] },
  { day: 8, items: ["[화폐] 화려한 금 주괴", "자연 꿀밀랍", "하급 두루마리 강화서 [50% 주문서 뽑기]"] },
  { day: 9, items: ["가공된 꿀조각", "뼈 (15개)", "자동심기 기술 주문서 (+2000회)"] },
  { day: 10, items: ["엘레베이터 블럭", "엔더상자", "양조기", "[화폐] 빛나는 다이아 주괴"] },
  { day: 11, items: ["황금 뼈가루 (20개)", "제초기"] },
  { day: 12, items: ["반짝반짝 빛나는 거울", "엘레베이터 블럭", "블럭블럭 자동조합 큐브 [1회용] (10개)", "[화폐] 빛나는 다이아 주괴", "중급 두루마리 강화서 [60% 주문서 뽑기]"] },
  { day: 13, items: ["천연 토종꿀", "빛 (5개)", "자동심기 기술 주문서 (+3000회)"] },
  { day: 14, items: ["의문의 파랑포션", "[화폐] 화려한 이리듐 주괴", "자동심기 기술 주문서 (+3000회) (2개)"] },
  { day: 15, items: ["하급 두루마리 강화서 [50% 주문서 뽑기]", "폭죽 로켓 (10개)", "자동심기 기술 주문서 (+5000회)"] },
  { day: 16, items: ["[화폐] 화려한 이리듐 주괴", "일반 소라고동", "은행 현금 뭉텅이", "자연 꿀밀랍"] },
  { day: 17, items: ["황금 뼈가루 (30개)", "제초기 (2개)", "산삼 씨앗 (3개)", "자동심기 기술 주문서 (+5000회)", "[화폐] 화려한 이리듐 주괴"] },
  { day: 18, items: ["일반 소라고동", "상급 두루마리 강화서 [70% 주문서 뽑기]", "은행 현금 뭉텅이", "[화폐] 화려한 금 주괴 (5개)"] },
  { day: 19, items: ["자연 꿀밀랍", "뼈 (15개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "도토리 (15개)", "우아한 바다진주"] },
  { day: 20, items: ["황금 뼈가루 (30개)", "제초기 (3개)", "산삼 씨앗 (5개)", "일반 소라고동", "[화폐] 화려한 이리듐 주괴"] },
  { day: 21, items: ["천연 토종꿀", "[화폐] 빛나는 다이아 주괴", "의문의 벨소리", "반짝반짝 빛나는 거울"] },
  { day: 22, items: ["도토리 (20개)", "폭죽 로켓 (10개)", "[화폐] 화려한 이리듐 주괴", "뼈 (15개)", "우아한 바다진주", "일반 소라고동"] },
  { day: 23, items: ["엘레베이터 블럭", "빛 (5개)", "황금 지렁이", "상급 두루마리 강화서 [70% 주문서 뽑기]", "자연 꿀밀랍", "은행 현금 뭉텅이"] },
  { day: 24, items: ["[화폐] 화려한 금 주괴 (2개)", "하급 두루마리 강화서 [50% 주문서 뽑기]", "빛 (5개)", "지렁이 (10개)"] },
  { day: 25, items: ["폭죽 로켓 (10개)", "[화폐] 화려한 이리듐 주괴", "양조기", "자연 꿀밀랍", "우아한 바다진주"] },
  { day: 26, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "상급 두루마리 강화서 [70% 주문서 뽑기]", "반짝반짝 빛나는 거울", "의문의 빨강포션", "[화폐] 빛나는 다이아 주괴"] },
  { day: 27, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "천연 토종꿀", "[화폐] 화려한 이리듐 주괴"] },
  { day: 28, items: ["의문의 빨강포션", "의문의 파랑포션", "최상급 두루마리 강화서 [80% 주문서 뽑기]", "일반 소라고동"] },
  { day: 29, items: ["상급 두루마리 강화서 [70% 주문서 뽑기]", "은행 현금 뭉텅이", "양조기", "일반 소라고동 (2개)", "엘레베이터 블럭"] },
  { day: 30, items: ["중급 두루마리 강화서 [60% 주문서 뽑기]", "천연 토종꿀", "뼈 (10개)", "도토리 (30개)"] },
  { day: 31, items: ["의문의 빨강포션", "의문의 파랑포션", "최상급 두루마리 강화서 [80% 주문서 뽑기]", "의문의 벨소리", "마법의 소라고동"] },
];

// Legend items for color coding
const legend = [
  { label: "화폐", style: "bg-amber-100 text-amber-800 border border-amber-200" },
  { label: "강화서", style: "bg-violet-100 text-violet-800 border border-violet-200" },
  { label: "주문서", style: "bg-blue-100 text-blue-800 border border-blue-200" },
  { label: "포션", style: "bg-red-100 text-red-800 border border-red-200" },
  { label: "소라고동", style: "bg-cyan-100 text-cyan-800 border border-cyan-200" },
  { label: "꿀·밀랍", style: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
  { label: "뼈·뼈가루", style: "bg-stone-100 text-stone-700 border border-stone-200" },
  { label: "자연 재료", style: "bg-green-100 text-green-800 border border-green-200" },
  { label: "기타", style: "bg-slate-100 text-slate-700 border border-slate-200" },
];

export function DailyRewardsPage() {
  const today = new Date().getDate();

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 mb-3" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-amber-700">홈</Link>
            <span>›</span>
            <span className="text-slate-600">🎁 일일보상 전체</span>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Link>
            <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
              🎁 일일보상 전체 (1~31일)
            </h1>
          </div>
          <p className="text-slate-500" style={{ fontSize: "13px", fontWeight: 500 }}>
            매일 접속 시 출석 체크로 받을 수 있는 일일 보상 목록입니다.
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white border border-amber-100 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="text-slate-600 mb-2.5" style={{ fontSize: "12px", fontWeight: 700 }}>🏷️ 아이템 색상 안내</div>
          <div className="flex flex-wrap gap-1.5">
            {legend.map((l) => (
              <span
                key={l.label}
                className={`inline-flex items-center rounded-lg px-2 py-0.5 ${l.style}`}
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Today highlight notice */}
        {today >= 1 && today <= 31 && (
          <div
            className="rounded-2xl p-3.5 mb-5 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "2px solid #f5c842" }}
          >
            <span className="text-2xl">📅</span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#92400e" }}>
                오늘은 {today}일차 보상!
              </div>
              <div className="text-amber-700 flex flex-wrap gap-1 mt-1">
                {dailyRewards[today - 1]?.items.map((item, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Full rewards list */}
        <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-amber-50" style={{ background: "#fffef5" }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <span className="text-slate-700" style={{ fontSize: "16px", fontWeight: 700 }}>전체 보상 목록</span>
              <span className="bg-amber-100 text-amber-600 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
                31일
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {dailyRewards.map((r) => (
              <div
                key={r.day}
                className={`flex items-start gap-4 px-5 py-4 transition-colors ${
                  r.day === today ? "bg-amber-50" : "hover:bg-slate-50/50"
                }`}
              >
                {/* Day circle */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      r.day === today
                        ? "linear-gradient(135deg, #f5c842, #f59e0b)"
                        : r.day < today
                        ? "#e2e8f0"
                        : "#f1f5f9",
                    color: r.day === today ? "#1a1200" : r.day < today ? "#94a3b8" : "#64748b",
                    fontSize: "14px",
                    fontWeight: 900,
                    boxShadow: r.day === today ? "0 2px 10px rgba(245,200,66,0.5)" : "none",
                  }}
                >
                  {r.day}
                </div>

                {/* Items */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {r.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center rounded-lg px-2 py-0.5 ${getItemStyle(item)}`}
                        style={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Today badge */}
                {r.day === today && (
                  <span
                    className="flex-shrink-0 rounded-full px-2.5 py-1"
                    style={{
                      background: "linear-gradient(135deg, #f5c842, #f59e0b)",
                      color: "#1a1200",
                      fontSize: "11px",
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

        {/* Bottom nav */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
            style={{ fontSize: "13px", fontWeight: 700 }}
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
          <Link
            to="/content?tab=events"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #f5c842, #f59e0b)", color: "#1a1200", fontSize: "13px", fontWeight: 700 }}
          >
            🎉 이벤트 전체 안내 보기
          </Link>
        </div>
      </div>
    </div>
  );
}