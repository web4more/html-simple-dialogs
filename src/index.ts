import alert from "./alert.ts";
import confirm from "./confirm.ts";
import prompt from "./prompt.ts";

declare global {
  var alert: typeof alert;
  var confirm: typeof confirm;
  var prompt: typeof prompt;
}

globalThis.alert = alert;
globalThis.confirm = confirm;
globalThis.prompt = prompt;
