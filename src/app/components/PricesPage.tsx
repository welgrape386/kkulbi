import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";

// ─── 공통 컴포넌트 ─────────────────────────────────────────────────────────────
function ShopTable({
  rows,
  colColors,
}: {
  rows: (string | null)[][];
  colColors?: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ background: "#fffbef", borderBottom: "2px solid #fde68a" }}
          >
            {["아이템 이름", "구매 가격", "판매 가격"].map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-left text-amber-800"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-50">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-amber-50/40 transition-colors">
              {row.map((cell, ci) => {
                const isNA = cell === "구매 불가" || cell === "판매 불가";
                return (
                  <td
                    key={ci}
                    className="px-3 py-2"
                    style={{
                      fontSize: "12px",
                      color: isNA
                        ? "#9ca3af"
                        : ci === 0
                          ? "#374151"
                          : (colColors?.[ci] ?? "#374151"),
                      fontWeight: ci === 0 ? 500 : 600,
                    }}
                  >
                    {cell ?? "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Collapse({
  title,
  children,
  color = "#b45309",
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  color?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="border-2 rounded-2xl overflow-hidden"
      style={{ borderColor: color + "40" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 transition-colors"
        style={{ background: color + "12" }}
      >
        <span style={{ fontSize: "14px", fontWeight: 700, color }}>
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color }} />
        )}
      </button>
      {open && <div className="bg-white">{children}</div>}
    </div>
  );
}

// ─── 상점가 데이터 ─────────────────────────────────────────────────────────────
const minerals: string[][] = [
  ["석탄", "구매 불가", "4원"],
  ["석탄 광석", "구매 불가", "15원"],
  ["석탄 블록", "구매 불가", "36원"],
  ["구리 원석", "구매 불가", "5원"],
  ["구리 주괴", "구매 불가", "6원"],
  ["구리 원석 블록", "구매 불가", "18원"],
  ["구리 블록", "구매 불가", "54원"],
  ["네더라이트 파편", "구매 불가", "판매 불가"],
  ["네더라이트 주괴", "구매 불가", "판매 불가"],
  ["네더라이트 블록", "구매 불가", "판매 불가"],
  ["철 원석", "구매 불가", "8원"],
  ["철 주괴", "구매 불가", "10원"],
  ["철 광석", "구매 불가", "35원"],
  ["철 블록", "구매 불가", "90원"],
  ["철 원석 블록", "구매 불가", "80원"],
  ["금 원석", "구매 불가", "12원"],
  ["금 주괴", "구매 불가", "15원"],
  ["금 광석", "구매 불가", "45원"],
  ["금 블록", "구매 불가", "135원"],
  ["금 원석 블록", "구매 불가", "108원"],
  ["다이아몬드", "구매 불가", "27원"],
  ["다이아몬드 블록", "구매 불가", "243원"],
  ["다이아몬드 광석", "구매 불가", "120원"],
  ["에메랄드", "구매 불가", "50원"],
  ["에메랄드 블록", "구매 불가", "450원"],
  ["에메랄드 광석", "구매 불가", "200원"],
  ["돌", "구매 불가", "2원"],
  ["조약돌", "구매 불가", "1원"],
  ["청금석", "구매 불가", "1원"],
  ["청금석 광석", "구매 불가", "9원"],
  ["청금석 블록", "구매 불가", "9원"],
];
const crops: string[][] = [
  ["밀 씨앗", "12원", "1원"],
  ["비트 씨앗", "12원", "1원"],
  ["호박씨", "20원", "판매 불가"],
  ["수박씨", "20원", "판매 불가"],
  ["네더 사마귀", "100원", "26원"],
  ["코코아콩", "150원", "28원"],
  ["당근", "150원", "25원"],
  ["감자", "150원", "27원"],
  ["독이 있는 감자", "구매 불가", "2,000원"],
  ["밀", "구매 불가", "110원"],
  ["비트", "구매 불가", "110원"],
  ["호박", "구매 불가", "90원"],
  ["수박", "구매 불가", "95원"],
  ["수박 조각", "구매 불가", "11원"],
  ["달콤한 열매", "150원", "19원"],
  ["대나무", "150원", "20원"],
  ["대나무블럭", "-", "180원"],
  ["건초더미", "구매 불가", "990원"],
  ["사탕수수", "150원", "25원"],
  ["지렁이", "구매 불가", "7,000원"],
  ["물 양동이", "100원", "판매 불가"],
  ["네더 사마귀 블록", "구매 불가", "279원"],
  ["대나무 블록", "구매 불가", "198원"],
  ["도토리", "구매 불가", "5,000원"],
  ["발광 열매", "150원", "판매 불가"],
  ["벌집", "구매 불가", "판매 불가"],
  ["꿀벌 생성알", "구매 불가", "판매 불가"],
  ["벌집 조각", "구매 불가", "판매 불가"],
];
const food: string[][] = [
  ["사과", "구매 불가", "5,000원"],
  ["익히지 않은 양고기", "250원", "판매 불가"],
  ["익힌 양고기", "300원", "판매 불가"],
  ["익히지 않은 소고기", "250원", "판매 불가"],
  ["스테이크", "300원", "판매 불가"],
  ["익히지 않은 돼지고기", "250원", "판매 불가"],
  ["익힌 돼지고기", "300원", "판매 불가"],
  ["익히지 않은 닭고기", "250원", "판매 불가"],
  ["익힌 닭고기", "300원", "판매 불가"],
  ["구운 감자", "200원", "32원"],
  ["호박 파이", "구매 불가", "판매 불가"],
  ["익히지 않은 토끼고기", "250원", "판매 불가"],
  ["익힌 토끼고기", "300원", "판매 불가"],
  ["익힌 대구", "구매 불가", "판매 불가"],
  ["익힌 연어", "구매 불가", "판매 불가"],
  ["빵", "구매 불가", "판매 불가"],
  ["케이크", "구매 불가", "판매 불가"],
  ["쿠키", "구매 불가", "판매 불가"],
  ["꿀이 든 병", "구매 불가", "판매 불가"],
  ["버섯 스튜", "구매 불가", "판매 불가"],
  ["비트 수프", "구매 불가", "판매 불가"],
  ["토끼 스튜", "구매 불가", "판매 불가"],
];
const woodItems: string[][] = [
  ...[
    "참나무",
    "가문비나무",
    "자작나무",
    "정글나무",
    "아카시아나무",
    "짙은 참나무",
    "맹그로브나무",
    "벚나무",
  ].map((t) => [`${t} 원목`, "200원", "100원"]),
  ["진홍빛 자루", "구매 불가", "100원"],
  ["뒤틀린 자루", "구매 불가", "100원"],
  ...[
    "참나무",
    "가문비나무",
    "자작나무",
    "정글나무",
    "아카시아나무",
    "짙은 참나무",
    "맹그로브나무",
    "벚나무",
    "진달래",
    "꽃 핀 진달래",
  ].map((t) => [`${t} 잎`, "100원", "10원"]),
  ...[
    "참나무",
    "가문비나무",
    "자작나무",
    "정글나무",
    "아카시아나무",
    "짙은 참나무",
    "벚나무",
  ].map((t) => [`${t} 묘목`, "100원", "30원"]),
  ["맹그로브나무 주아", "100원", "30원"],
  ...[
    "참나무",
    "가문비나무",
    "자작나무",
    "정글나무",
    "아카시아나무",
    "짙은 참나무",
    "맹그로브나무",
    "벚나무",
  ].map((t) => [`껍질 벗긴 ${t} 원목`, "100원", "30원"]),
];
const flowers: string[][] = [
  ...[
    "민들레",
    "양귀비",
    "파란색 난초",
    "알리움",
    "선애기별꽃",
    "빨간색 튜립",
    "주황색 튜립",
    "하얀색 튜립",
    "분홍색 튜립",
    "데이지",
    "수레국화",
    "은방울꽃",
    "분홍 꽃잎",
    "해바라기",
    "장미 덤불",
    "라일락",
    "덩굴",
    "늘어진 덩굴",
    "휘어진 덩굴",
    "발광 이끼",
    "매달린 뿌리",
    "모란",
    "포자 꽃",
    "수련잎",
    "큰 흘림잎",
    "작은 흘림잎",
    "해초",
    "관 산호",
    "뇌 산호",
    "거품 산호",
    "불 산호",
    "사방산호",
    "부채형 관 산호",
    "부채형 뇌 산호",
    "부채형 거품 산호",
    "부채형 불 산호",
    "부채형 사방산호",
    "불우렁ḫ이",
    "사방산호 블록",
    "불 블록",
    "거품 산호 블록",
    "뇌 산호 블록",
    "관 산호 블록",
    "마른 덤불",
  ].map((n) => [n, "100원", "판매 불가"]),
  ["켈프", "200원", "50원"],
];
const currency: string[][] = [
  ["[ 화폐 ] 자연동 주괴", "10,000원", "10,000원"],
  ["[ 화폐 ] 자연은 주괴", "50,000원", "50,000원"],
  ["[ 화폐 ] 화려한 금 주괴", "100,000원", "100,000원"],
  ["[ 화폐 ] 화려한 이리듐 주괴", "500,000원", "500,000원"],
  ["[ 화폐 ] 빛나는 다이아 주괴", "1,000,000원", "1,000,000원"],
  ["[ 기본 ] 입주민 상징 [ 헬멧 ]", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민 상징 [ 상의 ]", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민 상징 [ 하의 ]", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민 상징 [ 신발 ]", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민의 곡괭이", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민의 도끼", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민의 삽", "15,000원", "판매 불가"],
  ["[ 기본 ] 입주민의 괭이", "15,000원", "판매 불가"],
  ["일반인의 낚싯대", "15,000원", "판매 불가"],
  ["나만의 특성 재선택권", "7,000,000원", "판매 불가"],
  ["랜덤 두루마리 강화서 [ 50~80%]", "4,000,000원", "판매 불가"],
  ["일반 복구석 깨진 조각의 희망", "500,000원", "판매 불가"],
  ["특성 및 레벨 복구권", "10,000,000원", "판매 불가"],
];
const blocks: string[][] = [
  ["돌", "10원", "2원"],
  ["조약돌", "10원", "1원"],
  ["이끼 낀 조약돌", "100원", "30원"],
  ...[
    "단단한 진흙",
    "흙",
    "잔디 블록",
    "회백토",
    "균사체",
    "흙 길",
    "섬록암",
    "안산암",
    "심층암",
    "심층암 조약돌",
    "현무암",
    "흑암",
    "프리즈머린",
    "프리즈머린 벽돌",
    "짙은 프리즈머린",
    "네더랙",
    "네더 벽돌",
    "엔드 돌",
    "퍼퍼 블록",
    "석영 블록",
    "화강암",
    "벽돌",
    "사암",
    "붉은 사암",
    "모래",
    "붉은 모래",
    "흑요석",
    "응회암",
    "점토",
    "뿌리내린 흙",
    "자갈",
    "진흙",
    "거친 흙",
    "마그마 블록",
    "영혼 흙",
    "영혼 모래",
    "점적석 블록",
    "이끼 블록",
    "방해석",
    "눈 블록",
    "유리",
    "차광 유리",
    "스펀지",
    "빨간색 버섯 블록",
    "갈색 버섯 블록",
    "바다 랜턴",
    "잔딧빛 개구리불",
    "진jsonwebtoken 개구리불",
    "황톳빛 개구리불",
    "버섯불",
    "발광석",
    "얼음",
    "꽁꽁 언 얼음",
    "푸른얼음",
    "매끄러운 석영 블록",
    "매끄러운 사암",
    "자수정 블록",
    "꿀 블록",
    "슬라임 블록",
    "벌집 조각 블록",
    "뒤틀린 사마귀 블록",
    "엔드 석재 벽돌",
    "매끄러운 붉은 사암",
    "윤나는 흑암",
    "윤나는 심층암",
    "뒤틀린 네사체",
    "진홍빛 네사체",
  ].map((n) => [n, "100원", "30원"]),
  ["매끄러운 돌", "100원", "판매 불가"],
  ["금 간 네더 벽돌", "100원", "판매 불가"],
  ["석재 벽돌", "100원", "판매 불가"],
];
const misc: string[][] = [
  ["엔드 막대기", "300원", "판매 불가"],
  ["사슬", "300원", "판매 불가"],
  ["랜턴", "1,000원", "판매 불가"],
  ["영혼 랜턴", "2,000원", "판매 불가"],
  ["발광 아이템 액자", "100,000원", "판매 불가"],
  ["아이템 액자", "100,000원", "판매 불가"],
  ["숫돌", "100,000원", "판매 불가"],
  ["용광로", "100,000원", "판매 불가"],
  ["훈연기", "100,000원", "판매 불가"],
  ["마법 부여대", "50,000원", "판매 불가"],
  ["조각된 책장", "10,000원", "판매 불가"],
  ["책장", "3,000원", "판매 불가"],
  ["영혼 모닥불", "5,000원", "판매 불가"],
  ["모닥불", "3,000원", "판매 불가"],
  ["초", "100원", "판매 불가"],
  ["종", "5,000원", "판매 불가"],
  ["호퍼", "10,000원", "판매 불가"],
  ["상자", "100원", "판매 불가"],
  ["비계", "100원", "판매 불가"],
  ["통", "100원", "판매 불가"],
  ["블레이즈 가루", "1,000원", "판매 불가"],
  ["베틀", "100,000원", "판매 불가"],
  ["팬텀 막", "1,000원", "판매 불가"],
  ["마그마 크림", "1,000원", "판매 불가"],
  ["가스트 눈물", "1,000원", "판매 불가"],
  ["거미줄", "1,000원", "판매 불가"],
  ["화약", "1,500원", "판매 불가"],
  ["화살", "10원", "판매 불가"],
  ["부싯돌과 부시", "200,000원", "판매 불가"],
  ["발효된 거미 눈", "1,000원", "판매 불가"],
  ["활", "15,000원", "판매 불가"],
  ["책과 깃펜", "50,000원", "판매 불가"],
  ["화분", "1,000원", "판매 불가"],
  ["거미 눈", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 꽃 ]", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 크리퍼 ]", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 해골 ]", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 무언가 ]", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 지구 ]", "1,000원", "판매 불가"],
  ["현수막 무늬 [ 돼지 코 ]", "1,000원", "판매 불가"],
  ["그림", "10,000원", "판매 불가"],
  ["작은 자수정 봉오리", "1,000원", "판매 불가"],
  ["중간 자수정 봉오리", "1,000원", "판매 불가"],
  ["큰 자수정 봉오리", "1,000원", "판매 불가"],
  ["자수정 군집", "1,000원", "판매 불가"],
  ["망원경", "100,000원", "판매 불가"],
  ["소리 블록", "300원", "판매 불가"],
  ...[
    "하얀색",
    "회백색",
    "회색",
    "검은색",
    "갈색",
    "빨간색",
    "주황색",
    "노란색",
    "연두색",
    "초록색",
    "청록색",
    "하늘색",
    "파란색",
    "보라색",
    "자홍색",
    "분홍색",
  ].map((c) => [`${c} 염료`, "100원", "판매 불가"]),
  ["발광 먹물 주머니", "100원", "판매 불가"],
  ["크리스탈", "구매 불가", "100,000원"],
  ["크리스탈(NEW)", "구매 불가", "150,000원"],
];

