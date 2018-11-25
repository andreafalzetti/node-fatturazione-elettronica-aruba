const needle = require('needle');
const { getFattura } = require('./util');
const composeUrl = require('../lib/upload/composeUrl');

const config = {
  endpoints: { api: { url: 'https://foo.bar', httpOptions: {} } }
};

const upload = require('../lib/upload/upload')(config);

jest.mock('needle');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const options = { headers: { Authorization: `Bearer ${token}` } };

let samples;

const loadSamples = async () => {
  const invoices = {};
  invoices.ok = await getFattura('./test/samples/ok.xml');
  invoices.errore_autenticazione = await getFattura(
    './test/samples/errore_autenticazione.xml'
  );
  return invoices;
};

describe.only('upload', () => {
  beforeAll(async () => {
    samples = await loadSamples();
  });

  it('should return an error when the auth token is missing from headers', async () => {
    const resp = {
      statusCode: 200,
      body: {
        uploadFileName: null,
        errorCode: '0900',
        errorDescription: 'AccessToken non valorizzato, key : Authorization'
      }
    };

    needle.mockResolvedValue(resp);

    const res = await upload({ dataFile: 'foo' }, {});
    expect(res).toEqual({
      statusCode: 200,
      success: false,
      uploadFileName: null,
      errorCode: '0900',
      errorDescription: 'AccessToken non valorizzato, key : Authorization'
    });
  });

  it('should return an error when the auth token is corrupted', async () => {
    const resp = {
      statusCode: 200,
      body: {
        uploadFileName: null,
        errorCode: '0001',
        errorDescription: 'Errore Generico'
      }
    };

    needle.mockResolvedValue(resp);

    const res = await upload(
      { dataFile: 'foo' },
      { headers: { Authorization: `foo` } }
    );

    expect(res).toEqual({
      statusCode: 200,
      success: false,
      uploadFileName: null,
      errorCode: '0001',
      errorDescription: 'Errore Generico'
    });
  });

  it.only('should return the "uploadFileName" when the invoice is uploaded successfully', async () => {
    const resp = {
      statusCode: 200,
      body: {
        uploadFileName: 'IT01879020517_aaa6r.xml.p7m',
        errorCode: '0000',
        errorDescription: null
      }
    };

    needle.mockResolvedValue(resp);

    const res = await upload({ dataFile: samples.ok }, options);

    expect(res).toEqual({
      statusCode: 200,
      success: true,
      errorCode: '0000',
      errorDescription: null,
      uploadFileName: 'IT01879020517_aaa6r.xml.p7m'
    });
  });

  it('should return an error when the user does not match with the invoice details', async () => {
    const resp = {
      statusCode: 200,
      body: {
        uploadFileName: null,
        errorCode: '0012',
        errorDescription: 'Errore autenticazione'
      }
    };

    needle.mockResolvedValue(resp);

    const res = await upload(
      { dataFile: samples.errore_autenticazione },
      options
    );

    expect(res).toEqual({
      statusCode: 200,
      success: false,
      uploadFileName: null,
      errorCode: '0012',
      errorDescription: 'Errore autenticazione'
    });
  });

  describe('composeUrl', () => {
    it('should return /services/invoice/upload', async () => {
      const url = composeUrl(config)();
      expect(url).toEqual('https://foo.bar/services/invoice/upload');
    });
    it('should return /services/invoice/uploadSigned', async () => {
      const url = composeUrl(config)({ signed: true });
      expect(url).toEqual('https://foo.bar/services/invoice/uploadSigned');
    });
  });
});
