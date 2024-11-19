import { useSyncExternalStore } from "react";
import { storeSelector } from "../utils/storeSelector";
export function useContextState(store, name) {
    const { getStore, subscribe } = store;
    const notationSnapshot = () => (name ? storeSelector(getStore(), name) : getStore());
    const value = useSyncExternalStore(subscribe, notationSnapshot, notationSnapshot);
    return value;
}
;
