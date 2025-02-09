import type { InitState } from ".";

export type ExtractKeys<T extends InitState> = Extract<keyof T, string>