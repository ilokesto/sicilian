"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = Sicilian;
const jsx_runtime_1 = require("react/jsx-runtime");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const init_1 = require("./funcs/init");
function Sicilian({ initValue, validateOption, validateOn = "all", clearFormOnSubmit = true }) {
    const { FormStore, ErrorStore, clearForm, ...rest } = (0, init_1.init)(initValue);
    const register = (0, useRegister_1.default)(FormStore, ErrorStore, validateOn, validateOption);
    const handleSubmit = (0, registOnSubmit_1.default)(FormStore.getStore, ErrorStore.getStore, clearForm, clearFormOnSubmit);
    const handleValidate = (validator) => {
        return validator;
    };
    const Form = ({ noValidate = true, onSubmit, children, ...props }) => {
        return (0, jsx_runtime_1.jsx)("form", { noValidate: noValidate, onSubmit: handleSubmit(onSubmit), ...props, children: children });
    };
    return { initValue, register, handleSubmit, handleValidate, Form, ...rest };
}
;
