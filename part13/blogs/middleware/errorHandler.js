const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    const messages = error.errors.map((e) => e.message);
    response.status(400).json({ error: messages });
  } else if (error.name === "BlogNotFound" || error.name === "UserNotFound") {
    response.status(404).json({ error: error.message });
  } else if (error.name === "LoginError") {
    response.status(401).json({ error: error.message });
  } else if (error.name === "Unauthorised") {
    response.status(403).json({ error: error.message });
  } else if (error.name === "YearWrittenError") {
    response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };
