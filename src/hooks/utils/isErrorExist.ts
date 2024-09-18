
export default function isErrorExist<T extends object>(errorState: T) {
  for (const v of Object.values(errorState)) {
    if (v !== "") return true;
  }

  return false
}