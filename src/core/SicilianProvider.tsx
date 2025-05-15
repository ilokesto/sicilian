import { createContext, useContext, type ReactElement } from "react"
import type { ExtractKeys, InitState, RegisterErrorObj, State, ValidInputTypes } from "../type"
import type { IRegister } from "../funcs/register/Register"

type register<T extends InitState> = ({ name, validate, type }: { name: ExtractKeys<T>; validate?: RegisterErrorObj<T>; type?: ValidInputTypes }) => IRegister<T>

export type SicilianProviderProps<T extends InitState> = {
  children: ReactElement,
  value: {
    register: register<T>,
    validate?: RegisterErrorObj<T>,
    name: ExtractKeys<T>,
    type?: ValidInputTypes,
    getValues?: State<T, unknown>,
    getErrors?: State<{ [key in keyof T]: string }, string>,
  }
}

const SicilianErrorHeader = "🚨 Sicilian Error : "
const SicilianError = (text: string) => SicilianErrorHeader + `${text} property has not been passed to the SicilianProvider, but you are trying to use the ${text} function.`
const polyfillWithErrorMessage = (errorMessage: string) => () => { throw new Error(SicilianError(errorMessage)) }
const getContextErrorMessage = () => { throw new Error(SicilianErrorHeader + 'getContext must be used within a SicilianProvider') }

const Context = createContext<SicilianProviderProps<any>["value"] | undefined>(undefined)

export const SicilianProvider = <T extends InitState>({ children, value }: SicilianProviderProps<T>) => <Context.Provider value={{
  ...value,
  getValues: value.getValues ?? polyfillWithErrorMessage("getValues"),
  getErrors: value.getErrors ?? polyfillWithErrorMessage("getErrors")
}}>
  {children}
</Context.Provider>

export const useSicilianContext = () => useContext(Context) as Required<SicilianProviderProps<InitState>["value"]> ?? getContextErrorMessage()

