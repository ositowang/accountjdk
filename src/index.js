import { login } from './login/init';
import { regMobile } from './register/mobile/init';

login();
regMobile({
  container: document.getElementById('container'),
  success: function(token) {
    location.replace('register-info.html?token=' + token);
  },
});
