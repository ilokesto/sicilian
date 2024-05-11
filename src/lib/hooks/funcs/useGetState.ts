import { Context, useContext } from "react";
import { Formula } from "../Formula";

const useGetState = (form: Context<Formula>) => () => {
  const { getStore } = useContext(form);

  return getStore();
};
export default useGetState;
