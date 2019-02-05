import { fetchJSON } from '../common/fetch';
import utils from '../common/utils';
import Region from '../common/region';
import { getUrlParams } from '../common/utils';

let regionData;

const tpl = function(opts = {}) {
  const data = opts.data;
  let currentData;
  if (opts.addrId) {
    currentData = data.filter((item) => {
      return parseInt(opts.addrId) === item.addrId;
    })[0];
    regionData = currentData.regionCode
      ? currentData.regionCode.split(',').map((item) => parseInt(item))
      : '';
  } else {
    currentData = {};
  }

  let tpl = `
    <div id="delivery-address-wrapper" class="delivery-address-wrapper">
        <form id="delivery-address-form" onsubmit="return false">
          <label>
                <span>Region：</span>
                <div id="delivery-address-region"></div>
            </label>
            <label>
                <span>Detail：</span>
                <textarea id="delivery-address-detail" name="detailAddress"  placeholder="Detail" valid="notEmpty" rows="3" cols="20">${currentData.detailAddress ||
                  ''}</textarea>
            </label>
            <label>
                <span>Postal：</span>
                <input id="delivery-address-email" name="postalcode" type="text" placeholder="Postal Code" value="${currentData.postalcode ||
                  ''}">
            </label>
            <label>
                <span>Recipient：</span>
                <input id="delivery-address-name" name="name" type="text" placeholder="Recipient" value="${currentData.name ||
                  ''}" valid="notEmpty">
            </label>
            <label>
                <span>Mobile：</span>
                <input id="delivery-address-mobile" name="mobile" type="text" placeholder="Mobile" value="${currentData.mobile ||
                  ''}" valid="notEmpty, mobile">
            </label>
            <label>
                <span>Home Phone：</span>
                <input id="delivery-address-telphone" name="telphone" type="text" placeholder="Home Phone" value="${currentData.telephone ||
                  ''}">
            </label>
            <label>
                <span>&nbsp;</span>
                <input id="save-delivery-address" type="submit" value="Save">
            </label>

        </form>  <input id="delivery-address-id" name="addrId" type="hidden" value="${currentData.addrId ||
          ''}">
            

        <div class="delivery-address-list" id="delivery-address-list">
            <table>
                <tr>
                    <th>
                        Recipient
                    </th>
                    <th>
                        Region
                    </th>
                    <th>
                        Details
                    </th>
                    <th>
                        Postal
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        Action
                    </th>
                <tr>

`;
  data.forEach((item) => {
    tpl += `
        <tr>
            <td>
                ${item.name}
            </td>
            <td>
                ${item.regionSting}
            </td>
            <td>
                ${item.detailAddress}
            </td>
            <td>
                ${item.postalcode}
            </td>
            <td>
                ${item.mobile || item.telephone}
            </td>
            <td>
                <a href="javascript:void(0);" class="del-delivery-address" data-id="${
                  item.addrId
                }">Delete</a> | <a href="delivery.html?addrId=${
      item.addrId
    }">Edit</a>
            </td>
        <tr>`;
  });
  tpl += `</table>
        </div>
    </div>`;

  return tpl;
};
export default async (conf) => {
  const result = await fetchJSON('./delivery-address', {});
  if (result.code === 200) {
    conf.container.innerHTML = tpl({
      data: result.data,
      addrId: conf.addrId || getUrlParams('addrId')
    });
    const region = new Region({
      container: document.getElementById('delivery-address-region'),
      name: 'region',
      notEmpty: true,
      initData: regionData
    });
  } else {
    alert('Fail to get the data');
  }
};
