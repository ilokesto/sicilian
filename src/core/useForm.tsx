import { useMemo, useSyncExternalStore } from "react";
import type { InitObject, InitState } from "../type";
import { CreateForm } from "./CreateForm";

export const useForm = <T extends InitState>(initObjectOrInstance?: InitObject<T> | CreateForm<T>) => {
  const form = useMemo(() => {
    if (initObjectOrInstance instanceof CreateForm) {
      return initObjectOrInstance;
    }
    return new CreateForm(initObjectOrInstance);
  }, []);

  useSyncExternalStore(form.ValueStore.subscribe, form.ValueStore.getStore);
  useSyncExternalStore(form.ErrorStore.subscribe, form.ErrorStore.getStore);

  return {
    ...form,
    register: ((...args: any[]) => form.register(...args as [any])) as typeof form.register,
    getValues: ((...args: any[]) => form.getValues(...args as [any])) as typeof form.getValues,
    getErrors: ((...args: any[]) => form.getErrors(...args as [any])) as typeof form.getErrors,
  }
}
