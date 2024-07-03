import ErrorHandler from "../utils/ErrorHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //wrong mongo db id  error
  if (err.name === "castError") {
    const message = `Resource not found.Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.value)} value`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Token expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
