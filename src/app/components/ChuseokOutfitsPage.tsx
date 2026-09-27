import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { CHUSEOK_COLOR, ChuseokSection } from "./ChuseokEventContent";

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

const petPreviewImages = loadImages(
  import.meta.glob<string>("../../imports/펫*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const COLOR = CHUSEOK_COLOR;

function OutfitGallery({ images, alt, emptyLabel }: { images: string[]; alt: string; emptyLabel: string }) {
  if (images.length === 0) {
    return (
      <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: COLOR + "12", border: `1px solid ${COLOR}33` }}>
        <span className="text-xl flex-shrink-0">🖼️</span>
        <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLOR }}>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          title="원본 크기로 보기"
          className="block bg-white rounded-xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          style={{ borderColor: COLOR + "33" }}
        >
          <img src={src} alt={`${alt} ${i + 1}`} loading="lazy" className="w-full h-auto object-contain" />
        </a>
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
            <span className="text-slate-600">착용샷 · 펫 미리보기</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Link>
            <h1 className="text-slate-800" style={{ fontSize: "24px", fontWeight: 900 }}>
              📸 추석 착용샷 · 펫 미리보기
            </h1>
          </div>
        </div>

        <p className="text-slate-500 -mt-3 mb-6" style={{ fontSize: "13px" }}>
          이미지를 누르면 원본 크기로 볼 수 있습니다.
        </p>

        <div className="space-y-4">
          <ChuseokSection icon="🐾" title="추석 펫 미리보기" badge={`${petPreviewImages.length}장`} defaultOpen>
            <div className="p-4">
              <OutfitGallery images={petPreviewImages} alt="추석 펫 미리보기" emptyLabel="펫 미리보기는 곧 업데이트될 예정입니다." />
            </div>
          </ChuseokSection>

          <ChuseokSection icon="🛠️" title="추석 도구스킨 착용샷" badge={`${toolOutfitImages.length}장`} defaultOpen>
            <div className="p-4">
              <OutfitGallery images={toolOutfitImages} alt="추석 도구스킨 착용샷" emptyLabel="도구스킨 착용샷은 곧 업데이트될 예정입니다." />
            </div>
          </ChuseokSection>

          <ChuseokSection icon="👘" title="추석 코스튬 착용샷" badge={`${costumeOutfitImages.length}장`} defaultOpen>
            <div className="p-4">
              <OutfitGallery images={costumeOutfitImages} alt="추석 코스튬 착용샷" emptyLabel="코스튬 착용샷은 곧 업데이트될 예정입니다." />
            </div>
          </ChuseokSection>
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
        </div>
      </div>
    </div>
  );
}
