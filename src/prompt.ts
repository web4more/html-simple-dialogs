import { execSync } from "node:child_process";

function prompt(message: string = "", default_: string = ""): string | null {
  message = "" + message;
  default_ = "" + default_;

  const fileURL = new URL("prompt-subprocess.ts", import.meta.url);
  const { stdout: answer } = execSync(process.argv[0], [fileURL, message]);
  return answer || default_;
}

export default prompt;
