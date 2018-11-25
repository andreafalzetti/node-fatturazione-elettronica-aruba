const needle = require('needle');
const validate = require('./validate');
const composeUrl = require('./composeUrl');

const upload = config => async (data = {}, opts = {}) => {
  let validation;

  if (data.signed && data.signed === true) {
    validation = validate.uploadSigned(data);
  } else {
    validation = validate.upload(data);
  }

  if (validation.error) {
    throw validation.error;
  }

  const options = Object.assign(config.endpoints.api.httpOptions, opts);
  const url = composeUrl(config)(data);

  try {
    const res = await needle('post', url, data, options);
    if (
      res.statusCode > 400 ||
      (res.body.errorCode && res.body.errorCode !== '0000')
    ) {
      return {
        success: false,
        statusCode: res.statusCode,
        ...res.body
      };
    }
    return {
      success: true,
      statusCode: res.statusCode,
      ...res.body
    };
  } catch (error) {
    throw error;
  }
};

module.exports = config => upload(config);
