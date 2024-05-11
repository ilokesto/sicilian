import { InitState } from "../Sicilian";
declare const registOnSubmit: <T extends InitState>(formState: T, errorState: T) => (fn: (data: InitState) => Promise<void>) => (e: SubmitEvent) => Promise<void>;
export default registOnSubmit;
