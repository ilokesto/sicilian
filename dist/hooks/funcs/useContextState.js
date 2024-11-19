"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextState = useContextState;
const react_1 = require("react");
const storeSelector_1 = require("../utils/storeSelector");
function useContextState(store, name) {
    const { getStore, subscribe } = store;
    const notationSnapshot = () => (name ? (0, storeSelector_1.storeSelector)(getStore(), name) : getStore());
    const value = (0, react_1.useSyncExternalStore)(subscribe, notationSnapshot, notationSnapshot);
    return value;
}
;
