const Joi = require('@hapi/joi');

const uploadSignedSchema = Joi.object().keys({
  dataFile: Joi.string().required(),
  signed: Joi.boolean().valid(true),
});

const uploadSchema = uploadSignedSchema.keys({
  credential: Joi.string(),
  domain: Joi.string(),
  signed: Joi.boolean(),
});

module.exports = {
  upload: (data) =>
    uploadSchema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    }),
  uploadSigned: (data) =>
    uploadSignedSchema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    }),
};
