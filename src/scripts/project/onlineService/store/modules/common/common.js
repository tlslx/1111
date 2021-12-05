import { commonApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    session: '',
    delegationList: [],
    commonDeleData: [],
    delegationCode: '',
    progressTimeArrange: {}, // 参展期限
    ruleTimeArrange: {}, // 特例时间期限
    CHECK_CONST_DATA: {
      onlyEnglish: /^[a-zA-Z]*$/, // 只能输入英文
      englishContainBlock: /^[a-zA-Z\s]*$/, // 只能输入英文
      notChinese: /^[\x01-\x7f]*$/, // 不允许输入汉字
      onlyChinese: /^[\u4e00-\u9fa5]+$/, //只能输入中文
      containChinese: /.*[\u4e00-\u9fa5]+.*$/, // 必须包含中文
      engAndChine: /^[a-zA-Z\u4e00-\u9fa5]+$/, // 可以输入中文和英文
      englishAndNum: /^[0-9a-zA-Z]+$/, // 只能输入英文和数字
      onlyNumber: /(^[1-9]\d*$)|(^0?$)/, // 只能输入非零开头的数字
      telephone: /^1[23456789]\d{9}$/, // 手机号码校验
      phone: /^(\d3,4|\d{3,4}-)?\d{7,8}$/, // 电话号码校验
      email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, // email校验
      specialKey: /["'<>%;)(&+]/, // 特殊字符校验
      numAndSpecialKey: /^[0-9,\./;\'\[\]`\-=\<>?:"{}~\!@#$%！@￥\^&\*\(\)\_\+\|]*$/, // 可输入数字和符号
      onlyNumberCanStartWithZero: /^[0-9]*$/,
      enterpriceNameCh: /^([^(){}]+)?[\u4e00-\u9fa5]+([^(){}]+)?$/, // 企业中文名称
      // enterpriceNameEn: /^[^\u4E00-\u9FA5\uFE30-\uFFA0\u3001-\u3015\u2012-\u2026]+$/ // 企业英文名称
      enterpriceNameEn: /^(?![\s])[^\u4e00-\u9fa5^\uff00-\uffff]*$/, // 企业英文名称
      // 不允许汉字及中文标点符号、全角符号，首位不能为空字符（此处取反即可，即只要是非空的ASCII字符都可以） 适用：企业英文名称
      trimEnterpriseNameEn: /^[^\s][^\u4E00-\u9FA5\uFE30-\uFFA0\u3001-\u3015\u2012-\u2026]+$/,
      // 必须包含汉字，可以包含换行符
      containChAndEnter: /.*[\u4e00-\u9fa5]+\r*.*/,
      // 首位不能是空格
      notStartByBlank: /^[^\s].*$/,
      // 不允许汉字, 首位不能为空字符
      notChAndNotStartByBlank: /^(?![\s])[\x01-\x7f]*$/,
      onlyBlank: /^\s*$/
      // notChAndNotStartByBlank: /[^\s][^\u4e00-\u9fa5]/gm
    }
  },
  getters: {
    session: state => state.session,
    delegationList: state => state.delegationList,
    commonDeleData: state => state.commonDeleData,
    delegationCode: state => state.delegationCode,
    progressTimeArrange: state => state.progressTimeArrange,
    ruleTimeArrange: state => state.ruleTimeArrange
  },
  mutations: {
    GET_SESSION(state, payload) {
      state.session = payload;
    },
    GET_DELE_DATA(state, payload) {
      state.commonDeleData = payload;
    },
    GET_DELEGATION(state, payload) {
      state.delegationList = payload;
    },
    GET_DELEGATION_CODE(state, payload) {
      state.delegationCode = payload;
    },
    GET_PROGRESS_TIME(state, payload) {
      state.progressTimeArrange = payload;
    },
    GET_RULE_TIME(state, payload) {
      state.ruleTimeArrange = payload;
    }
  },
  actions: {
    // 查看vip企业参数
    getSessionInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.getSession();
        promises.then(res => {
          if (res.session) {
            commit('GET_SESSION', res.session);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团信息
    getDelegationInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.getDelegationData();
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            commit('GET_DELEGATION', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团字典--common
    getDeleInfos({ commit }) {
      let params = {
        'customQueryParams': {
          'deptType': '7'
        },
        'page': {
          'current': 1,
          'size': 100
        }
      };
      return new Promise((resolve, reject) => {
        const promises = commonApi.getSysDepartment(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let currentRecords = [];
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index) => {
              let currentRecord = {};
              currentRecord.value = value.deptId;
              currentRecord.label = value.fullName;
              currentRecords.push(currentRecord);
            });
            commit('GET_DELE_DATA', currentRecords);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所属交易团code
    getDelegationCodeInfo({ commit }, companyId) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.getDelegationCode(companyId);
        promises.then(res => {
          if (res) {
            commit('GET_DELEGATION_CODE', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取参展时限
    getProgressTimeInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.getProgressTime(params);
        promises.then(res => {
          if (res) {
            commit('GET_PROGRESS_TIME', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取获取特例限制
    getRuleInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.getRuleInfo(params);
        promises.then(res => {
          if (res && res[0]) {
            commit('GET_RULE_TIME', res[0]);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
