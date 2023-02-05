const isValidYearWritten = (value) => {
  if (value < 1991) {
    const err = new Error("'year_written' must be greater than 1991.");
    err.name = "YearWritenError";
    throw err;
  } else if (value > new Date().getFullYear()) {
    const err = new Error("'year_written' must not be in the future.");
    err.name = "YearWritenError";
    throw err;
  }
};

module.exports = { isValidYearWritten };
