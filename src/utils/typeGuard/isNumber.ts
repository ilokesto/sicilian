export const isNumber = (thing: number | { number: number; message?: string }): thing is number => {
  return typeof thing === "number";
};
