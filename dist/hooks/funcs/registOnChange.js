"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnChange = (setStore) => (e) => {
    setStore({ [e.target.name]: e.target.value });
};
exports.default = registOnChange;
