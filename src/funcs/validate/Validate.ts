import type { InitState, IStore, RegisterErrorObj, SicilianEvent, Validator } from "../../type";
import { HandlerChain } from "./validateHandler/HandlerChain";
import { HandlerFactory } from "./validateHandler/HandlerFactory";

export interface IValidate {
  doValidate: (e: SicilianEvent) => void;
}

export class Validate<T extends InitState> implements IValidate {
  private handlerChain: HandlerChain<T>;

  constructor(
    private store: T,
    private ErrorObjStore: IStore<Validator<T>>,
    private setError: (action: Partial<T>) => void,
  ) {
    this.handlerChain = new HandlerChain(this.setError);
  }

  public doValidate = ({ target: { name, value, checked } }: SicilianEvent) => {
    const ErrorObj = this.ErrorObjStore.getStore()[name];

    if (!ErrorObj) return;

    console.log(ErrorObj)

    Object.keys(ErrorObj).forEach((handlerKey) => {
      this.handlerChain.addHandler(HandlerFactory.createHandler(handlerKey as keyof RegisterErrorObj<T>));
    })
    
    this.handlerChain.doHandle({name, value, checked, ErrorObj: ErrorObj, store: this.store});
  }
}