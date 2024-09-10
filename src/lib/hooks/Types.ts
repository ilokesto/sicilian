import { Context, FormEvent } from "react";

export type Input<K> = { target: { name: K; value: string } };
export type InitState = {
  [x: string]: string;
};

export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type Store<T extends InitState> = {
  getStore: () => T;
  setStore: (value: Partial<T>) => void;
  subscribe: (callback: () => void) => () => void;
};

export type UseRegister = <T extends InitState>(FromStore: Store<T>, ErrorStore: Store<T>) => Register<T>;

export type Register<T extends InitState> = (
  name: keyof T,
  ErrorObj?: RegisterErrorObj<T>
) => {
  value: string;
  name: keyof T;
  id: keyof T;
  onChange: OnChange<T>;
  onBlur: OnBlur<T>;
  onFocus: RegistOnFocus<T>;
};

export type RegistOnBlur = <T extends InitState>(onBlurProps: OnBlurProps<T>) => OnBlur<T>;
export type OnBlur<T extends InitState> = (e: Input<T[keyof T]>) => void;
type OnBlurProps<T extends InitState> = {
  getStore: () => T;
  value: string;
  ErrorObj?: RegisterErrorObj<T>;
  setError: (action: Partial<T>) => void;
};

export type Validator<T extends InitState> = Partial<Record<T[keyof T], RegisterErrorObj<T>>>;

export type RegisterErrorObj<T extends InitState> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj<T> | Array<CustomCheckerErrorObj<T>>;
};

type RegExpErrorObj = { RegExp: RegExp; message?: string };
type CustomCheckerErrorObj<T extends InitState> = {
  checkFn: (value: string, store: { [key in keyof T]: string }) => boolean;
  message?: string;
};

export type RegistOnChange = <T extends InitState>(setStore: (value: Partial<T>) => void) => OnChange<T>
export type OnChange<T extends InitState> = (e: Input<T[keyof T]>) => void;

export type RegistOnFocus<T extends InitState> = (e: Input<T[keyof T]>) => void;

export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T,
  clearForm: () => void
) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;
