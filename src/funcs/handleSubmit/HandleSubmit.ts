import type { FormEvent } from "react";
import type { InitState, IStore, InitObject } from "../../type";
import { HandleSubmitTemplateMethod } from "./HandleSubmitTemplateMethod";

export class HandleSubmit<T extends InitState> extends HandleSubmitTemplateMethod {
  constructor(
    private ValueStore: IStore<T>,
    private ErrorStore: IStore<T>,
    private clearForm: () => void,
    private clearFormOn: InitObject<T>["clearFormOn"],
    private validateOn: InitObject<T>["validateOn"],
    private fn: (data: T, event?: FormEvent) => Promise<unknown> | unknown
  ) {
    super()
  }

  protected async execute(e: FormEvent) {
    const formState = this.ValueStore.getStore();

    try {
      await this.fn(formState, e);
      
      this.clearFormOn?.includes("submit") ? this.clearForm() : null;
    } catch (err) {
      console.error(err);
    }
  }

  protected validateOnSubmit()  {
    if (!this.validateOn?.includes("submit")) return;

    let blurFlag = 0;
  
    if (!this.validateOn?.includes("blur")) {
      blurFlag = 1;
      this.validateOn?.push("blur");
    }

    const formState = this.ValueStore.getStore();
  
    for (const key in formState) {
      const inputTag = document.getElementById(key)
      inputTag?.focus();
      inputTag?.blur();
    }
  
    blurFlag ? this.validateOn?.pop() : null;
  }

  protected isErrorExist() {
    const errorState = this.ErrorStore.getStore();

    for (const v of Object.values(errorState)) {
      if (v !== "") return true;
    }
  
    return false
  }

  protected isAllInputEmpty() {
    const formState = this.ValueStore.getStore();
    let count = 0;
    let array = Object.values(formState);
  
    for (const v of array) {
      if (v === "") count++;
    }
  
    if (count === array.length) return true;
    else return false;
  }
}