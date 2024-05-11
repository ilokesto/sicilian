import { createContext, useContext, useSyncExternalStore } from "react";
import useRegister from "./funcs/useRegister";
import createFormula from "./funcs/createFormula";

export type InitState = { [key: string]: string };
export interface Form<T extends InitState> {
  getStore: () => T;
  setStore: (action: T) => void;
  subscribe: (callback: () => void) => () => void;
}

export const Formula = <T extends InitState>(initialState: T) => {
  const Form = createContext<Form<T>>(createFormula(initialState));
  const Error = createContext<Form<T>>(createFormula(initialState));

  const FormState = () => {
    const { getStore, subscribe } = useContext(Form);

    const value = useSyncExternalStore(
      subscribe,
      () => getStore(),
      () => getStore()
    );

    return value;
  };

  const ErrorState = () => {
    const { getStore, subscribe } = useContext(Error);

    const value = useSyncExternalStore(
      subscribe,
      () => getStore(),
      () => getStore()
    );

    return value;
  };

  const register = useRegister<T>(Form, Error);

  return { register, FormState, ErrorState };
};
