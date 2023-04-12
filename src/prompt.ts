import createSubprocessFunction from "./createSubprocessFunction.ts";

const readlineQuestionSync = createSubprocessFunction(
  async (message: string) => {
    const { createInterface } = await import("node:readline/promises");

    const rl = createInterface({
      input: process.stdin,
      output: process.stderr,
    });
    try {
      return await rl.question(message);
    } finally {
      rl.close();
    }
  }
);

function prompt(message: string = "", default_: string = ""): string | null {
  message = "" + message;
  default_ = "" + default_;

  // The prompt(message, default) method steps are:

  // 1. If we cannot show simple dialogs for this, then return null.
  if (cannotShowSimpleDialogs(this ?? globalThis)) {
    return null;
  }

  // 2. Set message to the result of normalizing newlines given message.
  message = normalizeNewlines(message);

  // 3. Set message to the result of optionally truncating message.
  message = optionallyTruncateASimpleDialogString(message);

  // 4. Set default to the result of optionally truncating default.
  default_ = optionallyTruncateASimpleDialogString(default_);

  // 5. Show message to the user, treating U+000A LF as a line break, and ask
  //    the user to either respond with a string value or abort. The response
  //    must be defaulted to the value given by default.
  // 6. Pause while waiting for the user's response.
  // 7. Let result be null if the user aborts, or otherwise the string that the
  //    user responded with.
  const answer = subp`
    import { createInterface } from "node:readline/promises";

    const rl = createInterface({
      input: process.stdin,
      output: process.stderr,
    });
    try {
      return await rl.question(${message});
    } finally {
      rl.close();
    }
  `;

  // Invoke WebDriver BiDi user prompt closed with this, false if result is null or true otherwise, and result.

  // Return result.

  const answer = dialog(message);
  return answer || default_;
}

export default prompt;
