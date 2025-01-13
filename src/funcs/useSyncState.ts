import { useSyncExternalStore } from "react";
import type { ExtractKeys, InitState, Store } from "../types";

export function useSyncState <T extends InitState>(store:Store<T>, name?: ExtractKeys<T>) {
  const { getStore, subscribe } = store;
  const notationSnapshot = () => (name ? getStore()[name] : getStore());
  return useSyncExternalStore(subscribe, notationSnapshot, notationSnapshot);
};