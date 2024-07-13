import { createContext } from "react";
import useRegister from "./funcs/useRegister";
import useContextState from "./funcs/useContextState";
import registOnSubmit from "./funcs/registOnSubmit";
import createFormStore from "./funcs/createFormStore";
import { InitState, Store, Validator } from "./Types";
import registOnValue from "./funcs/asyncSetValue";

export const Sicilian = <T extends InitState>(initValue: T) => {
  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(initValue);

  const Form = createContext<Store<T>>(FormStore);
  const Error = createContext<Store<T>>(ErrorStore);

  const register = useRegister<T>(Form, Error);

  const FormState = () => useContextState(Form);
  const ErrorState = () => useContextState(Error);

  const setValue = registOnValue<T>(FormStore.setStore);

  const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore);

  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  return { initValue, register, FormState, ErrorState, handleSubmit, setValue, handleValidate };
};
