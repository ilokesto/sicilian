import { useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { RegistOnFocus, UseRegister } from "../types";
import { storeSelector } from "../utils/storeSelector";

const useRegister: UseRegister = (FromStore, ErrorStore) => (name, ErrorObj) => {
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
    value,
    getStore,
    setError,
  });

  return { value, name, id: name, onChange, onBlur, onFocus, };
};

export default useRegister;
