"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formula = void 0;
const react_1 = require("react");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const useGetState_1 = __importDefault(require("./funcs/useGetState"));
const createFormula_1 = __importDefault(require("./funcs/createFormula"));
const formula = (initialState) => {
    const form = (0, react_1.createContext)((0, createFormula_1.default)(initialState));
    const formState = (0, useGetState_1.default)(form);
    const register = (0, useRegister_1.default)(form);
    return { register, formState };
};
exports.formula = formula;
