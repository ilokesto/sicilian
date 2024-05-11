import { ChangeEvent, Context, useContext, useSyncExternalStore } from "react";
import registOnChange from "./registOnChange";
import registOnBlur from "./registOnBlur";
import { Form, InitState } from "../Sicilian";

export type RegExpErrorObj = { RegExp: RegExp; message: string };

export type ErrorObj = {
  required?: { required: boolean; message: string };
  minLength?: { number: number; message: string };
  maxLength?: { number: number; message: string };
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
};

const useRegister =
  <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) =>
  (name: string, ErrorObj?: ErrorObj) => {
    const { getStore, setStore, subscribe } = useContext(Form);
    const { setStore: setError } = useContext(Error);

    const selector = (store: T) => store[name];

    const value = useSyncExternalStore(
      subscribe,
      () => selector(getStore()),
      () => selector(getStore())
    );

    const onChange = registOnChange(setStore);

    const onFocus = (e: ChangeEvent<HTMLInputElement>) => {
      setError({ [e.target.name]: "" } as T);
    };

    const onBlur = registOnBlur({ ErrorObj, value, setError });

    return { value, onChange, onBlur, onFocus, name };
  };

export default useRegister;
