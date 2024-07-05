import { createContext, useContext, useEffect } from "react";
import useRegister from "./funcs/useRegister";
import useContextState from "./funcs/useContextState";
import registOnSubmit from "./funcs/registOnSubmit";
import createFormStore from "./funcs/createFormStore";
import { InitState, Input, Store } from "./Types";

export const Sicilian = <T extends InitState>(initialState: T) => {
  const FormStore = createFormStore(initialState);
  const ErrorStore = createFormStore(initialState);

  const Form = createContext<Store<T>>(FormStore);
  const Error = createContext<Store<T>>(ErrorStore);

  const register = useRegister<T>(Form, Error);

  const FormState = () => useContextState(Form);
  const ErrorState = () => useContextState(Error);

  const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore);

  const handleValue = (a: Record<keyof T, string>) => {
    Object.entries(a).forEach(([name, value]: Array<string>) => {
      init({ name, value });
    });
  };

  const init = ({ name, value }: { name: string; value: string }) => {
    const { onChange } = register(name);

    const mapper = <K>(name: K, value: string) => {
      return { target: { name, value } } as Input<typeof name>;
    };

    useEffect(() => {
      onChange(mapper(name, value));
    }, []);
  };

  return { register, FormState, ErrorState, handleSubmit, handleValue };
};
