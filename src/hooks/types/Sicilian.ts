import { FormEvent } from "react";
import type { InitState, Store, ExtractKeys } from "./"

// Sicilian.ts
export type ValidateOn = "blur" | "submit" | "all";

export type SicilianProps<T extends InitState> = {
  initValue: T,
  validateOn?: ValidateOn,
  validateOption?: Partial<Record<keyof T, RegisterErrorObj<T>>>,
  clearFormOnSubmit?: boolean
}


// createFormStore.ts
export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type UseRegister = <T extends InitState>(FromStore: Store<T>, ErrorStore: Store<T>, validateOn: ValidateOn, validateOption?: Partial<Record<keyof T, RegisterErrorObj<T>>>) => Register<T>;

export type Register<T extends InitState> = (
  name: ExtractKeys<T>,
  ErrorObj?: RegisterErrorObj<T>
) => {
  value: string;
  name: ExtractKeys<T>;
  id: ExtractKeys<T>;
  onChange: OnChange;
  onBlur?: OnBlur;
  onFocus: RegistOnFocus;
};

export type RegistOnBlur = <T extends InitState>(onBlurProps: OnBlurProps<T>) => OnBlur;
export type OnBlur = (e: { target: { name: string; value: string } }) => void;
type OnBlurProps<T extends InitState> = {
  getStore: () => T;
  ErrorObj?: RegisterErrorObj<T>;
  setError: (action: Partial<T>) => void;
  validateOption?: Partial<Record<keyof T, RegisterErrorObj<T>>>;
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

export type RegistOnChange = <T extends InitState>(setStore: (value: Partial<T>) => void) => OnChange
export type OnChange = (e: { target: { name: string; value: string } }) => void;

export type RegistOnFocus = (e: { target: { name: string; value: string } }) => void;

// registOnSubmit.ts
export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T,
  clearForm: () => void,
  clearFormOnSubmit: boolean | undefined,
) => (fn: (data: T, event?: FormEvent) => Promise<unknown> | unknown) => (e: FormEvent) => void;
