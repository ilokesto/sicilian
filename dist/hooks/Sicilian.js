"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = Sicilian;
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const init_1 = require("./funcs/init");
// 실제 구현
function Sicilian(initValueOrOptions, options) {
    const { props, rest } = (0, init_1.init)(initValueOrOptions, options);
    const register = (0, useRegister_1.default)(props);
    const handleSubmit = (0, registOnSubmit_1.default)(props);
    const handleValidate = (validator) => {
        return validator;
    };
    return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
}
;
