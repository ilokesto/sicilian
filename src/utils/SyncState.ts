import { useSyncExternalStore } from "react";
import type { ExtractKeys, InitState, IStore } from "../type";

export class SyncState {
  static doSync = <T extends InitState>({ getStore, subscribe }: IStore<T>, name?: ExtractKeys<T> | string): any => {
    const notationSnapshot = () => (name ? getStore()[name] : getStore()) as T | T[ExtractKeys<T>];

    return useSyncExternalStore(subscribe, notationSnapshot, notationSnapshot);
  }
}