import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const BG = "#fff8dc";

const permissions = [
  { name: "모든 권한", desc: "섬의 모든 권한을 이용할 수 있습니다." },
  { name: "유저 차단", desc: "유저를 섬에서 차단할 수 있습니다." },
  { name: "블록 파괴", desc: "블록을 부술 수 있습니다." },
  { name: "블록 설치", desc: "블록을 설치할 수 있습니다." },
  { name: "상자", desc: "섬 내 상자를 사용할 수 있습니다." },
  { name: "섬 비공개", desc: "섬을 비공개 상태로 전환 할 수 있습니다." },
  { name: "아르바이트", desc: "아르바이트 관련 권한을 사용 할 수 있습니다." },
  { name: "워프 삭제", desc: "섬 워프를 삭제 할 수 있습니다." },
  { name: "구성원 권한", desc: "다른 구성원의 권한을 설정 합니다." },
  { name: "아이템 버리기", desc: "Q 키로 아이템을 버릴 수 있습니다." },
  { name: "강퇴 무시", desc: "섬 강퇴를 무시 할 수 있습니다." },
  { name: "유저 강퇴", desc: "방문자 또는 유저를 강퇴 할 수 있습니다." },
  { name: "농작물 밟기", desc: "농작물을 밟아 부술 수 있습니다." },
  { name: "낚시", desc: "섬에서 낚시를 할 수 있습니다." },
  { name: "말 상호작용", desc: "섬에서 말과 상호작용 할 수 있습니다." },
  { name: "상호 작용", desc: "섬 내에 블록과 상호 작용 할 수 있습니다." },
  { name: "유저 초대", desc: "섬에 유저를 초대 할 수 있습니다." },
  { name: "아이템 액자", desc: "아이템 액자와 상호 작용 할 수 있습니다." },
  { name: "카트 부수기", desc: "카트를 부술 수 있습니다." },
  { name: "카트 탑승", desc: "카트를 탈 수 있습니다." },
  { name: "카트 열기", desc: "카트를 열 수 있습니다." },
  { name: "카트 설치", desc: "카트를 설치 할 수 있습니다." },
  { name: "섬 공개", desc: "섬을 공개 상태로 전환 할 수 있습니다." },
  { name: "아이템 획득", desc: "섬에서 아이템을 획득 할 수 있습니다." },
  { name: "섬 업그레이드", desc: "섬을 업그레이드 할 수 있습니다." },
  { name: "바이옴", desc: "섬 바이옴을 변경 할 수 있습니다." },
  { name: "셋홈", desc: "셋홈 명령어를 사용 할 수 있습니다." },
  { name: "권한 설정", desc: "구성원 권한을 수정 할 수 있습니다." },
  { name: "역할 설정", desc: "구성원 역할을 수정 할 수 있습니다." },
  { name: "섬 설정", desc: "섬을 설정 할 수 있습니다." },
  { name: "워프 설정", desc: "섬에 새로운 워프를 설정 할 수 있습니다." },
  { name: "아르바이트 해고", desc: "아르바이트를 해고 할 수 있습니다." },
  { name: "표지판", desc: "표지판과 상호작용 할 수 있습니다." },
  { name: "가치 블록 파괴", desc: "섬 내 가치 블록을 부술 수 있습니다." },
];

const islandSettings = [
  { name: "아침", desc: "섬의 시간을 아침으로 바꿉니다.", type: "time" },
  { name: "점심", desc: "섬의 시간을 점심으로 바꿉니다.", type: "time" },
  { name: "밤", desc: "섬의 시간을 밤으로 바꿉니다.", type: "time" },
  { name: "야밤", desc: "섬의 시간을 야밤으로 바꿉니다.", type: "time" },
  { name: "비", desc: "섬의 날씨를 비로 바꿉니다.", type: "weather" },
  { name: "맑음", desc: "섬의 날씨를 맑음으로 바꿉니다.", type: "weather" },
  { name: "크리퍼", desc: "섬 안에서 크리퍼들이 블록을 폭발 시킵니다.", type: "toggle" },
  { name: "작물 성장", desc: "섬 안에서 작물의 성장을 허용 합니다.", type: "toggle" },
  { name: "달걀 낳기", desc: "섬 안에서 닭이 알을 낳는것을 허용 합니다.", type: "toggle" },
  { name: "PVP", desc: "플레이어가 섬 안에서 PVP를 할 수 있도록 합니다.", type: "toggle" },
  { name: "나무 성장", desc: "섬 안에서 나무가 자랄 수 있도록 합니다.", type: "toggle" },
  { name: "물의 흐름", desc: "섬 내부에 물이 흐르는걸 허용 합니다.", type: "toggle" },
];

