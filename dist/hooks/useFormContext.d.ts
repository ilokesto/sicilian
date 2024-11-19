import { InitState, GetContextFn, SicilianProviderProps } from "./types";
export declare function SicilianProvider<T extends InitState>({ children, value }: SicilianProviderProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function getContext<T extends InitState>(): GetContextFn<T>;
