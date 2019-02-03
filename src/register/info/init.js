import '../../common/polyfill';
import render from './render';
import bindEvent from './event';
import { checkOptions } from '../../common/utils';

const regInfo = (opts) => {
  if (!checkOptions(opts)) {
    return;
  }
  const defaultOpts = {};
  const options = Object.assign(defaultOpts, opts);
  render(options);
  bindEvent(options);
};

export { regInfo };
