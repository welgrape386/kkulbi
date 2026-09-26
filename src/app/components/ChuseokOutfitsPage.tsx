import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { CHUSEOK_COLOR } from "./ChuseokEventContent";

function loadImages(glob: Record<string, string>) {
  return Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b, "ko", { numeric: true }))
    .map(([, src]) => src);
}

const toolOutfitImages = loadImages(
  import.meta.glob<string>("../../imports/도구*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const costumeOutfitImages = loadImages(
  import.meta.glob<string>("../../imports/치장*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const COLOR = CHUSEOK_COLOR;

function OutfitGallery({ images, emptyLabel }: { images: string[]; emptyLabel: string }) {
  if (images.length === 0) {
    return (
      <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: COLOR + "12", border: `1px solid ${COLOR}33` }}>
        <span className="text-xl flex-shrink-0">🖼️</span>
        <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLOR }}>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}
    >
      {images.map((src) => (
        <div
          key={src}
          className="bg-white rounded-xl border-2 overflow-hidden shadow-sm"
          style={{ borderColor: COLOR + "33" }}
        >
          <img src={src} alt="추석 이벤트 착용샷" className="w-full h-auto object-contain" />
        </div>
      ))}
    </div>
  );
}

export function ChuseokOutfitsPage() {
  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 mb-3" style={{ fontSize: "13px" }}>
            <Link to="/" className="hover:text-amber-700">홈</Link>
            <span>›</span>
            <Link to="/chuseok-event" className="hover:text-amber-700">🎑 추석 이벤트</Link>
            <span>›</span>
            <span className="text-slate-600">착용샷</span>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/chuseok-event"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              확률표로 돌아가기
            </Link>
            <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
              📸 추석 이벤트 착용샷
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* 도구스킨 섹션 */}
          <div className="bg-white rounded-2xl border-2 overflow-hidden shadow-sm" style={{ borderColor: COLOR + "55" }}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ background: COLOR + "15" }}>
              <span className="text-xl">🛠️</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: COLOR }}>추석 도구스킨 착용샷</span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{ background: COLOR + "28", color: COLOR, fontSize: "11px", fontWeight: 700 }}
              >
                {toolOutfitImages.length}장
              </span>
            </div>
            <div className="p-4">
              <OutfitGallery images={toolOutfitImages} emptyLabel="도구스킨 착용샷은 곧 업데이트될 예정입니다." />
            </div>
          </div>

          {/* 코스튬 섹션 */}
          <div className="bg-white rounded-2xl border-2 overflow-hidden shadow-sm" style={{ borderColor: COLOR + "55" }}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ background: COLOR + "15" }}>
              <span className="text-xl">👘</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: COLOR }}>추석 코스튬 착용샷</span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{ background: COLOR + "28", color: COLOR, fontSize: "11px", fontWeight: 700 }}
              >
                {costumeOutfitImages.length}장
              </span>
            </div>
            <div className="p-4">
              <OutfitGallery images={costumeOutfitImages} emptyLabel="코스튬 착용샷은 곧 업데이트될 예정입니다." />
            </div>
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
            to="/chuseok-event"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:shadow-md"
            style={{ background: `linear-gradient(135deg, #f97316, #ea580c)`, color: "#fff", fontSize: "13px", fontWeight: 700 }}
          >
            🎰 확률표로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
