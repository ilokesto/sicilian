import { useContext, useSyncExternalStore } from "react";
import { UseContextState } from "../Types";

const useContextState: UseContextState = (context) => {
  const { getStore, subscribe } = useContext(context);

  const state = useSyncExternalStore(
    subscribe,
    () => getStore(),
    () => getStore()
  );

  return state;
};

export default useContextState;
