const arubaAuth = require('./lib/auth');

class ArubaClient {
  constructor(jwt, refresh_token) {
    this._jwt = jwt;
    this._refresh_token = refresh_token;
  }

  async auth(data) {
    const res = await arubaAuth(data);
    if (res.error) {
      return res.error;
    }
    this._jwt = res.data.access_token;
    this._refresh_token = res.data.refresh_token;
    return true;
  }

  async refreshToken() {
    const res = await arubaAuth({
      refresh_token: this._refresh_token,
      grant_type: 'refresh_token'
    });
    if (res.error) {
      return res.error;
    }
    this._jwt = res.data.access_token;
    this._refresh_token = res.data.refresh_token;
    return true;
  }
}

module.exports = ArubaClient;
