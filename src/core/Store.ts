import type { IStore } from "../type";

export class Store<T> implements IStore<T> {
  private store: T
  private callbacks = new Set<() => void>();

  constructor(initState: T) {
    this.store = initState
  }

  getStore = () => this.store
  setStore = (nextState: Partial<T>) => {
    this.store = { ...this.store, ...nextState };
    this.callbacks.forEach((cb) => cb());
  }
  subscribe = (cb: () => void) => {
    this.callbacks.add(cb);
    return () => this.callbacks.delete(cb);
  }
}