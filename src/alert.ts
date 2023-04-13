import cannotShowSimpleDialogs from "./cannotShowSimpleDialogs.ts";
import { normalizeNewlines } from "@oozcitak/infra/lib/String.js";
import redlet from "./redlet.ts";

/**
 * Displays a modal text control prompt with the given message, waits for the
 * user to dismiss it, and returns the value that the user entered. If the user
 * cancels the prompt, then returns null instead. If the second argument is
 * present, then the given value is used as a default.
 *
 * @see https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-alert
 */
function alert(message: string | undefined = undefined) {
  // The alert() and alert(message) method steps are:

  // 1. If we cannot show simple dialogs for this, then return.
  if (cannotShowSimpleDialogs()) {
    return;
  }

  // 2. If the method was invoked with no arguments, then let message be the
  //    empty string; otherwise, let message be the method's first argument.
  if (!arguments.length) {
    message = "";
  }

  // 3. Set message to the result of normalizing newlines given message.
  message = normalizeNewlines(message);

  // 5. Show message to the user, treating U+000A LF as a line break.
  // 7. Optionally, pause while waiting for the user to acknowledge the message.
  redlet(async (message: string) => {
    const { createInterface } = await import("node:readline/promises");
    const { pEvent } = await import("p-event");

    const rl = createInterface({
      input: process.stdin,
      output: process.stderr,
    });

    return await Promise.any([
      rl
        .question(
          message
            ? message + "\n[Press ENTER to continue]"
            : "[Press ENTER to continue]"
        )
        .then(() => null),
      pEvent(rl, "close").then(() => (console.log(), null)),
    ]);
  })(message);
}

export default alert;
