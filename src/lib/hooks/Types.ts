import { Context, FocusEvent, FormEvent } from "react";

type Key = string;

export type Input<K> = { target: { name: K; value: string } };
export type InitState = {
  [key in Key]: string;
};

export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type Store<T extends InitState> = {
  getStore: () => T;
  setStore: (action: InitState) => void;
  subscribe: (callback: () => void) => () => void;
};

export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<T>;

export type Register<T extends InitState> = (
  name: keyof T,
  ErrorObj?: RegisterErrorObj<T>
) => {
  value: string;
  name: keyof T;
  onChange: ReturnType<RegistOnChange<T[keyof T]>>;
  onBlur: OnBlur<T>;
  onFocus: RegistOnFocus<T>;
};

export type RegistOnBlur = <T extends InitState>(onBlurProps: OnBlurProps<T>) => OnBlur<T>;
export type OnBlur<T extends InitState> = (e: Input<T[keyof T]>) => void;

type OnBlurProps<T extends InitState> = {
  store: T;
  value: string;
  ErrorObj?: RegisterErrorObj<T>;
  setError: (action: InitState) => void;
};

export type Validator<T extends InitState> = Partial<Record<T[keyof T], RegisterErrorObj<T>>>;

export type RegisterErrorObj<T extends InitState> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj<T> | Array<CustomCheckerErrorObj<T>>;
};

export type RegExpErrorObj = { RegExp: RegExp; message?: string };
export type CustomCheckerErrorObj<T extends InitState> = {
  checkFn: (value: string, store: { [key in keyof T]: string }) => boolean;
  message?: string;
};

export type RegistOnChange<K extends Key> = (setStore: (action: InitState) => void) => (e: Input<K>) => void;

export type RegistOnFocus<T extends InitState> = (e: Input<T[keyof T]>) => void;

export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T
) => (fn: (data: T) => void) => (e: FormEvent) => void;

export type RegistOnValue = <T extends InitState>(
  setState: (action: InitState) => void
) => (asyncState: { [key in keyof T]?: string }) => void;
