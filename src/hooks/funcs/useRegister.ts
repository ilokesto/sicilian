import registOnBlur from "./registOnBlur";
import type { RegistOnChange, RegistOnFocus, UseRegister, Store } from "../types";
import { usePageNavigation } from "./usePageNavigation";

const useRegister: UseRegister = ({ FormStore, ErrorStore, ErrorObjStore, clearForm, clearFormOn, validateOn, validator, FormState}) =>
  (name, ErrorObj) =>
    {
      type T = typeof FormStore extends Store<infer U> ? U : never;
      
      const { getStore, setStore } = FormStore
      const { setStore: setError } = ErrorStore
      const { setStore: setErrorObjectStore} = ErrorObjStore

      setErrorObjectStore({[name]: JSON.stringify(ErrorObj ?? {})} as Partial<T>)
      const onChange: RegistOnChange = (e) => setStore({ [e.target.name]: e.target.value } as Partial<T>)
      const onFocus: RegistOnFocus = (e) => setError({ [e.target.name]: "" } as Partial<T>);
      const value = FormState(name);
      const onBlur = registOnBlur({ ErrorObj, getStore, setError, validator });

      // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
      // @ts-ignore
      clearFormOn.includes("routeChange") ? usePageNavigation(() => clearForm()) : null;

      // onBlur 할 것인지 여부를 결정
      if (validateOn?.includes("blur")) {
        return { value, name, id: name, onChange, onBlur, onFocus };
      }
      
      return { value, name, id: name, onChange, onFocus };
    };

export default useRegister;
