"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const getState = (contest) => {
    const { getStore, subscribe } = (0, react_1.useContext)(contest);
    const value = (0, react_1.useSyncExternalStore)(subscribe, () => getStore(), () => getStore());
    return value;
};
exports.default = getState;
