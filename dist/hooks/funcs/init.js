import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";
export const init = (initValue) => {
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "";
        return acc;
    }, {});
    const FormStore = createFormStore(initValue);
    const ErrorStore = createFormStore(errorValue);
    function FormState(name) {
        return name ? useContextState(FormStore, name) : useContextState(FormStore);
    }
    function ErrorState(name) {
        return name ? useContextState(ErrorStore, name) : useContextState(ErrorStore);
    }
    const setForm = FormStore.setStore;
    const setError = ErrorStore.setStore;
    const clearForm = () => setForm(initValue);
    return { FormStore, ErrorStore, FormState, ErrorState, setForm, setError, clearForm };
};
