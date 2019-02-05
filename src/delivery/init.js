import '../common/polyfill';
import render from './render';
import bindEvent from './event';

const delivery = (opts = {}) => {
  var defaultOpts = {};
  var options = Object.assign(defaultOpts, opts);
  render(options).then(() => {
    bindEvent(options);
  });
};

export { delivery };
