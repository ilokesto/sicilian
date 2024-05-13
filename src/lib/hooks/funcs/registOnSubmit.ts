import { RegistOnSubmit } from "../Types";

const registOnSubmit: RegistOnSubmit = (FormState, ErrorState) => (fn) => async (e) => {
  e.preventDefault();
  const formState = FormState();
  const errorState = ErrorState();

  for (const v of Object.values(errorState)) {
    if (v !== "") return;
  }

  fn(formState);
};

export default registOnSubmit;
