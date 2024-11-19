"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SicilianProvider = SicilianProvider;
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
function SicilianProvider({ children, value }) {
    const FormState = value.FormState ?? polyfillWithErrorMessage("FormState");
    const ErrorState = value.ErrorState ?? polyfillWithErrorMessage("ErrorState");
    return ((0, jsx_runtime_1.jsx)(Context.Provider, { value: { ...value, FormState, ErrorState }, children: children }));
}
function getContext() {
    const context = (0, react_1.useContext)(Context);
    if (!context) {
        throw new Error(SicilianErrorHeader + 'getContext must be used within a FormProvider');
    }
    return context;
}
