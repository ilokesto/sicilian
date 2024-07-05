"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray = (thing) => {
    return "at" in thing;
};
const registOnBlur = ({ ErrorObj, value, setError }) => (e) => {
    if (ErrorObj) {
        for (const v in ErrorObj) {
            let flag = 0;
            switch (v) {
                case "required":
                    if (!value.length) {
                        // @ts-ignore
                        setError({ [e.target.name]: ErrorObj[v].message });
                        flag++;
                    }
                    break;
                case "minLength":
                    if (value.length < ErrorObj[v].number) {
                        // @ts-ignore
                        setError({ [e.target.name]: ErrorObj[v].message });
                        flag++;
                    }
                    break;
                case "maxLength":
                    if (value.length > ErrorObj[v].number) {
                        // @ts-ignore
                        setError({ [e.target.name]: ErrorObj[v].message });
                        flag++;
                    }
                    break;
                case "RegExp":
                    if (isArray(ErrorObj.RegExp)) {
                        for (const RegExp of ErrorObj.RegExp) {
                            if (!value.match(RegExp.RegExp)) {
                                // @ts-ignore
                                setError({ [e.target.name]: RegExp.message });
                                flag++;
                                if (flag === 1)
                                    break;
                            }
                        }
                    }
                    else {
                        if (!value.match(ErrorObj.RegExp.RegExp)) {
                            // @ts-ignore
                            setError({ [e.target.name]: ErrorObj.RegExp.message });
                            flag++;
                        }
                    }
                    break;
                case "customChecker":
                    if (isArray(ErrorObj.customChecker)) {
                        for (const customChecker of ErrorObj.customChecker) {
                            if (customChecker.checkFn(value)) {
                                // @ts-ignore
                                setError({ [e.target.name]: customChecker.message });
                                flag++;
                            }
                        }
                    }
                    else {
                        if (ErrorObj.customChecker.checkFn(value)) {
                            // @ts-ignore
                            setError({ [e.target.name]: ErrorObj.customChecker.message });
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
