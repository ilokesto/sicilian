import { ChangeEvent, Context, useContext, useSyncExternalStore } from "react";
import { Formula } from "../Formula";

const useRegister =
  <T extends { [key: string]: any }>(form: Context<Formula<T>>) =>
  (name: string) => {
    const { getStore, setStore, subscribe } = useContext(form);

    const selector = (store: T) => store[name];

    const value = useSyncExternalStore(
      subscribe,
      () => selector(getStore()),
      () => selector(getStore())
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setStore({ [name]: value } as T);
    };

    return { value, onChange, name };
  };

export default useRegister;
