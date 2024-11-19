import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const SicilianErrorHeader = "🚨 Sicilian Error : ";
const SicilianError = (text) => SicilianErrorHeader + `${text} property has not been passed to the FormProvider, but you are trying to use the ${text} function.`;
const polyfillWithErrorMessage = (errorMessage) => () => {
    throw new Error(SicilianError(errorMessage));
};
// @ts-ignore
const Context = createContext();
export function SicilianProvider({ children, value }) {
    const FormState = value.FormState ?? polyfillWithErrorMessage("FormState");
    const ErrorState = value.ErrorState ?? polyfillWithErrorMessage("ErrorState");
    return (_jsx(Context.Provider, { value: { ...value, FormState, ErrorState }, children: children }));
}
export function getContext() {
    const context = useContext(Context);
    if (!context) {
        throw new Error(SicilianErrorHeader + 'getContext must be used within a FormProvider');
    }
    return context;
}
