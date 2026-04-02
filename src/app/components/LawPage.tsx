import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";

type Article = {
  no: string;
  title: string;
  emoji: string;
  content: { sub: string; text: string }[];
};

const articles: Article[] = [
  {
    no: "제 1조",
    title: "목적",
    emoji: "📑",
    content: [
      { sub: "ㄱ", text: "이 법은 꿀비팜 내에서 발생하는 모든 문제의 처리를 원활히 하여 깨끗하고 건전한 게임을 유지하는 것을 목적으로 합니다." },
      { sub: "ㄴ", text: "꿀비팜의 운영 원칙은 인게임 내에서 발생하는 문제에 대해 항상 공정하게 처리됩니다." },
      { sub: "ㄷ", text: "모든 유저는 꿀비팜 운영 원칙에 동의한 것으로 간주하고 조항을 위반한 경우 그에 해당하는 처벌을 받습니다." },
    ],
  },
  {
    no: "제 2조",
    title: "GM의 책무",
    emoji: "👮",
    content: [
      { sub: "ㄱ", text: "GM은 Game Master의 약자로, 꿀비팜에서 게임의 운영 업무를 하는 운영자를 뜻합니다." },
      { sub: "ㄴ", text: "GM은 꿀비팜 운영 원칙을 준수하며, 유저의 원활한 플레이에 도움을 주고자 노력합니다." },
      { sub: "ㄷ", text: "GM은 유저의 개인정보 (성함, 주소, 비밀번호 등) 를 묻지 않습니다." },
      { sub: "ㄹ", text: "GM은 게임 내 특정 유저에게 유리한 혜택을 주지 않으며, 공개된 게임 관련 사항 외의 이벤트, 컨텐츠 등의 정보를 제공하지 않습니다." },
      { sub: "ㅁ", text: "GM은 꿀비팜 운영 원칙에 위배되는 유저의 행동에 대해 경고, 또는 게임 이용을 제한할 수 있습니다." },
      { sub: "ㅂ", text: "GM은 재량적 판단으로 상황에 따라 처벌 수위를 조절하여 처벌할 수 있습니다." },
      { sub: "ㅅ", text: "GM은 게임 내 존재하는 모든 버그를 확인하고 수정하기 위해 노력합니다." },
      { sub: "ㅇ", text: "GM은 게임 내 기능에 오류가 발생하여 원활한 게임 이용에 문제가 있을 경우 이를 공지 후 해당 기능을 삭제, 또는 정지할 수 있습니다." },
      { sub: "ㅈ", text: "GM은 문제가 있는 사항은 법전에 적혀있지 않는 내용에 대해 GM 간의 조율 후 처벌할 수 있습니다." },
      { sub: "ㅊ", text: "GM은 처벌할 때 객관적인 자료를 통해 처벌해야 합니다." },
      { sub: "ㅋ", text: "서버의 대표에 한해 이미 내려졌거나 내려지지 않은 처벌의 결정을 재조정할 수 있습니다." },
      { sub: "ㅌ", text: "GM은 서버 플레이 시간이 5시간 미만인 유저가 운영 원칙에 위배되는 행동을 할 경우 가급적 처벌에 앞서 경고를 지급합니다. 단, 사안에 따라 [제 2조 ㅂ]에 의거하여 즉시 제재 처리할 수 있습니다." },
      { sub: "ㅍ", text: "GM은 정당한 탄원 요청에 대해 GM 간 상의와 투표를 통하여 처벌을 재결정합니다." },
    ],
  },
  {
    no: "제 3조",
    title: "유저의 권리와 의무",
    emoji: "👤",
    content: [
      { sub: "ㄱ", text: "유저는 게임과, 게임에서 제공하는 컨텐츠를 이용할 수 있습니다. 단, 아이템, 캐릭터 등 게임 컨텐츠에 대한 소유권은 꿀비팜이 보유합니다." },
      { sub: "ㄴ", text: "유저는 게임 이용에 어려움이 있는 경우 GM을 통해 해결 방법을 안내받을 수 있습니다." },
      { sub: "ㄷ", text: "유저는 GM으로 인해 피해가 발생한 경우, 카페 등의 공식적인 경로를 통해 문의하고 개선을 요청할 수 있습니다." },
      { sub: "ㄹ", text: "유저는 타 유저에게 피해를 주거나 질서 유지에 부정적인 영향을 주어서는 안 되며, 이를 위해 GM의 요청에 최대한 협조하여야 합니다." },
      { sub: "ㅁ", text: "유저는 버그나 문제가 발생 시 GM에게 디스코드, 카페 등의 어떤 형태로든 제보하여야 하며, 이 의무를 다하지 않고 버그를 악용하거나 타인에게 전파하는 경우 게임 이용에 제한을 받을 수 있습니다." },
      { sub: "ㅂ", text: "유저는 디스코드의 공지사항을 수시로 확인하여야 합니다." },
      { sub: "ㅅ", text: "유저는 자신의 개인정보를 보호해야 합니다. 해킹, 정보도용 등으로 인해 발생하는 문제에 대해 GM의 도움을 받을 수 없으며, 발생한 문제에 대한 책임을 지게 됩니다." },
      { sub: "ㅇ", text: "유저는 불건전한 닉네임으로 접속할 경우 즉시 처벌받을 수 있습니다." },
    ],
  },
  {
    no: "제 4조",
    title: "복구 규정",
    emoji: "🔄",
    content: [
      { sub: "ㄱ-1", text: "재화가 사라졌을 경우 복구 요청을 위해서는 물증을 반드시 첨부해야 합니다. 물증은 영상, 사진 등 물리적 존재, 또는 상태가 확인되는 증거를 뜻합니다." },
      { sub: "ㄱ-2", text: "[영상 자료] 만든 날짜, 수정한 날짜, 액세스한 날짜, 이름이 날짜 형식으로 되어있는 영상." },
      { sub: "ㄱ-3", text: "[방송 자료] 방송의 리플레이 데이터 또는 링크, 영상의 주인이 본인임을 인증하는 사진 1장." },
      { sub: "ㄱ-4", text: "[사진 자료] 1주일 이내, 이름이 날짜 형식으로 되어있는 2장 이상의 사진 + 사진의 주인이 본인임을 인증하는 사진 1장. 관리자의 판단에 시간이 걸리며, 첨부 자료를 모두 제출해도 복구되지 않을 수 있습니다. 지속적인 재촉이 이루어질 시 처벌될 수 있습니다." },
      { sub: "ㄴ-①", text: "사기로 인해 재화를 잃게 된 경우 복구되지 않습니다." },
      { sub: "ㄴ-②", text: "개인과실로 인해 재화를 잃게 된 경우 복구되지 않습니다." },
      { sub: "ㄴ-③", text: "ㄴ에 해당하는 복구 요청을 재촉할 시 처벌될 수 있습니다." },
    ],
  },
  {
    no: "제 5조",
    title: "비매너 플레이의 기준과 제재",
    emoji: "⚔️",
    content: [
      { sub: "ㄱ", text: "비매너 플레이란 캐릭터를 이용하여 운영 원칙에 위배되는 행위를 해 타인의 원활한 게임 이용에 방해를 통해 불쾌감을 유발하였다고 판단되는 모든 행위를 뜻합니다." },
      { sub: "1", text: "플라이를 이용하여 다른 팜에 무단침입하는 행위" },
      { sub: "2", text: "무통보 섬원강퇴: 섬원을 강퇴할 땐 섬원 추방 게시판에 정당한 이유와 함께 게시글을 작성해야 합니다. 게시글 작성 기한은 24시간으로 합니다." },
      { sub: "3", text: "부계정: 같은 아이피에 두 명 이상의 유저의 접속 기록이 있을 경우 처벌됩니다. 단, 가족계정 신청 게시판에 미리 신청한 경우는 예외입니다." },
      { sub: "4", text: "개인 이벤트 어그로 유도 및 구걸: 개인 이벤트를 통해 전체채팅에 도배 또는 구걸하는 행위" },
      { sub: "5", text: "물기둥: 섬 안에서 심한 물기둥을 만드는 행위. 규모에 따라 삭제되거나 처벌될 수 있습니다." },
      { sub: "6", text: "절도 및 테러: 섬 내 상자 아이템 무단 취득, 블럭 무단 파손, 타인의 인벤토리에 아이템 고의 삽입, 잠광 방해 행위" },
      { sub: "7", text: "게임 플레이 방해: 파쿠르 길막/잠수, 낚시 고의 방해, 선물함에 원치 않는 아이템 넣기 등" },
      { sub: "8", text: "분쟁 유도성 플레이: 레이드 사냥 방해 등 분쟁의 원인을 제공하는 모든 행위. 레이드 중 약간의 데미지만 주고 방관하는 행위 포함." },
      { sub: "9", text: "비인가 프로그램: 매크로 사용 금지 (블럭 설치·파괴 오토마우스, 잠광 매크로 제외)" },
      { sub: "10", text: "아이템 회수 불응: 실수로 드롭/전송된 아이템/금화를 돌려주지 않는 행위" },
      { sub: "11", text: "도박장 규정: 마이너스 배수 적용 금지, 최대 배팅 300만원 초과 금지" },
      { sub: "12", text: "사기: 거래 성립 후 대가를 지불하지 않고 가져가는 행위" },
      { sub: "13", text: "욕설: 표지판, 건축물 등으로 비속어를 표현 또는 발언하는 행위" },
      { sub: "14", text: "인간 깔때기: 인벤토리에 특정 아이템만 채워 원하는 아이템만 선택하는 행위" },
      { sub: "15", text: "멀티팜: 여러 팜을 운영하며 재화를 비정상적으로 한 곳으로 몰아주는 행위, 아이템 유상대여 포함" },
      { sub: "16", text: "범죄 가담 또는 방관: 범죄 행위를 돕거나 신고하지 않는 행위" },
      { sub: "17", text: "암시장·무역 시세 및 위치 발설: 암시장 위치/시세를 전체채팅·스폰지역채팅·확성기로 발설하는 행위" },
      { sub: "18", text: "무고죄: 상대방에게 죄가 없음에도 고의로 신고하는 행위" },
      { sub: "19", text: "시세파괴: 캐시 시세를 서버 시세표와 다르게 판매하거나, 비정상적으로 높은 가격으로 아이템 등록" },
      { sub: "20", text: "PVP장 블럭워즈 비매너: 물/거미줄 10개 이상 설치, 파란 테두리 안 물 설치, 표지판 잠금, 싸우다 다른 곳으로 워프 도주 등" },
      { sub: "21", text: "섬원 추방 손해배상: 섬원 추방 시 섬원이 만들거나 구매한 아이템은 추방 후 돌려주어야 합니다." },
      { sub: "22", text: "울타리 광산: 발사기·공급기·호퍼를 이용하여 특정 광물만 상자에 들어오게 하는 행위" },
    ],
  },
  {
    no: "제 6조",
    title: "비매너 채팅의 기준과 제재",
    emoji: "💬",
    content: [
      { sub: "ㄱ", text: "비매너 채팅이란 채팅을 이용하여 운영 원칙에 위배되는 행위를 해 타인의 원활한 게임 이용에 방해를 통해 불쾌감을 유발하였다고 판단되는 모든 행위를 뜻합니다." },
      { sub: "1", text: "단타: 한 번에 칠 수 있는 내용을 6줄 이상으로 짧게 나누어 채팅을 치는 행위" },
      { sub: "2", text: "도배: 짧은 시간 내에 같은 내용을 5번 이상 입력하는 행위 (채팅 어그로 포함). 단, 공지사항 전달 등 특수한 경우 예외." },
      { sub: "3", text: "반말: 특정 유저에게 반말하는 행위" },
      { sub: "4", text: "비하: 서버, GM, 유저에 대해 공격적으로 발언하는 행위 [개인·지역채팅 포함]" },
      { sub: "5", text: "타 서버 언급: 허용되지 않은 다른 서버를 직·간접적으로 언급하는 모든 행위 [개인채팅·귓속말 포함]" },
      { sub: "6", text: "섭접 발언: 서버를 다시 이용하지 않겠다고 발언하는 행위 [개인채팅·귓속말 포함]" },
      { sub: "7", text: "비윤리적 발언: 일베, 정치, 종교 발언 등 사회적·도덕적으로 부적절한 발언" },
      { sub: "8", text: "어그로: 정확하지 않은 정보를 전체채팅으로 언급하거나, 확성기로 잡담하는 행위. 홍보성 채팅은 1분에 1회만 허용." },
      { sub: "9", text: "구걸: 확성기나 전체채팅으로 아이템 또는 돈을 기부해달라고 발언하는 행위" },
      { sub: "10", text: "욕설: 전체채팅에서 비속어나 비윤리적인 단어를 사용하는 행위" },
      { sub: "11", text: "타게임 구인/발언: 완전히 다른 게임의 구인을 하는 행위 [전체채팅 대상]" },
      { sub: "12", text: "오해 발언: 의도와 관계없이 GM 및 유저들이 오해를 일으킬 만한 발언" },
      { sub: "13", text: "시비 및 분쟁 유도성 발언: 분쟁의 원인을 제공하거나 상대방의 기분을 불쾌하게 만드는 발언" },
    ],
  },
  {
    no: "제 7조",
    title: "기타 중요 규정",
    emoji: "📋",
    content: [
      { sub: "1", text: "캐시 거래는 가능하게 처리합니다." },
      { sub: "2", text: "서버 간의 현금, 현물 거래는 로그조사로 찾은 후 템 초기화 및 엄격히 처벌합니다." },
      { sub: "3", text: "거래 사기는 경고 또는 템 몰수이니 꼭 조심하시기 바랍니다." },
      { sub: "4", text: "귓말 또는 디스코드 등으로 타서버 주소 거래를 주고받다가 걸리면 밴 처리합니다." },
      { sub: "5", text: "이벤트 아이템 및 기본 아이템은 거래 허용입니다. 단, 2일 동안 합산 5천만원이 넘으면 제재 처리 (미리 허락받은 경우 예외)." },
      { sub: "6", text: "불법 프로그램 거래 및 불정확한 아이템 거래는 확실히 처리합니다." },
      { sub: "7", text: "후원한 금액은 환불이 불가능합니다." },
      { sub: "8", text: "관리(가이드 포함)자 비하는 즉시 정지 처벌을 받습니다. [개인·지역채널 포함]" },
      { sub: "9", text: "서버 또는 디스코드, 카카오톡을 통하여 허용되지 않은 홍보를 할 경우 엄격히 처벌합니다." },
      { sub: "10", text: "서버 이외 디스코드, 카페에서 처벌받을 경우 서버에서도 처벌받을 수 있으며, 서버에서 영구정지 처벌 시 디스코드, 카카오톡, 카페에서도 처벌받을 수 있습니다." },
      { sub: "11", text: "서버 플레이 타임이 적은 유저들에 한해서는 일부 제재 수위가 완화될 수 있습니다." },
    ],
  },
];

