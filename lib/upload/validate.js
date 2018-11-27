const Joi = require('joi');

const uploadSignedSchema = Joi.object().keys({
  dataFile: Joi.string().required(),
  signed: Joi.boolean().valid(true)
});

const uploadSchema = uploadSignedSchema.keys({
  credential: Joi.string(),
  domain: Joi.string(),
  signed: Joi.boolean()
});

module.exports = {
  upload: data =>
    Joi.validate(data, uploadSchema, {
      abortEarly: false,
      allowUnknown: true
    }),
  uploadSigned: data =>
    Joi.validate(data, uploadSignedSchema, {
      abortEarly: false,
      allowUnknown: true
    })
};
