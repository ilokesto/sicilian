import type { InitState, ExtractKeys } from ".";

export type State<T extends InitState> = {
  (): T;
  <K extends ExtractKeys<T>>(name: K): T[K];
  (name: string): T[typeof name];
}