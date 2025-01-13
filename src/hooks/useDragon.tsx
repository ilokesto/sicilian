import { useMemo } from "react";
import { playDragon } from "./Sicilian";
import type { InitState, SicilianProps } from "./types";

export const useDragon = <T extends InitState>(initObject: SicilianProps<T>) =>
    useMemo(() => playDragon(initObject), []);