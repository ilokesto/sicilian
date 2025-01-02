import type { InitState, SicilianReturnType, SicilianProps } from "./types";
declare function Sicilian<T extends InitState>(optionWithInitValue: SicilianProps<T>): SicilianReturnType<T>;
declare function Sicilian<T extends InitState>(initValue: T, option?: Omit<SicilianProps<T>, "initValue">): SicilianReturnType<T>;
export declare const playDragon: typeof Sicilian;
export {};
