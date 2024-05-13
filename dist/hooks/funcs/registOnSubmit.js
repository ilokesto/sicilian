"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnSubmit = (FormState, ErrorState) => (fn) => async (e) => {
    e.preventDefault();
    const formState = FormState();
    const errorState = ErrorState();
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return;
    }
    fn(formState);
};
exports.default = registOnSubmit;
