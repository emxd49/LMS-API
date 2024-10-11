const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const ERROR_MESSAGES = {
  UNAUTHORIZED: "Not authorized",
  FORBIDDEN: "Forbidden",
  INTERNAL_ERROR: "Internal server error",
  BAD_REQUEST: "Bad request",
  NOT_FOUND: "Bad request",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
