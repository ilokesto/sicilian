
export type InitState = {
  [x: string]: string;
};
export type ExtractKeys<T extends InitState> = Extract<keyof T, string> 
export type Store<T extends InitState> = {
  getStore: () => T;
  setStore: (value: Partial<T>) => void;
  subscribe: (callback: () => void) => () => void;
};