"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnChange = (setStore) => (e) => {
    // @ts-ignore
    setStore({ [e.target.name]: e.target.value });
};
exports.default = registOnChange;
