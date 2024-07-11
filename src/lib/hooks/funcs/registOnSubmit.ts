import { RegistOnSubmit } from "../Types";

const registOnSubmit: RegistOnSubmit = (setStore, FormState, ErrorState) => (fn) => async (e) => {
  e.preventDefault();
  const formState = FormState();
  const errorState = ErrorState();

  for (const v of Object.values(errorState)) {
    if (v !== "") {
      return;
    }
  }

  let count = 0;
  let length = 0;
  for (const v of Object.values(formState)) {
    if (v === "") count++;
    length++;
  }
  if (count === length) return;

  await fn(formState);

  const cleanState = () => {
    for (const key in formState) {
      formState[key] = "" as any;
    }

    setStore(formState);
  };

  cleanState();
};

export default registOnSubmit;
