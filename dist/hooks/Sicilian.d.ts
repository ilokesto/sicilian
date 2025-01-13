import type { InitState, SicilianProps, Validator } from "./types";
declare function Sicilian<T extends InitState>(initObject: SicilianProps<T>): {
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
    handleSubmit: (fn: (data: T, event?: import("react").FormEvent) => Promise<unknown> | unknown) => (e: import("react").FormEvent) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<keyof T, import("./types").RegisterErrorObj<T>>>;
};
export declare const playDragon: typeof Sicilian;
export {};
