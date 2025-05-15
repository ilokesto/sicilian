import { isSuperstructSchema, isYupSchema, isZodSchema, type InitState, type Schema, type SchemaValidator, type ValidateSchema } from "../../type";
import * as yup from "yup";

function zodValidator<T extends InitState>(schema: ValidateSchema<T>["zod"]): SchemaValidator {
  return {
    validate: (state, name) => schema.shape[name].safeParse(state).success,
    formatError: (state, name) => schema.shape[name].safeParse(state).error?.format()?._errors[0] ?? "",
  };
};

// yup 스키마 래퍼
function yupValidator<T extends InitState>(schema: ValidateSchema<T>["yup"]): SchemaValidator {
  return {
    validate: (state, name) => {
      try {
        schema.validateSyncAt(name,{ [name] : state});
        return true;
      } catch {
        return false;
      }
    },
    formatError: (state, name) => {
      try {
        schema.validateSyncAt(name, { [name]: state });
      } catch (e) {
        const message = (e as yup.ValidationError).message;
        return message
      }
    }
  };
}

function superstructValidator<T extends InitState>(schema: ValidateSchema<T>["superstruct"]): SchemaValidator {
  const { validate: ssValidate, object } = require("superstruct");

  return {
    validate(state, name): boolean {
      try {
        const testObject = { [name]: state };
        const fieldSchema = (schema as any).schema?.[name];
        if (!fieldSchema) return true;
        
        const singleFieldSchema = object({ [name]: fieldSchema });
        const [error] = ssValidate(testObject, singleFieldSchema);
        return error == null;
      } catch (err) {
        return false;
      }
    },
    
    formatError(state, name): string {
      try {
        const testObject = { [name]: state };
        const fieldSchema = (schema as any).schema?.[name];
        if (!fieldSchema) return "";
        
        const singleFieldSchema = object({ [name]: fieldSchema });
        const [error] = ssValidate(testObject, singleFieldSchema);
        
        if (!error) return "";
        
        // 직접 validate 수행하여 커스텀 메시지 추출
        if (fieldSchema.validator) {
          const result = fieldSchema.validator(state);
          if (typeof result === 'string') {
            return result; // refine에서 반환된 커스텀 메시지
          }
        }
        
        return error.failures()[0].message;
      } catch (err) {
        console.error("Validation error:", err);
        return "검증 오류 발생";
      }
    }
  };
}

// 수정된 함수
export function getSchemaValidator<T extends InitState>(validator: Schema<T>) {
  if (isZodSchema<T>(validator)) {
    return zodValidator(validator);
  } else if (isYupSchema<T>(validator)) {
    return yupValidator(validator);
  } else if (isSuperstructSchema<T>(validator)) {
    return superstructValidator(validator);
  } else {
    throw new Error("Unsupported validation library");  
  }
}