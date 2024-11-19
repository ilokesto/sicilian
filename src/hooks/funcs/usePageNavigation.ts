import { useEffect } from "react";

// // Next.js 환경 감지 함수
// const isNextEnvironment = (): boolean => {
//   if (typeof window !== "undefined" && !!(window as any).__NEXT_DATA__) {
//     return true; // Next.js 환경
//   }

//   try {
//     require("next/router");
//     return true;
//   } catch {
//     return false; // React 환경
//   }
// };

// Next.js App Router 감지 함수
const isAppRouter = (): boolean => {
  try {
    require("next/navigation");
    return true;
  } catch {
    return false;
  }
};

// Next.js Page Router 감지 함수
const isPageRouter = (): boolean => {
  try {
    require("next/router");
    return true;
  } catch {
    return false;
  }
};

const isReactRouter = (): boolean => {
  try {
    require("react-router-dom");
    return true;
  } catch {
    return false;
  }
}

// 공통 훅
export const usePageNavigation = (callback: any): void => {
  if (isAppRouter()) {
    // Next.js App Router용 로직
    const { usePathname } = require("next/navigation");
    const pathname = usePathname();

    useEffect(() => {
      callback(pathname);
    }, [pathname]);
  } else if (isPageRouter()) {
    // Next.js Page Router용 로직
    const { useRouter } = require("next/router");
    const router = useRouter();

    useEffect(() => {
      const handleRouteChange = (url: string) => {
        callback(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  } else if (isReactRouter()) {    // React Router용 로직
    const { useLocation } = require("react-router-dom");
    const location = useLocation();

    useEffect(() => {
      callback(location.pathname);
    }, [location.pathname]);
  }
};