/// <reference types="react" />
export type InitState = {
    [key: string]: string;
};
export interface Form<T extends InitState> {
    getStore: () => T;
    setStore: (action: T) => void;
    subscribe: (callback: () => void) => () => void;
}
export declare const Sicilian: <T extends InitState>(initialState: T) => {
    register: (name: string, ErrorObj?: import("./funcs/useRegister").ErrorObj | undefined) => {
        value: string;
        onChange: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        onBlur: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        onFocus: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        name: string;
    };
    FormState: () => T;
    ErrorState: () => T;
};
