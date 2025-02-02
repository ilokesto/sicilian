import type { ExtractKeys, InitState, Register, RegisterErrorObj, State } from "../types"
import type { ReactElement } from "react"

export type SicilianProviderProps<T extends InitState> = {
  children: ReactElement,
  value: {
    register: Register<T>,
    validateOption?: RegisterErrorObj<T>,
    name: ExtractKeys<T>,
    FormState?: State<T>,
    ErrorState?: State<T>,
  }
}