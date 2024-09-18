import { useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { storeSelector } from "../utils/storeSelector";
const useRegister = (FromStore, ErrorStore) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = FromStore;
    const { setStore: setError } = ErrorStore;
    const value = useSyncExternalStore(subscribe, () => storeSelector(getStore(), name), () => storeSelector(getStore(), name));
    const onChange = registOnChange(setStore);
    const onFocus = (e) => {
        // @ts-ignore
        setError({ [e.target.name]: "" });
    };
    const onBlur = registOnBlur({
        ErrorObj,
        value,
        getStore,
        setError,
    });
    return { value, name, id: name, onChange, onBlur, onFocus, };
};
export default useRegister;
