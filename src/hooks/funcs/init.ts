import { createContext, useContext } from "react";
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
    return name ? useContextState<T>(ErrorStore, name) : useContextState<T>(ErrorStore)
  }

  const setForm = FormStore.setStore
  const setError = ErrorStore.setStore
  const clearForm = () => setForm(initValue)

  // 라이브러리 동작 전체를 망가뜨릴 우려가 있음
  // const useForm = () => [FormState(), setForm] as const
  // const useError = () => [ErrorState(), setError] as const

 return {FormStore, ErrorStore, FormState, ErrorState, setForm, setError, clearForm}
}