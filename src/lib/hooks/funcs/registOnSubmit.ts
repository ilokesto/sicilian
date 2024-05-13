import { RegistOnSubmit } from "../Types";

const registOnSubmit: RegistOnSubmit = (FormState, ErrorState) => (fn) => async (e) => {
  e.preventDefault();
  const formState = FormState();
  const errorState = ErrorState();

  for (const v of Object.values(errorState)) {
    if (v !== "") return;
  }

  await fn({ a: "A", ...formState });
};

export default registOnSubmit;
