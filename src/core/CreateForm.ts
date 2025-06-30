import type { ExtractKeys, InitObject, InitState, IStore, RegisterErrorObj, State, TRegister, Validator, ValidInputTypes } from "../type";
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
import type { IRegister } from "../funcs/register/Register";
import type { Resolver } from "common-resolver/types";
import { HandleSubmit } from "../funcs/handleSubmit/HandleSubmit";
import { HandleServerAction } from "../funcs/handleSubmit/HandleServerAction";

export class CreateForm<T extends InitState> {
  // Store 
  private ValueStore: IStore<T>
  private ErrorStore: IStore<T>
  private ErrorObjStore: IStore<Validator<T>>

  private resolver: Resolver<T>| undefined

  // Config
  private validateOn: InitObject<T>["validateOn"]
  private clearFormOn: InitObject<T>["clearFormOn"]

  // Public
  public getValues: State<T, string | boolean | FileList>;
  public getErrors: State<{ [key in keyof T]: string }, string>;
  public setValues: IStore<T>["setStore"];
  public setErrors: IStore<{ [key in keyof T]: string }>["setStore"];
  public initValue: T
  public clearForm: () => void

  constructor(props?: InitObject<T>) {
    const { initValue = {} as T, validator, resolver, validateOn, clearFormOn } = props ?? {}

    this.ValueStore = new Store(initValue)
    this.ErrorStore = new Store(getObjByKeys(initValue, ""))
    this.ErrorObjStore = new Store(validator ?? {})
    this.resolver = resolver;
    this.validateOn = validateOn ?? []
    this.clearFormOn = clearFormOn ?? []
    this.getValues = (name?: ExtractKeys<T> | string) => SyncState.doSync(this.ValueStore, name)
    this.getErrors = (name?: ExtractKeys<T> | string) => SyncState.doSync(this.ErrorStore, name)
    this.setValues = this.ValueStore.setStore
    this.setErrors = this.ErrorStore.setStore as IStore<{ [key in keyof T]: string }>["setStore"]
    this.initValue = initValue
    this.clearForm = () => {
      this.setValues(this.initValue)
      this.setErrors(getObjByKeys(this.initValue, ""))
    }
  }

  public register : TRegister<T> = ({ name, validate, type = "text", value }: {name: ExtractKeys<T> | string, validate?: RegisterErrorObj<T>, type?: ValidInputTypes, value?: string}): IRegister<T> =>
    new RegisterBuilder(name, value, this.ErrorObjStore, this.clearForm, validate, this.clearFormOn)
      .setRegisterOnChange(new RegisterOnChange(
        this.validateOn,
        this.ValueStore.setStore,
        this.ErrorStore.setStore,
        new Validate(
          this.ValueStore,
          this.ErrorObjStore,
          this.ErrorStore.setStore,
          this.resolver
        )
      ))
      .setRegisterOnFocus(new RegisterOnFocus(this.ErrorStore.setStore))
      .setRegisterOnBlur(new RegisterOnBlur(
        this.validateOn,
        new Validate(
          this.ValueStore,
          this.ErrorObjStore,
          this.ErrorStore.setStore,
          this.resolver
        )
      ))
      .setSetStore(this.ValueStore.setStore)
      .setGetStore(this.ValueStore.getStore)
      .setValue(this.getValues(name) as T[ExtractKeys<T>])
      .setType(type)
      .build()

  public handleSubmit = (SubmitFn: (data: T, event?: FormEvent) => (Promise<unknown> | unknown)) => (e: FormEvent) =>
    new HandleSubmitBuilder<T>()
      .setHandleSubmit(HandleSubmit)
      .setValueStore(this.ValueStore)
      .setErrorStore(this.ErrorStore)
      .setClearForm(this.clearForm)
      .setClearFormOn(this.clearFormOn)
      .setSubmitFn(SubmitFn)
      .setValidateOn(this.validateOn)
      .build()
      .doHandle(e)

  public handleServerAction = (SubmitFn: (data: T) => (Promise<unknown> | unknown)) => () =>
    new HandleSubmitBuilder<T>()
      .setHandleSubmit(HandleServerAction)
      .setValueStore(this.ValueStore)
      .setErrorStore(this.ErrorStore)
      .setClearForm(this.clearForm)
      .setClearFormOn(this.clearFormOn)
      .setSubmitFn(SubmitFn)
      .setValidateOn(this.validateOn)
      .build()
      .doHandle()
}