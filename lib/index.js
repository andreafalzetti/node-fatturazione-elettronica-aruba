const { endpoints } = require('./constants');
const arubaAuth = require('./auth');
const arubaSearch = require('./search/search');
const arubaNotification = require('./notification/notification');

class ArubaClient {
  /**
   * ArubaClient constructor
   * @name ArubaClient
   * @param {Object} [options]
   * @param {string} [options.env] Aruba environment (demo or prod)
   * @returns {Object} Returns an instance of ArubaClient
   */
  constructor(options = {}) {
    this.env = options.env || 'prod';
    this.config = {
      endpoints: endpoints[this.env]
    };
  }

  reqHeaders() {
    return {
      headers: { Authorization: `Bearer ${this._jwt}` }
    };
  }

  /**
   * Calls Aruba to generate a JWT that will be used for future calls
   * @param {Object} data
   * @param {string} data.username Aruba username
   * @param {string} data.password Aruba password
   * @returns {Promise} Resolves to an boolean if successful, or an object
   *                    containing the error message
   */
  async signIn(data) {
    const res = await arubaAuth(this.config).signIn(data);
    if (res.error) {
      return res;
    }
    this._username = data.username;
    this._jwt = res.access_token;
    this._refreshToken = res.refresh_token;
    return true;
  }

  /**
   * Calls Aruba to refresh the JWT
   * @returns {Promise} Resolves to an boolean if successful, or an object
   *                    containing the error message
   */
  async refreshToken() {
    const res = await arubaAuth(this.config).refreshToken({
      refresh_token: this._refreshToken
    });
    if (res.error) {
      return res;
    }
    this._jwt = res.access_token;
    this._refreshToken = res.refresh_token;
    return true;
  }

  /**
   * Search an invoice by username, filename, or id
   * @returns {Promise} Resolves to an boolean if successful, or an object
   *                    containing the error message
   */
  searchInvoice(data = {}) {
    return arubaSearch(this.config)(data, this.reqHeaders());
  }

  /**
   * Get the invoice notifications
   * @returns {Promise} Resolves to an boolean if successful, or an object
   *                    containing the error message
   */
  getInvoiceNotifications(data = {}) {
    return arubaNotification(this.config)(data, this.reqHeaders());
  }
}

module.exports = ArubaClient;
