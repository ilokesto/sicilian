import { ChangeEvent, Context } from "react";
import { Formula } from "../Formula";
declare const useRegister: (form: Context<Formula>) => (name: string) => {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
};
export default useRegister;
