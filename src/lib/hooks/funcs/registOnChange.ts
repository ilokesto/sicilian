import { RegistOnChange } from "../Types";

const registOnChange: RegistOnChange<string> = (setStore) => (e) => {
  // @ts-ignore
  setStore({ [e.target.name]: e.target.value });
};

export default registOnChange;
