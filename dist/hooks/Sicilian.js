"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const react_1 = require("react");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const createFormula_1 = __importDefault(require("./funcs/createFormula"));
const useContextState_1 = __importDefault(require("./funcs/useContextState"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const Sicilian = (initialState) => {
    const Form = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const Error = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const register = (0, useRegister_1.default)(Form, Error);
    const FormState = () => (0, useContextState_1.default)(Form);
    const ErrorState = () => (0, useContextState_1.default)(Error);
    const handleSubmit = (0, registOnSubmit_1.default)(Form, Error);
    return { register, FormState, ErrorState, handleSubmit };
};
exports.Sicilian = Sicilian;
