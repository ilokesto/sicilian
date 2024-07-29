"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray = (thing) => {
    return "at" in thing;
};
const isNumber = (thing) => {
    return typeof thing === "number";
};
const registOnBlur = ({ ErrorObj, value, store, setError }) => (e) => {
    if (ErrorObj) {
        for (const v in ErrorObj) {
            let flag = 0;
            switch (v) {
                case "required":
                    if (!value.length) {
                        // @ts-ignore
                        setError({ [e.target.name]: ErrorObj[v].message ?? `${e.target.name}는 비어있을 수 없습니다.` });
                        flag++;
                    }
                    break;
                case "minLength":
                    if (isNumber(ErrorObj[v])) {
                        if (value.length < ErrorObj[v]) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: `${e.target.name}는 ${ErrorObj[v]}자 이상이어야 합니다.`,
                            });
                            flag++;
                        }
                    }
                    else {
                        if (value.length < ErrorObj[v].number) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: ErrorObj[v].message ?? `${e.target.name}는 ${ErrorObj[v].number}자 이상이어야 합니다.`,
                            });
                            flag++;
                        }
                    }
                    break;
                case "maxLength":
                    if (isNumber(ErrorObj[v])) {
                        if (value.length > ErrorObj[v]) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: `${e.target.name}는 ${ErrorObj[v]}자 이하여야 합니다.`,
                            });
                            flag++;
                        }
                    }
                    else {
                        if (value.length > ErrorObj[v].number) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: ErrorObj[v].message ?? `${e.target.name}는 ${ErrorObj[v].number}자 이하여야 합니다.`,
                            });
                            flag++;
                        }
                    }
                    break;
                case "RegExp":
                    if (isArray(ErrorObj.RegExp)) {
                        for (const RegExp of ErrorObj.RegExp) {
                            if (!RegExp.RegExp.test(value)) {
                                // @ts-ignore
                                setError({
                                    [e.target.name]: RegExp.message ?? `${e.target.name}의 값이 정규표현식을 만족하지 않습니다.`,
                                });
                                flag++;
                                break;
                            }
                        }
                    }
                    else {
                        if (!ErrorObj.RegExp.RegExp.test(value)) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: ErrorObj.RegExp.message ?? `${e.target.name}의 값이 정규표현식을 만족하지 않습니다.`,
                            });
                            flag++;
                        }
                    }
                    break;
                case "customChecker":
                    if (isArray(ErrorObj.customChecker)) {
                        for (const customChecker of ErrorObj.customChecker) {
                            if (customChecker.checkFn(value, store)) {
                                // @ts-ignore
                                setError({
                                    [e.target.name]: customChecker.message ?? `${e.target.name}의 값이 검증 함수를 만족하지 않습니다.`,
                                });
                                flag++;
                                break;
                            }
                        }
                    }
                    else {
                        if (ErrorObj.customChecker.checkFn(value, store)) {
                            // @ts-ignore
                            setError({
                                [e.target.name]: ErrorObj.customChecker.message ?? `${e.target.name}의 값이 검증 함수를 만족하지 않습니다.`,
                            });
                            flag++;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (flag === 1)
                break;
        }
    }
};
exports.default = registOnBlur;
