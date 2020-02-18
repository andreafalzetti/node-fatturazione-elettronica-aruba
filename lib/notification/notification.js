const needle = require('needle');
const merge = require('lodash.merge');
const validate = require('./validate');
const composeUrl = require('./composeUrl');

const notification = config => async (data = {}, opts = {}) => {
  const apiValidation = validate.api(data);

  if (apiValidation.error) {
    throw apiValidation.error;
  }

  const options = merge(config.endpoints.api.httpOptions, opts);
  const url = composeUrl(config)(data);
  const { type, findBy, ...queryString } = data;

  const qsValidation = validate.qs(data, queryString);

  if (qsValidation.error) {
    throw qsValidation.error;
  }

  const res = await needle('get', url, queryString, options);

  if (res.statusCode >= 400) {
    return {
      success: false,
      statusCode: res.statusCode,
      error: 'Cannot fetch data',
      data: res.body
    };
  }

  return {
    success: true,
    statusCode: res.statusCode,
    data: res.body
  };
};

module.exports = config => notification(config);
