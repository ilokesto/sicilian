"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAllInputEmpty_1 = __importDefault(require("../utils/isAllInputEmpty"));
const isErrorExist_1 = __importDefault(require("../utils/isErrorExist"));
const registOnSubmit = (FormState, ErrorState, clearForm) => (fn) => async (e) => {
    e.preventDefault();
    const formState = FormState();
    const errorState = ErrorState();
    // 에러가 하나라도 있으면 return
    if ((0, isErrorExist_1.default)(errorState))
        return;
    // 모든 value가 비어있으면 return
    if ((0, isAllInputEmpty_1.default)(formState))
        return;
    try {
        await fn(formState);
        clearForm();
    }
    catch (e) {
        console.log(e);
    }
};
exports.default = registOnSubmit;
