"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const react_1 = require("react");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const createFormula_1 = __importDefault(require("./funcs/createFormula"));
const Sicilian = (initialState) => {
    const Form = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const Error = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const FormState = () => {
        const { getStore, subscribe } = (0, react_1.useContext)(Form);
        const value = (0, react_1.useSyncExternalStore)(subscribe, () => getStore(), () => getStore());
        return value;
    };
    const ErrorState = () => {
        const { getStore, subscribe } = (0, react_1.useContext)(Error);
        const value = (0, react_1.useSyncExternalStore)(subscribe, () => getStore(), () => getStore());
        return value;
    };
    const register = (0, useRegister_1.default)(Form, Error);
    return { register, FormState, ErrorState };
};
exports.Sicilian = Sicilian;
