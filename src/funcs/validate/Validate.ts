import type { Resolver } from "common-resolver/types";
import type { InitState, IStore, IValidate, RegisterErrorObj, SicilianEvent, Validator } from "../../type";
import { HandlerChain } from "./validateHandler/HandlerChain";
import { HandlerFactory } from "./validateHandler/HandlerFactory";

export class Validate<T extends InitState> implements IValidate {
  private handlerChain: HandlerChain<T>;

  constructor(
    private store: IStore<T>,
    private ErrorObjStore: IStore<Validator<T>>,
    private setError: (action: Partial<T> & { [x: string]: string | boolean | FileList }) => void,
    private resolver: Resolver<T> | undefined
  ) {
    this.handlerChain = new HandlerChain(this.setError);
  }

  public doValidate = ({ target: { name, value, checked } }: SicilianEvent) => {
    const ErrorObj = this.ErrorObjStore.getStore()[name];
    const store = this.store.getStore();

    if (this.resolver) {
      const { valid, error } = this.resolver.validate(store);

      if (!valid) {
        this.setError({ [name]: typeof error[name] === "string" ? error[name] : "" } as Partial<T> & { [x: string]: string | boolean | FileList });
        return;
      }
    }

    if (ErrorObj) {
      Object.keys(ErrorObj).forEach((handlerKey) => {
        this.handlerChain.addHandler(HandlerFactory.createHandler(handlerKey as keyof RegisterErrorObj<T>));
      })

      this.handlerChain.doHandle({name, value, checked, ErrorObj: ErrorObj, store: this.store.getStore()});
    }
  }
}
