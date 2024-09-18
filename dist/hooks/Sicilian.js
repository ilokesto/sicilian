import useRegister from "./funcs/useRegister";
import registOnSubmit from "./funcs/registOnSubmit";
import { init } from "./funcs/init";
export const Sicilian = (initValue) => {
    const { FormStore, ErrorStore, clearForm, ...rest } = init(initValue);
    const register = useRegister(FormStore, ErrorStore);
    const handleSubmit = registOnSubmit(FormStore.getStore, ErrorStore.getStore, clearForm);
    const handleValidate = (validator) => {
        return validator;
    };
    return { initValue, register, handleSubmit, handleValidate, ...rest };
};
