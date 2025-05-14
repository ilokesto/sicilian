import type { ExtractKeys, InitObject, InitState, IStore, RegisterErrorObj, Schema, State, Validator, ValidInputTypes } from "../type";
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

export class CreateForm<T extends InitState> {
  // Store 
  private ValueStore: IStore<T>
  private ErrorStore: IStore<T>
  private ErrorObjStore: IStore<Validator<T>>

  private SchemaStore: IStore<Schema<T> | undefined>

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

  constructor(props?: InitObject<T>) {
    const { initValue = {} as T, validator, schema, validateOn, clearFormOn } = props ?? {}

    this.ValueStore = new Store(initValue)
    this.ErrorStore = new Store(getObjByKeys(initValue, ""))
    this.ErrorObjStore = new Store(validator ?? {})
    this.SchemaStore = new Store(schema);
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
    new RegisterBuilder(name, value, this.ErrorObjStore, validate, this.clearFormOn, this.clearForm)
      .setRegisterOnChange(new RegisterOnChange(
        this.validateOn,
        this.ValueStore.setStore,
        this.ErrorStore.setStore,
        new Validate(
          this.ValueStore.getStore(),
          this.ErrorObjStore,
          this.ErrorStore.setStore,
          this.SchemaStore
        )
      ))
      .setRegisterOnFocus(new RegisterOnFocus(this.ErrorStore.setStore))
      .setRegisterOnBlur(new RegisterOnBlur(
        this.validateOn,
        new Validate(
          this.ValueStore.getStore(),
          this.ErrorObjStore,
          this.ErrorStore.setStore,
          this.SchemaStore
        )
      ))
      .setSetStore(this.ValueStore.setStore)
      .setGetStore(this.ValueStore.getStore)
      .setValue(this.getValues(name) as T[ExtractKeys<T>])
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

type TRegister<T extends InitState> = {
  // radio 타입일 경우 - ExtractKeys<T> 버전
  <K extends ExtractKeys<T>>(params: { name: K; validate?: RegisterErrorObj<T>; type: 'radio'; value: string}): IRegister<T>,
  // radio 타입이 아닌 경우 - ExtractKeys<T> 버전
  <K extends ExtractKeys<T>>(params: { name: K; validate?: RegisterErrorObj<T>; type?: Exclude<ValidInputTypes, 'radio'> }): IRegister<T>,
  
  // radio 타입일 경우 - string 버전
  (params: { name: string; validate?: RegisterErrorObj<T>; type: 'radio'; value: string }): IRegister<T>,
  // radio 타입이 아닌 경우 - string 버전
  (params: { name: string; validate?: RegisterErrorObj<T>; type?: Exclude<ValidInputTypes, 'radio'> }): IRegister<T>;
}