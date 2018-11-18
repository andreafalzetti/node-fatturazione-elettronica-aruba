const needle = require('needle');
const formUrlencoded = require('form-urlencoded').default;
const { endpoints } = require('./constants');

const validate = options => false;

const auth = async (data, opts) => {
  const errors = validate(opts);

  if (errors) {
    return new Error('[aruba][auth] Invalid options');
  }

  const payload = Object.assign(
    {
      grant_type: 'password'
    },
    data
  );

  const options = Object.assign(
    {
      json: false,
      rejectUnauthorized: false
    },
    opts
  );

  try {
    const res = await needle(
      'post',
      endpoints.auth,
      formUrlencoded(payload),
      options
    );

    if (res.body.error) {
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
    return {
      success: false,
      error
    };
  }
};

module.exports = auth;
