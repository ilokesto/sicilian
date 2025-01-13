import { useContext } from "react";
import type { ExtractKeys, InitState, SicilianProps } from "../types";
import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";

type State<T extends InitState> = {
  (): T;
  (name: ExtractKeys<T>): string;
}

function getObjByKeys<T extends InitState>(obj: T, keys: string) {
  return Object.keys(obj).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = keys;
    return acc;
  }, {} as T); 
}

// 실제 구현
export function init<T extends InitState>(initObject: SicilianProps<T>) {
  const initValue = initObject.initValue;
  const errorValue = getObjByKeys(initValue, "");
  const ErrorObjValue = getObjByKeys(initValue, "{}");

  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(errorValue);
  const ErrorObjStore = createFormStore(ErrorObjValue);

  const FormState: State<T> = (name?: ExtractKeys<T>): any =>
    useContextState<T>(FormStore, name)
  const ErrorState: State<T> = (name?: ExtractKeys<T>): any =>
    useContextState<T>(ErrorStore, name)

  return {
    rest: { 
      FormState, 
      ErrorState, 
      setForm: FormStore.setStore,
      setError: ErrorStore.setStore,
    }, 
    props: {
      FormStore, 
      ErrorStore, 
      ErrorObjStore, 
      initValue, 
      validator: initObject.validator ?? {}, 
      validateOn: initObject.validateOn ?? [], 
      clearFormOn: initObject.clearFormOn ?? [], 
      clearForm: () => FormStore.setStore(initValue)
    }
  }
}