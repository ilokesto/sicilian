import { useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { storeSelector } from "../utils/storeSelector";
import { usePageNavigation } from "./usePageNavigation";
const useRegister = ({ FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validator }) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = FormStore;
    const { setStore: setError } = ErrorStore;
    const { setStore: setErrorObjectStore } = ErrorObjStore;
    // @ts-ignore
    setErrorObjectStore({ [name]: JSON.stringify(ErrorObj ?? {}) });
    const value = useSyncExternalStore(subscribe, () => storeSelector(getStore(), name), () => storeSelector(getStore(), name));
    const onChange = registOnChange(setStore);
    const onFocus = (e) => {
        // @ts-ignore
        setError({ [e.target.name]: "" });
    };
    const onBlur = registOnBlur({
        ErrorObj,
        getStore,
        setError,
        validator,
    });
    // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
    // @ts-ignore
    clearFormOn.includes("routeChange") ? usePageNavigation(() => clearForm()) : null;
    // onBlur 할 것인지 여부를 결정
    if (validateOn.includes("blur")) {
        return { value, name, id: name, onChange, onBlur, onFocus, };
    }
    return { value, name, id: name, onChange, onFocus, };
};
export default useRegister;
