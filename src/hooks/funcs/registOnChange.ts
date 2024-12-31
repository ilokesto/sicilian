import type { RegistOnChange } from "../types";

const registOnChange: RegistOnChange = (setStore) => (e) => {
  // @ts-ignore
  setStore({ [e.target.name]: e.target.value })
};

export default registOnChange;
