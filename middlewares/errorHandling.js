// Middleware for error handling
export const handleError = (error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "An unexpected error has occured";
  response.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

// Error class
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Functions to handle errors
export const throwError = (statusCode, message) => {
  throw new ErrorHandler(statusCode, message);
};

export const throwUnauthenticatedError = () => {
  throwError(401, "You must be logged in to use this");
};

export const throwNotFoundError = (missingString) => {
  throwError(404, `${missingString} not found`);
};

export const throwMissingFieldsError = (fields, body) => {
  const missingFields = fields.filter((field) => !body[field]);
  if (missingFields.length > 1) {
    throwError(
      400,
      `You have some missing fields: ${missingFields.join(", ")}`
    );
  } else {
    throwError(400, `You missed a field: ${missingFields[0]}`);
  }
};
