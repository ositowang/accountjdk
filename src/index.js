import { login } from './login/init';
import { regMobile } from './register/mobile/init';
import { regInfo } from './register/info/init';
import { regPayment } from './register/payment/init';
import { delivery } from './delivery/init';

if (document.location.href === 'http://localhost:1234/index.html') {
  login({
    container: document.getElementById('container')
  });
}
if (document.location.href === 'http://localhost:1234/registerMobile.html') {
  regMobile({
    container: document.getElementById('container'),
    success: function(token) {
      location.replace('register-info.html?token=' + token);
    }
  });
}
if (document.location.href === 'http://localhost:1234/registerInfo.html') {
  regInfo({
    container: document.getElementById('container'),
    update: false
  });
}

if (document.location.href === 'http://localhost:1234/registerPayment.html') {
  regPayment({
    container: document.getElementById('container')
  });
}

if (document.location.href === 'http://localhost:1234/profile.html') {
  regInfo({
    container: document.getElementById('profile-wrap'),
    update: true
  });
}

if (document.location.href === 'http://localhost:1234/delivery.html') {
  delivery({
    container: document.getElementById('profile-wrap')
  });
}

if (
  document.location.href === 'http://localhost:1234/delivery.html?addrId=345'
) {
  delivery({
    container: document.getElementById('profile-wrap')
  });
}
