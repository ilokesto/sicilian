import type { createForm } from "../core/createFrom"
import type { ExtractKeys, InitState, RegisterErrorObj, UseRegister } from "../types"
import type { ReactElement } from "react"

export type SicilianProviderProps<T extends InitState> = {
  children: ReactElement,
  value: {
    register: ReturnType<UseRegister>,
    validateOption?: RegisterErrorObj<T>,
    name: ExtractKeys<T>,
    FormState?: ReturnType<typeof createForm<T>>["FormState"],
    ErrorState?: ReturnType<typeof createForm<T>>["ErrorState"]
  }
}