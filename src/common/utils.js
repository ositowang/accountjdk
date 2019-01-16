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

export { addClass, removeClass };
