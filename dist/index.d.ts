/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Types").InitState>(initValue: T) => {
    initValue: T;
    register: import("./hooks/Types").Register<T[keyof T]>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => void) => (e: import("react").FormEvent<Element>) => void;
    setValue: (asyncState: { [key in keyof T]?: string | undefined; }) => void;
    handleValidate: (validator: Partial<Record<T[keyof T], import("./hooks/Types").RegisterErrorObj<T[keyof T]>>>) => Partial<Record<T[keyof T], import("./hooks/Types").RegisterErrorObj<T[keyof T]>>>;
};
export { playDragon };
