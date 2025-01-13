import type { InitState, SicilianInitObject, State } from "../types";
export declare function init<T extends InitState>(initObject: SicilianInitObject<T>): {
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
