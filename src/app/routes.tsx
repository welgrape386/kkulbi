import { createBrowserRouter } from "react-router";
import { AppRoot } from "./components/AppRoot";
import { AppHome } from "./components/AppHome";
import { ContentPage } from "../imports/ContentPage";
import { BasicsPage } from "../imports/BasicsPage";
import { DailyRewardsPage } from "../imports/DailyRewardsPage";
import { TraitsPage } from "../imports/TraitsPage";
import { FishingTraitPage } from "../imports/FishingTraitPage";
import { HarvestTraitPage } from "../imports/HarvestTraitPage";
import { IslandPage } from "../imports/IslandPage";
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
      { index: true, Component: AppHome },
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
