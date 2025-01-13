import type { ExtractKeys, InitState, SicilianProps } from "../types";
type State<T extends InitState> = {
    (): T;
    (name: ExtractKeys<T>): string;
};
export declare function init<T extends InitState>(initObject: SicilianProps<T>): {
    rest: {
        FormState: State<T>;
        ErrorState: State<T>;
        setForm: (value: Partial<T>) => void;
        setError: (value: Partial<T>) => void;
    };
    props: {
        FormStore: import("../types").Store<T>;
        ErrorStore: import("../types").Store<T>;
        ErrorObjStore: import("../types").Store<T>;
        initValue: T;
        validator: {};
        validateOn: ("blur" | "submit")[];
        clearFormOn: ("submit" | "routeChange")[];
        clearForm: () => void;
    };
};
export {};
