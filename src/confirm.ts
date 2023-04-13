import cannotShowSimpleDialogs from "./cannotShowSimpleDialogs.ts";
import { normalizeNewlines } from "@oozcitak/infra/lib/String.js";
import optionallyTruncateASimpleDialogString from "./optionallyTruncateASimpleDialogString.ts";
import redletSync from "./redletSync.ts";

/**
 * Result = window.confirm(message);
 *
 * Displays a modal OK/Cancel prompt with the given message, waits for the user
 * to dismiss it, and returns true if the user clicks OK and false if the user
 * clicks Cancel.
 *
 * @see https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-confirm
 */
function confirm(message: string = ""): boolean {
  message = "" + message;

  // The confirm(message) method steps are:

  // 1. If we cannot show simple dialogs for this, then return false.
  if (cannotShowSimpleDialogs()) {
    return false;
  }

  // 2. Set message to the result of normalizing newlines given message.
  message = normalizeNewlines(message);

  // 3. Set message to the result of optionally truncating message.
  message = optionallyTruncateASimpleDialogString(message);

  // 4. Show message to the user, treating U+000A LF as a line break, and ask the user to respond with a positive or negative response.
  // 6. Pause until the user responds either positively or negatively.
  // 8. If the user responded positively, return true; otherwise, the user responded negatively: return false.
  return redletSync(async (message: string): Promise<boolean> => {
    const { createInterface } = await import("node:readline/promises");
    const { pEvent } = await import("p-event");

    const rl = createInterface({
      input: process.stdin,
      output: process.stderr,
    });

    return await Promise.any([
      rl
        .question(message + "\n[Y/n] > ")
        .then((a) => /^(?:y|yes|o|ok|)$/i.test(a.trim())),
      pEvent(rl, "close").then(() => (console.log(), false)),
    ]);
  })(message);
}

export default confirm;
