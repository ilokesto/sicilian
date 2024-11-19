"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const createFormStore_1 = __importDefault(require("./createFormStore"));
const useContextState_1 = require("./useContextState");
// 실제 구현
function init(initValueOrOptions, options) {
    let initValue;
    let validateOption;
    let validateOn = [];
    let clearFormOn = [];
    if (initValueOrOptions.initValue) {
        const options = initValueOrOptions;
        initValue = options.initValue;
        validateOption = options.validateOption;
        validateOn = options.validateOn ?? [];
        clearFormOn = options.clearFormOn ?? [];
    }
    else {
        initValue = initValueOrOptions;
        validateOption = options?.validateOption;
        validateOn = options?.validateOn ?? [];
        clearFormOn = options?.clearFormOn ?? [];
    }
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "";
        return acc;
    }, {});
    const ErrorObjValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "{}";
        return acc;
    }, {});
    const FormStore = (0, createFormStore_1.default)(initValue);
    const ErrorStore = (0, createFormStore_1.default)(errorValue);
    const ErrorObjStore = (0, createFormStore_1.default)(ErrorObjValue);
    function FormState(name) {
        return name ? (0, useContextState_1.useContextState)(FormStore, name) : (0, useContextState_1.useContextState)(FormStore);
    }
    function ErrorState(name) {
        return name ? (0, useContextState_1.useContextState)(ErrorStore, name) : (0, useContextState_1.useContextState)(ErrorStore);
    }
    const setForm = FormStore.setStore;
    const setError = ErrorStore.setStore;
    const clearForm = () => setForm(initValue);
    return { rest: { FormState, ErrorState, setForm, setError }, props: { FormStore, ErrorStore, ErrorObjStore, initValue, validateOption, validateOn, clearFormOn, clearForm } };
}
