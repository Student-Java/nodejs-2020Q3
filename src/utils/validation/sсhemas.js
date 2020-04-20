const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  taskId: {
    id: Joi.objectId(),
    boardId: Joi.objectId()
  },
  id: {
    id: Joi.objectId()
  },
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
      )
    })
};

module.exports = schemas;