const shopCategories = [
  {
    key: "minerals",
    emoji: "⛏️",
    label: "1) 광물",
    color: "#6366f1",
    rows: minerals,
  },
  {
    key: "crops",
    emoji: "🌿",
    label: "2) 농작물",
    color: "#16a34a",
    rows: crops,
  },
  { key: "food", emoji: "🍗", label: "3) 음식", color: "#ea580c", rows: food },
  {
    key: "wood",
    emoji: "🪵",
    label: "4) 나무",
    color: "#92400e",
    rows: woodItems,
  },
  {
    key: "flowers",
    emoji: "🌸",
    label: "5) 꽃",
    color: "#ec4899",
    rows: flowers,
  },
  {
    key: "currency",
    emoji: "💰",
    label: "6) 화폐",
    color: "#d97706",
    rows: currency,
  },
  {
    key: "blocks",
    emoji: "🧱",
    label: "7) 블록",
    color: "#6b7280",
    rows: blocks,
  },
  {
    key: "color_blocks",
    emoji: "🎨",
    label: "8) 색깔 블록",
    color: "#7c3aed",
    rows: [],
    special: true,
  },
  { key: "misc", emoji: "🔧", label: "9) 기타", color: "#374151", rows: misc },
];

const colorTypes = [
  "양털",
  "테라코타",
  "유광 테라코타",
  "콘크리트",
  "콘크리트 가루",
  "색유리",
  "침대",
  "초",
  "현수막",
];
const colors16 = [
  "하얀색",
  "회백색",
  "회색",
  "검은색",
  "갈색",
  "빨간색",
  "주황색",
  "노란색",
  "연두색",
  "초록색",
  "청록색",
  "하늘색",
  "파란색",
  "보라색",
  "자홍색",
  "분홍색",
];
const colorHex: Record<string, string> = {
  하얀색: "#f8fafc",
  회백색: "#cbd5e1",
  회색: "#6b7280",
  검은색: "#1f2937",
  갈색: "#92400e",
  빨간색: "#ef4444",
  주황색: "#f97316",
  노란색: "#eab308",
  연두색: "#84cc16",
  초록색: "#16a34a",
  청록색: "#06b6d4",
  하늘색: "#38bdf8",
  파란색: "#3b82f6",
  보라색: "#8b5cf6",
  자홍색: "#d946ef",
  분홍색: "#f472b6",
};

