module.exports = {
  endpoints: {
    demo: {
      auth: {
        url: 'https://demoauth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: false
        }
      },
      api: {
        url: 'https://demows.fatturazioneelettronica.aruba.it',
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
        url: 'https://auth.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: false,
          rejectUnauthorized: true
        }
      },
      api: {
        url: 'https://ws.fatturazioneelettronica.aruba.it',
        httpOptions: {
          json: true,
          rejectUnauthorized: true
        }
      }
    }
  }
};
