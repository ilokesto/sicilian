import { InitState, FormProviderProps, GetContextFn } from "./types";
export declare function FormProvider<T extends InitState>({ children, ...props }: FormProviderProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function getContext<T extends InitState>(): GetContextFn<T>;
