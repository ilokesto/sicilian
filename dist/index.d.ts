/// <reference types="react" />
declare const playDragon: <T extends import("./hooks/Sicilian").InitState>(initialState: T) => {
    register: (name: string, ErrorObj?: import("./hooks/funcs/useRegister").ErrorObj | undefined) => {
        value: string;
        onChange: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        onBlur: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        onFocus: (e: import("react").ChangeEvent<HTMLInputElement>) => void;
        name: string;
    };
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: import("./hooks/Sicilian").InitState) => Promise<void>) => (e: SubmitEvent) => Promise<void>;
};
export { playDragon };
