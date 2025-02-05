import type { ExecValidate, RegisterErrorObj } from "../types";
import { HandlerChain } from "../utils/validateHandler/HandlerChain";

export const execValidate: ExecValidate =
  ({ getStore, setError, getErrorObjStore }) =>
  (e) => {
    type T = typeof getStore extends () => infer U ? U : never;
    const { name, value } = e.target;
    const store = getStore()
    const ErrorObj = getErrorObjStore()[name] as RegisterErrorObj<T>;

    if (!ErrorObj) return;

    const handlerChain = new HandlerChain<T>(setError)

    for (const key in ErrorObj) {
      handlerChain.addHandler(key as keyof RegisterErrorObj<T>);
    }

    handlerChain.handle({value, ErrorObj, name, store})
  };



