import { type z } from "zod";
import * as yup from "yup";
import type { Struct } from "superstruct";
import type { InitState } from "./Store";

export type Schema<T extends InitState> = ValidateSchema<T>[keyof ValidateSchema<T>]

export type ValidateSchema<T extends InitState> = {
  zod: z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, T>;
  yup: yup.ObjectSchema<T>;
  superstruct: Struct<T>;
}

export type SchemaValidator = {
  validate: (state: unknown, name: string) => boolean;
  formatError: (state: unknown, name: string) => string | undefined;
};

// 타입 가드 함수 추가
export function isZodSchema<T extends InitState>(validator: any): validator is ValidateSchema<T>["zod"] {
  return validator && typeof validator.parse === 'function' && typeof validator.safeParse === 'function';
}

export function isYupSchema<T extends InitState>(validator: any): validator is ValidateSchema<T>["yup"] {
  return validator instanceof (require("yup").Schema);
}

export function isSuperstructSchema<T extends InitState>(validator: any): validator is ValidateSchema<T>["superstruct"] {
  return validator instanceof (require("superstruct").Struct);
}