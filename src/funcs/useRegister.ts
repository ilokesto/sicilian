import registOnBlur from "./registOnBlur";
import type { UseRegister, SicilianEvent } from "../types";
import { usePageNavigation } from "./usePageNavigation";

export const useRegister: UseRegister = ({
  FormStore: {
    getStore,
    setStore
  },
  ErrorStore: {
    setStore: setError
  },
  ErrorObjStore: {
    setStore: setErrorObjectStore
  },
  clearForm,
  clearFormOn,
  validateOn,
  validator,
  FormState
}) => (
  name, ErrorObj
) => {
  type T = typeof getStore extends () => infer U ? U : never;

  setErrorObjectStore({[name]: JSON.stringify(ErrorObj ?? {})} as Partial<T>)

  // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
  clearFormOn.includes("routeChange")
    ? usePageNavigation(() => clearForm())
    : null;
  
  return {
    name,
    id: name,
    value: FormState(name),
    onChange: (e: SicilianEvent) => setStore({ [e.target.name]: e.target.value } as Partial<T>),
    onFocus: (e: SicilianEvent) => setError({ [e.target.name]: "" } as Partial<T>),
    onBlur: validateOn?.includes("blur") ? registOnBlur({ ErrorObj, getStore, setError, validator }) : undefined,
  };
};
