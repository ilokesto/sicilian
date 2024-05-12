import { Context } from "react";
import { Form, InitState } from "../Types";
declare const useContextState: <T extends InitState>(context: Context<Form<T>>) => T;
export default useContextState;
