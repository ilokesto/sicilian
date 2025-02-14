import type { InitState, RegisterErrorObj } from "../../../type";
import { RequiredHandler, MinLengthHandler, MaxLengthHandler, RegExpHandler, CustomHandler, type IHandler, CheckedHandler } from "./Handler";

export class HandlerFactory {
  private static handlerMap = new Map([
    ["required", RequiredHandler],
    ["checked", CheckedHandler],
    ["minLength", MinLengthHandler],
    ["maxLength", MaxLengthHandler],
    ["RegExp", RegExpHandler],
    ["custom", CustomHandler],
  ])

  static createHandler<T extends InitState>(handlerKey: keyof RegisterErrorObj<T>)  {
    if (!this.handlerMap.has(handlerKey)) {
      throw new Error(`"${handlerKey}" is not a valid handler key`);
    }
    
    const Handler = this.handlerMap.get(handlerKey)!;

    return new Handler() as IHandler<T>
  }
}