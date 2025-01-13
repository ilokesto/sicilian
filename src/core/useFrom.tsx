import { useMemo } from "react";
import { createForm } from "./createFrom";
import type { InitState, InitObject } from "../types";

export const useFrom = <T extends InitState>(initObject: InitObject<T>) =>
  useMemo(() => createForm(initObject), []);
