import '../../common/polyfill.js';
import render from './render';
import bindEvent from './event';

const regMobile = (opts = {}) => {
  const defaultOpts = {
    mobilePlaceholder: 'Please enter your mobile number',
  };
  const options = Object.assign(defaultOpts, opts);
  render(options);
  bindEvent(options);
};

export { regMobile };
