// const needle = require('needle');
const arubaSearch = require('../lib/search/search')({
  endpoints: { api: 'https://foo.bar' }
});

jest.mock('needle');

describe('arubaSearch', () => {
  describe('composeUrl', () => {
    it('should return /services/invoice/out/findByUsername', async () => {
      const url = arubaSearch.composeUrl({ type: 'sent', findBy: 'username' });
      expect(url).toEqual(
        'https://foo.bar/services/invoice/out/findByUsername'
      );
    });
    it('should return /services/invoice/out/getByFilename', async () => {
      const url = arubaSearch.composeUrl({ type: 'sent', findBy: 'filename' });
      expect(url).toEqual('https://foo.bar/services/invoice/out/getByFilename');
    });
    it('should return /services/invoice/out/1', async () => {
      const url = arubaSearch.composeUrl({ type: 'sent', findBy: 'id', id: 1 });
      expect(url).toEqual('https://foo.bar/services/invoice/out/1');
    });
  });
});
