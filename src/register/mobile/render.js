import okImage from '../../images/ok-fill.png';
import tipImage from '../../images/tip-fill.png';

const tpl = (opts = {}) => {
  return `<div id="register-mobile-wrapper" class="register-mobile-wrapper">
        <form id="register-mobile-form" onsubmit="return false">
            <label>
                <span>Mobile： </span>
                <input id="register-mobile-input" name="mobile" type="text" placeholder="${opts.mobilePlaceHolder ||
                  ''}" valid="notEmpty, mobile">
            </label>
            <label>
                <span>Verify： </span>
                <div id="register-verify-wrapper" class="register-verify-wrapper"></div>
            </label>
            <input id="register-verify-btn" class="disabled" disabled type="submit" value="Next">
        </form>
        <div class="register-verify-dialog" id="register-verify-dialog">
            <div class="register-verify-dialog-header">
                <div class="register-verify-dialog-close" id="register-verify-dialog-close"></div>
            </div>
            <p class="register-tip">
                <img src=${okImage}>The code has been sent to your mobile, it will expire in 15 minutes
            </p>
            <form id="register-verify-form" onsubmit="return false">
                <label>
                    <span>Mobile： </span>
                    <div id="register-verify-mobile"></div>
                </label>
                <label>
                    <span>Code： </span>
                    <input type="text" name="verify" id="register-verify-input">
                </label>
                <label>
                    <span>&nbsp;</span>
                    <div class="register-tip"><img src=${tipImage}>The code has been sent to your mobile, please check</div>
                </label>
                <input id="register-mobile-btn" class="disabled" disabled type="submit" value="Confirm">
            </form>
    </div>`;
};

export default (conf) => {
  conf.container.innerHTML = tpl(conf);
};
