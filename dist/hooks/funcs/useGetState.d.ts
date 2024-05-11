import { Context } from "react";
import { Formula } from "../Formula";
declare const useGetState: (form: Context<Formula>) => () => import("../Formula").Store;
export default useGetState;
