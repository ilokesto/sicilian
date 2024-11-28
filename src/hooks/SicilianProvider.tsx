import { createContext, useContext } from "react"
import { InitState, GetContextFn, SicilianProviderProps } from "./types";

const SicilianErrorHeader = "🚨 Sicilian Error : "
const SicilianError = (text: string) => SicilianErrorHeader + `${text} property has not been passed to the SicilianProvider, but you are trying to use the ${text} function.`
const polyfillWithErrorMessage = (errorMessage: string) => () => {
  throw new Error(SicilianError(errorMessage))
}

// @ts-ignore
const Context = createContext()
  
export function SicilianProvider<T extends InitState>({ children, value }: SicilianProviderProps<T>) {

  const FormState = value.FormState ?? polyfillWithErrorMessage("FormState")
  const ErrorState = value.ErrorState ?? polyfillWithErrorMessage("ErrorState")

  return (
    <Context.Provider value={{...value, FormState, ErrorState }}>
      {children}
    </Context.Provider>
  );
}

export function getSicilianContext<T extends InitState>() {
  const context = useContext(Context);
  
  if (!context) {
    throw new Error(SicilianErrorHeader + 'getContext must be used within a SicilianProvider');
  }

  return context as GetContextFn<T>;
}
