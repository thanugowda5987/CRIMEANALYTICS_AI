const logger = require("../utils/logger");
const ApiResponse = require("../utils/apiResponse");

const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  return ApiResponse.error(
    res,
    statusCode,
    err.message || "Internal Server Error",
    process.env.NODE_ENV === "development" ? err.stack : undefined
  );
};

module.exports = { notFound, errorHandler };