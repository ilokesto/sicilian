"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnSubmit = (formState, errorState) => (fn) => async (e) => {
    e.preventDefault();
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return;
    }
    await fn(formState);
};
exports.default = registOnSubmit;
