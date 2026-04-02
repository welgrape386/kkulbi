import { Outlet } from "react-router";
import { Header } from "./Header";

export function Root() {
  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <Header />
      <div style={{ paddingTop: "64px" }}>
        <Outlet />
      </div>
    </div>
  );
}