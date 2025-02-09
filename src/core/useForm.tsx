import { useMemo } from "react";
import type { InitObject, InitState } from "../type";
import { CreateForm } from "./CreateForm";

export const useForm = <T extends InitState>(initObject: InitObject<T>) =>
  useMemo(() => new CreateForm(initObject), []);
