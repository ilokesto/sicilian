import { useSyncExternalStore } from "react";
import type { ExtractKeys, InitState, Store } from "../types";
import { storeSelector } from "../utils/storeSelector";

export function useContextState <T extends InitState>(store:Store<T>, name: ExtractKeys<T>): string
export function useContextState <T extends InitState>(store:Store<T>): T

export function useContextState <T extends InitState>(store:Store<T>, name?: ExtractKeys<T>) {
  const { getStore, subscribe } = store

  const notationSnapshot = () => (name ? storeSelector(getStore(), name) : getStore());

  const value = useSyncExternalStore(
    subscribe,
    notationSnapshot,
    notationSnapshot
  );

  return value;
};
