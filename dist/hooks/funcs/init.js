"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const createFormStore_1 = __importDefault(require("./createFormStore"));
const init = (initValue) => {
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "";
        return acc;
    }, {});
    const FormStore = (0, createFormStore_1.default)(initValue);
    const ErrorStore = (0, createFormStore_1.default)(errorValue);
    return { FormStore, ErrorStore };
};
exports.init = init;
