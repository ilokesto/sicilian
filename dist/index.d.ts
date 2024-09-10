/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Types").InitState>(initValue: T) => {
    initValue: T;
    register: import("./hooks/Types").Register<T>;
    FormState: () => T;
    ErrorState: () => any;
    setForm: (value: Partial<T>) => void;
    setError: (value: Partial<any>) => void;
    handleSubmit: (fn: (data: any) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValidate: (validator: Partial<Record<T[keyof T], import("./hooks/Types").RegisterErrorObj<T>>>) => Partial<Record<T[keyof T], import("./hooks/Types").RegisterErrorObj<T>>>;
};
export { playDragon };
