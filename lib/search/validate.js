const Joi = require('joi');

const apiValidationSchema = Joi.object().keys({
  type: Joi.string().required().valid('sent', 'received'),
  findBy: Joi.string().required().valid('username', 'filename', 'id'),
});

const queryStringSchemas = {
  username: Joi.object().keys({
    username: Joi.string().required(),
  }),
  filename: Joi.object().keys({
    filename: Joi.string().required(),
  }),
  id: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  api: (data) =>
    Joi.validate(data, apiValidationSchema, {
      abortEarly: false,
      allowUnknown: true,
    }),
  qs: (data, queryStirng) =>
    Joi.validate(queryStirng, queryStringSchemas[data.findBy], {
      abortEarly: false,
      allowUnknown: true,
    }),
};
