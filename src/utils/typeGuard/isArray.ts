export const isArray = <T extends object>(thing: T | Array<T>): thing is Array<T> => {
  return "at" in thing;
};