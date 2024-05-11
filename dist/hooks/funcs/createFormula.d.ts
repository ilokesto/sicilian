import { Form, InitState } from "../Sicilian";
declare const createFormula: <T extends InitState>(initialState: T) => Form<T>;
export default createFormula;
