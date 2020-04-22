const needle = require('needle');
const arubaAuth = require('../lib/auth')({
  endpoints: { auth: { url: 'https://foo.bar', httpOptions: {} } },
});

jest.mock('needle');

describe('arubaAuth', () => {
  describe('signIn', () => {
    it('should return an error when username and password are wrong', async () => {
      const resp = {
        body: {
          error: 'invalid_grant',
          error_description: 'The user name or password is incorrect.',
        },
      };
      needle.mockResolvedValue(resp);

      const res = await arubaAuth.signIn({ username: 'foo', password: 'bar' });
      expect(res).toEqual({
        error_description: 'The user name or password is incorrect.',
        error: 'invalid_grant',
        success: false,
      });
    });

    it('should return an error when the args are incorrect ', async () => {
      expect(arubaAuth.signIn({ username: 'foo' })).rejects.toThrowError();
    });

    it('should throw an error when there is a network failure', async () => {
      const error = new Error('Network failure');
      needle.mockImplementation(() => {
        throw error;
      });
      expect(
        arubaAuth.signIn({ username: 'foo', password: 'bar' })
      ).rejects.toThrowError();
    });

    it('should return the access_token', async () => {
      const resp = {
        body: {
          access_token: 'ey10efoo',
          token_type: 'bearer',
          expires_in: 1799,
          refresh_token: 'abc123foo',
          userName: 'notarealuser',
          'as:client_id': 'Auth',
          '.issued': 'Sun, 18 Nov 2018 07:23:39 GMT',
          '.expires': 'Sun, 18 Nov 2018 07:53:39 GMT',
        },
      };
      needle.mockResolvedValue(resp);
      const res = await arubaAuth.signIn({
        username: 'notarealuser',
        password: 'notarealpassword',
      });
      expect(res).toEqual(Object.assign(resp.body, { success: true }));
    });

    it('should should throw if no params are passed', async () => {
      const res = arubaAuth.signIn();
      expect(res).rejects.toThrow();
    });
  });

  describe('refreshToken', () => {
    it('should return an error when the args are incorrect (refresh)', async () => {
      expect(
        arubaAuth.refreshToken({ grant_type: 'foo' })
      ).rejects.toThrowError();
    });

    it('should throw an error when there is a network failure', async () => {
      const error = new Error('Network failure');
      needle.mockImplementation(() => {
        throw error;
      });
      expect(
        arubaAuth.refreshToken({ refresh_token: 'foo' })
      ).rejects.toThrowError();
    });

    it('should should throw if no params are passed', async () => {
      const res = arubaAuth.refreshToken();
      expect(res).rejects.toThrow();
    });

    it('should return a new access_token', async () => {
      const resp = {
        body: {
          access_token: 'ey10efoo',
          token_type: 'bearer',
          expires_in: 1799,
          refresh_token: 'abc123foo',
          userName: 'notarealuser',
          'as:client_id': 'Auth',
          '.issued': 'Sun, 18 Nov 2018 07:23:39 GMT',
          '.expires': 'Sun, 18 Nov 2018 07:53:39 GMT',
        },
      };
      needle.mockResolvedValue(resp);
      const res = await arubaAuth.refreshToken({
        refresh_token: 'abc123foo',
      });
      expect(res).toEqual(Object.assign(resp.body, { success: true }));
    });
  });
});
