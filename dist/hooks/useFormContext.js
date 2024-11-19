"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProvider = FormProvider;
exports.getContext = getContext;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SicilianErrorHeader = "🚨 Sicilian Error : ";
const SicilianError = (text) => SicilianErrorHeader + `${text} property has not been passed to the FormProvider, but you are trying to use the ${text} function.`;
const polyfillWithErrorMessage = (errorMessage) => () => {
    throw new Error(SicilianError(errorMessage));
};
// @ts-ignore
const Context = (0, react_1.createContext)();
function FormProvider({ children, ...props }) {
    const FormState = props.FormState ?? polyfillWithErrorMessage("FormState");
    const ErrorState = props.ErrorState ?? polyfillWithErrorMessage("ErrorState");
    return ((0, jsx_runtime_1.jsx)(Context.Provider, { value: { ...props, FormState, ErrorState }, children: children }));
}
function getContext() {
    const context = (0, react_1.useContext)(Context);
    if (!context) {
        throw new Error(SicilianErrorHeader + 'getContext must be used within a FormProvider');
    }
    return context;
}
