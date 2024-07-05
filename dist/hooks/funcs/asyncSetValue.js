"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnValue = (FormStore) => (fn) => {
    FormStore(fn);
};
exports.default = registOnValue;
