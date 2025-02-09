import type { InitState, ExtractKeys } from ".";

export type State<T extends InitState> = {
  (): T;
  (name: ExtractKeys<T>): T[ExtractKeys<T>];
}