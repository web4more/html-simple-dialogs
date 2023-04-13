declare global {
  var alert: (message?: string) => void;
  var confirm: (message?: string) => boolean;
  var prompt: (message?: string, default_?: string) => string | null;
}

export {};
