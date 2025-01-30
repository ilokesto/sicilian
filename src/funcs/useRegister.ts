import type { UseRegister, SicilianEvent } from "../types";
import { usePageNavigation } from "./usePageNavigation";
import { execValidate } from "./validateCenter";

export const useRegister: UseRegister = ({
  FormStore: {
    getStore,
    setStore
  },
  ErrorStore: {
    setStore: setError
  },
  ErrorObjStore: {
    setStore: setErrorObjectStore,
    getStore: getErrorObjStore
  },
  clearForm,
  clearFormOn,
  validateOn,
  FormState
}) => (
  name, ErrorObj
) => {
  type T = typeof getStore extends () => infer U ? U : never;

  // ErrorObjStore 덮어쓰기
  ErrorObj && setErrorObjectStore({[name]: ErrorObj } as Partial<T>)

  // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
  clearFormOn.includes("routeChange") && usePageNavigation(clearForm)

  return {
    name, id: name, value: FormState(name),
    onBlur: validateOn?.includes("blur") ? execValidate({ getErrorObjStore, getStore, setError }) : undefined,
    onFocus: (e: SicilianEvent) => setError({ [e.target.name]: "" } as Partial<T>),
    onChange: (e: SicilianEvent) => {
      setStore({ [e.target.name]: e.target.value } as Partial<T>);
      validateOn?.includes("change") && setError({ [e.target.name]: "" } as Partial<T>);
      validateOn?.includes("change") && execValidate({ getErrorObjStore, getStore, setError })(e);
    },
  };
};