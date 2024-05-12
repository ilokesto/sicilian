import { Context, useContext } from "react";
import { Form, InitState } from "../Types";

const registOnSubmit =
  <T extends InitState>(Form: Context<Form<T>>, Error: Context<Form<T>>) =>
  (fn: (data: InitState) => Promise<void>) =>
  async (e: SubmitEvent) => {
    const { getStore } = useContext(Form);
    const { getStore: getError } = useContext(Error);

    const errorState = getError();
    const formState = getStore();

    e.preventDefault();

    for (const v of Object.values(errorState)) {
      if (v !== "") return;
    }

    await fn(formState);
  };

export default registOnSubmit;
