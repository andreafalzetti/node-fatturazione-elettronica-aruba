const signIn = require('./sign-in');
const refreshToken = require('./refresh-token');

module.exports = (config) => ({
  signIn: signIn(config),
  refreshToken: refreshToken(config),
});
