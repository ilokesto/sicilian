import type { InitState, RegisterErrorObj } from "../../types";
import { CustomHandler, MaxLengthHandler, MinLengthHandler, RegExpHandler, RequiredHandler, type IHandler } from "./Handler";

export class HandlerChain<T extends InitState> {
  private handlers: Array<IHandler<T>> = []
  private handlerMap = new Map([
    ["required", RequiredHandler],
    ["minLength", MinLengthHandler],
    ["maxLength", MaxLengthHandler],
    ["RegExp", RegExpHandler],
    ["custom", CustomHandler],
  ])

  constructor(private setError: (action: Partial<T>) => void) {}

  public addHandler(handlerKey: keyof RegisterErrorObj<T>): void {
    const Handler = this.handlerMap.get(handlerKey)!

    this.handlers.push(new Handler<T>());
  }

  public handle(props: {value: string, ErrorObj: RegisterErrorObj<T>, name: string, store: T}): void {
    for (const handler of this.handlers) {
      const handled = handler.handle(props);
      if (handled) {
        console.log(handled)
        this.setError({[props.name]: handled} as Partial<T>);
        break;
      }
    }
  }
}