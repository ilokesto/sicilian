import { ExtractKeys, InitState } from "../types";
import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";

export const init = <T extends InitState>(initValue: T) => {
  const errorValue = Object.keys(initValue).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = "";
    return acc;
  }, {} as T);

  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(errorValue);

  function FormState (): T
  function FormState (name: ExtractKeys<T>): string
  function FormState (name?: ExtractKeys<T>) {
    return name ? useContextState<T>(FormStore, name) : useContextState<T>(FormStore)
  }

  function ErrorState (): T
  function ErrorState (name: ExtractKeys<T>): string
  function ErrorState (name?: ExtractKeys<T>) {
    return name ? useContextState<T>(FormStore, name) : useContextState<T>(FormStore)
  }

  const setForm = FormStore.setStore
  const setError = ErrorStore.setStore
  const clearForm = () => setForm(initValue)

 return {FormStore, ErrorStore, FormState, ErrorState, setForm, setError, clearForm}
}