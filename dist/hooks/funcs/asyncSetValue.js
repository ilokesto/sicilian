"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnValue = (setState) => (asyncState) => {
    // @ts-ignore
    setState(asyncState);
};
exports.default = registOnValue;
