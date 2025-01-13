import type { CreateFormState, InitState } from "../types";

export const createStore: CreateFormState = <T extends InitState>(initialState: T) => {
  let store = initialState;
  const callbacks = new Set<() => void>();

  return {
    getStore: () => store,
    setStore: (nextState: Partial<T>) => {
      store = { ...store, ...nextState };
      callbacks.forEach((cb) => cb());
    },
    subscribe: (cb: () => void) => {
      callbacks.add(cb);
      return () => callbacks.delete(cb);
    }
  }
};