import type { ExtractKeys, InitState, SicilianEvent } from "../../type";
import type { IRegisterOnBlur } from "./RegisterOnBlur";
import type { IRegisterOnChange } from "./RegisterOnChange";
import type { IRegisterOnFocus } from "./RegisterOnFocus";

export interface IRegister<T extends InitState> {
  onChange: (e: SicilianEvent) => void
  onFocus: (e: SicilianEvent) => void
  onBlur: (e: SicilianEvent) => void
  name: ExtractKeys<T>
  id: ExtractKeys<T>
  type: HTMLInputElement["type"]
  value?: string
  checked?: boolean
}

export class Register<T extends InitState> implements IRegister<T> {
  #RegisterOnChange: IRegisterOnChange
  #RegisterOnFocus: IRegisterOnFocus
  #RegisterOnBlur: IRegisterOnBlur
  public value?: string
  public checked?: boolean

  constructor(
    RegisterOnChange: IRegisterOnChange,
    RegisterOnFocus: IRegisterOnFocus,
    RegisterOnBlur: IRegisterOnBlur,
    public name: ExtractKeys<T>,
    public id: ExtractKeys<T>,
    public type: HTMLInputElement["type"] = "text",
    value: T[ExtractKeys<T>],
  ) {
    this.#RegisterOnChange = RegisterOnChange
    this.#RegisterOnFocus = RegisterOnFocus
    this.#RegisterOnBlur = RegisterOnBlur

    if (type === "checkbox") {
      this.checked = value as boolean
    } else if (type === "file") {
  
    } else {
      this.value = value as string
    }
  }

  public onChange = (e: SicilianEvent) => {
    this.#RegisterOnChange.onChange(e)
  }

  public onFocus = (e: SicilianEvent) => {
    this.#RegisterOnFocus.onFocus(e)
  }

  public onBlur = (e: SicilianEvent) => {
    this.#RegisterOnBlur.onBlur(e)
  }
}
