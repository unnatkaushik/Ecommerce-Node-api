const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};

// const asyncHandler = (fn) => (req, res, next) => {
//   try {
//     return fn(req, res, next);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

export { asyncHandler };
