import type { ExtractKeys, InitState, Store } from "../types";
export declare function useContextState<T extends InitState>(store: Store<T>, name: ExtractKeys<T>): string;
export declare function useContextState<T extends InitState>(store: Store<T>): T;
