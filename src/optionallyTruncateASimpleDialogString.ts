/**
 * @see https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#optionally-truncate-a-simple-dialog-string
 */
function optionallyTruncateASimpleDialogString(s: string): string {
  // To optionally truncate a simple dialog string s, return either s itself or some string derived from s that is shorter. User agents should not provide UI for displaying the elided portion of s, as this makes it too easy for abusers to create dialogs of the form "Important security alert! Click 'Show More' for full details!".
  if (s.length > 100) {
    return s.slice(0, 100) + "...";
  } else {
    return s;
  }
  // Note: For example, a user agent might want to only display the first 100 characters of a message. Or, a user agent might replace the middle of the string with "…". These types of modifications can be useful in limiting the abuse potential of unnaturally large, trustworthy-looking system dialogs.
}

export default optionallyTruncateASimpleDialogString;
