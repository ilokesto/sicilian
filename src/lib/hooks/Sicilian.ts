import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import { InitState, Validator } from "./types";
import { init } from "./funcs/init";

export const Sicilian = <T extends InitState>(initValue: T) => {
  const {FormStore, ErrorStore} = init(initValue);

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

  return { initValue, register, FormState, ErrorState, setForm, setError, handleSubmit, handleValidate };
};

