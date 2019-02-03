import { fetchPost } from '../../common/fetch';

export default (opts) => {
  const $form = document.getElementById('register-payment-form');
  $form.onsubmit = async (e) => {
    e.preventDefault();
    let formValue = {};
    Array.from($form.elements).forEach((item) => {
      if (item.name) {
        formValue[item.name] = item.value;
      }
    });
    let data = await fetchPost('/register/payment', formValue);
    if (data.code === 200) {
      opts.success && opts.success();
    }
  };
};
