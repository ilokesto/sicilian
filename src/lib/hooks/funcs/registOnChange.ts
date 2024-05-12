import { ChangeEvent } from "react";
import { InitState } from "../Types";

const registOnChange =
  <T extends InitState>(setStore: (action: T) => void) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setStore({ [name]: value } as T);
  };

export default registOnChange;
