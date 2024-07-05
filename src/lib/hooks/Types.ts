import { ChangeEvent, Context, FormEvent } from "react";

export type Input<K> = ChangeEvent<HTMLInputElement> & { target: { name: K; value: string } };
export type InitState = { [key: string]: string };
export type SetStore = <K extends string>(action: { [key in K]: string }) => void;

export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;

export type Store<T extends InitState> = {
  getStore: () => T;
  setStore: (action: SetStore) => void;
  subscribe: (callback: () => void) => () => void;
};

export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register;

export type Register = <K extends string>(
  name: K,
  ErrorObj?: RegisterErrorObj
) => {
  value: string;
  name: K;
  onChange: ReturnType<RegistOnChange<K>>;
  onBlur: ReturnType<RegistOnBlur>;
  onFocus: RegistOnFocus;
};

export type RegisterErrorObj = {
  required?: { required: boolean; message: string };
  minLength?: { number: number; message: string };
  maxLength?: { number: number; message: string };
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
};
export type RegExpErrorObj = { RegExp: RegExp; message: string };
export type CustomCheckerErrorObj = { checkFn: (value: string) => boolean; message: string };

export type RegistOnChange<K> = (setStore: (action: SetStore) => void) => (e: Input<K>) => void;

export type RegistOnBlur = <K>(onBlurProps: OnBlurProps) => (e: Input<K>) => void;
type OnBlurProps = {
  ErrorObj?: RegisterErrorObj;
  value: string;
  setError: (action: SetStore) => void;
};

export type RegistOnFocus = <K>(e: Input<K>) => void;

export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;

export type RegistOnSubmit = <T extends InitState>(
  FormState: () => T,
  ErrorState: () => T
) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;

export type RegistOnValue = <T extends InitState>(setState: (action: SetStore) => void) => (asyncState: any) => void;
