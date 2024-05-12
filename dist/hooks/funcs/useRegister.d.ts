import { Context } from "react";
import { Form, InitState, Register } from "../Types";
declare const useRegister: <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) => Register<keyof T>;
export default useRegister;
