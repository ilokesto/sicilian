/// <reference types="react" />
import { InitState, Validator } from "./Types";
export declare const Sicilian: <T extends InitState>(initValue: T) => {
    initValue: T;
    register: import("./Types").Register<T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: any) => void) => (e: import("react").FormEvent<Element>) => void;
    setValue: (asyncState: Partial<T>) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<T[keyof T], import("./Types").RegisterErrorObj<T>>>;
};
