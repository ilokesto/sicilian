"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnChange_1 = __importDefault(require("./registOnChange"));
const registOnBlur_1 = __importDefault(require("./registOnBlur"));
const storeSelector_1 = require("../utils/storeSelector");
const useRegister = (FromStore, ErrorStore, validateOn, validateOption) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = FromStore;
    const { setStore: setError } = ErrorStore;
    const value = (0, react_1.useSyncExternalStore)(subscribe, () => (0, storeSelector_1.storeSelector)(getStore(), name), () => (0, storeSelector_1.storeSelector)(getStore(), name));
    const onChange = (0, registOnChange_1.default)(setStore);
    const onFocus = (e) => {
        // @ts-ignore
        setError({ [e.target.name]: "" });
    };
    const onBlur = (0, registOnBlur_1.default)({
        ErrorObj,
        getStore,
        setError,
        validateOption,
    });
    // validateOn이 blur나 all이 아닌 경우
    // 아예 onBlur를 실행하지 않는다.
    if (validateOn !== "blur" && validateOn !== "all") {
        return { value, name, id: name, onChange, onFocus, };
    }
    return { value, name, id: name, onChange, onBlur, onFocus, };
};
exports.default = useRegister;