const upgrades = [
  {
    title: "호퍼 제한",
    icon: "🔧",
    color: "#6366f1",
    unit: "개",
    stages: [
      { stage: 1, value: "100", cost: "0원 (기본)" },
      { stage: 2, value: "150", cost: "5,000,000원" },
      { stage: 3, value: "200", cost: "20,000,000원" },
      { stage: 4, value: "250", cost: "50,000,000원" },
      { stage: 5, value: "300", cost: "70,000,000원" },
    ],
  },
  {
    title: "섬 꿀벌 확장",
    icon: "🐝",
    color: "#d97706",
    unit: "마리",
    stages: [
      { stage: 1, value: "10", cost: "0원 (기본)" },
      { stage: 2, value: "12", cost: "50,000,000원" },
      { stage: 3, value: "15", cost: "100,000,000원" },
      { stage: 4, value: "17", cost: "300,000,000원" },
      { stage: 5, value: "20", cost: "500,000,000원" },
    ],
  },
  {
    title: "섬 창고 제한",
    icon: "📦",
    color: "#16a34a",
    unit: "번",
    stages: [
      { stage: 1, value: "1", cost: "0원 (기본)" },
      { stage: 2, value: "2", cost: "5,000,000원" },
      { stage: 3, value: "3", cost: "10,000,000원" },
      { stage: 4, value: "4", cost: "30,000,000원" },
      { stage: 5, value: "5", cost: "50,000,000원" },
    ],
  },
  {
    title: "섬 인원 제한",
    icon: "👥",
    color: "#0284c7",
    unit: "명",
    stages: [
      { stage: 1, value: "6", cost: "0원 (기본)" },
      { stage: 2, value: "8", cost: "3,000,000원" },
      { stage: 3, value: "10", cost: "10,000,000원" },
      { stage: 4, value: "12", cost: "30,000,000원" },
      { stage: 5, value: "14", cost: "50,000,000원" },
    ],
  },
  {
    title: "섬 크기 제한",
    icon: "🗺️",
    color: "#be185d",
    unit: "",
    stages: [
      { stage: 1, value: "100×100", cost: "0원 (기본)" },
      { stage: 2, value: "200×200", cost: "2,000,000원" },
      { stage: 3, value: "300×300", cost: "10,000,000원" },
      { stage: 4, value: "400×400", cost: "30,000,000원" },
      { stage: 5, value: "500×500", cost: "50,000,000원" },
    ],
  },
];

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border-2 border-amber-200 shadow-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}

