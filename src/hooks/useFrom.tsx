import { useMemo } from "react";
import { createForm } from "./createForm";
import type { InitState, SicilianInitObject } from "./types";

export const useFrom = <T extends InitState>(initObject: SicilianInitObject<T>) =>
  useMemo(() => createForm(initObject), []);
