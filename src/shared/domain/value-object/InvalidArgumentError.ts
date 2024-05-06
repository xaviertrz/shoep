export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidArgumentError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidArgumentError);
    }
  }
}
