/**
 *
 * @ignore
 * @param {Object} config
 * @param {Object} config.endpoints
 * @param {Object} config.endpoints.api
 * @param {String} config.endpoints.api.url
 */
const composeUrl = (config) => (data) => {
  const types = {
    sent: 'out',
    received: 'in',
  };

  const findMethods = {
    username: () => 'findByUsername',
    filename: () => 'getByFilename',
    id: () => data.id,
  };

  const findBy = findMethods[data.findBy]();
  const direction = types[data.type];

  const url = `${config.endpoints.api.url}/services/invoice/${direction}/${findBy}`;

  return url;
};

module.exports = composeUrl;
