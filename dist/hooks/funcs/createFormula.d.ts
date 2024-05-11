import { Form, InitState } from "../Formula";
declare const createFormula: <T extends InitState>(initialState: T) => Form<T>;
export default createFormula;
