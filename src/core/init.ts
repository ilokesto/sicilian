import type { ExtractKeys, InitState, InitObject, State } from "../types";
import { useSyncState } from "../funcs/useSyncState";
import { createStore } from "../funcs/createStore";

export function init<T extends InitState>(initObject: InitObject<T>) {
  const initValue = initObject.initValue;
  const errorValue = getObjByKeys(initValue, '');
  const errorObjValue = getObjByKeys(initValue, {});

  const FormStore = createStore(initValue);
  const ErrorStore = createStore(errorValue);
  const ErrorObjStore = createStore(errorObjValue);

  const FormState: State<T> = (name?: ExtractKeys<T>): any =>
    useSyncState<T>(FormStore, name)
  const ErrorState: State<T> = (name?: ExtractKeys<T>): any =>
    useSyncState<T>(ErrorStore, name)

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

function getObjByKeys<T extends InitState>(obj: T, keys: any) {
  return Object.keys(obj).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = keys;
    return acc;
  }, {} as T)
}