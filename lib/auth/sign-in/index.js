const schema = require('./schema');
const auth = require('../shared/auth');

/**
 * Authentication call that returns the JWT required for the next API calls
 * @ignore
 * @param {Object} data
 * @param {string} data.username Aruba username
 * @param {string} data.password Aruba password
 * @param {Object} [opts={}] Optional HTTP client options
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const signIn =
  (config) =>
  async (data = {}, opts = {}) => {
    const validation = schema.validate(data, { abortEarly: false });

    if (validation.error) {
      throw validation.error;
    }

    const payload = {
      grant_type: 'password',
      ...data,
    };

    return auth(config)(payload, opts);
  };

module.exports = signIn;