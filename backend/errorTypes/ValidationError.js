class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.errors = message;
  }
}

module.exports = ValidationError;
