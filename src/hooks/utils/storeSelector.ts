import type { ExtractKeys, InitState } from "../types";

export const storeSelector = <T extends InitState>(store: T, name: ExtractKeys<T>) => store[name];