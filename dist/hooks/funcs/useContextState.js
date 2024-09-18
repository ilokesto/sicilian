import { useSyncExternalStore } from "react";
import { storeSelector } from "../utils/storeSelector";
export function useContextState(context, name) {
    const { getStore, subscribe } = context;
    const notationSnapshot = () => (name ? storeSelector(getStore(), name) : getStore());
    const value = useSyncExternalStore(subscribe, notationSnapshot, notationSnapshot);
    return value;
}
;
