import type { InitState, RegisterErrorObj, SicilianEvent } from "../../type";
import { HandlerChain } from "./validateHandler/HandlerChain";
import { HandlerFactory } from "./validateHandler/HandlerFactory";

export interface IValidate {
  doValidate: (e: SicilianEvent) => void;
}

export class Validate<T extends InitState> implements IValidate {
  private handlerChain: HandlerChain<T>;

  constructor(
    private store: T,
    private ErrorObj: RegisterErrorObj<T>,
    private setError: (action: Partial<T>) => void,
  ) {
    this.handlerChain = new HandlerChain(this.setError);
  }

  public doValidate = ({ target: { name, value } }: SicilianEvent) => {
    if (!this.ErrorObj) return;

    Object.keys(this.ErrorObj).forEach((handlerKey) => {
      this.handlerChain.addHandler(HandlerFactory.createHandler(handlerKey as keyof RegisterErrorObj<T>));
    })
    
    this.handlerChain.doHandle({name, value, ErrorObj: this.ErrorObj, store: this.store});
  }
}