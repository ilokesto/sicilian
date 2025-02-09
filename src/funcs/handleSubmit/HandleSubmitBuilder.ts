import type { FormEvent } from "react";
import type { InitObject, InitState, IStore } from "../../type";
import { HandleSubmit } from "./HandleSubmit";

export class HandleSubmitBuilder<T extends InitState> {
  private ValueStore?: IStore<T>
  private ErrorStore?: IStore<T>
  private clearForm?: () => void
  private clearFormOn?: InitObject<T>["clearFormOn"]
  private validateOn?: InitObject<T>["validateOn"]
  private submitFn?: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)

  build() {
    if (!this.ValueStore) throw new Error("ValueStore is required")
    if (!this.ErrorStore) throw new Error("ErrorStore is required")
    if (!this.clearForm) throw new Error("clearForm is required")
    if (!this.clearFormOn) throw new Error("clearFormOn is required")
    if (!this.validateOn) throw new Error("validateOn is required")
    if (!this.submitFn) throw new Error("SubmitFn is required")

    return new HandleSubmit(
      this.ValueStore,
      this.ErrorStore,
      this.clearForm, 
      this.clearFormOn,
      this.validateOn,
      this.submitFn)
  }

  setValueStore(valueStore: IStore<T>) {
    this.ValueStore = valueStore
    return this
  }

  setErrorStore(errorStore: IStore<T>) {
    this.ErrorStore = errorStore
    return this
  }

  setClearForm(clearForm: () => void) {
    this.clearForm = clearForm
    return this
  }

  setClearFormOn(clearFormOn: InitObject<T>["clearFormOn"]) {
    this.clearFormOn = clearFormOn;

    return this
  }

  setValidateOn(validateOn: InitObject<T>["validateOn"]) {
    this.validateOn = validateOn;
    return this
  }

  setSubmitFn(submitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)) {
    this.submitFn = submitFn
    return this
  }
}