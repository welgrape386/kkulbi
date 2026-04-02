import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { ContentPage } from "./components/ContentPage";
import { BasicsPage } from "./components/BasicsPage";
import { SupportPage } from "./components/SupportPage";
import { LawPage } from "./components/LawPage";
import { DailyRewardsPage } from "./components/DailyRewardsPage";
import { PricePage } from "./components/PricePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "content", Component: ContentPage },
      { path: "basics", Component: BasicsPage },
      { path: "support", Component: SupportPage },
      { path: "law", Component: LawPage },
      { path: "daily-rewards", Component: DailyRewardsPage },
      { path: "prices", Component: PricePage },
    ],
  },
]);
