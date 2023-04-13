import parseBoolean from "parseboolean";

let exiting = false;
// https://nodejs.org/api/events.html#emitterprependlistenereventname-listener
process.prependListener("exit", () => {
  exiting = true;
});

/**
 * This returns `true` if the current CLI environment is not suitable for simple
 * dialogs like `prompt()` and friends.
 *
 * @see https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#cannot-show-simple-dialogs
 */
function cannotShowSimpleDialogs(): boolean {
  if (!process.stdin.isTTY || !process.stderr.isTTY) {
    return true;
  }

  // The "two modes" of operation for a Readable stream are a simplified abstraction for the more complicated internal state management that is happening within the Readable stream implementation.
  //
  // Specifically, at any given point in time, every Readable is in one of three possible states:
  //
  // - readable.readableFlowing === null
  // - readable.readableFlowing === false
  // - readable.readableFlowing === true
  //
  // When readable.readableFlowing is null, no mechanism for consuming the stream's data is provided. Therefore, the stream will not generate data. While in this state, attaching a listener for the 'data' event, calling the readable.pipe() method, or calling the readable.resume() method will switch readable.readableFlowing to true, causing the Readable to begin actively emitting events as data is generated.
  //
  // Calling readable.pause(), readable.unpipe(), or receiving backpressure will cause the readable.readableFlowing to be set as false, temporarily halting the flowing of events but not halting the generation of data. While in this state, attaching a listener for the 'data' event will not switch readable.readableFlowing to true.
  //
  // [1]: https://nodejs.org/api/stream.html#three-states
  if (process.stdin.readableFlowing === false) {
    return true;
  }

  if (exiting) {
    return true;
  }

  if (parseBoolean(process.env.NO_DIALOGS)) {
    return true;
  }

  if (parseBoolean(process.env.CI)) {
    return true;
  }

  return false;
}

export default cannotShowSimpleDialogs;
