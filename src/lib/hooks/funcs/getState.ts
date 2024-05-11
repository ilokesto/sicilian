import { Context, useContext, useSyncExternalStore } from "react";
import { Form, InitState } from "../Sicilian";

const getState = <T extends InitState>(contest: Context<Form<T>>) => {
  const { getStore, subscribe } = useContext(contest);

  const value = useSyncExternalStore(
    subscribe,
    () => getStore(),
    () => getStore()
  );

  return value;
};

export default getState;
