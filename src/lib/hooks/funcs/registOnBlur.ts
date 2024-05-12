import { ChangeEvent } from "react";
import { ErrorObj, RegExpErrorObj } from "../Types";
import { InitState } from "../Types";

type OnBlurProps = {
  ErrorObj?: ErrorObj;
  value: string;
  setError: (action: any) => void;
};

const isArray = (thing: RegExpErrorObj | Array<RegExpErrorObj>): thing is Array<RegExpErrorObj> => {
  return "at" in thing;
};

const registOnBlur =
  ({ ErrorObj, value, setError }: OnBlurProps) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    if (ErrorObj) {
      for (const v in ErrorObj) {
        let flag = 0;

        switch (v) {
          case "required":
            if (!value.length) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "minLength":
            if (value.length < ErrorObj[v]!.number) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "maxLength":
            if (value.length > ErrorObj[v]!.number) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "RegExp":
            if (isArray(ErrorObj.RegExp!)) {
              for (const RegExp of ErrorObj.RegExp!) {
                if (!value.match(RegExp.RegExp)) {
                  setError({ [e.target.name]: RegExp.message } as InitState);
                  flag++;

                  if (flag === 1) break;
                }
              }
            } else {
              if (!value.match(ErrorObj.RegExp!.RegExp)) {
                setError({ [e.target.name]: ErrorObj.RegExp!.message } as InitState);
                flag++;
              }
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
