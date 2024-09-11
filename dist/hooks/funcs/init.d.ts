import { ExtractKeys, InitState } from "../types";
export declare const init: <T extends InitState>(initValue: T) => {
    FormStore: import("../types").Store<T>;
    ErrorStore: import("../types").Store<T>;
    FormState: {
        (): T;
        (name: ExtractKeys<T>): string;
    };
    ErrorState: {
        (): T;
        (name: ExtractKeys<T>): string;
    };
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<T>) => void;
    clearForm: () => void;
};
