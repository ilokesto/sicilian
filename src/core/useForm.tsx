import { useMemo } from "react";
import { createForm } from "./createForm";
import type { InitState, InitObject } from "../types";

export const useForm = <T extends InitState>(initObject: InitObject<T>) =>
  useMemo(() => createForm(initObject), []);
