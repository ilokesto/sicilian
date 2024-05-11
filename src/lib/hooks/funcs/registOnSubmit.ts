import { InitState } from "../Sicilian";

const registOnSubmit =
  <T extends InitState>(formState: T, errorState: T) =>
  (fn: (data: InitState) => Promise<void>) =>
  async (e: SubmitEvent) => {
    e.preventDefault();

    for (const v of Object.values(errorState)) {
      if (v !== "") return;
    }

    await fn(formState);
  };

export default registOnSubmit;
