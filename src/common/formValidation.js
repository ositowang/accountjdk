/**
 *
 */

const rules = {
  mobile: (value) => {
    return;
  },
  email: (value) => {
    return;
  },
  notEmpty: (value) => {
    if (!value.trim()) {
      return {
        type: 'notEmpty',
        message: 'This is a required field',
      };
    }
  },
};

const validate = (form) => {
  if (!form || !form.elements) {
    throw Error('The form you pass in is invalid');
  }
  const elements = form.elements;
  let checkResults = [];
  Array.from(elements)
    .filter((item) => {
      return item.getAttribute('valid');
    })
    .map((item) => {
      const valids = item.getAttribute('valid').split(',');
      const value = item.value;
      let errorArr = [];
      valids.forEach((valid) => {
        if (rules[valid]) {
          let result = rules[valid](value);
          result && errorArr.push(result);
        }
      });

      if (errorArr.length) {
        checkResults.push({
          dom: item,
          errorArr: errorArr,
          name: item.name,
          message: errorArr[0].message,
          type: errorArr[0].type,
        });
      }
    });
  return checkResults;
};

export { validate };
