import type { ExtractKeys, InitState, SicilianProps, SicilianReturnType } from "../types";
import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";

// 실제 구현
export function init<T extends InitState>(
  initValueOrOptions: T | SicilianProps<T>,
  options?: Omit<SicilianProps<T>, "initValue">
) {
  let initValue: T;
  let validator: SicilianProps<T>["validator"];
  let validateOn: SicilianProps<T>["validateOn"] = [];
  let clearFormOn: SicilianProps<T>["clearFormOn"] = []

  if ((initValueOrOptions as SicilianProps<T>).initValue) {
    const options = initValueOrOptions as SicilianProps<T>;
    initValue = options.initValue as T;
    validator = options.validator;
    validateOn = options.validateOn ?? [];
    clearFormOn = options.clearFormOn ?? [];
  } else {
    initValue = initValueOrOptions as T;
    validator = options?.validator;
    validateOn = options?.validateOn ?? [];
    clearFormOn = options?.clearFormOn ?? [];
  }

  const errorValue = Object.keys(initValue).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = "";
    return acc;
  }, {} as T);

  const ErrorObjValue = Object.keys(initValue).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = "{}";
    return acc;
  }, {} as T);

  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(errorValue);
  const ErrorObjStore = createFormStore(ErrorObjValue);
 
  function FormState (): T
  function FormState (name: ExtractKeys<T>): string
  function FormState (name?: ExtractKeys<T>) {
    return name ? useContextState<T>(FormStore, name) : useContextState<T>(FormStore)
  }

  function ErrorState (): T
  function ErrorState (name: ExtractKeys<T>): string
  function ErrorState (name?: ExtractKeys<T>) {
    return name ? useContextState<T>(ErrorStore, name) : useContextState<T>(ErrorStore)
  }

  const setForm = FormStore.setStore
  const setError = ErrorStore.setStore
  const clearForm = () => setForm(initValue)

 return { rest: { FormState, ErrorState, setForm, setError}, props: {FormStore, ErrorStore, ErrorObjStore, initValue, validator, validateOn, clearFormOn, clearForm}}
}