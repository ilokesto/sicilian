import { InitState } from "../types";
export declare const init: <T extends InitState>(initValue: T) => {
    FormStore: import("../types").Store<T>;
    ErrorStore: import("../types").Store<T>;
};
