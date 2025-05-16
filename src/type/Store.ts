import type { Resolver } from "common-resolver/types";
import type { Validator } from ".";

export interface IStore<T> {
  getStore: () => T;
  setStore: {
    (nextState: Partial<T> & { [x: string]: string | boolean | FileList }): void;
  };
  subscribe: (cb: () => void) => () => boolean;
}

export type InitState = {
  [x: string]: string | boolean | FileList;
};

export type InitObject<T extends InitState> = {
  initValue?: T,
  validateOn?: Array<"blur" | "submit" | "change">,
  validator?: Validator<T>,
  resolver?: Resolver<T>,
  clearFormOn?: Array<"submit" | "routeChange">
}

export type SicilianEvent = { target: { name: string; value: string, type?: string, checked?: boolean, files?: FileList | null } };