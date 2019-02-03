import tipImage from '../../images/tip-fill.png';
const tpl = (opts = {}) => {
  return `
        <div id="register-payment-wrapper" class="register-payment-wrapper">
            <form id="register-payment-form" onsubmit="return false">
                <label>
                    <span>Card： </span>
                    <input id="register-payment-input" name="uname" type="text" placeholder="${
                      opts.paymentPlaceHolder
                    }" valid="present">
                </label>
                <label>
                    <span>CVC： </span>
                    <input id="register-payment-password" name="password" type="text" placeholder="${
                      opts.paymentCredentialsPlaceHolder
                    }" valid="present">
                </label>
                <label>
                    <span>&nbsp;</span>
                    <div class="register-tip"><img src=${tipImage}>You don't have the account，<a href="#">Register Now</a></div>
                </label>
                <input id="register-payment-btn" type="submit" value="Next">
            </form>
        </div>
    `;
};

export default (conf) => {
  conf.container.innerHTML = tpl(conf);
};
