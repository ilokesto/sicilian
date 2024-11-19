import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import { init } from "./funcs/init";
// 실제 구현
export function Sicilian(initValueOrOptions, options) {
    const { props, rest } = init(initValueOrOptions, options);
    const register = useRegister(props);
    const handleSubmit = registOnSubmit(props);
    const handleValidate = (validator) => {
        return validator;
    };
    return { initValue: props.initValue, register, handleSubmit, handleValidate, ...rest };
}
;
