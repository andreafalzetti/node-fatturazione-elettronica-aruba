module.exports = {
  endpoints: {
    demo: {
      auth: {
        url:
          process.env.ARUBA_AUTH_URL ||
          'https://demoauth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        },
      },
      api: {
        url:
          process.env.ARUBA_API_URL ||
          'https://demows.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: false,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          },
        },
      },
    },
    prod: {
      auth: {
        url:
          process.env.ARUBA_AUTH_URL ||
          'https://auth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        },
      },
      api: {
        url:
          process.env.ARUBA_API_URL ||
          'https://ws.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: true,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          },
        },
      },
    },
  },
};
