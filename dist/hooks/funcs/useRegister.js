"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnChange_1 = __importDefault(require("./registOnChange"));
const registOnBlur_1 = __importDefault(require("./registOnBlur"));
const storeSelector_1 = require("../utils/storeSelector");
const usePageNavigation_1 = require("./usePageNavigation");
const useRegister = ({ FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validateOption }) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = FormStore;
    const { setStore: setError } = ErrorStore;
    const { setStore: setErrorObjectStore } = ErrorObjStore;
    // @ts-ignore
    setErrorObjectStore({ [name]: JSON.stringify(ErrorObj ?? {}) });
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
    // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
    // @ts-ignore
    clearFormOn.includes("routeChange") ? (0, usePageNavigation_1.usePageNavigation)(() => clearForm()) : null;
    // onBlur 할 것인지 여부를 결정
    if (validateOn.includes("blur")) {
        return { value, name, id: name, onChange, onBlur, onFocus, };
    }
    return { value, name, id: name, onChange, onFocus, };
};
exports.default = useRegister;
