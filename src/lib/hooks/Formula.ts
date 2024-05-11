import { createContext } from "react";
import useRegister from "./funcs/useRegister";
import useGetState from "./funcs/useGetState";
import createFormula from "./funcs/createFormula";

export type Store = { [key: string]: string };
export interface Formula {
  getStore: () => Store;
  setStore: (action: Store) => void;
  subscribe: (callback: () => void) => () => void;
}

export const formula = (initialState: Store) => {
  const form = createContext<Formula>(createFormula(initialState));

  const formState = useGetState(form);

  const register = useRegister(form);

  return { register, formState };
};
