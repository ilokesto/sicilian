import { RegistOnChange } from "../Types";

const registOnChange: RegistOnChange = (setStore) => (e, customValue) => {
  const name = e.target.name;
  const value = customValue ?? e.target.value;
  setStore({ [name]: value } as Parameters<typeof setStore>[number]);
};

export default registOnChange;
