import { ReactNode } from "react"
import { ExtractKeys, InitState, Register, RegisterErrorObj } from "./"
import { Sicilian } from "../Sicilian";

// FormState?: (name?: ExtractKeys<T>) => T | string

export type FormProviderProps<T extends InitState> = {children: ReactNode, register: Register<T>, validateOption?: RegisterErrorObj<T>, name: ExtractKeys<T> } & Partial<Pick<ReturnType<typeof Sicilian<T>>, "FormState" | "ErrorState">>
export type GetContextFn<T extends InitState> = Required<Omit<FormProviderProps<T>, "children">>