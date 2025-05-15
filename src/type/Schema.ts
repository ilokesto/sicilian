import { type z } from "zod";
import * as yup from "yup";
import type { Struct } from "superstruct";
import type { InitState } from "./Store";

export type Schema<T extends InitState> = ValidateSchema<T>[keyof ValidateSchema<T>]

export type ValidateSchema<T extends InitState> = {
  zod:
    | z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, T>
    | z.ZodEffects<z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, T>>;
  yup: yup.ObjectSchema<T>;
  superstruct: Struct<T>;
}

export type Resolver<T extends InitState> = {
  validate: (state: T, name: string) => boolean;
  formatError: (state: T, name: string) => string | undefined;
};