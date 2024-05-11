import { ChangeEvent, Context, useContext, useSyncExternalStore } from "react";
import { Formula, Store } from "../Formula";

const useRegister = (form: Context<Formula>) => (name: string) => {
  const { getStore, setStore, subscribe } = useContext(form);

  const selector = (store: Store) => store[name];

  const value = useSyncExternalStore(
    subscribe,
    () => selector(getStore()),
    () => selector(getStore())
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStore({ [e.target.name]: value });
  };

  return { value, onChange, name };
};

export default useRegister;
