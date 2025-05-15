import type { Validator, Resolver } from ".";

export interface IStore<T> {
  getStore: () => T;
  setStore: (nextState: Partial<T>) => void;
  subscribe: (cb: () => void) => () => boolean;
}

export type InitState = {
  [x: string]: unknown;
};

export type InitObject<T extends InitState> = {
  initValue?: T,
  validateOn?: Array<"blur" | "submit" | "change">,
  validator?: Validator<T>,
  resolver?: Resolver<T>,
  clearFormOn?: Array<"submit" | "routeChange">
}

export type SicilianEvent = { target: { name: string; value: string, type?: string, checked?: boolean, files?: FileList | null } };