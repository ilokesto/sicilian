import { ExtractKeys, InitState, Store } from "../types";
export declare function useContextState<T extends InitState>(context: Store<T>, name: ExtractKeys<T>): string;
export declare function useContextState<T extends InitState>(context: Store<T>): T;