function ArticleCard({ article }: { article: Article }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-amber-50/40 transition-colors text-left"
      >
        <span className="text-2xl flex-shrink-0">{article.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-amber-100 text-amber-700 rounded-full px-2.5 py-0.5" style={{ fontSize: "11px", fontWeight: 700 }}>
              {article.no}
            </span>
            <span className="text-slate-800" style={{ fontSize: "16px", fontWeight: 700 }}>{article.title}</span>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-amber-50">
          <div className="mt-4 space-y-2">
            {article.content.map((item) => (
              <div key={item.sub} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <span
                  className="bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 flex-shrink-0 mt-0.5"
                  style={{ fontSize: "11px", fontWeight: 700, minWidth: "28px", textAlign: "center" }}
                >
                  {item.sub}
                </span>
                <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function LawPage() {
  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-amber-600 mb-4" style={{ fontSize: "13px" }}>
          <Link to="/" className="hover:text-amber-700">홈</Link>
          <span>›</span>
          <span className="text-slate-600">⚖️ 운영원칙 (법전)</span>
        </div>

        <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">⚖️</span>
            <div>
              <h1 className="text-slate-800" style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px" }}>
                운영원칙 (법전)
              </h1>
              <p className="text-slate-500" style={{ fontSize: "14px" }}>꿀비의 숲 서버 공식 운영 원칙</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: "#fff8e7", border: "2px solid #fbbf24" }}>
            <p className="text-amber-800" style={{ fontSize: "13px", lineHeight: 1.8 }}>
              ⚠️ <strong>중요!</strong> 법전은 언제든지 추가 및 수정될 수 있습니다.<br />
              카페 가입하지 않은 상태에서 일어나는 모든 불이익은 본인의 책임입니다.<br />
              서버 유저들에게 꼭 말씀을 한 번씩 해주시길 바랍니다.<br />
              문제가 있는 점은 관리자 재량으로 처벌합니다.<br />
              악용이나 규정에 벗어난 문제로 처벌된 유저는 모든 기록이 초기화됩니다.
            </p>
          </div>
          <div className="mt-4 text-slate-400" style={{ fontSize: "12px" }}>
            💡 각 조항을 클릭하면 세부 내용을 펼치거나 접을 수 있습니다.
          </div>
        </div>

        <div className="space-y-3">
          {articles.map((article) => (
            <ArticleCard key={article.no} article={article} />
          ))}
        </div>

        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-5">
          <div className="text-red-700 mb-2" style={{ fontSize: "14px", fontWeight: 700 }}>🚨 주의사항</div>
          <ul className="space-y-1">
            {[
              "캐시 거래는 가능하지만 서버 시세표 기준을 반드시 따르세요.",
              "현금/현물 거래, 타서버 주소 공유는 즉시 밴 처리됩니다.",
              "후원 금액은 절대 환불 불가능합니다.",
              "모든 처벌은 객관적 자료를 기반으로 결정됩니다.",
              "법전은 운영진에 의해 언제든지 업데이트될 수 있습니다.",
            ].map((item) => (
              <li key={item} className="text-red-600 flex items-start gap-1.5" style={{ fontSize: "13px" }}>
                <span className="flex-shrink-0">▸</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}