import type { ExtractKeys, InitState, IStore, IValidate, RegisterErrorObj, Resolver, SicilianEvent, Validator } from "../../type";
import { HandlerChain } from "./validateHandler/HandlerChain";
import { HandlerFactory } from "./validateHandler/HandlerFactory";

export class Validate<T extends InitState> implements IValidate {
  private handlerChain: HandlerChain<T>;

  constructor(
    private store: T,
    private ErrorObjStore: IStore<Validator<T>>,
    private setError: (action: Partial<T>) => void,
    private resolver: Resolver<T> | undefined
  ) {
    this.handlerChain = new HandlerChain(this.setError);
  }

  public doValidate = ({ target: { name, value, checked } }: SicilianEvent) => {
    const ErrorObj = this.ErrorObjStore.getStore()[name];

    if (this.resolver && !this.resolver.validate(value as T[ExtractKeys<T>], name)) {
      this.setError({ [name]: this.resolver.formatError(value as T[ExtractKeys<T>], name) ?? "" } as Partial<T>);
      return;
    }

    if (ErrorObj) {
      Object.keys(ErrorObj).forEach((handlerKey) => {
        this.handlerChain.addHandler(HandlerFactory.createHandler(handlerKey as keyof RegisterErrorObj<T>));
      })

      this.handlerChain.doHandle({name, value, checked, ErrorObj: ErrorObj, store: this.store});
    }
  }
}
