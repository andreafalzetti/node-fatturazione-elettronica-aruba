const needle = require('needle');
const merge = require('lodash.merge');
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

  const options = merge(config.endpoints.api.httpOptions, opts);
  const url = composeUrl(config)(data);

  const res = await needle('post', url, JSON.stringify(data), options);
  if (
    res.statusCode >= 400 ||
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
};

module.exports = config => upload(config);
