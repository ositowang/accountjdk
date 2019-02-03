import '../../common/polyfill';
import render from './render';
import bindEvent from './event.js';
import { checkOptions } from '../../common/utils';

const regPayment = (opts = {}) => {
  if (!checkOptions(opts)) {
    return;
  }
  var defaultOpts = {
    paymentPlaceHolder: 'Please enter your card number',
    paymentCredentialsPlaceHolder: 'Please enter your CVC',
  };
  var options = Object.assign(defaultOpts, opts);
  render(options);
  bindEvent(options);
};

export { regPayment };
