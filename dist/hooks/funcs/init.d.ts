import type { ExtractKeys, InitState, SicilianProps } from "../types";
export declare function init<T extends InitState>(initValueOrOptions: T | SicilianProps<T>, options?: Omit<SicilianProps<T>, "initValue">): {
    rest: {
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
    };
    props: {
        FormStore: import("../types").Store<T>;
        ErrorStore: import("../types").Store<T>;
        ErrorObjStore: import("../types").Store<T>;
        initValue: T;
        validator: Partial<Record<keyof T, import("../types").RegisterErrorObj<T>>> | undefined;
        validateOn: ("blur" | "submit")[];
        clearFormOn: ("submit" | "routeChange")[];
        clearForm: () => void;
    };
};
