"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnChange_1 = __importDefault(require("./registOnChange"));
const registOnBlur_1 = __importDefault(require("./registOnBlur"));
const useRegister = (FromStore, ErrorStore) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = FromStore;
    const { setStore: setError } = ErrorStore;
    const selector = (store) => store[name];
    const value = (0, react_1.useSyncExternalStore)(subscribe, () => selector(getStore()), () => selector(getStore()));
    const onChange = (0, registOnChange_1.default)(setStore);
    const onFocus = (e) => {
        // @ts-ignore
        setError({ [e.target.name]: "" });
    };
    const onBlur = (0, registOnBlur_1.default)({
        ErrorObj,
        value,
        getStore,
        setError,
    });
    return { value, name, id: name, onChange, onBlur, onFocus, };
};
exports.default = useRegister;
