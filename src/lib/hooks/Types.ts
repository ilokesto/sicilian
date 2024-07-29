import { Context, FocusEvent, FormEvent } from "react";

type Key = string;

export type Input<K> = { target: { name: K; value: string } };
export type InitState = {
  [key in Key]: string;
};
export type SetStore<K extends Key> = (action: { [key in K]: string }) => void;

export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type Store<T extends InitState> = {
  getStore: () => T;
  setStore: (action: SetStore<T[keyof T]>) => void;
  subscribe: (callback: () => void) => () => void;
};

export type UseRegister = <T extends InitState>(
  From: Context<Store<T>>,
  Error: Context<Store<T>>
) => Register<T[keyof T]>;

export type Register<K extends Key> = (
  name: K,
  ErrorObj?: RegisterErrorObj<K>
) => {
  value: string;
  name: K;
  onChange: ReturnType<RegistOnChange<K>>;
  onBlur: ReturnType<RegistOnBlur<K>>;
  onFocus: RegistOnFocus;
};

export type RegistOnBlur<K extends Key> = (onBlurProps: OnBlurProps<K>) => (e: Input<K>) => void;

type OnBlurProps<K extends Key> = {
  store: Record<K, string>;
  value: string;
  ErrorObj?: RegisterErrorObj<K>;
  setError: (action: SetStore<K>) => void;
};

export type Validator<T extends InitState> = Partial<Record<T[keyof T], RegisterErrorObj<T[keyof T]>>>;

export type RegisterErrorObj<K extends Key> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj<K> | Array<CustomCheckerErrorObj<K>>;
};

export type RegExpErrorObj = { RegExp: RegExp; message?: string };
export type CustomCheckerErrorObj<K extends Key> = {
  checkFn: (value: string, store: Record<K, string>) => boolean;
  message?: string;
};

export type RegistOnChange<K extends Key> = (setStore: (action: SetStore<K>) => void) => (e: Input<K>) => void;

export type RegistOnFocus = (e: FocusEvent<HTMLInputElement>) => void;

export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T
) => (fn: (data: T) => void) => (e: FormEvent) => void;

export type RegistOnValue = <T extends InitState>(
  setState: (action: SetStore<T[keyof T]>) => void
) => (asyncState: { [key in keyof T]?: string }) => void;
