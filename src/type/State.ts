import type { InitState, ExtractKeys } from ".";

export type State<T extends InitState, BasicReturnType> = {
  (): T & { [x: string]: BasicReturnType };
  <K extends ExtractKeys<T>>(name: K): T[K];
  (name: string): BasicReturnType;
}