import type { InitState } from "../type";

export function getObjByKeys<T extends InitState>(obj: T, keys: unknown) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = keys;
    return acc;
  }, {} as any)
}