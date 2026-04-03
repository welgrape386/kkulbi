import { useSearchParams, Link } from "react-router";

const BG = "#fff8dc";

const tabs = [
  { key: "method", label: "후원 방법", emoji: "💳" },
  { key: "ranks", label: "후원 등급 / 혜택", emoji: "🎖️" },
  { key: "probability", label: "아이템 확률", emoji: "🎲" },
];

// ─── 확률 테이블 공통 컴포넌트 ─────────────────────────────────────────────────
function ProbTable({ rows }: { rows: { name: string; prob: string }[] }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr style={{ background: "#f1f5f9" }}>
          <th
            className="px-3 py-2 rounded-tl-xl"
            style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}
          >
            아이템 이름
          </th>
          <th
            className="px-3 py-2 rounded-tr-xl text-right"
            style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}
          >
            확률 (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
            <td
              className="px-3 py-2 border-t border-slate-100"
              style={{ fontSize: "13px", color: "#1e293b" }}
            >
              {r.name}
            </td>
            <td
              className="px-3 py-2 border-t border-slate-100 text-right"
              style={{ fontSize: "13px", fontWeight: 600, color: "#7c3aed" }}
            >
              {r.prob}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ScrollTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-3 py-2 ${i === 0 ? "rounded-tl-xl" : ""} ${i === headers.length - 1 ? "rounded-tr-xl text-right" : ""}`}
                style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2 border-t border-slate-100 ${j === row.length - 1 ? "text-right" : ""}`}
                  style={{
                    fontSize: "13px",
                    color: j === row.length - 1 ? "#7c3aed" : "#1e293b",
                    fontWeight: j === row.length - 1 ? 600 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 후원 방법 ─────────────────────────────────────────────────────────────────
function MethodContent() {
  return (
    <div className="space-y-6">
      {/* 사이트 링크 배너 */}
      <a
        href="https://skhcs.com/kkulbif"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-5 rounded-2xl border-2 border-violet-200 hover:border-violet-400 hover:shadow-lg transition-all group"
        style={{ background: "linear-gradient(135deg, #f5f3ff, #ede9fe)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌐</span>
          <div>
            <div
              style={{ fontSize: "15px", fontWeight: 800, color: "#5b21b6" }}
            >
              후원 사이트 바로가기
            </div>
            <div className="text-violet-400" style={{ fontSize: "12px" }}>
              skhcs.com/kkulbif
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-1 rounded-xl px-3 py-2 group-hover:bg-violet-600 transition-colors"
          style={{
            background: "#7c3aed",
            color: "white",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          접속하기 →
        </div>
      </a>

      {/* 기본 절차 */}
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-50"
          style={{ background: "#fffef5" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#92400e" }}
            >
              후원 절차
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {[
            {
              step: 1,
              icon: "🌐",
              title: "사이트 접속",
              desc: (
                <>
                  후원 사이트{" "}
                  <a
                    href="https://skhcs.com/kkulbif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 underline hover:text-violet-800"
                  >
                    skhcs.com/kkulbif
                  </a>
                  에 접속합니다.
                </>
              ),
            },
            {
              step: 2,
              icon: "🔑",
              title: "닉네임 입력",
              desc: "마인크래프트 닉네임을 정확하게 입력해주세요.",
            },
            {
              step: 3,
              icon: "💰",
              title: "후원 금액 입력",
              desc: "원하는 후원 금액을 입력해주세요.",
            },
            {
              step: 4,
              icon: "📧",
              title: "이메일 입력",
              desc: "이메일 주소를 입력해주세요.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #f5c842, #f59e0b)",
                  color: "#1a1200",
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                {s.step}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#92400e",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
                <p
                  className="text-slate-600"
                  style={{ fontSize: "13px", lineHeight: 1.6 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 후원 수단 선택 */}
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-50"
          style={{ background: "#fffef5" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#92400e" }}
            >
              후원 수단 선택
            </span>
          </div>
        </div>
        <div className="p-5 space-y-4">
          {/* 계좌이체 */}
          <div className="rounded-2xl border-2 border-green-200 overflow-hidden">
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              }}
            >
              <span className="text-xl">🏦</span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#15803d" }}
              >
                계좌이체 / 무통장 입금
              </span>
              <span
                className="ml-auto rounded-full px-2.5 py-0.5"
                style={{
                  background: "#16a34a",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 800,
                }}
              >
                +10% 추가 지급!
              </span>
            </div>
            <div className="px-4 py-3 bg-white">
              <p
                className="text-green-700"
                style={{ fontSize: "13px", lineHeight: 1.7 }}
              >
                계좌 이체 시 <strong>후원 금액의 10%를 추가로 지급</strong>
                합니다!
              </p>
            </div>
          </div>

          {/* 문화상품권 */}
          <div className="rounded-2xl border-2 border-blue-200 overflow-hidden">
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <span className="text-xl">🎫</span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#1d4ed8" }}
              >
                컬처랜드 문화상품권
              </span>
            </div>
            <div className="px-4 pb-4 pt-3 bg-white space-y-2">
              {[
                "약관에 동의해주세요. (이용약관/개인정보취급방침의 모든 내용에 동의하시면 체크해주세요.)",
                "후원하기 버튼을 눌러 후원을 완료해주세요.",
              ].map((desc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "#dbeafe",
                      color: "#1d4ed8",
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-slate-600"
                    style={{ fontSize: "13px", lineHeight: 1.6 }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 처리 시간 */}
      <div
        className="rounded-2xl border-2 border-amber-200 p-4 flex items-center gap-3"
        style={{ background: "#fffbeb" }}
      >
        <span className="text-2xl flex-shrink-0">⏰</span>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#92400e" }}>
            후원 처리 시간
          </div>
          <p
            className="text-amber-700"
            style={{ fontSize: "13px", lineHeight: 1.6 }}
          >
            후원 처리까지 <strong>5분에서 최대 24시간</strong> 소요될 수
            있습니다.
          </p>
        </div>
      </div>

      {/* 주의 사항 */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">⚠️</span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#991b1b" }}>
            주의 사항
          </span>
        </div>
        <ul className="space-y-2">
          {[
            "후원 전 반드시 닉네임을 정확하게 입력하세요.",
            "후원은 비환불 정책입니다. 결제 전 신중하게 결정해주세요.",
            "후원 관련 문의는 디스코드 후원 문의 채널을 이용해 주세요.",
            "서버 점검 시간에는 후원 처리가 지연될 수 있어요.",
          ].map((n) => (
            <li
              key={n}
              className="flex items-start gap-2 text-red-700"
              style={{ fontSize: "13px", lineHeight: 1.6 }}
            >
              <span className="flex-shrink-0 mt-0.5">▸</span>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── 후원 등급 ─────────────────────────────────────────────────────────────────
const donationRanks = [
  {
    name: "BRONZE",
    emoji: "🥉",
    price: "누적 5만원",
    color: "#92400e",
    gradient: "linear-gradient(135deg, #fdf6ee, #fde8c7)",
    border: "#e8d0b0",
    textColor: "#92400e",
    benefits: ["등급 채팅 칭호"],
  },
  {
    name: "SILVER",
    emoji: "🥈",
    price: "누적 10만원",
    color: "#475569",
    gradient: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    border: "#cbd5e1",
    textColor: "#334155",
    benefits: ["등급 채팅 칭호"],
  },
  {
    name: "GOLD",
    emoji: "🥇",
    price: "누적 30만원",
    color: "#b45309",
    gradient: "linear-gradient(135deg, #fffbeb, #fef3c7)",
    border: "#fde68a",
    textColor: "#92400e",
    benefits: ["등급 채팅 칭호"],
  },
  {
    name: "DIAMOND",
    emoji: "💎",
    price: "누적 50만원",
    color: "#0369a1",
    gradient: "linear-gradient(135deg, #f0f9ff, #bae6fd)",
    border: "#7dd3fc",
    textColor: "#0369a1",
    benefits: ["등급 채팅 칭호"],
  },
  {
    name: "RUBY",
    emoji: "💎",
    price: "누적 100만원",
    color: "#b91c1c",
    gradient: "linear-gradient(135deg, #fff1f2, #fecdd3)",
    border: "#fca5a5",
    textColor: "#991b1b",
    benefits: ["등급 채팅 칭호", "커스텀 칭호"],
    special: true,
  },
];

function RanksContent() {
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p
          className="text-amber-800"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
        >
          💡 후원 등급은 <strong>누적 후원 금액</strong>에 따라 자동으로
          부여됩니다. 등급별 혜택은 서버 업데이트에 따라 변경될 수 있습니다.
        </p>
      </div>

      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div
          className="px-5 py-4 border-b border-amber-100"
          style={{ background: "#fffef5" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎖️</span>
            <span
              style={{ fontSize: "16px", fontWeight: 800, color: "#92400e" }}
            >
              등급별 혜택
            </span>
          </div>
        </div>
        <div className="divide-y divide-amber-50">
          {donationRanks.map((rank) => (
            <div
              key={rank.name}
              className="flex items-center gap-4 px-5 py-4 hover:bg-amber-50/40 transition-colors"
            >
              {/* 등급 */}
              <div className="flex items-center gap-2.5 w-36 flex-shrink-0">
                <span className="text-2xl">{rank.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: rank.textColor,
                    }}
                  >
                    {rank.name}
                  </div>
                  {rank.special && (
                    <span
                      className="inline-block rounded-full px-1.5 py-0.5 mt-0.5"
                      style={{
                        background: "#fef2f2",
                        color: "#991b1b",
                        fontSize: "9px",
                        fontWeight: 800,
                        border: "1px solid #fca5a5",
                      }}
                    >
                      최고 등급
                    </span>
                  )}
                </div>
              </div>

              {/* 조건 */}
              <div className="w-28 flex-shrink-0">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1"
                  style={{
                    background: rank.gradient,
                    border: `1px solid ${rank.border}`,
                    color: rank.textColor,
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {rank.price}
                </span>
              </div>

              {/* 혜택 */}
              <div className="flex flex-wrap gap-1.5 flex-1">
                {rank.benefits.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1"
                    style={{
                      background: rank.gradient,
                      border: `1px solid ${rank.border}`,
                      color: rank.textColor,
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 아이템 확률 ───────────────────────────────────────────────────────────────
type ProbSection = {
  title: string;
  subtitle?: string;
  note?: string;
  rows: { name: string; prob: string }[];
};

const scrollTableRows = [
  ["10%", "3.7"],
  ["20%", "7.4"],
  ["30%", "11.1"],
  ["40%", "14.8"],
  ["50%", "18.5"],
  ["60%", "22.2"],
  ["70%", "22.2"],
];

const cashLootboxes: ProbSection[] = [
  {
    title: "자동심기 뽑기",
    subtitle: "의문의 파랑포션",
    rows: [
      { name: "자동심기 [ 영구제 ]", prob: "1.85" },
      { name: "자동심기 [ 500회 ]", prob: "9.25" },
      { name: "자동심기 [ 1000회 ]", prob: "53.7" },
      { name: "자동심기 [ 2000회 ]", prob: "27.75" },
      { name: "자동심기 [ 3000회 ]", prob: "7.4" },
    ],
  },
  {
    title: "고급광산 뽑기확률",
    subtitle: "의문의 벨소리",
    rows: [
      { name: "청금석 제거 고급 광산", prob: "1.85" },
      { name: "석탄 제거 고급 광산", prob: "1.85" },
      { name: "확률업 고급 광산", prob: "1.85" },
      { name: "태양열 조각 [ 50% ] · 강화 효과 [ 1% ]", prob: "12.95" },
      { name: "태양열 조각 [ 50% ] · 강화 효과 [ 2% ]", prob: "11.1" },
      { name: "태양열 조각 [ 60% ] · 강화 효과 [ 1% ]", prob: "12.95" },
      { name: "태양열 조각 [ 60% ] · 강화 효과 [ 2% ]", prob: "11.1" },
      { name: "태양열 조각 [ 70% ] · 강화 효과 [ 1% ]", prob: "12.95" },
      { name: "태양열 조각 [ 70% ] · 강화 효과 [ 2% ]", prob: "11.1" },
      { name: "태양열 조각 [ 80% ] · 강화 효과 [ 1% ]", prob: "11.1" },
      { name: "태양열 조각 [ 80% ] · 강화 효과 [ 2% ]", prob: "11.1" },
    ],
  },
  {
    title: "자동조합 뽑기 확률",
    subtitle: "의문의 빨강포션",
    rows: [
      { name: "자동조합 [ 영구제 ]", prob: "1.85" },
      { name: "판매스틱 [ 100회 ]", prob: "16.65" },
      { name: "판매스틱 [ 200회 ]", prob: "16.65" },
      { name: "판매스틱 [ 300회 ]", prob: "16.65" },
      { name: "판매스틱 [ 500회 ]", prob: "16.65" },
      { name: "판매스틱 [ 800회 ]", prob: "16.65" },
      { name: "판매스틱 [ 1000회 ]", prob: "14.8" },
    ],
  },
  {
    title: "고귀한 나무 정령",
    subtitle: "의문의 솔방울",
    rows: [
      { name: "고귀한 나무 정령", prob: "1.85" },
      { name: "허수아비 5x5청크 1시간", prob: "42.55" },
      { name: "허수아비 5x5청크 3시간", prob: "33.3" },
      { name: "허수아비 5x5청크 6시간", prob: "22.2" },
    ],
  },
];

const packageLootboxes: ProbSection[] = [
  {
    title: "추석 복주머니",
    note: "해당 아이템은 추석 패키지로만 획득 가능합니다.",
    rows: [
      { name: "최상급 두루마리 3개", prob: "100" },
      { name: "마법의 소라고동 3개", prob: "100" },
      { name: "명장 복구석", prob: "10" },
      { name: "장인 복구석", prob: "30" },
      { name: "전문가 복구석", prob: "70" },
      { name: "단단한 무한 섬손 도끼", prob: "20" },
      { name: "포레스트 잠재력이 깃든 야삽", prob: "20" },
      { name: "용암에 깃들린 곡괭이 (+3)", prob: "20" },
    ],
  },
  {
    title: "재화구매 뽑기",
    rows: [
      { name: "부활절 펫 뽑기권 (랜덤뽑기) 펫", prob: "30" },
      { name: "현금뭉텅이 5개", prob: "70" },
    ],
  },
  {
    title: "프리미엄 거친 원석",
    rows: [
      { name: "일반 복구석 50개", prob: "11.111111" },
      { name: "일반 복구석 30개", prob: "11.111111" },
      { name: "전문가 복구석 3개", prob: "11.111111" },
      { name: "전문가 복구석 4개", prob: "11.111111" },
      { name: "장인 복구석 1개", prob: "11.111111" },
      { name: "장인 복구석 2개", prob: "11.111111" },
      { name: "장인 복구석 3개", prob: "11.111111" },
      { name: "명장 복구석 1개", prob: "11.111111" },
      { name: "명장 복구석 2개", prob: "11.111111" },
    ],
  },
  {
    title: "크리스마스 화환",
    subtitle: "드라코니 뽑기권",
    rows: [
      { name: "일반 복구석 20개", prob: "10" },
      { name: "일반 복구석 30개", prob: "10" },
      { name: "전문가 복구석 2개", prob: "10" },
      { name: "전문가 복구석 3개", prob: "10" },
      { name: "전문가 복구석 5개", prob: "10" },
      { name: "장인 복구석 1개", prob: "10" },
      { name: "장인 복구석 2개", prob: "10" },
      { name: "명장 복구석 1개", prob: "10" },
      { name: "드라코니 뽑기권 1개", prob: "20" },
    ],
  },
  {
    title: "크리스마스 비밀상자",
    rows: [
      { name: "들끓는 투시 헬멧", prob: "5" },
      { name: "들끓는 체력 갑옷", prob: "5" },
      { name: "들끓는 포화 바지", prob: "5" },
      { name: "들끓는 속도 신발", prob: "5" },
      { name: "바다의 수수께끼 구슬 10개", prob: "5" },
      { name: "바다의 수수께끼 구슬 15개", prob: "5" },
      { name: "바다의 수수께끼 구슬 20개", prob: "5" },
      { name: "바다의 수수께끼 구슬 25개", prob: "5" },
      { name: "최상급 두루마리 강화서 7개", prob: "5" },
      { name: "마법의 소라고동 7개", prob: "5" },
      { name: "요정이 깃든 괭이", prob: "5" },
      { name: "단단한 무한 섬손 도끼", prob: "5" },
      { name: "프리미엄 닉네임 변경권", prob: "5" },
      { name: "자유로운 왕꿀벌", prob: "5" },
      { name: "포레스트 잠재력이 깃든 야삽", prob: "5" },
      { name: "전문가 복구석 5개", prob: "5" },
      { name: "장인 복구석 3개", prob: "5" },
      { name: "명장 복구석 2개", prob: "5" },
      { name: "프리미엄 거친 원석", prob: "5" },
      { name: "용암에 깃들린 곡괭이 (+3)", prob: "5" },
    ],
  },
  {
    title: "한정판 설맞이 비밀 복주머니",
    rows: [
      { name: "들끓는 투시 헬멧", prob: "4.76" },
      { name: "들끓는 체력 갑옷", prob: "4.76" },
      { name: "들끓는 포화 바지", prob: "4.76" },
      { name: "들끓는 속도 신발", prob: "4.76" },
      { name: "바다의 수수께끼 구슬 10개", prob: "4.76" },
      { name: "바다의 수수께끼 구슬 15개", prob: "4.76" },
      { name: "바다의 수수께끼 구슬 20개", prob: "4.76" },
      { name: "의문의 솔방울 4개", prob: "4.76" },
      { name: "최상급 두루마리 강화서 5개", prob: "4.76" },
      { name: "마법의 소라고동 5개", prob: "4.76" },
      { name: "요정이 깃든 괭이", prob: "4.76" },
      { name: "단단한 무한 섬손 도끼", prob: "4.76" },
      { name: "프리미엄 닉네임 변경권", prob: "4.76" },
      { name: "자유로운 왕꿀벌", prob: "4.76" },
      { name: "포레스트 잠재력이 깃든 야삽", prob: "4.76" },
      { name: "전문가 복구석 5개", prob: "4.76" },
      { name: "장인 복구석 3개", prob: "4.76" },
      { name: "명장 복구석 2개", prob: "4.76" },
      { name: "유기농 야채바구니 3개", prob: "4.76" },
      { name: "용암에 깃들린 곡괭이 (+3)", prob: "4.76" },
      { name: "미스틱 프로텍트 베리어", prob: "4.76" },
    ],
  },
  {
    title: "콩닥콩닥 자석펫 뽑기 상자",
    subtitle: "자석펫 소환알",
    rows: [
      { name: "일반 복구석 20개", prob: "10.625" },
      { name: "일반 복구석 30개", prob: "10.625" },
      { name: "전문가 복구석 2개", prob: "10.625" },
      { name: "전문가 복구석 3개", prob: "10.625" },
      { name: "전문가 복구석 5개", prob: "10.625" },
      { name: "장인 복구석 1개", prob: "10.625" },
      { name: "장인 복구석 2개", prob: "10.625" },
      { name: "명장 복구석 1개", prob: "10.625" },
      { name: "자석펫 소환알 1개", prob: "15" },
    ],
  },
];

function LootboxCard({ section }: { section: ProbSection }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div
        className="px-4 py-3.5 border-b border-slate-100"
        style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#334155" }}>
            {section.title}
          </span>
          {section.subtitle && (
            <span
              className="rounded-full px-2.5 py-0.5"
              style={{
                background: "#ede9fe",
                color: "#5b21b6",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {section.subtitle}
            </span>
          )}
        </div>
        {section.note && (
          <p
            className="text-amber-600 mt-1"
            style={{ fontSize: "11px", fontWeight: 600 }}
          >
            ※ {section.note}
          </p>
        )}
      </div>
      <div>
        <ProbTable rows={section.rows} />
      </div>
    </div>
  );
}

function ProbabilityContent() {
  return (
    <div className="space-y-8">
      {/* 두루마리 확률 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📜</span>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>
            캐시(후원) 아이템 확률
          </h3>
        </div>

        {/* 두루마리 파괴 확률 */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          <div
            className="px-4 py-3.5 border-b border-slate-100"
            style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{ fontSize: "14px", fontWeight: 800, color: "#334155" }}
              >
                50% / 60% / 70% / 80% 두루마리
              </span>
            </div>
            <p
              className="text-slate-500 mt-1"
              style={{ fontSize: "12px", lineHeight: 1.6 }}
            >
              각 두루마리에서 나오는 아이템의 확률입니다. 주문서의 성공확률은 각
              두루마리마다 50%/60%/70%/80%로 동일합니다.
            </p>
          </div>
          <div className="p-4">
            <div
              className="text-slate-500 mb-2"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              파괴 확률별 등장 비율
            </div>
            <ScrollTable
              headers={["파괴 확률", "확률 (%)"]}
              rows={scrollTableRows}
            />
          </div>
        </div>

        {/* 최상급 두루마리 */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          <div
            className="px-4 py-3.5 border-b border-slate-100"
            style={{ background: "linear-gradient(135deg, #faf5ff, #ede9fe)" }}
          >
            <div className="flex items-center gap-2">
              <span
                style={{ fontSize: "14px", fontWeight: 800, color: "#5b21b6" }}
              >
                최상급 두루마리 강화서
              </span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{
                  background: "#7c3aed",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                성공확률 80%
              </span>
            </div>
            <p className="text-slate-500 mt-1" style={{ fontSize: "12px" }}>
              최상급 두루마리에서 나오는 아이템의 확률입니다.
            </p>
          </div>
          <div className="p-4">
            <ScrollTable
              headers={["파괴 확률", "확률 (%)"]}
              rows={scrollTableRows}
            />
          </div>
        </div>

        {/* 캐시 뽑기 아이템들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cashLootboxes.map((section) => (
            <LootboxCard key={section.title} section={section} />
          ))}
        </div>
      </div>

      {/* 패키지 확률 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎁</span>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>
            후원 아이템 확률 (패키지)
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {packageLootboxes.map((section) => (
            <LootboxCard key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 메인 페이지 ───────────────────────────────────────────────────────────────
export function SupportPage() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get("tab") ?? "method";
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div
            className="flex items-center gap-2 text-violet-600 mb-2"
            style={{ fontSize: "13px" }}
          >
            <Link to="/" className="hover:text-violet-700">
              홈
            </Link>
            <span>›</span>
            <span>후원</span>
            <span>›</span>
            <span className="text-slate-600">
              {current.emoji} {current.label}
            </span>
          </div>
          <h1
            className="text-slate-800"
            style={{ fontSize: "24px", fontWeight: 900 }}
          >
            💎 후원 안내
          </h1>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-1.5 mb-8 p-3 rounded-2xl"
          style={{ background: "white", border: "2px solid #ddd6fe" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setParams({ tab: tab.key })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
              style={{
                background: activeTab === tab.key ? "#7c3aed" : "transparent",
                color: activeTab === tab.key ? "white" : "#6b7280",
                fontSize: "13px",
                fontWeight: activeTab === tab.key ? 700 : 500,
              }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div>
          {activeTab === "method" && <MethodContent />}
          {activeTab === "ranks" && <RanksContent />}
          {activeTab === "probability" && <ProbabilityContent />}
        </div>
      </div>
    </div>
  );
}
