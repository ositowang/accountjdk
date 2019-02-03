const addClass = (obj, cls) => {
  obj.className.trim();
  if (!hasClass(obj, cls)) {
    obj.className += ' ' + cls;
  }
};

const removeClass = (obj, cls) => {
  if (hasClass(obj, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
};

const hasClass = (obj, cls) => {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

const isDom = (obj) => {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.style === 'object'
    );
  }
};
const checkOptions = (opts) => {
  //whether obj is an object
  if (Object.prototype.toString.call(opts) !== '[object Object]') {
    throw new Error('the options must be an object');
  }
  if (!opts.container) {
    throw new Error('You must give me a container');
  }
  if (!isDom(opts.container)) {
    throw new Error('The container must be an HTMLElement');
  }
  return true;
};

export { addClass, removeClass, checkOptions };
