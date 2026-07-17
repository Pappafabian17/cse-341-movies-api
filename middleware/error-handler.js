const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected error occurred on the server.",
    error: process.env.NODE_ENV === "development" ? err.stack : {}
  });
};


module.exports = globalErrorHandler;