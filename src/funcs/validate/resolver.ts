import { z } from "zod";
import { type InitState, type Resolver, type ValidateSchema } from "../../type";
import * as yup from "yup";

// export function zodResolver<T extends InitState>(schema: ValidateSchema<T>["zod"]): Resolver<T> {
//   return {
//     validate: (state, name) => schema.shape[name].safeParse(state).success,
//     formatError: (state, name) => schema.shape[name].safeParse(state).error?.format()?._errors[0] ?? "",
//   };
// };

export function zodResolver<T extends InitState>(schema: ValidateSchema<T>["zod"]): Resolver<T> {
  return {
    validate: (state, name) => {
      // 스키마에서 해당 필드의 유효성 검사
      const fieldSchema = getFieldSchema(schema, name);

      return fieldSchema.safeParse(state).success;

    },
    formatError: (state, name) => {
      // 오류 메시지 형식 지정
      const fieldSchema = getFieldSchema(schema, name);

      return fieldSchema.safeParse(state).error?.format()?._errors?.[0] ?? "";
    },
  };
};

// 스키마에서 필드 스키마 가져오는 헬퍼 함수
function getFieldSchema<T extends InitState>(schema: ValidateSchema<T>["zod"], name: string) {
  // ZodEffects(예: schema.transform()된 경우)인지 확인하고 내부 스키마 가져오기
  const actualSchema = schema instanceof z.ZodEffects ? schema._def?.schema : schema;
  return actualSchema.shape?.[name];
}

// yup 스키마 래퍼
export function yupResolver<T extends InitState>(schema: ValidateSchema<T>["yup"]): Resolver<T> {
  // yup 스키마를 사용하여 validate 및 formatError 메서드를 구현합니다.{
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

export function superstructResolver<T extends InitState>(schema: ValidateSchema<T>["superstruct"]): Resolver<T> {
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