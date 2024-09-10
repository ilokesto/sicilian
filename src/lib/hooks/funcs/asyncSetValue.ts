import { useContext } from "react";
import { RegistOnValue } from "../Types";

const registOnValue: RegistOnValue = (Form) => (asyncState) => {
  const { setStore } = useContext(Form)

  setStore(asyncState);
};

export default registOnValue;


