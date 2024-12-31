import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import type { InitState, SicilianReturnType, SicilianProps, Validator } from "./types";
import { init } from "./funcs/init";

// 함수 시그니처 오버로딩
export function Sicilian<T extends InitState>(optionWithInitValue: SicilianProps<T>): SicilianReturnType<T>
export function Sicilian<T extends InitState>(initValue: T, option?: Omit<SicilianProps<T>, "initValue">): SicilianReturnType<T>

// 실제 구현
export function Sicilian<T extends InitState>(
  initValueOrOptions: T | SicilianProps<T>,
  options?: Omit<SicilianProps<T>, "initValue">
) {
  const { props, rest } = init<T>(initValueOrOptions, options);

  const register = useRegister<T>(props);
  const handleSubmit = registOnSubmit(props);
  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
};