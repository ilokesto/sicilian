import { createContext, useContext, useSyncExternalStore } from "react";
import useRegister from "./funcs/useRegister";
import createFormula from "./funcs/createFormula";
import getState from "./funcs/getState";

export type InitState = { [key: string]: string };
export interface Form<T extends InitState> {
  getStore: () => T;
  setStore: (action: T) => void;
  subscribe: (callback: () => void) => () => void;
}

export const Sicilian = <T extends InitState>(initialState: T) => {
  const Form = createContext<Form<T>>(createFormula(initialState));
  const Error = createContext<Form<T>>(createFormula(initialState));

  const FormState = () => getState(Form);
  const ErrorState = () => getState(Error);

  const register = useRegister<T>(Form, Error);

  const onSubmit = (f: (data: InitState) => void) => (e: SubmitEvent) => {
    e.preventDefault();
  };

  return { register, FormState, ErrorState, onSubmit };
};
