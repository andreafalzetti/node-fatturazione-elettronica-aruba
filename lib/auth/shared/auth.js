const formUrlencoded = require('form-urlencoded');
const httpClient = require('../../http-client');

/**
 * Internal method that performs the actual authentication with Aruba
 * @ignore
 * @param {Object} [data]
 * @param {string} [data.username] Aruba username
 * @param {string} [data.password] Aruba password
 * @param {string} [data.grant_type] Aruba username
 * @param {string} [data.refresh_token] Aruba password*
 * @param {Object} [opts] Optional HTTP client options
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const auth =
  (config) =>
  async (data = {}, opts = {}) => {
    const options = { ...config.endpoints.auth.httpOptions, ...opts };

    try {
      const res = await httpClient.post(
        `${config.endpoints.auth.url}/auth/signin`,
        formUrlencoded(data),
        options
      );

      return {
        success: true,
        ...res.data,
      };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        return {
          success: false,
          ...error.response.data,
        };
      }
      throw error;
    }
  };

module.exports = auth;
