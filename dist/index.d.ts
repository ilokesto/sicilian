/// <reference types="react" />
import { FormProvider, getContext } from "./hooks/useFormContext";
declare const playDragon: <T extends import("./hooks/types").InitState>(initValue: T) => {
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
    register: import("./hooks/types").Register<T>;
    handleSubmit: (fn: (data: T) => void | Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Partial<Record<keyof T, import("./hooks/types").RegisterErrorObj<T>>>) => Partial<Record<keyof T, import("./hooks/types").RegisterErrorObj<T>>>;
};
export { playDragon, getContext, FormProvider };
