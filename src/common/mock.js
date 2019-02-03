import fetchMock from 'fetch-mock';
import regionData from './data/region-data';

fetchMock.mock('./login', (url, opts) => {
  const params = opts.params;
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

fetchMock.mock('./getMobileVerifyToken', (url, opts) => {
  return { code: 200, message: 'success', mobileVerifyToken: '123456' };
});

fetchMock.mock('./register/getVerifyCode', (url, opts) => {
  const params = opts.params;
  return {
    code: 200,
    message: 'success',
    mobile: params.mobile,
  };
});

fetchMock.mock('./register/mobile', (url, opts) => {
  const params = opts.params;
  if (params.verifyCode === '123456') {
    return {
      code: 200,
      message: 'success',
      token: 'abcdefg',
    };
  } else {
    return {
      code: 400,
      message: 'success',
    };
  }
});

fetchMock.mock('./region-data', (url, opts) => {
  return { code: 200, message: 'success', data: regionData };
});

fetchMock.mock('/register/payment', { code: 200, message: 'success' });
