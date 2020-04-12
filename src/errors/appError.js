const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

module.exports = { NOT_FOUND_ERROR: NotFoundError };
