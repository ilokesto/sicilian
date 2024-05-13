"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useContextState = (context) => {
    const { getStore, subscribe } = (0, react_1.useContext)(context);
    const state = (0, react_1.useSyncExternalStore)(subscribe, () => getStore(), () => getStore());
    return state;
};
exports.default = useContextState;
