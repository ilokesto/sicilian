import type { FormEvent } from "react";
import type { InitObject, InitState, IStore } from "../../type";

export interface IHandleSubmit {
  doHandle: (e?: FormEvent) => Promise<void>;
}

export abstract class HandleSubmitTemplateMethod<T extends InitState> implements IHandleSubmit {
  constructor(
    protected ValueStore: IStore<T>,
    protected ErrorStore: IStore<T>,
    protected validateOn: InitObject<T>["validateOn"]
  ) {}
      
  public async doHandle(e?: FormEvent) {
    if (e) e.preventDefault();

    this.validateOnSubmit();

    // 에러가 하나라도 있으면 return
    if (this.isErrorExist()) return

    // 모든 value가 비어있으면 return
    if (this.isAllInputEmpty()) return;

    this.execute(e);
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

  protected abstract execute(e?: FormEvent): Promise<void>;
}