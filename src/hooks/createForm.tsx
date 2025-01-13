import useRegister from "./funcs/useRegister";
import { registOnSubmit } from "./funcs/registOnSubmit";
import type { InitState, SicilianInitObject, Validator } from "./types";
import { init } from "./funcs/init";

function Sicilian<T extends InitState>(
  initObject: SicilianInitObject<T>,
) {
  const { props, rest } = init<T>(initObject);

  const register = useRegister<T>({...props, FormState: rest.FormState});
  const handleSubmit = registOnSubmit({...props});
  const handleValidate = (validator: Validator<T>) => validator;

  return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
};

export const createForm = Sicilian;