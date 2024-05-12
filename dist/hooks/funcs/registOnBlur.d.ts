import { ChangeEvent } from "react";
import { ErrorObj } from "../Types";
type OnBlurProps = {
    ErrorObj?: ErrorObj;
    value: string;
    setError: (action: any) => void;
};
declare const registOnBlur: ({ ErrorObj, value, setError }: OnBlurProps) => (e: ChangeEvent<HTMLInputElement>) => void;
export default registOnBlur;
