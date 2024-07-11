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

  const cleanState = async () => {
    const newObj = {} as any;

    for (const key in formState) {
      newObj[key] = "" as any;
    }

    setStore(newObj);
  };

  await cleanState();
};

export default registOnSubmit;
