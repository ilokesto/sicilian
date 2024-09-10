import { InitState } from "../types";
import createFormStore from "./createFormStore";

export const init = <T extends InitState>(initValue: T) => {
  const errorValue = Object.keys(initValue).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = "";
    return acc;
  }, {} as T);

  const FormStore = createFormStore(initValue);
  const ErrorStore = createFormStore(errorValue);

 return {FormStore, ErrorStore}
}