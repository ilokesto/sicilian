import { Context, FormEvent } from "react";
type Input<T> = {
    target: {
        name: keyof T;
        value: string;
    };
};
export type InitState = {
    [key: string]: string;
};
export interface Store<T> {
    getStore: () => T;
    setStore: (action: InitState) => void;
    subscribe: (callback: () => void) => () => void;
}
export type CreateFormStore = <T>(initialState: T) => Store<T>;
export type RegExpErrorObj = {
    RegExp: RegExp;
    message: string;
};
export type CustomCheckerErrorObj = {
    checkFn: (value: string) => boolean;
    message: string;
};
export type RegisterErrorObj = {
    required?: {
        required: boolean;
        message: string;
    };
    minLength?: {
        number: number;
        message: string;
    };
    maxLength?: {
        number: number;
        message: string;
    };
    RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
    customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
};
type OnBlurProps = {
    ErrorObj?: RegisterErrorObj;
    value: string;
    setError: (action: InitState) => void;
};
export type RegistOnBlur = <T>(onBlurProps: OnBlurProps) => (e: Input<T>) => void;
export type RegistOnChange = <T>(setStore: (action: InitState) => void) => (e: Input<T>, customValue?: string) => void;
export type RegistOnSubmit = <T extends object>(FormState: () => T, ErrorState: () => T) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;
export type RegistOnFocus = <T>(e: Input<T>) => void;
export type Register<K> = (name: K, ErrorObj?: RegisterErrorObj) => {
    value: string;
    name: K;
    onChange: ReturnType<RegistOnChange>;
    onBlur: ReturnType<RegistOnBlur>;
    onFocus: RegistOnFocus;
};
export type UseRegister = <T extends object>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<keyof T>;
export type UseContextState = <T extends object>(context: Context<Store<T>>) => T;
export {};
