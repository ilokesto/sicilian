import type { FormEvent } from "react";
import type { InitState, Store, ExtractKeys } from "./"
import type { init } from "../funcs/init";

// Sicilian.ts
export type SicilianInitObject<T extends InitState> = {
  initValue: T,
  validateOn?: Array<"blur" | "submit">,
  validator?: Partial<Record<keyof T, RegisterErrorObj<T>>>,
  clearFormOn?: Array<"submit" | "routeChange">
}

export type State<T extends InitState> = {
  (): T;
  (name: ExtractKeys<T>): T[ExtractKeys<T>];
}

// createFormStore.ts
export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type UseRegister = <T extends InitState>(props: ReturnType<typeof init<T>>["props"] & { FormState:  ReturnType<typeof init<T>>["rest"]["FormState"] }) =>
  Register<T>;

export type Register<T extends InitState> = (
  name: ExtractKeys<T>,
  ErrorObj?: RegisterErrorObj<T>
) => {
  value: string;
  name: ExtractKeys<T>;
  id: ExtractKeys<T>;
  onChange: RegistOnChange;
  onBlur?: OnBlur;
  onFocus: RegistOnFocus;
};

export type RegistOnBlur = <T extends InitState>(onBlurProps: OnBlurProps<T>) => OnBlur;
export type OnBlur = (e: { target: { name: string; value: string } }) => void;
type OnBlurProps<T extends InitState> = {
  getStore: () => T;
  ErrorObj?: RegisterErrorObj<T>;
  setError: (action: Partial<T>) => void;
  validator?: Partial<Record<keyof T, RegisterErrorObj<T>>>;
};

// handleValidate
export type Validator<T extends InitState> = Partial<Record<keyof T, RegisterErrorObj<T>>>;

export type RegisterErrorObj<T extends InitState> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj<T> | Array<CustomCheckerErrorObj<T>>;
};

type RegExpErrorObj = { RegExp: RegExp; message?: string };
type CustomCheckerErrorObj<T extends InitState> = {
  checkFn: (value: string, store: T) => boolean;
  message?: string;
};

export type RegistOnChange = (e: { target: { name: string; value: string } }) => void;

export type RegistOnFocus = (e: { target: { name: string; value: string } }) => void;

// registOnSubmit.ts
export type RegistOnSubmit = <T extends InitState>(
  props: 
  {
    FormStore: Store<T>,
    ErrorStore:  Store<T>,
  ErrorObjStore: Store<T>,
  clearForm: () => void,
  clearFormOn: SicilianInitObject<T>["clearFormOn"],
  validateOn: SicilianInitObject<T>["validateOn"],
  validator?: Partial<Record<keyof T, RegisterErrorObj<T>>>}
) => (fn: (data: T, event?: FormEvent) => Promise<unknown> | unknown) => (e: FormEvent) => void;

