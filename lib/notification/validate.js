const Joi = require('joi');

const apiValidationSchema = Joi.object().keys({
  type: Joi.string().required().valid('sent', 'received'),
  findBy: Joi.string().required().valid('filename', 'invoiceFilename', 'id'),
});

const queryStringSchemas = {
  filename: Joi.object().keys({
    filename: Joi.string().required(),
  }),
  invoiceFilename: Joi.object().keys({
    invoiceFilename: Joi.string().required(),
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
