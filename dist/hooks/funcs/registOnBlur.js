"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnBlur = ({ ErrorObj, value, setError }) => (e) => {
    if (ErrorObj) {
        for (const v in ErrorObj) {
            let flag = 0;
            switch (v) {
                case "minLength":
                    if (value.length < ErrorObj[v].number) {
                        setError({ [e.target.name]: ErrorObj[v]?.message });
                        flag++;
                    }
                    break;
                case "maxLength":
                    if (value.length > ErrorObj[v].number) {
                        setError({ [e.target.name]: ErrorObj[v]?.message });
                        flag++;
                    }
                    break;
                case "RegExp":
                    if (!value.match(ErrorObj[v].RegExp)) {
                        setError({ [e.target.name]: ErrorObj[v]?.message });
                        flag++;
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
