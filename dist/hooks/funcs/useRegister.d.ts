import { ChangeEvent, Context } from "react";
import { Form, InitState } from "../Formula";
export type ErrorObj = {
    minLength?: {
        number: number;
        message: string;
    };
    maxLength?: {
        number: number;
        message: string;
    };
    RegExp?: {
        RegExp: RegExp;
        message: string;
    };
};
declare const useRegister: <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) => (name: string, ErrorObj?: ErrorObj) => {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
};
export default useRegister;
