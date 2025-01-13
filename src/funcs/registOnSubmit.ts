import type { RegistOnSubmit } from "../types";
import registOnBlur from "./registOnBlur";

export const registOnSubmit: RegistOnSubmit = ({FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validator}) => (fn) => async (e) => {
  e.preventDefault();

  const { getStore: getFormStore } = FormStore
  const { getStore: getErrorStore,setStore: setErrorStore } = ErrorStore
  const { getStore: getErrorObjStore } = ErrorObjStore

  const ErrorObjectArray = Object.entries(getErrorObjStore())

  if (validateOn?.includes("submit")) {
    ErrorObjectArray.forEach(([name, ErrorObj]) => {
      registOnBlur({
        getStore: getFormStore,
        setError: setErrorStore,
        validator,
        ErrorObj: ErrorObj === "{}" ? undefined : JSON.parse(ErrorObj)
      })({target: {name: name, value: getFormStore()[name]}})
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