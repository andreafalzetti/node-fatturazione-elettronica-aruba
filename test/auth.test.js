const needle = require('needle');
const arubaAuth = require('../lib/auth');

jest.mock('needle');

describe('arubaAuth', () => {
  it('should return an error when username and password are wrong', async () => {
    const resp = {
      body: {
        error: 'invalid_grant',
        error_description: 'The user name or password is incorrect.'
      }
    };
    needle.mockResolvedValue(resp);
    const res = await arubaAuth({ username: 'foo', password: 'bar' });
    expect(res).toEqual({
      error_description: 'The user name or password is incorrect.',
      error: 'invalid_grant',
      success: false
    });
  });
});
