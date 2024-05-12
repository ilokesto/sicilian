import { Context } from "react";
import { Form, InitState } from "../Types";
declare const registOnSubmit: <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) => (fn: (data: InitState) => Promise<void>) => (e: SubmitEvent) => Promise<void>;
export default registOnSubmit;
