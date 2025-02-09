import type { FormEvent } from "react";

export abstract class HandleSubmitTemplateMethod {
  public async doHandle(e: FormEvent) {
    e.preventDefault();

    this.validateOnSubmit();

    // 에러가 하나라도 있으면 return
    if (this.isErrorExist()) return

    // 모든 value가 비어있으면 return
    if (this.isAllInputEmpty()) return;

    this.execute(e);
  }

  protected abstract validateOnSubmit(): void;
  protected abstract isErrorExist(): boolean;
  protected abstract isAllInputEmpty(): boolean;
  protected abstract execute(e: FormEvent): Promise<void>;
}