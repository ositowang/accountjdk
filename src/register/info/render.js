import Region from '../../common/region';

const tpl = (config = {}) => {
  return `<div id="register-info-wrapper" class="register-info-wrapper">
        <form id="register-info-form" onsubmit="return false">
            <label>
                <span>Name：</span>
                <input id="register-info-nickname" name="nickname" type="text" placeholder="Name" valid="notEmpty noOther" value="${config.nickname ||
                  ''}">
            </label>
            <label>
                <span>Email：</span>
                <input id="register-info-email" name="email" type="text" placeholder="Email" valid="notEmpty, email,noOther" value="${config.email ||
                  ''}">
            </label>
            <label>
                <span>Full Name：</span>
                <input id="register-info-realname" name="realname" type="text" placeholder="Full Name" value="${config.realname ||
                  ''}">
            </label>
            <label>
                <span>Sex：</span>
                <select id="register-info-sex" name="sex" value="${config.sex ||
                  ''}">
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
            </label>
            <label>
                <span>Birthday：</span>
                <input id="register-info-birthday" name="birthday" type="date" placeholder="Birthday" value="${config.birthday ||
                  ''}">
            </label>
            <label>
                <span>Address：</span>
                <div id="register-info-address"></div>
            </label>
            <label>
                <span>&nbsp;</span>
                <input id="register-info-btn" type="submit" value="Next">
            </label>
        </form>
    </div>`;
};

export default (conf) => {
  conf.container.innerHTML = tpl(conf);
  const region = new Region({
    container: document.getElementById('register-info-address'),
    name: 'region',
  });
};
