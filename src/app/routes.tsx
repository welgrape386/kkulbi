import { createBrowserRouter, Link, Navigate } from "react-router";
import { AppRoot } from "./components/AppRoot";
import { Home } from "./components/Home";
import { ContentPage } from "./components/ContentPage";
import { BasicsPage } from "./components/BasicsPage";
import { DailyRewardsPage } from "./components/DailyRewardsPage";
import { ChuseokOutfitsPage } from "./components/ChuseokOutfitsPage";
import { TraitsPage } from "./components/TraitsPage";
import { FishingTraitPage } from "./components/FishingTraitPage";
import { HarvestTraitPage } from "./components/HarvestTraitPage";
import { IslandPage } from "./components/IslandPage";
import { LawPage } from "./components/LawPage";
import { SupportPage } from "./components/SupportPage";
import { MiningTraitPage } from "./components/MiningTraitPage";
import { LoggingTraitPage } from "./components/LoggingTraitPage";
import { CookingTraitPage } from "./components/CookingTraitPage";

function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-4">🐝</div>
      <h1 className="mb-2" style={{ fontSize: "24px", fontWeight: 900, color: "#78350f" }}>
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-slate-600 mb-6" style={{ fontSize: "14px" }}>
        주소가 바뀌었거나 삭제된 페이지예요.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2.5 rounded-xl"
        style={{ background: "linear-gradient(135deg, #f5c842, #f59e0b)", color: "#1a1200", fontSize: "13px", fontWeight: 700 }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppRoot,
    children: [
      { index: true, Component: Home },
      { path: "content", Component: ContentPage },
      { path: "content/traits", Component: TraitsPage },
      { path: "content/traits/mining", Component: MiningTraitPage },
      { path: "content/traits/fishing", Component: FishingTraitPage },
      { path: "content/traits/harvest", Component: HarvestTraitPage },
      { path: "content/traits/logging", Component: LoggingTraitPage },
      { path: "content/traits/cooking", Component: CookingTraitPage },
      { path: "content/island", Component: IslandPage },
      { path: "basics", Component: BasicsPage },
      { path: "daily-rewards", Component: DailyRewardsPage },
      { path: "chuseok-event/outfits", Component: ChuseokOutfitsPage },
      { path: "law", Component: LawPage },
      { path: "support", Component: SupportPage },
      // 예전 상점가 주소는 콘텐츠 › 상점 탭으로 보냅니다.
      { path: "prices", element: <Navigate to="/content?tab=shop" replace /> },
      { path: "*", Component: NotFound },
    ],
  },
]);
