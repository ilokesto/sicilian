import { ChangeEvent } from "react";
import { InitState } from "../Types";
declare const registOnChange: <T extends InitState>(setStore: (action: T) => void) => (e: ChangeEvent<HTMLInputElement>) => void;
export default registOnChange;
