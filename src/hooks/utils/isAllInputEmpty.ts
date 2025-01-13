export default function isAllInputEmpty<T extends object>(formState: T) {
  let count = 0;
  let array = Object.values(formState);

  for (const v of array) {
    if (v === "") count++;
  }

  if (count === array.length) return true;
  else return false;
}
