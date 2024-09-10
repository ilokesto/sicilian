import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import createFormStore from "./funcs/createFormStore";
import { InitState, Validator } from "./Types";
import { InputHTMLAttributes } from "react";

export const Sicilian = <T extends InitState>(initValue: T) => {
  const errorValue = Object.keys(initValue).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as any);

  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(errorValue);

  const FormState = () => FormStore.getStore()
  const ErrorState = () => ErrorStore.getStore()

  const setForm = FormStore.setStore
  const setError = ErrorStore.setStore
  const clearForm = () => setForm(initValue)

  const register = useRegister<T>(FormStore, ErrorStore);

  const handleSubmit = registOnSubmit(FormState, ErrorState, clearForm);

  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  interface props extends InputHTMLAttributes<HTMLInputElement> {};
  const Input = (props: props) => {
    // @ts-ignore
    return <input {...props} />
  }

  return { initValue, register, FormState, ErrorState, setForm, setError, handleSubmit, handleValidate };
};
