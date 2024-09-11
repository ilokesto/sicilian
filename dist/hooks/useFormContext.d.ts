import { InitState, FormProviderProps } from "./types";
export declare function FormProvider<T extends InitState>({ children, ...props }: FormProviderProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function getContext<T extends InitState>(): Required<Omit<FormProviderProps<T>, "children">>;
