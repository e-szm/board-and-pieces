module.exports = class AppError extends Error {
  constructor(msg, code, status) {
    super(msg);
    this.statusCode = code;
    this.status = status;
    this.isOperational = true;
  }
};
