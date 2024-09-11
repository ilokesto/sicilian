/// <reference types="react" />
import { InitState, Validator } from "./types";
export declare const Sicilian: <T extends InitState>(initValue: T) => {
    FormState: {
        (): T;
        (name: Extract<keyof T, string>): string;
    };
    ErrorState: {
        (): T;
        (name: Extract<keyof T, string>): string;
    };
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<T>) => void;
    initValue: T;
    register: import("./types").Register<T>;
    handleSubmit: (fn: (data: T) => void | Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<keyof T, import("./types").RegisterErrorObj<T>>>;
};