function SectionHeader({ emoji, title, sub }: { emoji: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-amber-100">
      <span className="text-2xl">{emoji}</span>
      <div>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#92400e" }}>{title}</div>
        {sub && <div style={{ fontSize: "12px", color: "#b45309", fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-amber-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-amber-50 hover:bg-amber-100 transition-colors"
      >
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}>{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

export function IslandPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb + Header */}
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-3" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-amber-800">홈</Link>
            <span>›</span>
            <Link to="/content" className="hover:text-amber-800">콘텐츠</Link>
            <span>›</span>
            <span className="text-slate-600">🏝️ 섬</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <Link
              to="/content"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Link>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#78350f" }}>🏝️ 섬</h1>
          </div>
          <p style={{ fontSize: "14px", color: "#78716c", fontWeight: 600 }}>
            섬과 관련된 전반적인 안내를 해 드립니다. 원하는 항목을 클릭하면 해당 내용을 확인할 수 있습니다.
          </p>
        </div>

        {/* 1. 섬 기본 UI */}
        <SectionCard>
          <SectionHeader emoji="🖥️" title="섬 기본 UI 설명" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔐", name: "권한", desc: "섬의 전반적인 권한을 설정할 수 있는 메뉴입니다.", color: "#6366f1" },
              { icon: "🏝️", name: "섬으로", desc: "섬으로 이동할 때 사용합니다. [/is] 또는 [/섬] 명령어로도 섬으로 이동 가능합니다.", color: "#16a34a" },
              { icon: "👥", name: "멤버", desc: "섬원의 역할을 설정할 수 있는 메뉴입니다.", color: "#0284c7" },
              { icon: "⬆️", name: "강화", desc: "호퍼 설치 개수, 섬 인원 수, 섬 꿀벌 수, 섬 크기, 섬 창고를 구매하거나 늘릴 때 사용하는 메뉴입니다.", color: "#d97706" },
            ].map((item) => (
              <div key={item.name} className="rounded-2xl border-2 border-amber-100 p-4 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow">
                <div className="text-3xl">{item.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: item.color }}>{item.name}</div>
                <p style={{ fontSize: "12px", color: "#78716c", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 2. 섬 프리뷰 */}
        <SectionCard>
          <SectionHeader emoji="🌍" title="섬 프리뷰" sub="섬 선택 시 생성 유형" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "새싹의 섬", type: "기본형", emoji: "🌱", desc: "일반적인 기본 형태의 섬입니다. 어떤 플레이도 가능합니다.", color: "#16a34a", bg: "#f0fdf4" },
              { name: "반짝의 섬", type: "채광형", emoji: "⛏️", desc: "광물 채취에 특화된 형태의 섬입니다. 광물 생성기 구조 최적화.", color: "#6366f1", bg: "#f5f3ff" },
              { name: "도토리의 섬", type: "벌목형", emoji: "🪓", desc: "나무 채취에 특화된 형태의 섬입니다. 벌목장 구조 최적화.", color: "#92400e", bg: "#fffbeb" },
            ].map((island) => (
              <div key={island.name} className="rounded-2xl border-2 p-5 text-center" style={{ background: island.bg, borderColor: island.color + "40" }}>
                <div className="text-4xl mb-3">{island.emoji}</div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: island.color }}>{island.name}</div>
                <div className="inline-block rounded-full px-3 py-0.5 my-2" style={{ background: island.color + "20", color: island.color, fontSize: "11px", fontWeight: 700 }}>
                  {island.type}
                </div>
                <p style={{ fontSize: "12px", color: "#78716c", lineHeight: 1.6 }}>{island.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 3. 섬 설정 */}
        <SectionCard>
          <SectionHeader emoji="⚙️" title="섬 설정" sub="권한 설정 및 섬 환경 설정" />
          <div className="p-6 space-y-4">
            {/* 권한 설정 */}
            <Collapsible defaultOpen title={<span>🔐 섬 권한 설정 <code className="text-xs bg-amber-100 rounded px-1">/섬 권한</code> — 대표·관리자·고정주민·주민·아르바이트·방문자 설정 가능</span>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissions.map((p) => (
                  <div key={p.name} className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                    <span className="inline-block rounded-lg px-2 py-0.5 flex-shrink-0 mt-0.5" style={{ background: "#fde68a", color: "#92400e", fontSize: "11px", fontWeight: 800 }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "#57534e", lineHeight: 1.5 }}>{p.desc}</span>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* 섬 설정 */}
            <Collapsible title={<span>🌦️ 섬 환경 설정 <code className="text-xs bg-amber-100 rounded px-1">/섬 설정</code> — 시간·날씨·환경 토글</span>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {islandSettings.map((s) => (
                  <div key={s.name} className="flex items-start gap-2 p-2.5 rounded-xl bg-sky-50 border border-sky-100">
                    <span className="inline-block rounded-lg px-2 py-0.5 flex-shrink-0 mt-0.5" style={{
                      background: s.type === "time" ? "#e0f2fe" : s.type === "weather" ? "#dcfce7" : "#fef9c3",
                      color: s.type === "time" ? "#0369a1" : s.type === "weather" ? "#166534" : "#854d0e",
                      fontSize: "11px", fontWeight: 800,
                    }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "#57534e", lineHeight: 1.5 }}>{s.desc}</span>
                  </div>
                ))}
              </div>
            </Collapsible>
          </div>
        </SectionCard>

        {/* 4. 섬 업그레이드 */}
        <SectionCard>
          <SectionHeader emoji="⬆️" title="섬 업그레이드" sub="/강화 메뉴에서 구매 가능" />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upgrades.map((upg) => (
              <div key={upg.title} className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: upg.color + "40" }}>
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: upg.color + "15" }}>
                  <span className="text-xl">{upg.icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: upg.color }}>{upg.title}</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: upg.color + "10" }}>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 700, color: upg.color }}>단계</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 700, color: upg.color }}>수치</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 700, color: upg.color }}>필요 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upg.stages.map((s) => (
                      <tr key={s.stage} className="border-t" style={{ borderColor: upg.color + "20" }}>
                        <td className="px-3 py-2">
                          <span className="rounded-full px-2 py-0.5 text-white" style={{ background: upg.color, fontSize: "10px", fontWeight: 800 }}>
                            {s.stage}단계
                          </span>
                        </td>
                        <td className="px-3 py-2" style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>
                          {s.value}{upg.unit}
                        </td>
                        <td className="px-3 py-2" style={{ fontSize: "11px", color: "#6b7280" }}>{s.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 5. 섬 은행 */}
        <SectionCard>
          <SectionHeader emoji="🏦" title="섬 은행" sub="섬 공동 자금 입출금 시스템" />
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 입금 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💰</span>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>입금 방법</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "반액 입금", desc: "소지하고 있는 금액의 절반을 섬 은행에 입금 합니다." },
                  { name: "입금", desc: "소지하고 있는 금액의 원하는 만큼을 섬 은행에 입금 합니다." },
                  { name: "전액 입금", desc: "소지하고 있는 금액의 전부를 섬 은행에 입금 합니다." },
                ].map((m) => (
                  <div key={m.name} className="p-3 rounded-xl border-2 border-green-100 bg-green-50">
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#166534" }}>{m.name}</div>
                    <p style={{ fontSize: "12px", color: "#4b7c5e", lineHeight: 1.5, marginTop: "2px" }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 출금 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💸</span>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#dc2626" }}>출금 방법</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "반액 출금", desc: "섬 은행의 잔액에서 절반을 출금 합니다." },
                  { name: "출금", desc: "섬 은행의 잔액에서 원하는 만큼을 출금 합니다." },
                  { name: "전액 출금", desc: "섬 은행의 잔액에서 전부를 출금 합니다." },
                ].map((m) => (
                  <div key={m.name} className="p-3 rounded-xl border-2 border-red-100 bg-red-50">
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#991b1b" }}>{m.name}</div>
                    <p style={{ fontSize: "12px", color: "#7c4444", lineHeight: 1.5, marginTop: "2px" }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 6. 섬 워프 */}
        <SectionCard>
          <SectionHeader emoji="🌀" title="섬 워프" sub="섬 워프 생성·관리·이동 명령어" />
          <div className="p-6">
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p style={{ fontSize: "13px", color: "#92400e", lineHeight: 1.6, fontWeight: 600 }}>
                ⚠️ 본인 섬이 아닌 다른 섬 워프를 사용할 경우 해당 섬에 허락을 받고 이용해 주세요!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { cmd: "/섬 워프", desc: "자신의 섬의 워프 목록을 확인 할 수 있습니다." },
                { cmd: "/섬 워프목록", desc: "서버에 있는 전체 섬 워프 목록을 확인 할 수 있습니다." },
                { cmd: "/섬 워프생성 (워프이름)", desc: "워프를 생성 할 수 있습니다." },
                { cmd: "/섬 워프제거 (워프이름)", desc: "워프를 제거 할 수 있습니다." },
              ].map((item) => (
                <div key={item.cmd} className="p-4 rounded-xl border-2 border-purple-100 bg-purple-50 flex items-start gap-3">
                  <code className="rounded-lg px-2 py-1 flex-shrink-0" style={{ background: "#7c3aed20", color: "#7c3aed", fontSize: "12px", fontWeight: 800 }}>
                    {item.cmd}
                  </code>
                  <p style={{ fontSize: "12px", color: "#57534e", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
