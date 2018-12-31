module.exports = {
  endpoints: {
    demo: {
      auth: {
        url:
          process.env.ARUBA_AUTH_URL ||
          'https://demoauth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: false
        }
      },
      api: {
        url:
          process.env.ARUBA_API_URL ||
          'https://demows.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          rejectUnauthorized: false
        }
      }
    },
    prod: {
      auth: {
        url:
          process.env.ARUBA_AUTH_URL ||
          'https://auth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: true
        }
      },
      api: {
        url:
          process.env.ARUBA_API_URL ||
          'https://ws.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: true
        }
      }
    }
  }
};
