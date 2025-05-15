import type { InitState, Resolver, ValidateSchema } from "../../type";
import * as yup from "yup";

// zod 스키마 래퍼
export function zodResolver<T extends InitState>(schema: ValidateSchema<T>["zod"]): Resolver<T> {
  return {
    validate: (state) => schema.safeParse(state).success,
    formatError: (state, name) => schema.safeParse(state).error?.format()[name]?._errors?.[0] ?? "",
  };
};

// yup 스키마 래퍼
export function yupResolver<T extends InitState>(schema: ValidateSchema<T>["yup"]): Resolver<T> {
  return {
    validate: (state, name) => {
      try {
        schema.validateSyncAt(name, state);
        return true;
      } catch {
        return false;
      }
    },
    formatError: (state, name) => {
      try {
        schema.validateSyncAt(name, state);
      } catch (e) {
        return (e as yup.ValidationError).message;
      }
    }
  };
}

// superstruct 스키마 래퍼
export function superstructResolver<T extends InitState>(schema: ValidateSchema<T>["superstruct"]): Resolver<T> {
  const { validate } = require("superstruct");

  return {
    validate: (state) => {
      const [error] = validate(state, schema);
      return !error;
    },
    formatError: (state, name) => {
      const [error] = validate(state, schema);
      if (!error) return '';

      const failure = error.failures().find((f: any) => f.path.join('.') === name);
      return failure?.message || '';
    },
  };
}