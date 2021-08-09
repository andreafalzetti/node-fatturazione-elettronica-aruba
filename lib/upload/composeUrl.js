/**
 *
 * @ignore
 * @param {Object} config
 * @param {Object} config.endpoints
 * @param {Object} config.endpoints.api
 * @param {String} config.endpoints.api.url
 */
const composeUrl =
  (config) =>
  (data = {}) => {
    const type = data.signed === true ? 'uploadSigned' : 'upload';
    const url = `${config.endpoints.api.url}/services/invoice/${type}`;

    return url;
  };

module.exports = composeUrl;
