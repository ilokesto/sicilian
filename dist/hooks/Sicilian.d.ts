import type { InitState, SicilianReturnType, SicilianProps } from "./types";
export declare function Sicilian<T extends InitState>(optionWithInitValue: SicilianProps<T>): SicilianReturnType<T>;
export declare function Sicilian<T extends InitState>(initValue: T, option?: Omit<SicilianProps<T>, "initValue">): SicilianReturnType<T>;
