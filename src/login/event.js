import { fetchPost } from '../common/fetch';
import { validate } from '../common/formValidation.js';

export default (opts = {}) => {
  const $loginForm = document.getElementById('login-form');
  const $loginBtn = document.getElementById('login-btn');
  const $loginAccount = document.getElementById('login-account-username');
  const $clearAccount = document.getElementById('clear-account-name');
  const $loginPassword = document.getElementById('login-account-password');
  const $loginRemember = document.getElementById('login-remember');
  const $loginError = document.getElementById('login-error');
  //events bind starts  here
  //need form validation
  $loginForm.onsubmit = async (e) => {
    e.preventDefault(e);
    const checkedResults = validate($loginForm);
    if (!checkedResults.length) {
      let remember = '0';
      if ($loginRemember.getAttribute('checked')) {
        remember = '1';
      }
      const data = await fetchPost('./login', {
        account: $loginAccount.value,
        password: $loginPassword.value,
        remember: remember,
      });
      if (data.code === 200) {
        opts.success && opts.success();
      } else {
        $loginError.innerHTML = data.message;
      }
    } else {
      const name = checkedResults[0].name;
      const type = checkedResults[0].type;
      if (type === 'notEmpty') {
        if (name === 'account') {
          $loginError.innerHTML = 'Please enter your account number';
        }
        if (name === 'password') {
          $loginError.innerHTML = 'Please enter your password';
        }
      }
    }
  };

  $loginAccount.oninput = () => {};

  $clearAccount.onclick = () => {};

  $loginPassword.oninput = () => {};
};
