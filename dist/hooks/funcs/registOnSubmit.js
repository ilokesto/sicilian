"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAllInputEmpty_1 = __importDefault(require("../utils/isAllInputEmpty"));
const isErrorExist_1 = __importDefault(require("../utils/isErrorExist"));
const registOnBlur_1 = __importDefault(require("./registOnBlur"));
const registOnSubmit = ({ FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validateOption }) => (fn) => async (e) => {
    e.preventDefault();
    const { getStore: getFormStore } = FormStore;
    const { getStore: getErrorStore, setStore: setErrorStore } = ErrorStore;
    const { getStore: getErrorObjStore } = ErrorObjStore;
    const ErrorObjectArray = Object.entries(getErrorObjStore());
    if (validateOn.includes("submit")) {
        ErrorObjectArray.forEach(([name, ErrorObj]) => {
            (0, registOnBlur_1.default)({
                getStore: getFormStore,
                setError: setErrorStore,
                validateOption,
                ErrorObj: ErrorObj === "{}" ? undefined : JSON.parse(ErrorObj)
            })({ target: { name: name, value: getFormStore()[name] } });
        });
    }
    const formState = getFormStore();
    const errorState = getErrorStore();
    // 에러가 하나라도 있으면 return
    if ((0, isErrorExist_1.default)(errorState))
        return;
    // 모든 value가 비어있으면 return
    if ((0, isAllInputEmpty_1.default)(formState))
        return;
    try {
        await fn(formState, e);
        clearFormOn.includes("submit") ? clearForm() : null;
    }
    catch (e) {
        console.log(e);
    }
};
exports.default = registOnSubmit;
