import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import { InitState, Validator } from "./types";
import { init } from "./funcs/init";

export const Sicilian = <T extends InitState>(initValue: T) => {
  const { FormStore, ErrorStore, clearForm, ...rest } = init<T>(initValue);

  const register = useRegister<T>(FormStore, ErrorStore);

  const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore, clearForm);

  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  return { initValue, register, handleSubmit, handleValidate, ...rest };
};

