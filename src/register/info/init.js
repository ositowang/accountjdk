import '../../common/polyfill';
import render from './render';
import bindEvent from './event';

const regInfo = (opts) => {
  const defaultOpts = {};
  const options = Object.assign(defaultOpts, opts);
  render(options);
  bindEvent(options);
};

export { regInfo };
