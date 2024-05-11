"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const react_1 = require("react");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const createFormula_1 = __importDefault(require("./funcs/createFormula"));
const getState_1 = __importDefault(require("./funcs/getState"));
const Sicilian = (initialState) => {
    const Form = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const Error = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const FormState = () => (0, getState_1.default)(Form);
    const ErrorState = () => (0, getState_1.default)(Error);
    const register = (0, useRegister_1.default)(Form, Error);
    const handleSubmit = (fn) => async (e) => {
        e.preventDefault();
        const errorState = ErrorState();
        const formState = FormState();
        for (const v of Object.values(errorState)) {
            if (v !== "")
                return;
        }
        await fn(formState);
    };
    return { register, FormState, ErrorState, handleSubmit };
};
exports.Sicilian = Sicilian;
