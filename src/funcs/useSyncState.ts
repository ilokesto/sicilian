import { useSyncExternalStore } from "react";
import type { ExtractKeys, InitState, Store } from "../types";

export function useSyncState <T extends InitState>({ getStore, subscribe }: Store<T>, name?: ExtractKeys<T>) {
  const notationSnapshot = () => (name ? getStore()[name] : getStore());

  return useSyncExternalStore(subscribe, notationSnapshot, notationSnapshot);
};