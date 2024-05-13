/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Types").InitState>(initialState: T) => {
    register: import("./hooks/Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: import("./hooks/Types").InitState) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
};
export { playDragon };
