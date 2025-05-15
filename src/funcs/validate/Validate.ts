import type { InitState, IStore, IValidate, RegisterErrorObj, Schema, SicilianEvent, Validator } from "../../type";
import { getSchemaValidator } from "./getSchemaValidator";
import { HandlerChain } from "./validateHandler/HandlerChain";
import { HandlerFactory } from "./validateHandler/HandlerFactory";

export class Validate<T extends InitState> implements IValidate {
  private handlerChain: HandlerChain<T>;

  constructor(
    private store: T,
    private ErrorObjStore: IStore<Validator<T>>,
    private setError: (action: Partial<T>) => void,
    private SchemaStore: IStore<Schema<T> | undefined>
  ) {
    this.handlerChain = new HandlerChain(this.setError);
  }

  public doValidate = ({ target: { name, value, checked } }: SicilianEvent) => {
    const schema = this.SchemaStore.getStore();
    const ErrorObj = this.ErrorObjStore.getStore()[name];

    if (schema) {
      const validateScheme = getSchemaValidator<T>(schema);

      if (!validateScheme.validate(value, name)) {
        this.setError({ [name]: validateScheme.formatError(value, name) ?? "" } as Partial<T>);
        return;
      }
    }

    if (ErrorObj) {
      Object.keys(ErrorObj).forEach((handlerKey) => {
        this.handlerChain.addHandler(HandlerFactory.createHandler(handlerKey as keyof RegisterErrorObj<T>));
      })

      this.handlerChain.doHandle({name, value, checked, ErrorObj: ErrorObj, store: this.store});
    }
  }
}
