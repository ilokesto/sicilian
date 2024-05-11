import { ChangeEvent, Context } from "react";
import { Form, InitState } from "../Sicilian";
export type RegExpErrorObj = {
    RegExp: RegExp;
    message: string;
};
export type ErrorObj = {
    required?: {
        required: boolean;
        message: string;
    };
    minLength?: {
        number: number;
        message: string;
    };
    maxLength?: {
        number: number;
        message: string;
    };
    RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
};
declare const useRegister: <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) => (name: string, ErrorObj?: ErrorObj) => {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
};
export default useRegister;
