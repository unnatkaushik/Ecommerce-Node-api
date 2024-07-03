class ErrorHandler extends Error {
  constructor(message = "something went wrong", statusCode, stack = "") {
    console.log(message, statusCode, stack);
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ErrorHandler;
