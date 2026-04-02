import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { ContentPage } from "./components/ContentPage";
import { BasicsPage } from "./components/BasicsPage";
import { SupportPage } from "./components/SupportPage";
import { LawPage } from "./components/LawPage";
import { DailyRewardsPage } from "./components/DailyRewardsPage";
import { PricePage } from "./components/PricePage";
import { IslandPage } from "./components/IslandPage";
import { TraitsPage } from "./components/TraitsPage";
import { MiningTraitPage } from "./components/MiningTraitPage";
import { HarvestTraitPage } from "./components/HarvestTraitPage";
import { LoggingTraitPage } from "./components/LoggingTraitPage";
import { FishingTraitPage } from "./components/FishingTraitPage";
import { CookingTraitPage } from "./components/CookingTraitPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "content", Component: ContentPage },
      { path: "content/island", Component: IslandPage },
      { path: "content/traits", Component: TraitsPage },
      { path: "content/traits/mining", Component: MiningTraitPage },
      { path: "content/traits/harvest", Component: HarvestTraitPage },
      { path: "content/traits/logging", Component: LoggingTraitPage },
      { path: "content/traits/fishing", Component: FishingTraitPage },
      { path: "content/traits/cooking", Component: CookingTraitPage },
      { path: "basics", Component: BasicsPage },
      { path: "support", Component: SupportPage },
      { path: "law", Component: LawPage },
      { path: "daily-rewards", Component: DailyRewardsPage },
      { path: "prices", Component: PricePage },
    ],
  },
]);
