/// <reference types="react" />
export declare const Sicilian: <T extends InitStaate>(initialState: T) => {
    register: import("./Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
};
