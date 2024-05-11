import { Context } from "react";
import { Form, InitState } from "../Sicilian";
declare const getState: <T extends InitState>(contest: Context<Form<T>>) => T;
export default getState;
