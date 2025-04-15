const merge = require('lodash.merge');
const httpClient = require('../http-client');
const validate = require('./validate');
const composeUrl = require('./composeUrl');

const search =
  (config) =>
  async (data = {}, opts = {}) => {
    const apiValidation = validate.api(data);

    if (apiValidation.error) {
      throw apiValidation.error;
    }

    const options = merge({}, config.endpoints.api.httpOptions, opts);
    const url = composeUrl(config)(data);
    const { type, findBy, ...queryString } = data;
    const qsValidation = validate.qs(data, queryString);

    if (qsValidation.error) {
      throw qsValidation.error;
    }

    try {
      const res = await httpClient.get(url, queryString, options);

      return {
        success: true,
        statusCode: res.status,
        data: res.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          statusCode: error.response.status,
          error: 'Cannot fetch data',
          data: error.response.data,
        };
      }
      throw error;
    }
  };

module.exports = (config) => search(config);
