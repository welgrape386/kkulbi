import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";

export function AppRoot() {
  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ paddingTop: "64px" }}>
        <Outlet />
      </div>
    </div>
  );
}
