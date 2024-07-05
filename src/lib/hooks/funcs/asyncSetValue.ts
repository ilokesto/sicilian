import { RegistOnValue } from "../Types";

const registOnValue: RegistOnValue = (FormStore) => (asyncState) => {
  FormStore(asyncState);
};

export default registOnValue;
