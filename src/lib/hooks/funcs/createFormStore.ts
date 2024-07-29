import { CreateFormState, SetStore } from "../Types";

const createFormStore: CreateFormState = (initialState) => {
  type T = typeof initialState;

  let store = initialState;
  const callbacks = new Set<() => void>();
  const getStore = () => store;

  const setStore = (nextState: SetStore<T[keyof T]>) => {
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

export default createFormStore;
