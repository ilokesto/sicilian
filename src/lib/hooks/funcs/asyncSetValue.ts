import { RegistOnValue } from "../Types";

const registOnValue: RegistOnValue = (FormStore) => (fn) => {
  FormStore(fn);
};

export default registOnValue;
