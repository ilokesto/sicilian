import { createContext, useContext } from "react"
import type { InitState, SicilianProviderProps } from "../types";

const SicilianErrorHeader = "🚨 Sicilian Error : "
const SicilianError = (text: string) => SicilianErrorHeader + `${text} property has not been passed to the SicilianProvider, but you are trying to use the ${text} function.`
const polyfillWithErrorMessage = (errorMessage: string) => () => { throw new Error(SicilianError(errorMessage)) }
const getContextErrorMessage = () => { throw new Error(SicilianErrorHeader + 'getContext must be used within a SicilianProvider') }

const Context = createContext<SicilianProviderProps<any>["value"] | null>(null)

export const SicilianProvider = <T extends InitState>({ children, value }: SicilianProviderProps<T>) =>
  <Context.Provider value={{
    ...value,
    FormState: value.FormState ?? polyfillWithErrorMessage("FormState"),
    ErrorState: value.ErrorState ?? polyfillWithErrorMessage("ErrorState")
  }}>
    {children}
  </Context.Provider>

export const useSicilianContext = <T extends InitState>() =>
  useContext(Context) as Required<SicilianProviderProps<T>["value"]>
  ?? getContextErrorMessage()
