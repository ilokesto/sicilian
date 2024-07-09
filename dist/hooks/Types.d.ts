import { ChangeEvent, Context, FocusEvent, FormEvent } from "react";
type Roll<T> = {
    [K in keyof T]: T[K];
} & {};
export type Input<K> = Roll<ChangeEvent<HTMLInputElement> & {
    target: {
        name: K;
        value: string;
    };
}>;
export type InitState = {
    [key: string]: string;
};
export type SetStore = <K extends string>(action: {
    [key in K]: string;
}) => void;
export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;
export type Store<T extends InitState> = {
    getStore: () => T;
    setStore: (action: SetStore) => void;
    subscribe: (callback: () => void) => () => void;
};
export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<keyof T>;
export type Register<K> = (name: K, ErrorObj?: RegisterErrorObj) => {
    value: string;
    name: K;
    onChange: ReturnType<RegistOnChange<K>>;
    onBlur: ReturnType<RegistOnBlur>;
    onFocus: RegistOnFocus;
};
export type Validator<T extends InitState> = Partial<Record<keyof T, RegisterErrorObj>>;
export type RegisterErrorObj = {
    required?: {
        required: true;
        message: string;
    } | true;
    minLength?: {
        number: number;
        message: string;
    } | number;
    maxLength?: {
        number: number;
        message: string;
    } | number;
    RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
    customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
};
export type RegExpErrorObj = {
    RegExp: RegExp;
    message?: string;
};
export type CustomCheckerErrorObj = {
    checkFn: (value: string) => boolean;
    message?: string;
};
export type RegistOnChange<K> = (setStore: (action: SetStore) => void) => (e: Input<K>) => void;
export type RegistOnBlur = (onBlurProps: OnBlurProps) => (e: FocusEvent<HTMLInputElement>) => void;
type OnBlurProps = {
    ErrorObj?: RegisterErrorObj;
    value: string;
    setError: (action: SetStore) => void;
};
export type RegistOnFocus = (e: FocusEvent<HTMLInputElement>) => void;
export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;
export type RegistOnSubmit = <T extends InitState>(FormState: () => T, ErrorState: () => T) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;
export type RegistOnValue = <T extends InitState>(setState: (action: SetStore) => void) => (asyncState: {
    [key in keyof T]?: string;
}) => void;
export {};
