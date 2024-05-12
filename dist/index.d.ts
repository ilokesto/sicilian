declare const playDragon: <T extends import("./hooks/Types").InitState>(initialState: T) => {
    register: import("./hooks/Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: import("./hooks/Types").InitState) => Promise<void>) => (e: SubmitEvent) => Promise<void>;
};
export { playDragon };
