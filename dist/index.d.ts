/// <reference types="react" />
declare const playDragon: <T extends object>(initialState: T) => {
    register: import("./hooks/Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
};
export { playDragon };
