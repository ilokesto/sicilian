import type { InitState, IStore, InitObject } from "../../type";
import { HandleSubmitTemplateMethod } from "./HandleSubmitTemplateMethod";

export class HandleServerAction<T extends InitState> extends HandleSubmitTemplateMethod<T> {
  constructor(
    ValueStore: IStore<T>,
    ErrorStore: IStore<T>,
    private clearForm: () => void,
    private clearFormOn: InitObject<T>["clearFormOn"],
    validateOn: InitObject<T>["validateOn"],
    private fn: (data: T) => Promise<unknown> | unknown
  ) {
    super(ValueStore, ErrorStore, validateOn);
  }

  protected async execute() {
    const formState = this.ValueStore.getStore();

    try {
      await this.fn(formState);
      
      this.clearFormOn?.includes("submit") ? this.clearForm() : null;
    } catch (err) {
      console.error(err);
    }
  }
}