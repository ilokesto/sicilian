import { ChangeEvent } from "react";
import { InitState } from "../Sicilian";
declare const registOnChange: <T extends InitState>(setStore: (action: T) => void) => (e: ChangeEvent<HTMLInputElement>) => void;
export default registOnChange;
