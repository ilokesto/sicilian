import { useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { RegistOnFocus, UseRegister } from "../types";
import { storeSelector } from "../utils/storeSelector";

const useRegister: UseRegister = (FromStore, ErrorStore, validateOn, validateOption) => (name, ErrorObj) => {
  const { getStore, setStore, subscribe } = FromStore
  const { setStore: setError } = ErrorStore

  const value = useSyncExternalStore(
    subscribe,
    () => storeSelector(getStore(), name),
    () => storeSelector(getStore(), name)
  );

  const onChange = registOnChange(setStore);

  const onFocus: RegistOnFocus = (e) => {
    // @ts-ignore
    setError({ [e.target.name]: "" });
  };

  const onBlur = registOnBlur({
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

export default useRegister;
