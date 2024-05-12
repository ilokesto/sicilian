import { ChangeEvent } from "react";

export type InitState = { [key: string]: string };

export interface Form<T extends InitState> {
  getStore: () => T;
  setStore: (action: T) => void;
  subscribe: (callback: () => void) => () => void;
}

export type RegExpErrorObj = { RegExp: RegExp; message: string };

export type ErrorObj = {
  required?: { required: boolean; message: string };
  minLength?: { number: number; message: string };
  maxLength?: { number: number; message: string };
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
};

export type Register<K> = (
  name: K,
  ErrorObj?: ErrorObj
) => {
  value: string;
  name: K;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
};
