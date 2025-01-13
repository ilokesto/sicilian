import { init } from "../funcs/init";
import { registOnSubmit } from "../funcs/registOnSubmit";
import { useRegister } from "../funcs/useRegister";
import type { InitState, InitObject, Validator } from "../types";

export function createForm<T extends InitState>(initObject: InitObject<T>) {
  const { props, rest } = init<T>(initObject);

  const register = useRegister<T>({...props, FormState: rest.FormState});
  const handleSubmit = registOnSubmit({...props});
  const handleValidate = (validator: Validator<T>) => validator;

  return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
};