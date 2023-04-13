import parseBoolean from "parseboolean";

let exiting = false;
process.on("exit", () => {
  exiting = true;
});

function cannotShowSimpleDialogs(): boolean {
  if (!process.stdin.isTTY || !process.stderr.isTTY) {
    return true;
  }

  if (exiting) {
    return true;
  }

  if (parseBoolean(process.env.NO_DIALOGS)) {
    return true;
  }

  return false;
}

export default cannotShowSimpleDialogs;
