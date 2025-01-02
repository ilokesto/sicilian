import type { ReactElement, ReactNode } from "react"
import type { ExtractKeys, InitState, Register, RegisterErrorObj } from "./"
import { playDragon } from "../Sicilian";

export type SicilianProviderProps<T extends InitState> = {children: ReactElement, value: { register: Register<T>, validateOption?: RegisterErrorObj<T>, name: ExtractKeys<T>} & Partial<Pick<ReturnType<typeof playDragon<T>>, "FormState" | "ErrorState">> }
export type GetContextFn<T extends InitState> = Required<Omit<SicilianProviderProps<T>, "children" | "validateOption">["value"]> & {validateOption?: RegisterErrorObj<T>}