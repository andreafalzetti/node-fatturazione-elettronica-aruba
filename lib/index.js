const { endpoints } = require('./constants');
const arubaAuth = require('./auth');
// const arubaSearch = require('./search');

class ArubaClient {
  /**
   * ArubaClient constructor
   * @param {Object} [options]
   * @param {string} [options.env] Aruba environment (demo or prod)
   * @returns {Object} Returns an instance of ArubaClient
   */
  constructor(options = {}) {
    // const { jwt = '', refreshToken = '', env = 'demo' } = options;
    // this._jwt = jwt;
    // this._refreshToken = refreshToken;
    this._env = options.env || 'prod';
    // this._endpoints = endpoints[env];
  }

  arubaApi() {
    const config = {
      endpoints: endpoints[this._env]
    };
    return arubaAuth(config);
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
    const res = await this.arubaApi().signIn(data);
    if (res.error) {
      return res;
    }
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
    console.log('this._refreshToken', this._refreshToken);
    const res = await this.arubaApi().refreshToken({
      refresh_token: this._refreshToken
    });
    if (res.error) {
      return res;
    }
    this._jwt = res.access_token;
    this._refreshToken = res.refresh_token;
    return true;
  }

  // async searchInvoice(opts) {
  //   const res = await arubaSearch(opts);
  //   // this.jwt = 1;
  //   if (res.error) {
  //     return res.error;
  //   }
  //   return res;
  // }
}

module.exports = ArubaClient;
