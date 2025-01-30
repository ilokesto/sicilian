import type { RegistOnSubmit } from "../types";
import { execValidate } from "./validateCenter";

export const registOnSubmit: RegistOnSubmit = ({
  FormStore: {
    getStore: getFormStore
  },
  ErrorStore: {
    getStore: getErrorStore,
    setStore: setErrorStore
  },
  ErrorObjStore: {
    getStore: getErrorObjStore
  }, clearForm, clearFormOn, validateOn}) => (fn) => async (e) => {
    
  e.preventDefault();

  if (validateOn?.includes("submit")) {
    Object.keys(getFormStore()).forEach((name) => {
        execValidate({
          setError: setErrorStore,
          getStore: getFormStore,
          getErrorObjStore,
        })({ target: { name: name, value: getFormStore()[name] as string, }, })
    })
  }

  const formState = getFormStore();
  const errorState = getErrorStore();

  // 에러가 하나라도 있으면 return
  if (isErrorExist(errorState)) return

  // 모든 value가 비어있으면 return
  if (isAllInputEmpty(formState)) return;

  try {
    await fn(formState, e);
    
    clearFormOn?.includes("submit") ? clearForm() : null;
  } catch (err) {
    console.log(err);
  }
};

function isErrorExist<T extends object>(errorState: T) {
  for (const v of Object.values(errorState)) {
    if (v !== "") return true;
  }

  return false
}

function isAllInputEmpty<T extends object>(formState: T) {
  let count = 0;
  let array = Object.values(formState);

  for (const v of array) {
    if (v === "") count++;
  }

  if (count === array.length) return true;
  else return false;
}