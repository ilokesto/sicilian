import { RegistOnChange } from "../Types";

const registOnChange: RegistOnChange = (setStore) => (e) => {
  setStore({ [e.target.name]: e.target.value });
};

export default registOnChange;
