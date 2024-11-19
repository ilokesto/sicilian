import { InitState, RegisterErrorObj, SicilianProps, Validator } from "./types";
import { ComponentPropsWithoutRef, FormEvent } from "react";
interface SicilianFormProps<T> extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
    onSubmit: (data: T, event?: FormEvent) => Promise<unknown> | unknown;
}
export declare function Sicilian<T extends InitState>({ initValue, validateOption, validateOn, clearFormOnSubmit }: SicilianProps<T>): {
    FormState: {
        (): T;
        (name: Extract<keyof T, string>): string;
    };
    ErrorState: {
        (): T;
        (name: Extract<keyof T, string>): string;
    };
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<T>) => void;
    initValue: T;
    register: import("./types").Register<T>;
    handleSubmit: (fn: (data: T, event?: FormEvent) => Promise<unknown> | unknown) => (e: FormEvent) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<keyof T, RegisterErrorObj<T>>>;
    Form: ({ noValidate, onSubmit, children, ...props }: SicilianFormProps<T>) => import("react/jsx-runtime").JSX.Element;
};
export {};
