import { Context, useContext, useSyncExternalStore } from "react";
import { Form, InitState } from "../Types";

const useContextState = <T extends InitState>(context: Context<Form<T>>) => {
  const { getStore, subscribe } = useContext(context);

  const value = useSyncExternalStore(
    subscribe,
    () => getStore(),
    () => getStore()
  );

  return value;
};

export default useContextState;
