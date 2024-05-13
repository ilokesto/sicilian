/// <reference types="react" />
import { InitState } from "./Types";
export declare const Sicilian: <T extends InitState>(initialState: T) => {
    register: import("./Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: InitState) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
};
