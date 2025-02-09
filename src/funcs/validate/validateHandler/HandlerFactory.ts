import type { InitState, RegisterErrorObj } from "../../../type";
import { RequiredHandler, MinLengthHandler, MaxLengthHandler, RegExpHandler, CustomHandler, type IHandler } from "./Handler";

export class HandlerFactory {
  private static handlerMap = new Map([
    ["required", RequiredHandler],
    ["minLength", MinLengthHandler],
    ["maxLength", MaxLengthHandler],
    ["RegExp", RegExpHandler],
    ["custom", CustomHandler],
  ])

  static createHandler<T extends InitState>(handlerKey: keyof RegisterErrorObj<T>)  {
    const Handler = this.handlerMap.get(handlerKey)!;
    return new Handler() as unknown as IHandler<T>
  }
}