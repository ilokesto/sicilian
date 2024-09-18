import { useSyncExternalStore } from "react";
import { ExtractKeys, InitState, Store } from "../types";
import { storeSelector } from "../utils/storeSelector";

export function useContextState <T extends InitState>(context:Store<T>, name: ExtractKeys<T>): string
export function useContextState <T extends InitState>(context:Store<T>): T

export function useContextState <T extends InitState>(context:Store<T>, name?: ExtractKeys<T>) {
  const { getStore, subscribe } = context;

  const notationSnapshot = () => (name ? storeSelector(getStore(), name) : getStore());

  const value = useSyncExternalStore(
    subscribe,
    notationSnapshot,
    notationSnapshot
  );

  return value;
};
