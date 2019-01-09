import fetchMock from 'fetch-mock';

fetchMock.mock('./login', (opts) => {
  const params = opts.paramsConfig;
  if (params.account === '666') {
    if ((params.password = '123456')) {
      return { code: 200, message: 'success' };
    } else {
      return { code: 401, message: 'wrong password' };
    }
  } else {
    return { code: 400, message: 'Wrong Account Number' };
  }
});
