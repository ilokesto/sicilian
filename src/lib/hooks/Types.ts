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

export type Register<K> = (
  name: K,
  ErrorObj?: RegisterErrorObj
) => {
  value: string;
  name: K;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<keyof T>;
export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;

type OnBlurProps = {
  ErrorObj?: RegisterErrorObj;
  value: string;
  setError: (action: any) => void;
};

export type RegistOnBlur = (onblurProps: OnBlurProps) => (e: ChangeEvent<HTMLInputElement>) => void;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T
) => (fn: (data: InitState) => void) => (e: FormEvent) => void;
