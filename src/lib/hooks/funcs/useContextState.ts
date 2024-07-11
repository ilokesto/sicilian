import { useContext, useSyncExternalStore } from "react";
import { UseContextState } from "../Types";

const useContextState: UseContextState = (context) => {
  const { getStore, subscribe } = useContext(context);

  const value = useSyncExternalStore(
    subscribe,
    () => getStore(),
    () => getStore()
  );

  return value;
};

export default useContextState;
