/// <reference types="react" />
import { InitState, Validator } from "./types";
export declare const Sicilian: <T extends InitState>(initValue: T) => {
    initValue: T;
    register: import("./types").Register<T>;
    FormState: () => T;
    ErrorState: () => T;
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<T>) => void;
    handleSubmit: (fn: (data: T) => void | Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<keyof T, import("./types").RegisterErrorObj<T>>>;
};
