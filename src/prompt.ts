import cannotShowSimpleDialogs from "./cannotShowSimpleDialogs.ts";
import { normalizeNewlines } from "@oozcitak/infra/lib/String.js";
import redlet from "./redlet.ts";

/**
 * Displays a modal text control prompt with the given message, waits for the
 * user to dismiss it, and returns the value that the user entered. If the user
 * cancels the prompt, then returns null instead. If the second argument is
 * present, then the given value is used as a default.
 *
 * @see https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-prompt
 */
function prompt(message: string = "", default_: string = ""): string | null {
  message = "" + message;
  default_ = "" + default_;

  // The prompt(message, default) method steps are:

  // 1. If we cannot show simple dialogs for this, then return null.
  if (cannotShowSimpleDialogs()) {
    return null;
  }

  // 2. Set message to the result of normalizing newlines given message.
  message = normalizeNewlines(message);

  // 5. Show message to the user, treating U+000A LF as a line break, and ask
  //    the user to either respond with a string value or abort. The response
  //    must be defaulted to the value given by default.
  // 7. Pause while waiting for the user's response.
  // 8. Let result be null if the user aborts, or otherwise the string that the
  //    user responded with.
  const result = redlet(
    async (message: string, default_: string): Promise<string> => {
      const { createInterface } = await import("node:readline/promises");
      const { pEvent } = await import("p-event");

      const rl = createInterface({
        input: process.stdin,
        output: process.stderr,
      });

      return await Promise.any([
        rl
          .question(
            (message ? message + "\n" : message) +
              (default_ ? `[${default_}] > ` : "> ")
          )
          .then((a) => (a.trim() ? a : default_)),
        pEvent(rl, "close").then(() => (console.log(), null)),
      ]);
    }
  )(message, default_);

  // 10. Return result.
  return result;
}

export default prompt;
