/// <reference types="react" />
import { InitState } from "./Types";
export declare const Sicilian: <T extends InitState>(initialState: T) => {
    register: import("./Types").Register;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    useInitializer: (testState: Partial<Record<keyof T, string>>) => void;
};
