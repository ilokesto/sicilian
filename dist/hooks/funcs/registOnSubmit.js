import isAllInputEmpty from "../utils/isAllInputEmpty";
import isErrorExist from "../utils/isErrorExist";
const registOnSubmit = (FormState, ErrorState, clearForm) => (fn) => async (e) => {
    e.preventDefault();
    const formState = FormState();
    const errorState = ErrorState();
    // 에러가 하나라도 있으면 return
    if (isErrorExist(errorState))
        return;
    // 모든 value가 비어있으면 return
    if (isAllInputEmpty(formState))
        return;
    try {
        await fn(formState);
        clearForm();
    }
    catch (e) {
        console.log(e);
    }
};
export default registOnSubmit;
