import type { InitState, IStore, RegisterErrorObj, InitObject, Validator, ExtractKeys, ValidInputTypes } from "../../type"
import { usePageNavigation } from "../usePageNavigation"
import { Register, type IRegister } from "./Register"
import type { IRegisterOnBlur } from "./RegisterOnBlur"
import type { IRegisterOnChange } from "./RegisterOnChange"
import type { IRegisterOnFocus } from "./RegisterOnFocus"

export class RegisterBuilder<T extends InitState> {
  private RegisterOnChange?: IRegisterOnChange
  private RegisterOnFocus?: IRegisterOnFocus
  private RegisterOnBlur?: IRegisterOnBlur
  public id?: ExtractKeys<T> | string
  public type?: ValidInputTypes
  public value?: T[ExtractKeys<T>]

  constructor(
    public name: ExtractKeys<T> | string,
    private ErrorObjStore: IStore<Validator<T>>,
    private ErrorObj?: RegisterErrorObj<T>,
    private clearFormOn?: InitObject<T>["clearFormOn"],
    private clearForm?: () => void
  ) {
    this.id = name

    // ErrorObjStore 덮어쓰기
    this.ErrorObj && this.ErrorObjStore.setStore({ [name]: this.ErrorObj } as Partial<Validator<T>>)

    // 페이지 이동시에 form을 초기화 할 것인지 여부를 결정
    this.clearFormOn?.includes("routeChange") && usePageNavigation(this.clearForm)
  }

  public build = (): IRegister<T> => {
    if (!this.RegisterOnChange) throw new Error("RegisterOnChange is required")
    if (!this.RegisterOnFocus) throw new Error("RegisterOnFocus is required")
    if (!this.RegisterOnBlur) throw new Error("RegisterOnBlur is required")
    if (this.value === undefined) this.value = "" as T[ExtractKeys<T>]
    
    return new Register(
      this.RegisterOnChange!,
      this.RegisterOnFocus!,
      this.RegisterOnBlur!,
      this.name,
      this.id!,
      this.type,
      this.value
    )
  }

  public setRegisterOnChange(registerOnChange: IRegisterOnChange) {
    this.RegisterOnChange = registerOnChange
    return this
  }

  public setRegisterOnFocus(registerOnFocus: IRegisterOnFocus) {
    this.RegisterOnFocus = registerOnFocus
    return this
  }

  public setRegisterOnBlur(registerOnBlur: IRegisterOnBlur) {
    this.RegisterOnBlur = registerOnBlur
    return this
  }

  public setValue (value: T[ExtractKeys<T>]) {
    this.value = value
    return this
  }

  public setType (type: ValidInputTypes) {
    this.type = type
    return this
  }
}