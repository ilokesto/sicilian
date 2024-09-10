"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAllInputEmpty(formState) {
    let count = 0;
    let array = Object.values(formState);
    for (const v of array) {
        if (v === "")
            count++;
    }
    if (count === array.length)
        return true;
    else
        return false;
}
exports.default = isAllInputEmpty;
