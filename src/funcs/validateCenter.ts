import type { ExecValidate, RegisterErrorObj } from "../types";

const isArray = <T extends object>(thing: T | Array<T>): thing is Array<T> => {
  return "at" in thing;
};

const isNumber = (thing: number | { number: number; message?: string }): thing is number => {
  return typeof thing === "number";
};

export const execValidate: ExecValidate =
  ({ getStore, setError, getErrorObjStore }) =>
  (e) => {
    type T = typeof getStore extends () => infer U ? U : never;
    const { name, value } = e.target;
    const store = getStore()
    const ErrorObj = getErrorObjStore()[name] as RegisterErrorObj<T>;

    let message = ""

    if (ErrorObj) {
      let flag = 0;

      for (const propertyKey in ErrorObj) {
        switch (propertyKey) {
          case "required":
            if (!value.length) {
              message = typeof ErrorObj[propertyKey] === "object"
                ? ErrorObj[propertyKey]!.message
                : `${name}는 비어있을 수 없습니다.`
              flag++;
            }
            break;

          case "minLength":
            if (isNumber(ErrorObj[propertyKey]!)) {
              if (value.length < ErrorObj[propertyKey]!) {
                message = `${name}는 ${ErrorObj[propertyKey]!}자 이상이어야 합니다.`,
                flag++;
              }
            } else {
              if (value.length < ErrorObj[propertyKey]!.number) {
                message = ErrorObj[propertyKey]!.message ?? `${name}는 ${ErrorObj[propertyKey]!.number}자 이상이어야 합니다.`,
                flag++;
              }
            }
            break;

          case "maxLength":
            if (isNumber(ErrorObj[propertyKey]!)) {
              if (value.length > ErrorObj[propertyKey]!) {
                message = `${name}는 ${ErrorObj[propertyKey]!}자 이하여야 합니다.`,
                flag++;
              }
            } else {
              if (value.length > ErrorObj[propertyKey]!.number) {
                message = ErrorObj[propertyKey]!.message ?? `${name}는 ${ErrorObj[propertyKey]!.number}자 이하여야 합니다.`,
                flag++;
              }
            }
            break;

          case "RegExp":
            if (isArray(ErrorObj.RegExp!)) {
              for (const RegExp of ErrorObj.RegExp!) {
                if (!RegExp.RegExp.test(value)) {
                  message = RegExp.message ?? `${name}의 값이 정규표현식을 만족하지 않습니다.`,
                  flag++;
                  break;
                }
              }
            } else {
              if (!ErrorObj.RegExp!.RegExp.test(value)) {
                message = ErrorObj.RegExp!.message ?? `${name}의 값이 정규표현식을 만족하지 않습니다.`,
                flag++;
              }
            }
            break;

          case "customChecker":
            if (isArray(ErrorObj.customChecker!)) {
              for (const customChecker of ErrorObj.customChecker!) {
                if (!customChecker.checkFn(value, store)) {
                  message = customChecker.message ?? `${name}의 값이 검증 함수를 만족하지 않습니다.`,
                  flag++;
                  break;
                }
              }
            } else {
              if (!ErrorObj.customChecker!.checkFn(value, store)) {
                message = ErrorObj.customChecker!.message ?? `${name}의 값이 검증 함수를 만족하지 않습니다.`,
                flag++;
              }
            }
            break;

          default:
            break;
        }

        if (flag === 1) {
          setError({[name]: message} as Partial<T>);
          break;
        }
      }
    }
  };
