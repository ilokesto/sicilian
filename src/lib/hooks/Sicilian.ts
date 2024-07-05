import { createContext, useContext, useEffect } from "react";
import useRegister from "./funcs/useRegister";
import useContextState from "./funcs/useContextState";
import registOnSubmit from "./funcs/registOnSubmit";
import createFormStore from "./funcs/createFormStore";
import { InitState, Store } from "./Types";

export const Sicilian = <T extends InitState>(initialState: T) => {
  const FormStore = createFormStore(initialState);
  const ErrorStore = createFormStore(initialState);

  const Form = createContext<Store<T>>(FormStore);
  const Error = createContext<Store<T>>(ErrorStore);

  const register = useRegister<T>(Form, Error);

  const FormState = () => useContextState(Form);
  const ErrorState = () => useContextState(Error);

  const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore);

  const useInitializer = (testState: Partial<Record<keyof T, string>>) => {
    const { setStore } = useContext(Form);

    useEffect(() => {
      for (let key in testState) {
        // @ts-ignore
        setStore({ key: testState[key] });
      }
    }, []);
  };

  return { register, FormState, ErrorState, handleSubmit, useInitializer };
};
