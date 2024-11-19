"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const createFormStore_1 = __importDefault(require("./createFormStore"));
const useContextState_1 = require("./useContextState");
const init = (initValue) => {
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "";
        return acc;
    }, {});
    const FormStore = (0, createFormStore_1.default)(initValue);
    const ErrorStore = (0, createFormStore_1.default)(errorValue);
    function FormState(name) {
        return name ? (0, useContextState_1.useContextState)(FormStore, name) : (0, useContextState_1.useContextState)(FormStore);
    }
    function ErrorState(name) {
        return name ? (0, useContextState_1.useContextState)(ErrorStore, name) : (0, useContextState_1.useContextState)(ErrorStore);
    }
    const setForm = FormStore.setStore;
    const setError = ErrorStore.setStore;
    const clearForm = () => setForm(initValue);
    // 라이브러리 동작 전체를 망가뜨릴 우려가 있음
    // const useForm = () => [FormState(), setForm] as const
    // const useError = () => [ErrorState(), setError] as const
    return { FormStore, ErrorStore, FormState, ErrorState, setForm, setError, clearForm };
};
exports.init = init;
