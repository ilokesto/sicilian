import type { FormEvent } from "react";
import type { InitObject, InitState, IStore } from "../../type";
import type { IHandleSubmit } from "./HandleSubmitTemplateMethod";

export class HandleSubmitBuilder<T extends InitState> {
  private ValueStore?: IStore<T>
  private ErrorStore?: IStore<T>
  private clearForm?: () => void
  private clearFormOn?: InitObject<T>["clearFormOn"]
  private validateOn?: InitObject<T>["validateOn"]
  private submitFn?: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)
  private HandleSubmit?: new (
    valueStore: IStore<T>,
    errorStore: IStore<T>,
    clearForm: () => void,
    clearFormOn: InitObject<T>["clearFormOn"],
    validateOn: InitObject<T>["validateOn"],
    submitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)
  ) => IHandleSubmit

  build() {
    if (!this.ValueStore) throw new Error("ValueStore is required")
    if (!this.ErrorStore) throw new Error("ErrorStore is required")
    if (!this.clearForm) throw new Error("clearForm is required")
    if (!this.clearFormOn) throw new Error("clearFormOn is required")
    if (!this.validateOn) throw new Error("validateOn is required")
    if (!this.submitFn) throw new Error("SubmitFn is required")
    if (!this.HandleSubmit) throw new Error("HandleSubmit is not defined")

    return new this.HandleSubmit(
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

  setHandleSubmit(handleSubmit: new (
    valueStore: IStore<T>,
    errorStore: IStore<T>,
    clearForm: () => void,
    clearFormOn: InitObject<T>["clearFormOn"],
    validateOn: InitObject<T>["validateOn"],
    submitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)
  ) => IHandleSubmit) {
    this.HandleSubmit = handleSubmit
    return this
  }

  setSubmitFn(submitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)) {
    this.submitFn = submitFn
    return this
  }
}