const Joi = require('joi');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('http-status-codes');

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);

    if (error) {
      const message = error.details.map(i => i.message).join();
      res
        .status(property === 'body' ? UNPROCESSABLE_ENTITY : BAD_REQUEST)
        .json({ error: message });
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};

module.exports = validator;
