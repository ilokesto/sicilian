/// <reference types="react" />
import { FormProvider, getContext } from "./hooks/useFormContext";
declare const playDragon: <T extends import("./hooks/types").InitState>(initValue: T) => {
    initValue: T;
    register: import("./hooks/types").Register<T>;
    FormState: () => T;
    ErrorState: () => T;
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<T>) => void;
    handleSubmit: (fn: (data: T) => void | Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Partial<Record<keyof T, import("./hooks/types").RegisterErrorObj<T>>>) => Partial<Record<keyof T, import("./hooks/types").RegisterErrorObj<T>>>;
};
export { playDragon, getContext, FormProvider };
