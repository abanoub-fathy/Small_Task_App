class customError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const createCustomError = (message, code) => {
  return new customError(message, code);
};

module.exports = {
  customError,
  createCustomError,
};
