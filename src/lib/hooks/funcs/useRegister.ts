import { useContext, useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { RegistOnFocus, UseRegister } from "../Types";

const useRegister: UseRegister = (Form, Error) => (name, ErrorObj) => {
  const { getStore, setStore, subscribe } = useContext(Form);
  const { setStore: setError } = useContext(Error);

  const selector = (store: ReturnType<typeof getStore>) => store[name];

  const value = useSyncExternalStore(
    subscribe,
    () => selector(getStore()),
    () => selector(getStore())
  );

  const onChange = registOnChange<ReturnType<typeof getStore>>(setStore);

  const onFocus: RegistOnFocus = (e) => {
    setError({ [e.target.name]: "" });
  };

  const onBlur = registOnBlur<ReturnType<typeof getStore>>({ ErrorObj, value, setError });

  return { value, onChange, onBlur, onFocus, name };
};

export default useRegister;
