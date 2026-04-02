import { Outlet } from "react-router";
import { Header } from "./Header";

export function Root() {
  return (
    <div style={{ background: "#fffbef", minHeight: "100vh" }}>
      <Header />
      <div style={{ paddingTop: "64px" }}>
        <Outlet />
      </div>
    </div>
  );
}
