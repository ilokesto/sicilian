import { ReactNode } from "react";
import { ExtractKeys, InitState, Register, RegisterErrorObj } from "./";
export type FormProviderProps<T extends InitState> = {
    children: ReactNode;
    register: Register<T>;
    validateOption?: RegisterErrorObj<T>;
    name: ExtractKeys<T>;
};
export type GetContextFn<T extends InitState> = Omit<FormProviderProps<T>, "children">;
