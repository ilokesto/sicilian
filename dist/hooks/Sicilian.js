"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const createFormStore_1 = __importDefault(require("./funcs/createFormStore"));
const Sicilian = (initValue) => {
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {});
    const FormStore = (0, createFormStore_1.default)(initValue);
    const ErrorStore = (0, createFormStore_1.default)(errorValue);
    const FormState = () => FormStore.getStore();
    const ErrorState = () => ErrorStore.getStore();
    const setForm = FormStore.setStore;
    const setError = ErrorStore.setStore;
    const clearForm = () => setForm(initValue);
    const register = (0, useRegister_1.default)(FormStore, ErrorStore);
    const handleSubmit = (0, registOnSubmit_1.default)(FormState, ErrorState, clearForm);
    const handleValidate = (validator) => {
        return validator;
    };
    ;
    const Input = (props) => {
        // @ts-ignore
        return (0, jsx_runtime_1.jsx)("input", { ...props });
    };
    return { initValue, register, FormState, ErrorState, setForm, setError, handleSubmit, handleValidate };
};
exports.Sicilian = Sicilian;
