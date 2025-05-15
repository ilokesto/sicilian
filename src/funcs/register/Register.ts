import { useEffect } from "react";
import type { ExtractKeys, InitState, IStore, SicilianEvent } from "../../type";
import type { IRegisterOnBlur } from "./RegisterOnBlur";
import type { IRegisterOnChange } from "./RegisterOnChange";
import type { IRegisterOnFocus } from "./RegisterOnFocus";

export interface IRegister<T extends InitState> {
  onChange: (e: SicilianEvent) => void
  onFocus: (e: SicilianEvent) => void
  onBlur: (e: SicilianEvent) => void
  name: ExtractKeys<T> | string
  id: ExtractKeys<T> | string
  type: HTMLInputElement["type"]
  value?: string
  checked?: boolean
}

export class Register<T extends InitState> implements IRegister<T> {
  #RegisterOnChange: IRegisterOnChange
  #RegisterOnFocus: IRegisterOnFocus
  #RegisterOnBlur: IRegisterOnBlur
  #radioValue: string
  public value?: string
  public checked?: boolean

  constructor(
    RegisterOnChange: IRegisterOnChange,
    RegisterOnFocus: IRegisterOnFocus,
    RegisterOnBlur: IRegisterOnBlur,
    public name: ExtractKeys<T> | string,
    public id: ExtractKeys<T> | string,
    public type: HTMLInputElement["type"] = "text",
    setStore: IStore<T>["setStore"],
    getStore: IStore<T>["getStore"],
    value: T[ExtractKeys<T>],
    radioValue: string,
  ) {
    this.#RegisterOnChange = RegisterOnChange
    this.#RegisterOnFocus = RegisterOnFocus
    this.#RegisterOnBlur = RegisterOnBlur
    this.#radioValue = radioValue

    useEffect(() => {
      if (getStore()[name]) return
      setStore({ [name]: value } as unknown as Partial<T>)
    }, [])

    if (type === "checkbox") {
      this.checked = value as boolean;
      this.value = value as unknown as string
    } else if (type === "radio") {
      this.checked = value === this.#radioValue
      this.value = this.#radioValue
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
