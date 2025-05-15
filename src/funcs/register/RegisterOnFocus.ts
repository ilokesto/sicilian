import type { InitState, IStore, SicilianEvent } from "../../type";

export interface IRegisterOnFocus {
  onFocus: (e: SicilianEvent) => void
}

export class RegisterOnFocus<T extends InitState> implements IRegisterOnFocus {
  constructor(
    private setErrorStore: IStore<T>["setStore"],
  ) {}

  public onFocus = ({ target: { name }}: SicilianEvent) => {
    this.setErrorStore({ [name]: "" } as Partial<T> & { [x: string]: string | boolean | FileList });
  }
}