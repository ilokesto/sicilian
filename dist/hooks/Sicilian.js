"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const init_1 = require("./funcs/init");
const Sicilian = (initValue) => {
    const { FormStore, ErrorStore, clearForm, ...rest } = (0, init_1.init)(initValue);
    const register = (0, useRegister_1.default)(FormStore, ErrorStore);
    const handleSubmit = (0, registOnSubmit_1.default)(FormStore.getStore, ErrorStore.getStore, clearForm);
    const handleValidate = (validator) => {
        return validator;
    };
    return { initValue, register, handleSubmit, handleValidate, ...rest };
};
exports.Sicilian = Sicilian;
