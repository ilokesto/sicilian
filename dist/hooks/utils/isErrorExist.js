export default function isErrorExist(errorState) {
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return true;
    }
    return false;
}
