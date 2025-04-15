const httpClient = require('../lib/http-client');
const composeUrl = require('../lib/search/composeUrl');

const config = {
  endpoints: { api: { url: 'https://foo.bar', httpOptions: {} } },
};

const arubaSearch = require('../lib/search/search')(config);

jest.mock('../lib/http-client');

const { passivaOk } = require('../__mocks__/search');

describe('arubaSearch', () => {
  describe('composeUrl', () => {
    it('should return /services/invoice/out/findByUsername', async () => {
      const url = composeUrl(config)({ type: 'sent', findBy: 'username' });
      expect(url).toEqual(
        'https://foo.bar/services/invoice/out/findByUsername'
      );
    });

    it('should return /services/invoice/out/getByFilename', async () => {
      const url = composeUrl(config)({ type: 'sent', findBy: 'filename' });
      expect(url).toEqual('https://foo.bar/services/invoice/out/getByFilename');
    });

    it('should return /services/invoice/out/1', async () => {
      const url = composeUrl(config)({ type: 'sent', findBy: 'id', id: 1 });
      expect(url).toEqual('https://foo.bar/services/invoice/out/1');
    });

    it('should should throw if no params are passed', async () => {
      const res = arubaSearch();
      expect(res).rejects.toThrow();
    });

    it('should should throw if wrong params are passed', async () => {
      const res = arubaSearch({ type: 'sent', findBy: 'id', foo: 'bar' });
      expect(res).rejects.toThrow();
    });

    it('should handle response correctly if Aruba returns 429 with HTML', async () => {
      const errorResp = {
        response: {
          status: 429,
          data: `<html><head><title>Too many requests</title></head><body>Stop it</body></html>`,
        },
      };

      httpClient.get.mockRejectedValue(errorResp);

      const res = await arubaSearch({
        type: 'sent',
        findBy: 'id',
        id: 'THE_INVOICE_ID',
      });
      expect(res).toEqual({
        statusCode: 429,
        success: false,
        data: '<html><head><title>Too many requests</title></head><body>Stop it</body></html>',
        error: 'Cannot fetch data',
      });
    });

    it('should return the data successfully', async () => {
      httpClient.get.mockResolvedValue({
        status: 200,
        data: passivaOk.data,
      });

      const res = await arubaSearch({
        type: 'sent',
        findBy: 'id',
        id: 'THE_INVOICE_ID',
      });

      expect(res).toHaveProperty('statusCode', 200);
      expect(res).toHaveProperty('data');
      expect(res.data).toHaveProperty('docType', 'in');
      expect(res.data).toHaveProperty('id');
      expect(res.data).toHaveProperty('file');
      expect(res.data).toHaveProperty('filename');
    });

    it('should throw an error when there is a network failure', async () => {
      const error = new Error('Network failure');
      httpClient.get.mockRejectedValue(error);
      expect(
        arubaSearch({
          type: 'sent',
          findBy: 'id',
          id: 'THE_INVOICE_ID',
        })
      ).rejects.toThrowError();
    });
  });
});
