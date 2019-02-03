const template = (opts = {}) => {
  // compatible with chrome browser no auto-complete
  const autoCompleteTpl = `
    <div id="no-autocomplete">
      <input type="text"/>
      <input type="password"/>
    </div>
  `;
  const autocompleteAdapter = opts.autoComplete ? '' : autoCompleteTpl;
  const autocompleteValue = opts.autoComplete ? 'on' : 'off';
  const tpl = `
        <div id="login-wrapper">
        <p id="login-error" class="login-error"></p>
         <form id="login-form">
            ${autocompleteAdapter}
            <label class="login-account-wrapper">
                <span class="account-label">${opts.usernameLabel}</span>
                <input id="login-account-username" name="account" type="text" placeholder="${
                  opts.usernamePlaceHolder
                }" autocomplete="${autocompleteValue}" valid="notEmpty"/> 
                <span id="clear-account-name" class="del-login">Clear</span>
            </label>
            <label class="login-account-wrapper">
                <span class="account-label">${opts.passwordLabel}</span>
                <input id="login-account-password" name="password" type="password" placeholder="${
                  opts.passwordPlaceholder
                }" autocomplete="${autocompleteValue}" valid="notEmpty"/> 
            </label>
            <label class="login-remember-wrapper" style="display:${
              opts.showRemember
            }">
              <span>Remember Me</span>
              <input id="login-remember" name="remember" type="checkbox"/>
            </label>
            <input id="login-btn" class="login-btn-style" type="submit" value="${
              opts.loginBtnText
            }" />
            <div class="login-more-wrapper">
              <a  href="forget.html">Forget your password?</a>
              <a  href="register.html">Register Now</a>
            </div>            
         </form>
        </div>
    `;
  return tpl;
};

export default (opts = {}) => {
  opts.container.innerHTML = template(opts);
  const $noAutocomplete = document.getElementById('no-autocomplete');
  if ($noAutocomplete) {
    $noAutocomplete.style.display = 'none';
  }
};
