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
    mobile: params.mobile
  };
});

fetchMock.mock('./register/mobile', (url, opts) => {
  const params = opts.params;
  if (params.verifyCode === '123456') {
    return {
      code: 200,
      message: 'success',
      token: 'abcdefg'
    };
  } else {
    return {
      code: 400,
      message: 'success'
    };
  }
});

fetchMock.mock('./region-data', (url, opts) => {
  return { code: 200, message: 'success', data: regionData };
});

fetchMock.mock('/register/payment', { code: 200, message: 'success' });

fetchMock.mock('./profile', {
  code: 200,
  message: 'success',
  data: {
    nickname: 'John',
    mobile: '5086672989',
    email: 'test@gmail.com',
    realname: 'John Hook',
    sex: 1,
    birthday: '1997-09-06',
    regionCode: '1,1,1',
    regionString: 'Beijing'
  }
});

fetchMock.mock('./delivery-address', {
  code: 200,
  message: 'success',
  data: [
    {
      name: 'David',
      regionSting: 'Beijing',
      regionCode: '1,1,1',
      detailAddress: 'Peace St',
      postalcode: '100000',
      mobile: 18512567389,
      telephone: '',
      addrId: 345
    },
    {
      name: 'Tom',
      regionSting: 'Beijing',
      regionCode: '1,1,2',
      detailAddress: 'Peace St',
      postalcode: '100000',
      mobile: 18512567389,
      telephone: '',
      addrId: 346
    },
    {
      name: 'Jerry',
      regionSting: 'Shanghai',
      regionCode: '9,73,723',
      detailAddress: 'Peace St',
      postalcode: '100000',
      mobile: 18517384387,
      telephone: '',
      addrId: 347
    }
  ]
});
