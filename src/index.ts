// import alert from "./alert.ts";
// import confirm from "./confirm.ts";
import prompt from "./prompt.ts";

type prompt_ = typeof prompt;
declare global {
  // var alert: typeof alert;
  // var confirm: typeof confirm;
  // @ts-ignore
  var prompt: prompt_;
}

// globalThis.alert = alert;
// globalThis.confirm = confirm;
globalThis.prompt = prompt;
