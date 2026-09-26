import { Link } from "react-router";
import probImg from "../../imports/c1.png";
import toolSkinImg from "../../imports/c2.png";
import costumeImg from "../../imports/c3.png";

export const probItems: { name: string; pct: number }[] = [
  { name: "새싹토리", pct: 0.25 },
  { name: "블루포포", pct: 0.25 },
  { name: "삐요", pct: 0.25 },
  { name: "루루", pct: 0.25 },
  { name: "가을잎 발자국", pct: 0.2 },
  { name: "밤의달 발자국", pct: 0.2 },
  { name: "추석 도구 뽑기", pct: 0.5 },
  { name: "추석 코스튬 뽑기", pct: 0.5 },
  { name: "추석 칭호 선택권", pct: 0.4 },
  { name: "추석 뱃지 선택권", pct: 0.3 },
  { name: "추석 엠블럼 선택권", pct: 0.3 },
  { name: "최상급 두루마리", pct: 1 },
  { name: "상급 두루마리", pct: 2 },
  { name: "중급 두루마리", pct: 5 },
  { name: "하급 두루마리", pct: 10 },
  { name: "자동심기 1000회", pct: 10 },
  { name: "자동심기 2000회", pct: 5 },
  { name: "자동심기 3000회", pct: 2 },
  { name: "가공된 꿀조각", pct: 15 },
  { name: "자연 밀랍", pct: 5 },
  { name: "천연 토종꿀", pct: 3 },
  { name: "판매스틱 100회", pct: 5 },
  { name: "돼지 저금통 2개", pct: 10 },
  { name: "일반 복구석 3개", pct: 5 },
  { name: "전문가 복구석", pct: 1 },
  { name: "장인 복구석", pct: 0.5 },
  { name: "이리듐 주괴", pct: 10 },
  { name: "은행 현금 뭉텅이", pct: 1 },
  { name: "바다의 진주", pct: 1 },
  { name: "엘레베이터 블럭", pct: 1 },
  { name: "일반 소라고동", pct: 1 },
  { name: "야채 바구니", pct: 1 },
  { name: "의문의 파랑포션", pct: 0.8 },
  { name: "의문의 빨강포션", pct: 0.8 },
  { name: "의문의 벨소리", pct: 0.5 },
];

export const CHUSEOK_COLOR = "#4338ca";

const probHalf = Math.ceil(probItems.length / 2);
const probColumns = [probItems.slice(0, probHalf), probItems.slice(probHalf)];

function ProbRow({ item }: { item: { name: string; pct: number } }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-slate-700" style={{ fontSize: "12px" }}>
        {item.name}
      </span>
      <span style={{ fontSize: "12px", fontWeight: 800, color: CHUSEOK_COLOR }}>
        {item.pct}%
      </span>
    </div>
  );
}

export function ChuseokEventContent() {
  const COLOR = CHUSEOK_COLOR;

  return (
    <>
      {/* 사용법 안내 */}
      <div className="rounded-2xl p-4 mb-4 flex items-center gap-3" style={{ background: COLOR + "12", border: `1px solid ${COLOR}33` }}>
        <span className="text-xl flex-shrink-0">💡</span>
        <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLOR }}>
          인게임에서 왼손에 들고 <strong>F</strong>를 누르면 확률 및 아이템을 확인할 수 있습니다.
        </p>
      </div>

      {/* 착용샷 보기 버튼 */}
      <Link
        to="/chuseok-event/outfits"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl mb-6 transition-all hover:shadow-md"
        style={{ background: `linear-gradient(135deg, ${COLOR}, #6366f1)`, color: "#fff", fontSize: "14px", fontWeight: 800 }}
      >
        📸 착용샷 보기
      </Link>

      {/* 확률표 (아코디언) */}
      <details className="group bg-white rounded-2xl border-2 overflow-hidden shadow-sm mb-6" style={{ borderColor: COLOR + "55" }}>
        <summary
          className="flex items-center gap-2 px-5 py-4 cursor-pointer list-none flex-wrap"
          style={{ background: COLOR + "15" }}
        >
          <span className="text-xl">🎰</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: COLOR }}>추석 랜덤 뽑기권 확률표</span>
          <span
            className="rounded-full px-2 py-0.5"
            style={{ background: COLOR + "28", color: COLOR, fontSize: "11px", fontWeight: 700 }}
          >
            {probItems.length}종
          </span>
          <span className="ml-auto text-slate-400 group-open:rotate-180 transition-transform" style={{ fontSize: "14px" }}>
            ▾
          </span>
        </summary>

        <div className="p-4 border-b border-slate-50">
          <img src={probImg} alt="추석 랜덤 뽑기권 아이템 아이콘" className="mx-auto rounded-xl border border-slate-100" style={{ imageRendering: "pixelated", maxWidth: "100%" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
          {probColumns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`divide-y divide-slate-100 ${colIdx === 1 ? "sm:border-l sm:border-slate-100" : ""}`}
            >
              {col.map((item) => (
                <ProbRow key={item.name} item={item} />
              ))}
            </div>
          ))}
        </div>
      </details>

      {/* 추석 도구스킨 뽑기 */}
      <div className="bg-white rounded-2xl border-2 overflow-hidden shadow-sm mb-6" style={{ borderColor: COLOR + "55" }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ background: COLOR + "15" }}>
          <span className="text-xl">🛠️</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: COLOR }}>추석 도구스킨 뽑기</span>
        </div>
        <div className="p-4">
          <div className="rounded-2xl p-3.5 mb-4 flex items-center gap-3" style={{ background: COLOR + "12", border: `1px solid ${COLOR}33` }}>
            <span className="text-lg flex-shrink-0">⚖️</span>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLOR }}>
              해당 뽑기권의 확률은 모두 동일하여 <strong>1:1:1 확률</strong>입니다.
            </p>
          </div>
          <img src={toolSkinImg} alt="추석 도구스킨 목록" className="mx-auto rounded-xl border border-slate-100" style={{ imageRendering: "pixelated", maxWidth: "100%" }} />
        </div>
      </div>

      {/* 추석 코스튬 뽑기 */}
      <div className="bg-white rounded-2xl border-2 overflow-hidden shadow-sm" style={{ borderColor: COLOR + "55" }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ background: COLOR + "15" }}>
          <span className="text-xl">👘</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: COLOR }}>추석 코스튬 뽑기</span>
        </div>
        <div className="p-4">
          <div className="rounded-2xl p-3.5 mb-4 flex items-center gap-3" style={{ background: COLOR + "12", border: `1px solid ${COLOR}33` }}>
            <span className="text-lg flex-shrink-0">⚖️</span>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLOR }}>
              해당 뽑기권의 확률은 모두 동일하여 <strong>1:1:1 확률</strong>입니다.
            </p>
          </div>
          <img src={costumeImg} alt="추석 코스튬 목록" className="mx-auto rounded-xl border border-slate-100" style={{ imageRendering: "pixelated", maxWidth: "100%" }} />
        </div>
      </div>
    </>
  );
}
