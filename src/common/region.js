import { fetchJSON } from './fetch';

const render = Symbol('render');
const event = Symbol('event');
class Region {
  constructor(opts) {
    if (!opts.container) {
      throw Error('Please specify your container');
    }
    if (!opts.name) {
      throw Error('Please specify the name');
    } else {
      this[render](opts);
      this[event](opts);
    }
  }

  [render](opts) {
    //base template for this component
    const tpl = `
        <div class="region-select-wrapper">
            <select id="region-province-select"></select>
            <select id="region-city-select"></select>
            <select id="region-area-select"></select>
            <input id="region-selected" name="${
              opts.name
            }" type="hidden" valid="${opts.noEmpty ? 'notEmpty' : ''}">
        </div>
        `;
    opts.container.innerHTML = tpl;
  }

  async [event](opts) {
    let regionResult = await fetchJSON('./region-data', {});
    let regionData = regionResult.data;
    const $provinceSelect = document.getElementById('region-province-select');
    const $citySelect = document.getElementById('region-city-select');
    const $areaSelect = document.getElementById('region-area-select');
    const $result = document.getElementById('region-selected');
    let provinceSelected;
    let citySelected;
    let areaSelected;

    let provinceOptions = '<option></option>';
    regionData.forEach((item) => {
      provinceOptions += `<option value=${item.id}>${item.name}</option>`;
    });
    $provinceSelect.innerHTML = provinceOptions;
    const provinceChange = (idx) => {
      const index = idx ? idx : parseInt($provinceSelect.value);
      const citys = regionData[index - 1].city;
      let cityOptions = '';
      provinceSelected = index;
      citys.forEach((item) => {
        cityOptions += `<option value=${item.id}>${item.name}</option>`;
      });
      $citySelect.innerHTML = cityOptions;
      index && ($provinceSelect.value = index);
    };
    const cityChange = (index) => {
      let areas = regionData[provinceSelected - 1].city.filter((item) => {
        return item.id === parseInt($citySelect.value);
      })[0].district;
      console.log(areas);
      let areaOptions = '';
      citySelected = parseInt($citySelect.value);
      areas.forEach((item) => {
        areaOptions += `<option value=${item.id}>${item.name}</option>`;
      });
      $areaSelect.innerHTML = areaOptions;
      index && ($citySelect.value = index);
    };

    const areaChange = (index) => {
      areaSelected = parseInt($areaSelect.value);
      $result.value =
        provinceSelected + ',' + citySelected + ',' + areaSelected;
      index && ($citySelect.value = index);
    };

    if (opts.initData && Array.isArray(opts.initData)) {
      const data = opts.initData;
      console.log(data);
      data[0] && provinceChange(data[0]);
      data[1] && cityChange(data[1]);
      data[2] && areaChange(data[2]);
    }

    $provinceSelect.onchange = () => {
      provinceChange();
      cityChange();
      areaChange();
    };

    $citySelect.onchange = () => {
      cityChange();
      areaChange();
    };

    $areaSelect.onchange = () => {
      areaChange();
    };
  }
}

export default Region;