function ShopTab() {
  const [query, setQuery] = useState("");

  // 검색용 flat 배열 생성 (color_blocks 제외)
  const allItems = useMemo(() => {
    const result: {
      name: string;
      buy: string;
      sell: string;
      catLabel: string;
      catEmoji: string;
      catColor: string;
    }[] = [];
    shopCategories.forEach((cat) => {
      if (!cat.special) {
        cat.rows.forEach((row) => {
          result.push({
            name: row[0],
            buy: row[1],
            sell: row[2],
            catLabel: cat.label,
            catEmoji: cat.emoji,
            catColor: cat.color,
          });
        });
      }
    });
    return result;
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter((item) => item.name.toLowerCase().includes(q));
  }, [query, allItems]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* 고정 안내 */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl flex-shrink-0">🔒</span>
        <p
          className="text-green-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          <strong>해당 상점가는 변동되지 않습니다.</strong> 일반 상점에서 거래
          가능한 아이템의 고정 가격입니다. 더 많은 상점 정보(커스텀·요리·가구
          등)는{" "}
          <Link
            to="/content/shop"
            className="underline text-green-700 hover:text-green-900"
          >
            상점 상세 페이지
          </Link>
          에서 확인하세요.
        </p>
      </div>

      {/* 검색 */}
      <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border-2 border-amber-200 shadow-sm">
        <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="아이템 이름 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none"
          style={{ fontSize: "14px" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* 검색 결과 */}
      {isSearching ? (
        <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
          <div
            className="px-5 py-3.5 border-b border-amber-50"
            style={{ background: "#fffef5" }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}
            >
              "{query}" 검색 결과 ({filtered.length}개)
            </span>
          </div>
          {filtered.length === 0 ? (
            <div
              className="py-12 text-center text-slate-400"
              style={{ fontSize: "14px" }}
            >
              검색 결과가 없어요 🔍
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "#fffbef",
                    borderBottom: "2px solid #fde68a",
                  }}
                >
                  {["아이템 이름", "구매 가격", "판매 가격"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-amber-800"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {filtered.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-amber-50/40 transition-colors"
                  >
                    <td
                      className="px-3 py-2"
                      style={{
                        fontSize: "12px",
                        color: "#374151",
                        fontWeight: 500,
                      }}
                    >
                      <span className="mr-1.5">{item.catEmoji}</span>
                      {item.name}
                    </td>
                    <td
                      className="px-3 py-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: item.buy === "구매 불가" ? "#9ca3af" : "#0284c7",
                      }}
                    >
                      {item.buy}
                    </td>
                    <td
                      className="px-3 py-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color:
                          item.sell === "판매 불가" ? "#9ca3af" : "#16a34a",
                      }}
                    >
                      {item.sell}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {shopCategories.map((cat, idx) => (
            <Collapse
              key={cat.key}
              title={`${cat.emoji} ${cat.label}`}
              color={cat.color}
              defaultOpen={idx === 0}
            >
              {cat.special ? (
                <div className="p-4">
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-3">
                    <p
                      className="text-purple-700"
                      style={{ fontSize: "12px", lineHeight: 1.6 }}
                    >
                      모든 색깔 블록 아이템은{" "}
                      <strong>구매 100원 / 판매 30원</strong>입니다. (16가지
                      색상 각각)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {colorTypes.map((type) => (
                      <div
                        key={type}
                        className="p-3 rounded-xl bg-purple-50 border border-purple-100"
                      >
                        <div
                          className="text-purple-800 mb-2"
                          style={{ fontSize: "12px", fontWeight: 700 }}
                        >
                          {type} (16종)
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {colors16.map((c) => (
                            <div
                              key={c}
                              title={c}
                              className="w-4 h-4 rounded-sm border border-slate-200 flex-shrink-0"
                              style={{ background: colorHex[c] ?? "#ccc" }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <ShopTable
                  rows={cat.rows}
                  colColors={["#374151", "#0284c7", "#16a34a"]}
                />
              )}
            </Collapse>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 시세표 데이터 ─────────────────────────────────────────────────────────────
type PriceRow = { name: string; price: string; cash?: string; blue?: boolean };
type PriceSection = {
  key: string;
  label: string;
  emoji: string;
  color: string;
  rows: PriceRow[];
  note?: string;
};

const priceSections: PriceSection[] = [
  {
    key: "pickaxe",
    label: "곡괭이",
    emoji: "⛏️",
    color: "#6366f1",
    note: "곡괭이는 기본 옵션 기준입니다",
    rows: [
      { name: "기본기 튼실한 곡괭이", price: "1,225만원", cash: "4,900캐시" },
      { name: "단단한 무한 곡괭이", price: "2,475만원", cash: "9,900캐시" },
      {
        name: "[태양] 용암에 깃들린 곡괭이 (+1) 30%",
        price: "3,725만원",
        cash: "14,900캐시",
      },
      {
        name: "[태양] 용암에 깃들린 곡괭이 (+2) 45%",
        price: "4,975만원",
        cash: "19,900캐시",
      },
      {
        name: "[태양] 용암에 깃들린 곡괭이 (+3) 60%",
        price: "6,225만원",
        cash: "24,900캐시",
      },
    ],
  },
  {
    key: "axe",
    label: "도끼",
    emoji: "🪓",
    color: "#92400e",
    note: "도끼는 기본 옵션 기준입니다",
    rows: [
      { name: "기본기 튼실한 도끼", price: "1,225만원", cash: "4,900캐시" },
      { name: "단단한 무한 도끼", price: "2,475만원", cash: "9,900캐시" },
      { name: "단단한 무한 섬손 도끼", price: "3,500만원", cash: "14,000캐시" },
    ],
  },
  {
    key: "hoe",
    label: "괭이 / 야삽",
    emoji: "🌱",
    color: "#16a34a",
    note: "괭이는 기본 옵션 기준입니다",
    rows: [
      { name: "[경작] 허수아비 괭이", price: "2,225만원", cash: "8,900캐시" },
      {
        name: "[경작] 요정이 깃든 괭이",
        price: "3,475만원",
        cash: "13,900캐시",
      },
      {
        name: "포레스트 잠재력이 깃든 야삽",
        price: "3,725만원",
        cash: "14,900캐시",
      },
    ],
  },
  {
    key: "scroll",
    label: "주문서",
    emoji: "📜",
    color: "#7c3aed",
    rows: [
      {
        name: "하급 두루마리 강화서 [50% 뽑기]",
        price: "248만원",
        cash: "990캐시",
      },
      {
        name: "중급 두루마리 강화서 [60% 뽑기]",
        price: "400만원",
        cash: "1,600캐시",
      },
      {
        name: "상급 두루마리 강화서 [70% 뽑기]",
        price: "550만원",
        cash: "2,200캐시",
      },
      {
        name: "최상급 두루마리 강화서 [80% 뽑기]",
        price: "725만원",
        cash: "2,900캐시",
      },
    ],
  },
  {
    key: "auto",
    label: "자동심기 / 플라이 / 자동조합",
    emoji: "🤖",
    color: "#0891b2",
    rows: [
      { name: "[ 자동심기 ] 횟수당", price: "60 ~ 80원" },
      { name: "[ 자동심기 ] 무제한 영구제", price: "1.5억 ~ 1.8억" },
      { name: "[ 플라이 ] 가공된 꿀조각", price: "25만원", cash: "100캐시" },
      { name: "[ 플라이 ] 자연 꿀밀랍", price: "50만원", cash: "200캐시" },
      { name: "[ 플라이 ] 천연 토종꿀", price: "125만원", cash: "500캐시" },
      {
        name: "[ 플라이 ] 무제한 영구제",
        price: "5,975만원",
        cash: "23,900캐시",
        blue: true,
      },
      { name: "[ 자동조합 ] 무제한 영구제", price: "3,000만원 ~ 5,000만원" },
    ],
  },
  {
    key: "cashutil",
    label: "캐시 유틸상점",
    emoji: "💎",
    color: "#d97706",
    rows: [
      { name: "신비한 무한의 우물", price: "1,225만원", cash: "4,900캐시" },
      { name: "의문의 파랑포션", price: "625만원", cash: "2,500캐시" },
      { name: "의문의 빨강포션", price: "625만원", cash: "2,500캐시" },
      { name: "의문의 벨소리", price: "875만원", cash: "3,500캐시" },
      { name: "의문의 솔방울", price: "750만원", cash: "3,000캐시" },
      { name: "나만의 특성 재선택권", price: "750만원", cash: "3,000캐시" },
      { name: "양조기", price: "125만원", cash: "500캐시" },
      { name: "엔더상자", price: "250만원", cash: "1,000캐시" },
      { name: "신호기", price: "2,225만원", cash: "8,900캐시" },
      { name: "스킨 제거 가위", price: "750만원", cash: "3,000캐시" },
      { name: "무한의 겉날개", price: "2,000만원", cash: "8,000캐시" },
      { name: "일반 닉네임 변경권", price: "2,475만원", cash: "9,900캐시" },
      {
        name: "프리미엄 닉네임 변경권",
        price: "3,725만원",
        cash: "14,900캐시",
      },
      { name: "다이너마이트", price: "250만원", cash: "1,000캐시" },
      { name: "반짝반짝 빛나는 거울", price: "250만원", cash: "1,000캐시" },
      { name: "엘레베이터 블록", price: "125만원", cash: "500캐시" },
      { name: "일반 소라고동", price: "75만원", cash: "300캐시" },
      { name: "마법의 소라고동", price: "725만원", cash: "2,900캐시" },
      {
        name: "일반 야채바구니",
        price: "625만원",
        cash: "2,500캐시",
        blue: true,
      },
      {
        name: "유기농 야채바구니",
        price: "1,225만원",
        cash: "4,900캐시",
        blue: true,
      },
      {
        name: "들끓는 투시 헬멧",
        price: "2,475만원",
        cash: "9,900캐시",
        blue: true,
      },
      {
        name: "들끓는 체력 갑옷",
        price: "2,475만원",
        cash: "9,900캐시",
        blue: true,
      },
      {
        name: "들끓는 포화 바지",
        price: "4,975만원",
        cash: "19,900캐시",
        blue: true,
      },
      {
        name: "들끓는 속도 신발",
        price: "4,975만원",
        cash: "19,900캐시",
        blue: true,
      },
      {
        name: "마술봉 원터치 막대",
        price: "2,475만원",
        cash: "9,900캐시",
        blue: true,
      },
    ],
  },
  {
    key: "other",
    label: "기타 아이템",
    emoji: "🌿",
    color: "#059669",
    rows: [
      { name: "클로버", price: "80만원 ~ 100만원" },
      { name: "제초기", price: "180만원 ~ 200만원" },
      { name: "산삼씨앗", price: "20만원 ~ 25만원" },
      { name: "건초더미", price: "셋당 7.5만원 ~ 8.3만원" },
      { name: "황금지렁이", price: "180만원 ~ 190만원" },
      { name: "도토리커피", price: "120만원 ~ 140만원" },
      { name: "미식가의 별", price: "80만원 ~ 100만원" },
      { name: "우아한 바다진주", price: "180만원 ~ 200만원" },
    ],
  },
  {
    key: "repair",
    label: "복구석",
    emoji: "🔮",
    color: "#7c3aed",
    note: "복구석 시세는 기준가이지 정해져 있는 시세는 아닙니다",
    rows: [
      { name: "일반 복구석", price: "30만원 ~ 50만원" },
      { name: "전문가 복구석", price: "400만원 ~ 500만원" },
      { name: "장인 복구석", price: "1,800만원 ~ 2,000만원" },
      { name: "명장 복구석", price: "6,000만원 ~ 8,000만원" },
    ],
  },
  {
    key: "pearl",
    label: "바다구슬",
    emoji: "🌊",
    color: "#0284c7",
    note: "바다구슬 시세는 기준가이지 정해져 있는 시세는 아닙니다",
    rows: [
      {
        name: "바다 수수께끼 구슬",
        price: "375만원",
        cash: "1,500캐시",
        blue: true,
      },
      { name: "해류의 구슬", price: "200만원 ~ 250만원" },
      { name: "해조의 구슬", price: "500만원 ~ 600만원" },
      { name: "해심의 구슬", price: "600만원 ~ 700만원" },
    ],
  },
  {
    key: "general",
    label: "일반 아이템 / 캐시 / 도박장",
    emoji: "💰",
    color: "#b45309",
    rows: [
      { name: "현금 뭉텅이", price: "기준가 150만원 (최대 250만원)" },
      { name: "1캐시", price: "2,500원" },
      { name: "도박장 최대 배팅금액", price: "300만원" },
    ],
  },
];

function PricesTab() {
  return (
    <div className="space-y-4">
      {/* 주의 배너 */}
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p
            className="text-blue-800"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            🔵 <strong>파란색</strong>으로 표시된 아이템은 표기된 금액의{" "}
            <strong>2배까지만 판매 가능</strong>합니다.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p
            className="text-amber-800"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            ⭐ <strong>서버 시세표는 참고용입니다.</strong>
            <br />
            매달 둘째, 넷째 주 일요일 22시 리붓 기점으로 수정될 예정이며, 인게임
            내 시세보다 낮게 측정될 수 있습니다.
            <br />
            수요와 공급 등락폭에 따라 주기와 무관하게 변동될 수 있습니다.
          </p>
        </div>
      </div>

      {/* 시세 섹션들 */}
      <div className="space-y-3">
        {priceSections.map((sec, idx) => (
          <Collapse
            key={sec.key}
            title={`${sec.emoji} ${sec.label}`}
            color={sec.color}
            defaultOpen={idx === 0}
          >
            {sec.note && (
              <div className="px-4 pt-3">
                <div
                  className="rounded-xl px-3 py-2 text-center"
                  style={{
                    background: sec.color + "12",
                    color: sec.color,
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  [ {sec.note} ]
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      background: "#fffbef",
                      borderBottom: "2px solid #fde68a",
                    }}
                  >
                    <th
                      className="px-3 py-2.5 text-left text-amber-800"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      아이템명
                    </th>
                    <th
                      className="px-3 py-2.5 text-left text-amber-800"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      금액
                    </th>
                    <th
                      className="px-3 py-2.5 text-left text-amber-800"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      캐시판매가
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {sec.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      <td
                        className="px-3 py-2.5"
                        style={{
                          fontSize: "12px",
                          color: row.blue ? "#1d4ed8" : "#374151",
                          fontWeight: row.blue ? 600 : 500,
                        }}
                      >
                        {row.blue && (
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1.5 flex-shrink-0"
                            style={{ verticalAlign: "middle" }}
                          />
                        )}
                        {row.name}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: sec.color,
                        }}
                      >
                        {row.price}
                      </td>
                      <td
                        className="px-3 py-2.5"
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#7c3aed",
                        }}
                      >
                        {row.cash ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapse>
        ))}
      </div>
    </div>
  );
}

// ─── 메인 페이지 ───────────────────────────────────────────────────────────────
export function PricesPage() {
  const [activeTab, setActiveTab] = useState<"shop" | "prices">("shop");

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-amber-600 mb-2"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-amber-700">
              홈
            </Link>
            <span>›</span>
            <span className="text-slate-600">
              💰 {activeTab === "shop" ? "상점가" : "시세표"}
            </span>
          </div>
          <h1
            className="text-slate-800 mb-1"
            style={{ fontSize: "26px", fontWeight: 900 }}
          >
            💰 상점가 &amp; 시세표
          </h1>
          <p className="text-slate-500" style={{ fontSize: "14px" }}>
            고정 상점가와 서버 변동 시세를 함께 확인하세요.
          </p>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 p-2 rounded-2xl bg-white border-2 border-amber-200 w-fit">
          <button
            onClick={() => setActiveTab("shop")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: activeTab === "shop" ? "#16a34a" : "transparent",
              color: activeTab === "shop" ? "white" : "#6b7280",
              fontSize: "14px",
              fontWeight: activeTab === "shop" ? 700 : 500,
            }}
          >
            🏪 상점가
            <span
              className="rounded-full px-1.5 py-0.5"
              style={{
                background:
                  activeTab === "shop" ? "rgba(255,255,255,0.25)" : "#f0fdf4",
                color: activeTab === "shop" ? "white" : "#16a34a",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              고정
            </span>
          </button>
          <button
            onClick={() => setActiveTab("prices")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: activeTab === "prices" ? "#d97706" : "transparent",
              color: activeTab === "prices" ? "white" : "#6b7280",
              fontSize: "14px",
              fontWeight: activeTab === "prices" ? 700 : 500,
            }}
          >
            📊 시세표
            <span
              className="rounded-full px-1.5 py-0.5"
              style={{
                background:
                  activeTab === "prices" ? "rgba(255,255,255,0.25)" : "#fffbeb",
                color: activeTab === "prices" ? "white" : "#d97706",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              변동
            </span>
          </button>
        </div>

        {activeTab === "shop" ? <ShopTab /> : <PricesTab />}
      </div>
    </div>
  );
}
