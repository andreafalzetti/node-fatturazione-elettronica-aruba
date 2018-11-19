const composeUrl = require('../lib/search/composeUrl');

const config = {
  endpoints: { api: { url: 'https://foo.bar' } }
};

// const arubaSearch = require('../lib/search/search')(config);

jest.mock('needle');

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
  });
});
