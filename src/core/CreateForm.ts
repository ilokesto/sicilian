import type { ExtractKeys, InitObject, InitState, IStore, RegisterErrorObj, State, Validator, ValidInputTypes } from "../type";
import { Store } from "./Store";
import { RegisterOnFocus } from "../funcs/register/RegisterOnFocus";
import { RegisterOnChange } from "../funcs/register/RegisterOnChange";
import { RegisterOnBlur } from "../funcs/register/RegisterOnBlur";
import { RegisterBuilder } from "../funcs/register/RegisterBuilder";
import { Validate } from "../funcs/validate/Validate";
import { HandleSubmitBuilder } from "../funcs/handleSubmit/HandleSubmitBuilder";
import { getObjByKeys } from "../utils/getObjByKeys";
import type { FormEvent } from "react";
import { SyncState } from "../utils/SyncState";

export class CreateForm<T extends InitState> {
  // Store 
  private ValueStore: IStore<T>
  private ErrorStore: IStore<T>
  private ErrorObjStore: IStore<Validator<T>>

  // Config
  private validateOn: InitObject<T>["validateOn"]
  private clearFormOn: InitObject<T>["clearFormOn"]

  // Public
  public getValues: State<T>;
  public getErrors: State<{ [key in keyof T]: string }>;
  public setValues: IStore<T>["setStore"];
  public setErrors: IStore<{ [key in keyof T]: string }>["setStore"];
  public initValue: T
  public clearForm: () => void
  public handleValidate = (validator: Partial<Record<keyof T, RegisterErrorObj<T>>>) => validator

  constructor({ initValue, validator, validateOn, clearFormOn }: InitObject<T>) {
    this.ValueStore = new Store(initValue)
    this.ErrorStore = new Store(getObjByKeys(initValue, ""))
    this.ErrorObjStore = new Store(validator ?? {})
    this.validateOn = validateOn ?? []
    this.clearFormOn = clearFormOn ?? []
    this.getValues = (name?: ExtractKeys<T>) => SyncState.doSync(this.ValueStore, name)
    this.getErrors = (name?: ExtractKeys<T>) => SyncState.doSync(this.ErrorStore, name)
    this.setValues = this.ValueStore.setStore
    this.setErrors = this.ErrorStore.setStore as IStore<{ [key in keyof T]: string }>["setStore"]
    this.initValue = initValue
    this.clearForm = () => {
      this.setValues(this.initValue)
    }
  }

  public register = ({ name, validate, type = "text" }: {name: ExtractKeys<T>, validate?: RegisterErrorObj<T>, type?: ValidInputTypes}) =>
    new RegisterBuilder(name, this.ErrorObjStore, validate, this.clearFormOn, this.clearForm)
      .setRegisterOnChange(new RegisterOnChange(
        this.validateOn,
        this.ValueStore.setStore,
        this.ErrorStore.setStore,
        new Validate(
          this.ValueStore.getStore(),
          this.ErrorObjStore.getStore()[name] as RegisterErrorObj<T>,
          this.ErrorStore.setStore
        )
      ))
      .setRegisterOnFocus(new RegisterOnFocus(this.ErrorStore.setStore))
      .setRegisterOnBlur(new RegisterOnBlur(
        this.validateOn,
        new Validate(
          this.ValueStore.getStore(),
          this.ErrorObjStore.getStore()[name] as RegisterErrorObj<T>,
          this.ErrorStore.setStore
        )
      ))
      .setValue(this.getValues(name))
      .setType(type)
      .build()

  public handleSubmit = (SubmitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)) => (e: FormEvent) =>
    new HandleSubmitBuilder<T>()
      .setValueStore(this.ValueStore)
      .setErrorStore(this.ErrorStore)
      .setClearForm(this.clearForm)
      .setClearFormOn(this.clearFormOn)
      .setSubmitFn(SubmitFn)
      .setValidateOn(this.validateOn)
      .build()
      .doHandle(e)
}