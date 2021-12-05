import Http from '@/scripts/framework/http';
import utility from '@/scripts/framework/utility';
const state = {
  data: {}
};

const mutations = {
  setData(_state, { data }) {
    state.data = Object.assign(_state.data, data);
  }
};

const actions = {
  getData({ commit }) {
    Http.get(process.env.API_COMS_URL + '/api/common/sysDatadic/getListAll')
      .then(data => {
        var dictData = {};
        if (data != null && typeof data.records !== 'undefined') {
          data.records.forEach(item => {
            dictData[item.fileid] = [];
            if (typeof item.codeList !== 'undefined') {
              item.codeList.forEach(codeItem => {
                dictData[item.fileid].push({ value: codeItem.code, text: codeItem.codedesc });
              });
            }
          });
        }
        commit('setData', { data: dictData });
      });
  },
  getDictData({ commit }) {
    return new Promise((resolve, reject) => {
      var dictData = {};
      if (utility.isEmpty(state.data)) {
        let tempDictData = localStorage.getItem('dictData');
        dictData = JSON.parse(tempDictData) || {};
      }
      if (utility.isEmpty(dictData)) {
        Http.get(process.env.API_BASE_URL + '/api/sysDataDict/getListAll')
          .then(data => {
            if (data != null && typeof data.records !== 'undefined') {
              data.records.forEach(item => {
                dictData[item.dictCode] = [];
                if (typeof item.codeList !== 'undefined') {
                  item.codeList.forEach(codeItem => {
                    dictData[item.dictCode].push({ value: codeItem.itemCode, text: codeItem.itemText });
                  });
                }
              });
            }
            localStorage.setItem('dictData', JSON.stringify(dictData));
            commit('setData', { data: dictData });
          });
      } else {
        commit('setData', { data: dictData });
      }
      resolve();
    });
  },
  clearDictData({ commit }) {
    localStorage.setItem('dictData', null);
    commit('setData', { data: {}});
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
