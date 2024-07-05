import { RegistOnValue } from "../Types";

const registOnValue: RegistOnValue = (setState) => (asyncState) => {
  // @ts-ignore
  setState(asyncState);
};

export default registOnValue;
