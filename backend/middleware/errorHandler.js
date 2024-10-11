const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/error");

const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode || res.statusCode || ERROR_CODES.INTERNAL_ERROR;
  switch (statusCode) {
    case 400:
      res
        .status(statusCode)
        .json({ title: ERROR_MESSAGES.BAD_REQUEST, message: err.message });
      break;
    case 401:
      res
        .status(statusCode)
        .json({ title: ERROR_MESSAGES.UNAUTHORIZED, message: err.message });
      break;
    case 403:
      res
        .status(statusCode)
        .json({ title: ERROR_MESSAGES.FORBIDDEN, message: err.message });
      break;
    case 404:
      res
        .status(statusCode)
        .json({ title: ERROR_MESSAGES.NOT_FOUND, message: err.message });
      break;
    default:
      res
        .status(statusCode)
        .json({ title: ERROR_MESSAGES.INTERNAL_ERROR, message: err.message });
      console.error(err);
      break;
  }
};
module.exports = { errorHandler };
