import { RegistOnChange } from "../Types";

const registOnChange: RegistOnChange<any> = (setStore) => (e) => {
  setStore({ [e.target.name]: e.target.value });
};

export default registOnChange;
