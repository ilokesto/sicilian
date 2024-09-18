import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const SicilianErrorHeader = "🚨 Sicilian Error : ";
const SicilianError = (text) => SicilianErrorHeader + `${text} property has not been passed to the FormProvider, but you are trying to use the ${text} function.`;
const polyfillWithErrorMessage = (errorMessage) => () => {
    console.error(SicilianError(errorMessage));
    return "";
};
// @ts-ignore
const Context = createContext();
export function FormProvider({ children, ...props }) {
    const FormState = props.FormState ?? polyfillWithErrorMessage("FormState");
    const ErrorState = props.ErrorState ?? polyfillWithErrorMessage("ErrorState");
    return (_jsx(Context.Provider, { value: { ...props, FormState, ErrorState }, children: children }));
}
export function getContext() {
    const context = useContext(Context);
    if (!context) {
        throw new Error(SicilianErrorHeader + 'getContext must be used within a FormProvider');
    }
    return context;
}
