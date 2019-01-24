import { login } from './login/init';
import { regMobile } from './register/mobile/init';
import { regInfo } from './register/info/init';

if (document.location.href === 'http://localhost:1234/index.html') {
  login();
}
if (document.location.href === 'http://localhost:1234/registerMobile.html') {
  regMobile({
    container: document.getElementById('container'),
    success: function(token) {
      location.replace('register-info.html?token=' + token);
    },
  });
}
if (document.location.href === 'http://localhost:1234/registerInfo.html') {
  regInfo({
    container: document.getElementById('container'),
  });
}
