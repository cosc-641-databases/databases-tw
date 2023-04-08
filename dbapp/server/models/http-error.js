// Custom HttpError code to throw during app operation.
class HttpError extends Error {
  constructor (message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

module.exports = HttpError;
