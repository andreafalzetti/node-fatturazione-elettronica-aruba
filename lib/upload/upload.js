const merge = require('lodash.merge');
const httpClient = require('../http-client');
const validate = require('./validate');
const composeUrl = require('./composeUrl');

const upload =
  (config) =>
  async (data = {}, opts = {}) => {
    let validation;

    if (data.signed && data.signed === true) {
      validation = validate.uploadSigned(data);
    } else {
      validation = validate.upload(data);
    }

    if (validation.error) {
      throw validation.error;
    }

    const options = merge({}, config.endpoints.api.httpOptions, opts);
    const url = composeUrl(config)(data);

    try {
      const res = await httpClient.post(url, JSON.stringify(data), options);

      if (res.data.errorCode && res.data.errorCode !== '0000') {
        return {
          success: false,
          statusCode: res.status,
          data: res.data,
        };
      }

      return {
        success: true,
        statusCode: res.status,
        ...res.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          statusCode: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };

module.exports = (config) => upload(config);
