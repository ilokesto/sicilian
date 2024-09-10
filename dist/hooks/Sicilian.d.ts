/// <reference types="react" />
import { InitState, Validator } from "./Types";
export declare const Sicilian: <T extends InitState>(initValue: T) => {
    initValue: T;
    register: import("./Types").Register<T>;
    FormState: () => T;
    ErrorState: () => any;
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<any>) => void;
    handleSubmit: (fn: (data: any) => void) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<T[keyof T], import("./Types").RegisterErrorObj<T>>>;
};
