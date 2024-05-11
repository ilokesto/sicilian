import { Context, useContext } from "react";
import { Formula } from "../Formula";

const useGetState =
  <T extends { [key: string]: any }>(form: Context<Formula<T>>) =>
  () => {
    const { getStore } = useContext(form);

    return getStore();
  };
export default useGetState;
