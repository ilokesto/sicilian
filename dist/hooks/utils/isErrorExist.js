"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isErrorExist(errorState) {
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return true;
    }
    return false;
}
exports.default = isErrorExist;
