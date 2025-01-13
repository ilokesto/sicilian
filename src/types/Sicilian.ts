import type { FormEvent } from "react";
import type { InitState, Store, ExtractKeys, RegisterErrorObj, Validator } from "../types"
import type { init } from "../funcs/init";

// Sicilian.ts
export type InitObject<T extends InitState> = {
  initValue: T,
  validateOn?: Array<"blur" | "submit">,
  validator?: Validator<T>,
  clearFormOn?: Array<"submit" | "routeChange">
}

export type State<T extends InitState> = {
  (): T;
  (name: ExtractKeys<T>): T[ExtractKeys<T>];
}

export type SicilianEvent = { target: { name: string; value: string } }; 
export type UseRegister = <T extends InitState>(props: ReturnType<typeof init<T>>["props"] & { FormState:  ReturnType<typeof init<T>>["rest"]["FormState"] }
) => (
  name: ExtractKeys<T>,
  ErrorObj?: RegisterErrorObj<T>
) => {
  value: string;
  name: ExtractKeys<T>;
  id: ExtractKeys<T>;
  onBlur?: ReturnType<RegistOnBlur>;
  onChange: (e: SicilianEvent) => void;
  onFocus: (e: SicilianEvent) => void;
};

export type RegistOnBlur = <T extends InitState>(onBlurProps: {
  getStore: () => T;
  ErrorObj?: RegisterErrorObj<T>;
  setError: (action: Partial<T>) => void;
  validator?: Partial<Record<keyof T, RegisterErrorObj<T>>>;
}) => (e: { target: { name: string; value: string } }) => void;

// handleValidate

// registOnSubmit.ts
export type RegistOnSubmit = <T extends InitState>(
  props: 
  {
    FormStore: Store<T>,
    ErrorStore:  Store<T>,
  ErrorObjStore: Store<T>,
  clearForm: () => void,
  clearFormOn: InitObject<T>["clearFormOn"],
  validateOn: InitObject<T>["validateOn"],
  validator?: Partial<Record<keyof T, RegisterErrorObj<T>>>}
) => (fn: (data: T, event?: FormEvent) => Promise<unknown> | unknown) => (e: FormEvent) => void;

