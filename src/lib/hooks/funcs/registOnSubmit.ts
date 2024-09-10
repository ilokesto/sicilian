import { RegistOnSubmit } from "../Types";

const registOnSubmit: RegistOnSubmit = (FormState, ErrorState) => (fn) => async (e) => {
  e.preventDefault();

  const formState = FormState();
  const errorState = ErrorState();

  // 에러가 하나라도 있으면 return
  for (const v of Object.values(errorState)) {
    if (v !== "") return;
  }

  // 모든 value가 비어있으면 return
  let count = 0;
  let length = 0;
  for (const v of Object.values(formState)) {
    if (v === "") count++;
    length++;
  }
  if (count === length) return;


  try {
    fn(formState);
    
    // 성공할 경우 value 비우는 로직
  } catch (e) {

  }







};

export default registOnSubmit;
