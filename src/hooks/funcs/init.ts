import { useContext } from "react";
import type { ExtractKeys, InitState, SicilianProps } from "../types";
import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";

type State<T extends InitState> = {
  (): T;
  (name: ExtractKeys<T>): string;
}

// 실제 구현
export function init<T extends InitState>(
  initObject: SicilianProps<T>,
) {
  const initValue = initObject.initValue;

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

  const FormState: State<T> = (name?: ExtractKeys<T>): any =>
    useContextState<T>(FormStore, name)
  const ErrorState: State<T> = (name?: ExtractKeys<T>): any =>
    useContextState<T>(ErrorStore, name)

  const setForm = FormStore.setStore
  const setError = ErrorStore.setStore
  const clearForm = () => setForm(initValue)

  return {
    rest: { 
      FormState, 
      ErrorState, 
      setForm, 
      setError
    }, 
    props: {
      FormStore, 
      ErrorStore, 
      ErrorObjStore, 
      initValue, 
      validator: initObject.validator ?? {}, 
      validateOn: initObject.validateOn ?? [], 
      clearFormOn: initObject.clearFormOn ?? [], 
      clearForm
    }
  }
}