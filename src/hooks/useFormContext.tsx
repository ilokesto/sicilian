import { createContext, useContext } from "react"
import { InitState, GetContextFn, FormProviderProps } from "./types";

const SicilianErrorHeader = "🚨 Sicilian Error : "
const SicilianError = (text: string) => SicilianErrorHeader + `${text} property has not been passed to the FormProvider, but you are trying to use the ${text} function.`
const polyfillWithErrorMessage = (errorMessage: string) => () => {
  console.error(SicilianError(errorMessage)) 
  return ""
}

// @ts-ignore
const Context = createContext()
  
export function FormProvider<T extends InitState>({
  children,...props }: FormProviderProps<T>) {

  const FormState = props.FormState ?? polyfillWithErrorMessage("FormState")
  const ErrorState = props.ErrorState ?? polyfillWithErrorMessage("ErrorState")

  return (
    <Context.Provider value={{...props, FormState, ErrorState }}>
      {children}
    </Context.Provider>
  );
}

export function getContext<T extends InitState>() {
  const context = useContext(Context);
  
  if (!context) {
    throw new Error(SicilianErrorHeader + 'getContext must be used within a FormProvider');
  }

  return context as GetContextFn<T>;
}



