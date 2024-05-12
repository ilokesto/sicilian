"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnSubmit = (Form, Error) => (fn) => async (e) => {
    const { getStore } = (0, react_1.useContext)(Form);
    const { getStore: getError } = (0, react_1.useContext)(Error);
    const errorState = getError();
    const formState = getStore();
    e.preventDefault();
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return;
    }
    await fn(formState);
};
exports.default = registOnSubmit;
