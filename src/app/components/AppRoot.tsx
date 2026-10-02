import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AppHeader } from "./AppHeader";

export function AppRoot() {
  const { pathname, search, hash } = useLocation();

  // 주소에 #id 가 있으면 해당 요소로 스크롤 (메인 검색 결과 이동 등)
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
  }, [pathname, search, hash]);

  return (
    <div style={{ background: "#fff8dc", minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ paddingTop: "64px" }}>
        <Outlet />
      </div>
    </div>
  );
}
