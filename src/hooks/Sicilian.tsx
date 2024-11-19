import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import { InitState, RegisterErrorObj, SicilianProps, Validator } from "./types";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { init } from "./funcs/init";


interface SicilianFormProps<T> extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  onSubmit: (data: T, event?: FormEvent) => Promise<unknown> | unknown;
}

export function Sicilian <T extends InitState>({initValue, validateOption, validateOn = "all", clearFormOnSubmit = true}: SicilianProps<T>) {
  const { FormStore, ErrorStore, clearForm, ...rest } = init<T>(initValue);

  const register = useRegister<T>(FormStore, ErrorStore, validateOn, validateOption);

  const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore, clearForm, clearFormOnSubmit);

  const handleValidate = (validator: Validator<T>) => {
    return validator;
  };

  const Form = ({noValidate = true, onSubmit, children, ...props}: SicilianFormProps<T>) => {
    return <form noValidate={noValidate} onSubmit={handleSubmit(onSubmit)} {...props}>{children}</form>
  };

  return { initValue, register, handleSubmit, handleValidate, Form, ...rest };
};
