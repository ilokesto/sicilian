import { useSyncExternalStore } from "react";
import type { ExtractKeys, InitState, Store } from "../types";

export function useContextState <T extends InitState>(store:Store<T>, name: ExtractKeys<T>): string
export function useContextState <T extends InitState>(store:Store<T>, name?: string): T

export function useContextState <T extends InitState>(store:Store<T>, name?: ExtractKeys<T>) {
  const { getStore, subscribe } = store;
  
  const notationSnapshot = () => (name ? getStore()[name] : getStore());

  const value = useSyncExternalStore(
    subscribe,
    notationSnapshot,
    notationSnapshot
  );

  return value;
};
