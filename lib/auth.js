const needle = require('needle');
const formUrlencoded = require('form-urlencoded').default;
const Joi = require('joi');

const authDataSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const refreshDataSchema = Joi.object().keys({
  refresh_token: Joi.string().required()
});

/**
 * Internal method that performs the actual authentication with Aruba
 * @ignore
 * @param {Object} [data]
 * @param {string} [data.username] Aruba username
 * @param {string} [data.password] Aruba password
 * @param {string} [data.grant_type] Aruba username
 * @param {string} [data.refresh_token] Aruba password*
 * @param {Object} [opts] Optional HTTP client options (needle)
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const auth = config => async (data = {}, opts = {}) => {
  const options = Object.assign(config.endpoints.auth.httpOptions, opts);

  try {
    const res = await needle(
      'post',
      `${config.endpoints.auth.url}/auth/signin`,
      formUrlencoded(data),
      options
    );

    if (res.body && res.body.error) {
      return {
        success: false,
        ...res.body
      };
    }
    return {
      success: true,
      ...res.body
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Authentication call that returns the JWT required for the next API calls
 * @ignore
 * @param {Object} data
 * @param {string} data.username Aruba username
 * @param {string} data.password Aruba password
 * @param {Object} [opts={}] Optional HTTP client options (needle)
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const signIn = config => async (data = {}, opts = {}) => {
  const validation = Joi.validate(data, authDataSchema, { abortEarly: false });

  if (validation.error) {
    throw validation.error;
  }

  const payload = Object.assign(
    {
      grant_type: 'password'
    },
    data
  );

  return auth(config)(payload, opts);
};

/**
 * Refresh the access token using the existing refresh token
 * @ignore
 * @param {Object} [data]
 * @param {string} [data.refresh_token] Token coming from the initial auth
 * @returns {Promise} Resolves to an boolean if successful, or an object
 *                    containing the error message
 */
const refreshToken = config => async (data = {}, opts = {}) => {
  const validation = Joi.validate(data, refreshDataSchema, {
    abortEarly: false
  });

  if (validation.error) {
    throw validation.error;
  }

  const payload = Object.assign(
    {
      grant_type: 'refresh_token'
    },
    data
  );

  return auth(config)(payload, opts);
};

module.exports = config => ({
  signIn: signIn(config),
  refreshToken: refreshToken(config)
});
