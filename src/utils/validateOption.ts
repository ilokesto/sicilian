import type { InitState, RegisterErrorObj } from "../type";

export function validateOptions<T extends InitState>(option: RegisterErrorObj<T>): RegisterErrorObj<T> {
  return option
}