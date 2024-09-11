"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextState = void 0;
const react_1 = require("react");
const storeSelector_1 = require("../utils/storeSelector");
function useContextState(context, name) {
    const { getStore, subscribe } = context;
    const notationSnapshot = () => (name ? (0, storeSelector_1.storeSelector)(getStore(), name) : getStore());
    const value = (0, react_1.useSyncExternalStore)(subscribe, notationSnapshot, notationSnapshot);
    return value;
}
exports.useContextState = useContextState;
;
