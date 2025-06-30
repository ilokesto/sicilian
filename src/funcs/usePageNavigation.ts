import { useEffect } from "react";

export const usePageNavigation = (callback: () => void): void => {
  switch (true) {
    case isReactRouterDom(): // React Router Dom용 로직
      try {
        const { pathname } = require("react-router-dom").useLocation();
        useEffect(() => {
          callback();
        }, [pathname]);
      } catch {}
      break;

      case isReactRouter(): // React Router용 로직
        try {
          const { pathname } = window.location;
          useEffect(() => {
            callback();
          }, [pathname]);
        } catch {
        }
        break;

      case isAppRouter(): // Next.js App Router용 로직 + 13버전 이상
        try {
          const pathname = require("next/navigation").usePathname();

          useEffect(() => {
            callback();
          }, [pathname]);
        } catch {}
        break;

      case isPageRouter(): // Next.js Page Router용 로직 + 12버전 이하
        try {
          const { pathname } = require("next/router").useRouter();
  
          useEffect(() => {
            callback();
          }, [pathname]);
        } catch {}
        break;

    default:
      throw new Error("🚨 Sicilian Error : You are using a router that Sicilian does not support.");
}}

function isAppRouter(): boolean {
  try {
    require("next/navigation");
    return true;
  } catch {
    return false;
  }
};

// Next.js Page Router 감지 함수
function isPageRouter(): boolean {
  try {
    require("next/router");
    return true;
  } catch {
    return false;
  }
};

function isReactRouterDom(): boolean {
  try {
    require("react-router-dom");
    return true;
  } catch {
    return false;
  }
}

function isReactRouter(): boolean {
  try {
    require("react-router");
    return true;
  } catch {
    return false;
  }
}