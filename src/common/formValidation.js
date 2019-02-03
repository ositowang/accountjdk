/**
 *
 */

const rules = {
  mobile: (value) => {
    if (!value.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)) {
      return {
        type: 'mobile',
        message: 'this is not a valid phone number',
      };
    }
  },
  email: (v) => {
    if (
      !v.match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      )
    ) {
      return {
        type: 'email',
        message: 'The email you enter is invalid',
      };
    }
  },

  onlyFFFF: (v) => {
    if (v.match(/\u{ffff}-\u{fffff}/u)) {
      return {
        type: 'onlyFFFF',
        message: 'Only UTF-8 less than FFFFf is supported',
      };
    }
  },
  // noOther: (v) => {
  //   if (v.match(/\p{C}/u)) {
  //     return {
  //       type: 'noOther',
  //       message: 'You have entered invalid character',
  //     };
  //   }
  // },
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
