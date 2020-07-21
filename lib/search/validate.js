const Joi = require('@hapi/joi');

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
    apiValidationSchema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    }),
  qs: (data, queryStirng) =>
    queryStringSchemas[data.findBy].validate(queryStirng, {
      abortEarly: false,
      allowUnknown: true,
    }),
};
