import { createContext, useContext, type ReactElement } from "react"
import type { ExtractKeys, InitState, RegisterErrorObj, State } from "../type"
import type { IRegister } from "../funcs/register/Register"

type register<T extends InitState> = ({ name, ErrorObj, type }: { name: ExtractKeys<T>; ErrorObj?: RegisterErrorObj<T>; type?: string }) => IRegister<T>

export type SicilianProviderProps<T extends InitState> = {
  children: ReactElement,
  value: {
    register: register<T>,
    validateOption?: RegisterErrorObj<T>,
    name: ExtractKeys<T>,
    type?: HTMLInputElement["type"],
    FormState?: State<T>,
    ErrorState?: State<T>,
  }
}

const SicilianErrorHeader = "🚨 Sicilian Error : "
const SicilianError = (text: string) => SicilianErrorHeader + `${text} property has not been passed to the SicilianProvider, but you are trying to use the ${text} function.`
const polyfillWithErrorMessage = (errorMessage: string) => () => { throw new Error(SicilianError(errorMessage)) }
const getContextErrorMessage = () => { throw new Error(SicilianErrorHeader + 'getContext must be used within a SicilianProvider') }

const Context = createContext<SicilianProviderProps<any>["value"] | undefined>(undefined)

export const SicilianProvider = <T extends InitState>({ children, value }: SicilianProviderProps<T>) =>
  <Context.Provider value={{
    ...value,
    FormState: value.FormState ?? polyfillWithErrorMessage("FormState"),
    ErrorState: value.ErrorState ?? polyfillWithErrorMessage("ErrorState")
  }}>
    {children}
  </Context.Provider>

export const useSicilianContext = () =>
  useContext(Context) ?? getContextErrorMessage()
