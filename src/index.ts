import alert from "./alert.ts";
import confirm from "./confirm.ts";
import prompt from "./prompt.ts";

type alert_ = typeof alert;
type confirm_ = typeof confirm;
type prompt_ = typeof prompt;
declare global {
  var alert: alert_;
  var confirm: confirm_;
  var prompt: prompt_;
}

globalThis.alert = alert;
globalThis.confirm = confirm;
globalThis.prompt = prompt;
