const schema = require('./schema');
const auth = require('../shared/auth');

/**
 * Refresh the access token using the existing refresh token
 * @ignore
 * @param {Object} [data]
 * @param {string} [data.refresh_token] Token coming from the initial auth
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const refreshToken =
  (config) =>
  async (data = {}, opts = {}) => {
    const validation = schema.validate(data, {
      abortEarly: false,
    });

    if (validation.error) {
      throw validation.error;
    }

    const payload = {
      grant_type: 'refresh_token',
      ...data,
    };

    return auth(config)(payload, opts);
  };

module.exports = refreshToken;
