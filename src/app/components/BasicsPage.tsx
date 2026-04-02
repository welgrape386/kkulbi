import { useSearchParams, Link } from "react-router";
import type { ReactNode } from "react";

const tabs = [
  { key: "connect", label: "서버 접속 방법", emoji: "🖥️" },
  { key: "ui", label: "기본 UI 사용", emoji: "📱" },
  { key: "commands", label: "명령어 안내", emoji: "💬" },
  { key: "banned", label: "금지 아이템", emoji: "🚫" },
  { key: "rules", label: "규칙 사항", emoji: "📋" },
  { key: "faq", label: "자주 묻는 질문", emoji: "❓" },
];

function ConnectContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-slate-800 mb-4" style={{ fontSize: "18px", fontWeight: 800 }}>🖥️ 꿀비의 숲 서버 접속하기</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl" style={{ background: "#1a1200", border: "2px solid #f5c842" }}>
            <div className="text-amber-400 mb-2" style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>서버 IP</div>
            <div className="text-amber-300" style={{ fontSize: "18px", fontWeight: 900 }}>서버 IP 주소 (업데이트 예정)</div>
            <div className="text-amber-600 mt-1" style={{ fontSize: "12px" }}>Java Edition 지원</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: 1, title: "마인크래프트 실행", desc: "Java Edition 마인크래프트를 실행하세요. 서버 권장 버전을 확인하세요." },
              { step: 2, title: "멀티플레이 선택", desc: "타이틀 화면에서 '멀티플레이' 버튼을 클릭하세요." },
              { step: 3, title: "서버 추가", desc: "'서버 추가' 버튼을 클릭하고 위의 IP 주소를 입력하세요." },
              { step: 4, title: "접속!", desc: "서버가 목록에 추가되면 더블클릭 또는 '서버에 참가' 버튼으로 접속하세요." },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: "#f5c842", color: "#1a1200", fontSize: "14px", fontWeight: 900 }}>
                  {s.step}
                </div>
                <div>
                  <div className="text-slate-700 mb-0.5" style={{ fontSize: "14px", fontWeight: 700 }}>{s.title}</div>
                  <p className="text-slate-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <div className="text-green-800" style={{ fontSize: "14px", fontWeight: 700 }}>✅ 접속 후 해야 할 것들</div>
        <ul className="mt-2 space-y-1">
          {[
            "디스코드 서버 참여 (공지사항 확인 필수!)",
            "/랭크상점 으로 랭크 및 조건 확인",
            "특성 선택 후 스킬 구매 시작",
            "섬 개설 후 농장 건설",
            "네이버 카페 가입 (이벤트, 공지 확인용)",
          ].map((item) => (
            <li key={item} className="text-green-700 flex items-start gap-1.5" style={{ fontSize: "13px" }}>
              <span className="flex-shrink-0">▸</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CommandsContent() {
  const commands = [
    { cmd: "/밥", desc: "체력 회복 (랭크 1 이상)", cat: "기본", req: "1등급" },
    { cmd: "/엔더상자", desc: "개인 엔더상자 열기", cat: "보관", req: "2등급" },
    { cmd: "/창고 [번호]", desc: "개인 창고 열기 (1~10번)", cat: "보관", req: "2등급+" },
    { cmd: "/조합대", desc: "인벤토리에서 3x3 조합대 사용", cat: "편의", req: "5등급" },
    { cmd: "/수산시장", desc: "수산시장 GUI 열기", cat: "판매", req: "5등급" },
    { cmd: "/자동줍기", desc: "아이템 자동 줍기 ON/OFF", cat: "편의", req: "6등급" },
    { cmd: "/캐시 보내기", desc: "다른 유저에게 캐시 전송", cat: "거래", req: "6등급" },
    { cmd: "/자동조합", desc: "자동 조합 기능 사용", cat: "편의", req: "10등급" },
    { cmd: "/상점열기", desc: "개인 상점 열기", cat: "거래", req: "10등급" },
    { cmd: "/제단", desc: "제단 기능 사용", cat: "고급", req: "11등급" },
    { cmd: "/광물창고", desc: "광물 전용 창고 열기", cat: "채광", req: "기본" },
    { cmd: "/광물변환", desc: "광물 대신 크리스탈 확률 증가 ON/OFF", cat: "채광", req: "기본" },
    { cmd: "/랭크상점", desc: "랭크 조건 및 권한 확인", cat: "정보", req: "기본" },
    { cmd: "/신호기", desc: "신호기 추첨 참여", cat: "이벤트", req: "기본" },
    { cmd: "/발광", desc: "캐릭터 발광 효과", cat: "꾸미기", req: "최고등급" },
    { cmd: "/암시장확인", desc: "암시장 위치/시세 확인", cat: "고급", req: "12등급" },
    { cmd: "/제단열기", desc: "다른 유저의 제단 열기", cat: "고급", req: "12등급" },
    { cmd: "/확성기 [메시지]", desc: "전체 확성기 메시지 발송", cat: "채팅", req: "캐시" },
    { cmd: "/액자", desc: "아이템 액자 기능 사용", cat: "꾸미기", req: "9등급" },
  ];

  const catColors: Record<string, string> = {
    기본: "bg-slate-100 text-slate-600",
    보관: "bg-blue-100 text-blue-700",
    편의: "bg-green-100 text-green-700",
    판매: "bg-amber-100 text-amber-700",
    거래: "bg-orange-100 text-orange-700",
    채광: "bg-stone-100 text-stone-700",
    이벤트: "bg-rose-100 text-rose-700",
    꾸미기: "bg-purple-100 text-purple-700",
    정보: "bg-sky-100 text-sky-700",
    고급: "bg-red-100 text-red-700",
    채팅: "bg-teal-100 text-teal-700",
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-amber-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          💡 명령어는 채팅창에 입력하면 돼요. 일부 명령어는 특정 랭크 이상이거나 캐시가 필요해요.<br />
          영구 업데이트되는 목록으로, 최신 정보는 디스코드 공지를 확인하세요.
        </p>
      </div>
      <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#fffbef", borderBottom: "2px solid #f5e098" }}>
                <th className="px-4 py-3 text-left text-amber-800" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>명령어</th>
                <th className="px-4 py-3 text-left text-amber-800" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>설명</th>
                <th className="px-4 py-3 text-left text-amber-800" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>분류</th>
                <th className="px-4 py-3 text-left text-amber-800" style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>필요 조건</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {commands.map((c) => (
                <tr key={c.cmd} className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <code className="bg-slate-100 text-slate-700 rounded-lg px-2 py-0.5" style={{ fontSize: "12px", fontWeight: 700 }}>{c.cmd}</code>
                  </td>
                  <td className="px-4 py-3 text-slate-600" style={{ fontSize: "13px" }}>{c.desc}</td>
                  <td className="px-4 py-3">
                    <span className={`${catColors[c.cat] ?? "bg-slate-100 text-slate-600"} rounded-full px-2 py-0.5`} style={{ fontSize: "11px", fontWeight: 600 }}>{c.cat}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500" style={{ fontSize: "12px" }}>{c.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FaqContent() {
  const faqs = [
    { q: "광물이 안 나와요.", a: "/광물창고 명령어를 확인해보세요. 광물 창고는 총 5만 개까지만 보관됩니다. 가득 차면 광물이 더 이상 드롭되지 않아요! 소라고동 아이템으로 광물창고를 늘릴 수 있어요." },
    { q: "광물변환은 뭔가요?", a: "/광물변환 활성화 시 광물들이 드롭되지 않는 대신, 크리스탈 확률이 상승합니다. 태양열의 경우, 태양열 효과가 강화된 비율만큼 크리스탈 확률이 증가해요." },
    { q: "지렁이는 어떻게 얻나요?", a: "수확 특성의 경우 지렁이를 더 많이 획득할 수 있어요. 지렁이는 섬세한 손길 인챈트가 있을 때만 드롭되고, 행운 수치가 높을수록 확률이 올라가요! 수확 스킬 '파브르'로도 지렁이 획득 확률을 높일 수 있어요." },
    { q: "산삼씨앗은 어디서 얻나요?", a: "수확 특성의 '빛나는 확률' 스킬이 있으면 모든 작물에서 산삼씨앗을 얻을 수 있어요. 또한 일일 보상, 각종 이벤트에서도 얻을 수 있습니다." },
    { q: "낚시 시 쉬프트 누르면 고정키 창이 뜨는데 어떻게 하나요?", a: "윈도우 검색창에 '고정 키' 검색 → 첫 번째 클릭 → 고정키 사용을 '끔'으로 변경하면 해결돼요!" },
    { q: "커스텀 작물이 자라지 않아요.", a: "커스텀 작물은 빛이 필요 없지만, 주변에 플레이어가 있어야 자라요! 또한 경작지에 물을 뿌려줘야 해요. 물뿌리개를 물에 우클릭해서 채운 뒤 경작지에 사용하거나, 스프링쿨러를 설치하면 편해요." },
    { q: "허수아비는 무엇인가요?", a: "커스텀 농사를 할 때 까마귀가 와서 작물을 먹고 도망가요. 허수아비를 설치해놓으면 까마귀를 막을 수 있어요! 허수아비의 범위는 한 청크입니다." },
    { q: "부계정을 사용해도 되나요?", a: "같은 아이피에 두 명 이상의 유저가 접속하면 부계정으로 처리될 수 있어요. 가족과 함께 플레이한다면 반드시 '가족계정 신청 게시판'에 미리 신청하세요!" },
    { q: "암시장이란 무엇인가요?", a: "암시장은 특정 랭크 이상(12등급)에서만 /암시장확인 명령어로 위치를 알 수 있는 비밀 상점이에요. 암시장 위치나 시세를 전체채팅/스폰지역채팅/확성기로 발설하면 처벌받을 수 있어요!" },
    { q: "재화를 잃었을 때 복구받을 수 있나요?", a: "복구 요청 시 물증이 반드시 필요해요. 영상(날짜가 확인되는), 방송 리플레이, 또는 1주일 이내 날짜 형식의 사진 2장+본인 인증이 필요해요. 사기나 개인 과실로 인한 손실은 복구되지 않아요." },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
          <summary className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-amber-50/40 transition-colors list-none">
            <span className="text-amber-500 flex-shrink-0 mt-0.5" style={{ fontSize: "16px" }}>❓</span>
            <span className="flex-1 text-slate-700" style={{ fontSize: "14px", fontWeight: 600 }}>{faq.q}</span>
            <span className="text-amber-400 flex-shrink-0 group-open:rotate-90 transition-transform" style={{ fontSize: "16px" }}>▸</span>
          </summary>
          <div className="px-5 pb-4 pt-0">
            <div className="ml-7 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function RulesContent() {
  const rules = [
    { no: "1", title: "비인가 프로그램 금지", desc: "매크로(블럭 설치·파괴 오토마우스, 잠광 매크로 제외), 핵 등 비인가 프로그램 사용 금지", icon: "🤖" },
    { no: "2", title: "플라이 무단침입 금지", desc: "플라이를 이용하여 다른 팜에 무단침입하는 행위 금지", icon: "✈️" },
    { no: "3", title: "부계정 금지", desc: "같은 아이피로 여러 계정 사용 금지 (가족은 가족계정 신청 필수)", icon: "👥" },
    { no: "4", title: "사기 금지", desc: "거래가 성립된 후 대가를 지불하지 않는 사기 행위 엄금", icon: "🚨" },
    { no: "5", title: "절도 및 테러 금지", desc: "타인의 섬 아이템 무단 취득, 블럭 파손, 고의 피해 행위 금지", icon: "🔒" },
    { no: "6", title: "욕설 및 비매너 채팅 금지", desc: "비속어, 비하 발언, 도배, 타서버 언급, 반말 등 비매너 채팅 금지", icon: "💬" },
    { no: "7", title: "멀티팜 금지", desc: "여러 팜을 운영하며 재화를 비정상적으로 한 곳에 몰아주는 행위 금지", icon: "🏭" },
    { no: "8", title: "시세 파괴 금지", desc: "캐시나 아이템을 비정상적인 가격으로 거래하여 시세에 혼란을 야기하는 행위 금지", icon: "📉" },
    { no: "9", title: "무고죄 금지", desc: "죄가 없는 유저를 고의로 신고하는 행위 금지", icon: "⚖️" },
    { no: "10", title: "현금 거래 금지", desc: "서버 간 현금/현물 거래 시 아이템 초기화 및 엄격한 처벌", icon: "💸" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <p className="text-red-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          ⚠️ 규칙 위반 시 경고, 아이템 몰수, 임시/영구 정지 등의 처벌을 받을 수 있어요. 자세한 처벌 기준은{" "}
          <Link to="/law" className="underline font-bold">법전</Link>에서 확인하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rules.map((r) => (
          <div key={r.no} className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{r.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="bg-red-100 text-red-600 rounded-full px-1.5 py-0.5" style={{ fontSize: "10px", fontWeight: 700 }}>{r.no}</span>
                <span className="text-slate-700" style={{ fontSize: "14px", fontWeight: 700 }}>{r.title}</span>
              </div>
              <p className="text-slate-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BannedContent() {
  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <p className="text-red-800" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          ⚠️ 금지 아이템 목록은 서버 업데이트에 따라 변경될 수 있어요. 인게임 명령어 또는 운영진에게 문의하여 최신 목록을 확인하세요.
        </p>
      </div>
      <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm text-center">
        <div className="text-4xl mb-3">🚫</div>
        <div className="text-slate-700 mb-2" style={{ fontSize: "16px", fontWeight: 700 }}>금지 아이템 목록</div>
        <p className="text-slate-500" style={{ fontSize: "13px", lineHeight: 1.7 }}>
          금지 아이템 목록은 운영진에 의해 관리되며,<br />
          디스코드 공지 또는 인게임 공지를 통해 안내됩니다.<br />
          금지 아이템 소지 시 몰수 또는 처벌될 수 있어요.
        </p>
      </div>
    </div>
  );
}

function UIContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: "💬", title: "채팅 시스템", desc: "전체채팅(기본), 지역채팅, 귓속말(/귓말 닉네임) 등을 지원해요. 확성기로 전체 공지도 가능해요 (유료)." },
          { icon: "📦", title: "인벤토리", desc: "개인 인벤토리 외에 엔더상자(/엔더상자), 창고(/창고 1~10)를 사용할 수 있어요. 등급별로 창고가 개방됩니다." },
          { icon: "💰", title: "경제 시스템", desc: "재화(원화)로 아이템을 사고팔 수 있어요. 경매장, 개인 상점, NPC 상점을 이용할 수 있습니다." },
          { icon: "📮", title: "우편함", desc: "이벤트 보상, GM 지급 아이템 등은 우편함으로 전달돼요. /우편 명령어로 확인하거나 인벤토리 UI를 통해 확인하세요." },
          { icon: "🏝️", title: "섬 시스템", desc: "자신만의 섬을 개설하고 농장, 광산, 벌목장 등을 운영할 수 있어요. 섬원을 초대하여 같이 운영도 가능해요." },
          { icon: "🏪", title: "경매장", desc: "아이템을 경매장에 등록하여 다른 유저에게 판매할 수 있어요. 세금이 부과될 수 있으며, 고등급에서는 세금이 면제됩니다." },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="text-slate-700 mb-1" style={{ fontSize: "14px", fontWeight: 700 }}>{item.title}</div>
                <p className="text-slate-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const contentComponents: Record<string, ReactNode> = {
  connect: <ConnectContent />,
  ui: <UIContent />,
  commands: <CommandsContent />,
  banned: <BannedContent />,
  rules: <RulesContent />,
  faq: <FaqContent />,
};

export function BasicsPage() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get("tab") ?? "connect";
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-green-600 mb-2" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-green-700">홈</Link>
            <span>›</span>
            <span>기초설명</span>
            <span>›</span>
            <span className="text-slate-600">{current.emoji} {current.label}</span>
          </div>
          <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
            {current.emoji} {current.label}
          </h1>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8 p-3 rounded-2xl" style={{ background: "white", border: "2px solid #86efac" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setParams({ tab: tab.key })}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === tab.key ? "bg-green-500 text-white shadow-sm" : "text-slate-600 hover:bg-green-50 hover:text-green-700"
              }`}
              style={{ fontSize: "13px", fontWeight: activeTab === tab.key ? 700 : 500 }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div>{contentComponents[activeTab] ?? null}</div>
      </div>
    </div>
  );
}
