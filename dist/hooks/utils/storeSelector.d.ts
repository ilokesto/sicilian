import type { ExtractKeys, InitState } from "../types";
export declare const storeSelector: <T extends InitState>(store: T, name: ExtractKeys<T>) => T[ExtractKeys<T>];
