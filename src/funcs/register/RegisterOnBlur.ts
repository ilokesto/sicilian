import type { InitObject, InitState, SicilianEvent } from "../../type"
import type { IValidate } from "../validate/Validate"

export interface IRegisterOnBlur {
  onBlur: (e: SicilianEvent) => void
}

export class RegisterOnBlur<T extends InitState> implements IRegisterOnBlur {
  constructor(
    private validateOn: InitObject<T>["validateOn"],
    private validate: IValidate,
  ) {}

  public onBlur = (e: SicilianEvent) => {
    this.validateOn?.includes("blur") ? this.validate.doValidate(e) : undefined
  }
}
