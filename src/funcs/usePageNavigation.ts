import { useEffect } from "react";

export const usePageNavigation = (callback: () => void): void => {
  useEffect(() => {
    callback();
  }, []);
};