import { Form, InitState } from "../Types";
declare const createFormula: <T extends InitState>(initialState: T) => Form<T>;
export default createFormula;
