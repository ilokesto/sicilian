import type { ExtractKeys, InitState, Register, RegisterErrorObj } from "./"
import type { ReactElement } from "react"
import { createForm } from "../createForm";

export type SicilianProviderProps<T extends InitState> = {children: ReactElement, value: { register: Register<T>, validateOption?: RegisterErrorObj<T>, name: ExtractKeys<T>} & Partial<Pick<ReturnType<typeof createForm<T>>, "FormState" | "ErrorState">> }
export type GetContextFn<T extends InitState> = Required<Omit<SicilianProviderProps<T>, "children" | "validateOption">["value"]> & {validateOption?: RegisterErrorObj<T>}