import type { InitState, ExtractKeys } from ".";

export type State<T extends InitState, BasicReturnType> = {
  (): T & { [x: string]: BasicReturnType | undefined };
  <K extends ExtractKeys<T>>(name: K): T[K];
  (name: string): BasicReturnType | undefined;
}