import { createBrowserRouter } from "react-router";
import { AppRoot } from "./components/AppRoot";
import { Home } from "./components/Home";
import { ContentPage } from "./components/ContentPage";
import { BasicsPage } from "./components/BasicsPage";
import { DailyRewardsPage } from "./components/DailyRewardsPage";
import { TraitsPage } from "./components/TraitsPage";
import { FishingTraitPage } from "./components/FishingTraitPage";
import { HarvestTraitPage } from "./components/HarvestTraitPage";
import { IslandPage } from "./components/IslandPage";
import { LawPage } from "./components/LawPage";
import { SupportPage } from "./components/SupportPage";
import { PricesPage } from "./components/PricesPage";
import { MiningTraitPage } from "./components/MiningTraitPage";
import { LoggingTraitPage } from "./components/LoggingTraitPage";
import { CookingTraitPage } from "./components/CookingTraitPage";

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
      { path: "law", Component: LawPage },
      { path: "support", Component: SupportPage },
      { path: "prices", Component: PricesPage },
    ],
  },
]);
