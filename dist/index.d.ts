/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Types").InitState>(initialState: T) => {
    register: import("./hooks/Types").Register;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    setValue: (asyncState: { [key in keyof T]?: string | undefined; }) => void;
    handleValidate: (validator: Partial<Record<keyof T, import("./hooks/Types").RegisterErrorObj>>) => Partial<Record<keyof T, import("./hooks/Types").RegisterErrorObj>>;
};
export { playDragon };
