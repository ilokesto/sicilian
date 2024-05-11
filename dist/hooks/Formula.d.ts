/// <reference types="react" />
export type Store = {
    [key: string]: string;
};
export interface Formula {
    getStore: () => Store;
    setStore: (action: Store) => void;
    subscribe: (callback: () => void) => () => void;
}
export declare const formula: (initialState: Store) => {
    register: (name: string) => {
        value: string;
        onChange: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        name: string;
    };
    formState: () => Store;
};
