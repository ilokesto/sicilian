// 기본 (구조 분해) 스니펫
export const destructuredSnippet = `
import { CreateForm } from '@ilokesto/sicilian';

export const {
  initValue,
  register,
  getValues,
  getErrors,
  setValues,
  setErrors,
  handleSubmit,
  handleServerAction
} = new CreateForm({ 
  initValue: {}, 
  resolver: undefined, 
  validator: {}, 
  validateOn: ["change", "blur", "submit"],
  clearFormOn: ["submit", "routeChange"]
});
`;

// 객체 할당 스니펫
export const objectSnippet = `
import { CreateForm } from '@ilokesto/sicilian';

export const sicilianForm = new CreateForm({ 
  initValue: {}, 
  resolver: undefined, 
  validator: {}, 
  validateOn: ["change", "blur", "submit"],
  clearFormOn: ["submit", "routeChange"]
});
`;
