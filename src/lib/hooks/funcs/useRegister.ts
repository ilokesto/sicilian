import { useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { RegistOnFocus, UseRegister } from "../Types";

const useRegister: UseRegister = (FromStore, ErrorStore) => (name, ErrorObj) => {
  const { getStore, setStore, subscribe } = FromStore
  const { setStore: setError } = ErrorStore

  type T = ReturnType<typeof getStore>;

  const selector = (store: T) => store[name];
  const value = useSyncExternalStore(
    subscribe,
    () => selector(getStore()),
    () => selector(getStore())
  );

  const onChange = registOnChange(setStore);

  const onFocus: RegistOnFocus<T> = (e) => {
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
