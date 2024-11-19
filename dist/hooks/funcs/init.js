import createFormStore from "./createFormStore";
import { useContextState } from "./useContextState";
// 실제 구현
export function init(initValueOrOptions, options) {
    let initValue;
    let validateOption;
    let validateOn = [];
    let clearFormOn = [];
    if (initValueOrOptions.initValue) {
        const options = initValueOrOptions;
        initValue = options.initValue;
        validateOption = options.validateOption;
        validateOn = options.validateOn ?? [];
        clearFormOn = options.clearFormOn ?? [];
    }
    else {
        initValue = initValueOrOptions;
        validateOption = options?.validateOption;
        validateOn = options?.validateOn ?? [];
        clearFormOn = options?.clearFormOn ?? [];
    }
    const errorValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "";
        return acc;
    }, {});
    const ErrorObjValue = Object.keys(initValue).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = "{}";
        return acc;
    }, {});
    const FormStore = createFormStore(initValue);
    const ErrorStore = createFormStore(errorValue);
    const ErrorObjStore = createFormStore(ErrorObjValue);
    function FormState(name) {
        return name ? useContextState(FormStore, name) : useContextState(FormStore);
    }
    function ErrorState(name) {
        return name ? useContextState(ErrorStore, name) : useContextState(ErrorStore);
    }
    const setForm = FormStore.setStore;
    const setError = ErrorStore.setStore;
    const clearForm = () => setForm(initValue);
    return { rest: { FormState, ErrorState, setForm, setError }, props: { FormStore, ErrorStore, ErrorObjStore, initValue, validateOption, validateOn, clearFormOn, clearForm } };
}
