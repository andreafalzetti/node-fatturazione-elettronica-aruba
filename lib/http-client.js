const axios = require('axios');

/**
 * HTTP client wrapper using axios
 */
const httpClient = {
  /**
   * Make a GET request
   * @param {string} url - URL to make the request to
   * @param {Object} queryParams - Query parameters
   * @param {Object} options - Request options
   * @returns {Promise} - Promise resolving to the response
   */
  get: (url, queryParams = {}, options = {}) => {
    const requestOptions = { ...options };

    if (Object.keys(queryParams).length > 0) {
      requestOptions.params = queryParams;
    }

    return axios.get(url, requestOptions);
  },

  /**
   * Make a POST request
   * @param {string} url - URL to make the request to
   * @param {Object|string} data - Data to send
   * @param {Object} options - Request options
   * @returns {Promise} - Promise resolving to the response
   */
  post: (url, data, options = {}) => {
    return axios.post(url, data, options);
  },
};

module.exports = httpClient;
