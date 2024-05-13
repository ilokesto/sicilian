"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnChange = (setStore) => (e, customValue) => {
    const name = e.target.name;
    const value = customValue ?? e.target.value;
    setStore({ [name]: value });
};
exports.default = registOnChange;
