import { Formula, Store } from "../Formula";

const createFormula = (initialState: Store): Formula => {
  let store = initialState;
  const callbacks = new Set<() => void>();
  const getStore = () => store;

  const setStore = (nextState: Store) => {
    store = { ...store, ...nextState };
    callbacks.forEach((callback) => callback());
  };

  const subscribe = (callback: () => void) => {
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  };

  return { getStore, setStore, subscribe };
};
export default createFormula;
