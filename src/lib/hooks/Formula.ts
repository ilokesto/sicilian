import { createContext } from "react";
import useRegister from "./funcs/useRegister";
import useGetState from "./funcs/useGetState";
import createFormula from "./funcs/createFormula";

export interface Formula<T extends { [key: string]: any }> {
  getStore: () => T;
  setStore: (action: T) => void;
  subscribe: (callback: () => void) => () => void;
}

export const formula = <T extends { [key: string]: any }>(initialState: T) => {
  const form = createContext<Formula<T>>(createFormula(initialState));

  const formState = useGetState<T>(form);

  const register = useRegister<T>(form);

  return { register, formState };
};
