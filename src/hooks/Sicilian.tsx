import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import type { InitState, SicilianProps, Validator } from "./types";
import { init } from "./funcs/init";

function Sicilian<T extends InitState>(
  initObject: SicilianProps<T>,
) {
  const { props, rest } = init<T>(initObject);

  const register = useRegister<T>({...props, FormState: rest.FormState});
  const handleSubmit = registOnSubmit(props);
  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
};

export const playDragon = Sicilian;