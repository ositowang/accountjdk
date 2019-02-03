import Slider from '../../common/verifySlider';
import { fetchPost } from '../../common/fetch';
import { addClass, removeClass } from '../../common/utils';
import { validate } from '../../common/formValidation';

export default (conf) => {
  let mobileVerifyToken;
  let checkResult;
  const $mobileInput = document.getElementById('register-mobile-input');
  const $verifyInput = document.getElementById('register-verify-input');
  const $verifyBtn = document.getElementById('register-verify-btn');
  const $mobileBtn = document.getElementById('register-mobile-btn');
  const $mobileForm = document.getElementById('register-verify-form');
  const $verifyForm = document.getElementById('register-mobile-form');
  const $verifyMobile = document.getElementById('register-verify-mobile');
  const $dialog = document.getElementById('register-verify-dialog');
  const $dialogClose = document.getElementById('register-verify-dialog-close');

  const slider = new Slider({
    container: document.getElementById('register-verify-wrapper'),
    success: async ($wrapper, $text, offsetArr) => {
      const offSetMsg = offsetArr.join(':');
      let data = await fetchPost('./getMobileVerifyToken', {
        offSetMsg: offSetMsg,
      });
      if (data.code === 200) {
        mobileVerifyToken = data.mobileVerifyToken;
        addClass($wrapper, 'success');
        $text.innerHTML = 'Success';
      } else {
        addClass($wrapper, 'failed');
        $text.innerHTML = 'Failed';
      }
      $verifyBtn.removeAttribute('disabled');
      removeClass($verifyBtn, 'disabled');
    },
  });

  $verifyBtn.onclick = async () => {
    checkResult = validate($verifyForm);
    if (checkResult.length) {
      const type = checkResult[0].type;
      if (type === 'notEmpty') {
        alert('Please enter your mobile number');
      } else if (type === 'mobile') {
        alert('Please make sure you have the correct mobile number');
      }
    } else {
      let data = await fetchPost('./register/getVerifyCode', {
        mobile: $mobileInput.value,
        mobileVerifyToken: mobileVerifyToken,
      });
      if (data.code === 200) {
        $dialog.style.display = 'block';
        $verifyMobile.innerHTML = data.mobile;
        mobileVerifyToken = '';
        slider.reset();
      } else {
        alert('Verify mobile failed');
      }
    }
  };

  $dialogClose.onclick = () => {
    $dialog.style.display = 'none';
    mobileVerifyToken = '';
    slider.reset();
  };

  //clear out the illegal NaN value and more than the length
  $verifyInput.oninput = () => {
    const MSGLENGTH = 6;
    let value = $verifyInput.value;
    $verifyInput.value = value.replace(/\D/g, '');
    if (value.length > MSGLENGTH - 1) {
      $mobileBtn.removeAttribute('disabled');
      removeClass($mobileBtn, 'disabled');
      addClass($mobileBtn, 'bth-primary');
      if (value.length > MSGLENGTH) {
        $verifyInput.value = value.substring(0, MSGLENGTH);
      }
    } else {
      $mobileBtn.setAttribute('disabled', 'disabled');
      removeClass($mobileBtn, 'bth-primary');
      addClass($mobileBtn, 'disabled');
    }
  };

  $mobileBtn.onclick = async () => {
    let data = await fetchPost('./register/mobile', {
      mobile: $verifyMobile.innerHTML,
      verifyCode: $verifyInput.value,
      mobileVerifyToken: mobileVerifyToken,
    });
    if (data.code === 200) {
      conf.success && conf.success(data.token);
    } else {
      alert('The code is invalid');
    }
  };
};
