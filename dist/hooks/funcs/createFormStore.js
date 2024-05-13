"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFormStore = (initialState) => {
    let store = initialState;
    const callbacks = new Set();
    const getStore = () => store;
    const setStore = (nextState) => {
        store = { ...store, ...nextState };
        callbacks.forEach((callback) => callback());
    };
    const subscribe = (callback) => {
        callbacks.add(callback);
        return () => {
            callbacks.delete(callback);
        };
    };
    return { getStore, setStore, subscribe };
};
exports.default = createFormStore;
