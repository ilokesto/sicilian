import { ChangeEvent, Context, FormEvent } from "react";

export type InitState = { [key: string]: string };

export interface Store<T extends InitState> {
  getStore: () => T;
  setStore: (action: T) => void;
  subscribe: (callback: () => void) => () => void;
}

export type CreateFormStore = <T extends InitState>(initialState: T) => Store<T>;
export type RegExpErrorObj = { RegExp: RegExp; message: string };
export type CustomCheckerErrorObj = { checkFn: (value: string) => boolean; message: string };

export type RegisterErrorObj = {
  required?: { required: boolean; message: string };
  minLength?: { number: number; message: string };
  maxLength?: { number: number; message: string };
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
};

type OnBlurProps = {
  ErrorObj?: RegisterErrorObj;
  value: string;
  setError: (action: any) => void;
};

export type RegistOnBlur = (onBlurProps: OnBlurProps) => (e: ChangeEvent<HTMLInputElement>) => void;

export type RegistOnChange = <T extends InitState>(
  setStore: (action: T) => void
) => (e: ChangeEvent<HTMLInputElement>, customValue?: string) => void;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T
) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;

export type RegistOnFocus = (e: ChangeEvent<HTMLInputElement>) => void;

export type Register<K> = (
  name: K,
  ErrorObj?: RegisterErrorObj
) => {
  value: string;
  name: K;
  onChange: ReturnType<RegistOnChange>;
  onBlur: ReturnType<RegistOnBlur>;
  onFocus: RegistOnFocus;
};

export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<keyof T>;
export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;
