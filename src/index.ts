import alert from "./alert.ts";
import confirm from "./confirm.ts";
import prompt from "./prompt.ts";

type alert_ = typeof alert;
type confirm_ = typeof confirm;
type prompt_ = typeof prompt;
declare global {
  // @ts-ignore
  var alert: alert_;
  // @ts-ignore
  var confirm: confirm_;
  // @ts-ignore
  var prompt: prompt_;
}

globalThis.alert = alert;
globalThis.confirm = confirm;
globalThis.prompt = prompt;
