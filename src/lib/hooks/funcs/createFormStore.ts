import { CreateFormState, InitState } from "../Types";

const createFormStore: CreateFormState = (initialState) => {
  type T = typeof initialState;

  let store = initialState;
  const callbacks = new Set<() => void>();
  const getStore = () => store;

  const setStore = (nextState: InitState) => {
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
