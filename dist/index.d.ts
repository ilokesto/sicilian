/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Types").InitState>(initialState: T) => {
    register: import("./hooks/Types").Register;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    handleValue: (a: Record<keyof T, string>) => void;
};
export { playDragon };
