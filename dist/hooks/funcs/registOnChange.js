"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnChange = (setStore) => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStore({ [name]: value });
};
exports.default = registOnChange;
