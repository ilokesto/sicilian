import { createContext, useState } from "react";
import useRegister from "./funcs/useRegister";
import createFormula from "./funcs/createFormula";
import useContextState from "./funcs/useContextState";
import registOnSubmit from "./funcs/registOnSubmit";
import { Form, InitState } from "./Types";

export const Sicilian = <T extends InitState>(initialState: T) => {
  const Form = createContext<Form<T>>(createFormula(initialState));
  const Error = createContext<Form<T>>(createFormula(initialState));

  const [disabled, setDisabled] = useState(false);

  const register = useRegister<T>(Form, Error);

  const FormState = () => useContextState(Form);
  const ErrorState = () => useContextState(Error);

  const handleSubmit = registOnSubmit(Form, Error);

  return { register, FormState, ErrorState, handleSubmit };
};
