import { useMemo } from "react";
import { Sicilian } from "./Sicilian";
import type { InitState, SicilianProps } from "./types";

function isSicilianProps<T extends InitState>(value: T | SicilianProps<T>): value is SicilianProps<T> {
  return (value as SicilianProps<T>).initValue !== undefined;
}

export function useDragon<T extends InitState>(initValueOrOptions: T | SicilianProps<T>, options?: Omit<SicilianProps<T>, "initValue">) {
  if (isSicilianProps(initValueOrOptions)) {
    return useMemo(() => Sicilian(initValueOrOptions), []);
  } else {
    return useMemo(() => Sicilian(initValueOrOptions, options), []);
  }
}