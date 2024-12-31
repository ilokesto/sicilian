import type { ReactElement } from "react";
import type { ExtractKeys, InitState, Register, RegisterErrorObj } from "./";
import { Sicilian } from "../Sicilian";
export type SicilianProviderProps<T extends InitState> = {
    children: ReactElement;
    value: {
        register: Register<T>;
        validateOption?: RegisterErrorObj<T>;
        name: ExtractKeys<T>;
    } & Partial<Pick<ReturnType<typeof Sicilian<T>>, "FormState" | "ErrorState">>;
};
export type GetContextFn<T extends InitState> = Required<Omit<SicilianProviderProps<T>, "children" | "validateOption">["value"]> & {
    validateOption?: RegisterErrorObj<T>;
};
