import { ChangeEvent } from "react";
import { ErrorObj } from "./useRegister";
import { InitState } from "../Formula";

type OnBlurProps = {
  ErrorObj?: ErrorObj;
  value: string;
  setError: (action: any) => void;
};

const registOnBlur =
  ({ ErrorObj, value, setError }: OnBlurProps) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    if (ErrorObj) {
      for (const v in ErrorObj) {
        let flag = 0;

        switch (v) {
          case "minLength":
            if (value.length < ErrorObj[v].number) {
              setError({ [e.target.name]: ErrorObj[v]?.message } as InitState);
              flag++;
            }
            break;

          case "maxLength":
            if (value.length > ErrorObj[v].number) {
              setError({ [e.target.name]: ErrorObj[v]?.message } as InitState);
              flag++;
            }
            break;

          case "RegExp":
            if (!value.match(ErrorObj[v].RegExp)) {
              setError({ [e.target.name]: ErrorObj[v]?.message } as InitState);
              flag++;
            }
            break;

          default:
            break;
        }

        if (flag === 1) break;
      }
    }
  };

export default registOnBlur;
