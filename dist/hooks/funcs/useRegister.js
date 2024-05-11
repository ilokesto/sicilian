"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRegister = (form) => (name) => {
    const { getStore, setStore, subscribe } = (0, react_1.useContext)(form);
    const selector = (store) => store[name];
    const value = (0, react_1.useSyncExternalStore)(subscribe, () => selector(getStore()), () => selector(getStore()));
    const onChange = (e) => {
        const value = e.target.value;
        setStore({ [e.target.name]: value });
    };
    return { value, onChange, name };
};
exports.default = useRegister;
