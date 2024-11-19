import { RegistOnSubmit } from "../types";
import isAllInputEmpty from "../utils/isAllInputEmpty";
import isErrorExist from "../utils/isErrorExist";
import registOnBlur from "./registOnBlur";

const registOnSubmit: RegistOnSubmit = ({FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validateOption}) => (fn) => async (e) => {
  e.preventDefault();

  const { getStore: getFormStore } = FormStore
  const { getStore: getErrorStore,setStore: setErrorStore } = ErrorStore
  const { getStore: getErrorObjStore } = ErrorObjStore

  const ErrorObjectArray = Object.entries(getErrorObjStore())

  if (validateOn.includes("submit")) {
    ErrorObjectArray.forEach(([name, ErrorObj]) => {
      registOnBlur({
        getStore: getFormStore,
        setError: setErrorStore,
        validateOption,
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
    
    clearFormOn.includes("submit") ? clearForm() : null;
  } catch (e) {
    console.log(e)
  }
};

export default registOnSubmit;

