import { generateVIPApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    vipFormStandard: [],
    vipStandard: [],
    vipTimeStandard: [],
    vipCompanyInfoList: [],
    vipTableStandard: []
  },
  getters: {
    vipFormStandard: state => state.vipFormStandard,
    vipStandard: state => state.vipStandard,
    vipTimeStandard: state => state.vipTimeStandard,
    vipCompanyInfoList: state => state.vipCompanyInfoList,
    vipTableStandard: state => state.vipTableStandard
  },
  mutations: {
    VIP_FORM_STANDARD(state, payload) {
      state.vipFormStandard = payload;
    },
    VIP_STANDARD(state, payload) {
      state.vipStandard = payload;
    },
    VIP_TIME_STANDARD(state, payload) {
      state.vipTimeStandard = payload;
    },
    VIP_COMPANY_INFO_LIST(state, payload) {
      state.vipCompanyInfoList = payload;
    },
    VIP_TABLE_STANDARD(state, payload) {
      state.vipTableStandard = payload;
    }
  },
  actions: {
    // 查看vip企业参数
    getVIPStandards({ commit }, session) {
      return new Promise((resolve, reject) => {
        const promises = generateVIPApi.getVipStands(session);
        promises.then(res => {
          let vipFormStandard = [];
          let vipTableStandard = [];
          let vipTableObject = {};
          // 处理无vipTimeStandard以及vipConsecutiveSessions数据情况
          if (!res.vipTimeStandard) {
            vipTableObject['pxkssj'] = new Date();
            vipTableObject['pxjssj'] = new Date();
            vipTableObject['sxhtjjzsj'] = new Date();
            vipTableObject['sxhshjzsj'] = new Date();
            vipTableObject['jyttjjzsj'] = new Date();
          }
          if (res.vipTimeStandard && res.vipTimeStandard.length > 0) {
            res.vipTimeStandard.forEach((value, index, array) => {
              let currentObject = {};
              currentObject.setTimeId = value.setTimeId ? value.setTimeId : null;
              currentObject.label = value.stageName;
              if (value.stageName === '评选开始时间') {
                currentObject.prop = 'pxkssj';
                vipTableObject['pxkssj'] = value.beginDate;
              } else if (value.stageName === '评选结束时间') {
                currentObject.prop = 'pxjssj';
                vipTableObject['pxjssj'] = value.beginDate;
              } else if (value.stageName === '商协会推荐截止时间') {
                currentObject.prop = 'sxhtjjzsj';
                vipTableObject['sxhtjjzsj'] = value.beginDate;
              } else if (value.stageName === '商协会审核截止时间') {
                currentObject.prop = 'sxhshjzsj';
                vipTableObject['sxhshjzsj'] = value.beginDate;
              } else if (value.stageName === '交易团推荐截止时间') {
                currentObject.prop = 'jyttjjzsj';
                vipTableObject['jyttjjzsj'] = value.beginDate;
              }
              currentObject.timeType = value.timeType;
              currentObject.type = 'time';
              currentObject.value = '';
              currentObject.defaultValue = value.beginDate;
              vipFormStandard.push(currentObject);
            });
          }
          vipFormStandard.sort((a, b) => {
            return a.timeType - b.timeType;
          });
          vipTableStandard.push(vipTableObject);
          if (res.vipStandard && res.vipStandard.length > 0) {
            res.vipStandard.forEach((value, index, array) => {
              let newExtensionCategory = '';
              if (value.extensionCategory) {
                newExtensionCategory = '（' + $helper.getDicLabel(this.state.dictionary.osDictionaryData.extensionCategory, value.extensionCategory) + '）';
              } else {
                newExtensionCategory = '';
              }
              let phase = $helper.getDicLabel(this.state.dictionary.osDictionaryData.phase, value.phase);
              value.periods = '第' + phase + '期' + newExtensionCategory;
              value.vipStandardId = value.vipStandardId ? value.vipStandardId : null;
            });
          }
          commit('VIP_FORM_STANDARD', vipFormStandard);
          commit('VIP_STANDARD', res.vipStandard);
          commit('VIP_TIME_STANDARD', res.vipTimeStandard);
          commit('VIP_TABLE_STANDARD', vipTableStandard);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改vip企业参数
    updateVIPStandards({ commit }, obj) {
      let currentObj = {};
      if (obj.vipStandard && obj.vipStandard.length > 0) {
        obj.vipStandard.forEach((value, index, array) => {
          value.creatorId = this.getters.userInfo.userId;
          value.creatorName = this.getters.userInfo.userName;
          value.vipStandardId = value.vipStandardId ? value.vipStandardId : null;
        });
        currentObj.vipStandard = obj.vipStandard;
      } else {
        currentObj.vipStandard = [];
      }
      currentObj.vipTimeStandard = [];
      if (obj.vipFormStandard && obj.vipFormStandard.length > 0) {
        for (let key in obj.vipFormStandard[0]) {
          let currentObject = {};
          currentObject.setTimeId = obj.vipFormStandard[0].setTimeId ? obj.vipFormStandard[0].setTimeId : null;
          currentObject.creatorId = this.getters.userInfo.userId;
          currentObject.creatorName = this.getters.userInfo.userName;
          if (obj.session) {
            currentObject.session = obj.session;
          } else {
            currentObj.session = '';
          }
          if (key === 'pxkssj') {
            currentObject.stageName = '评选开始时间';
            currentObject.timeType = '1';
            currentObject.beginDate = (obj.vipFormStandard[0].pxkssj).getTime();
          } else if (key === 'pxjssj') {
            currentObject.stageName = '评选结束时间';
            currentObject.timeType = '2';
            currentObject.beginDate = (obj.vipFormStandard[0].pxjssj).getTime();
          } else if (key === 'sxhtjjzsj') {
            currentObject.stageName = '商协会推荐截止时间';
            currentObject.timeType = '3';
            currentObject.beginDate = (obj.vipFormStandard[0].sxhtjjzsj).getTime();
          } else if (key === 'sxhshjzsj') {
            currentObject.stageName = '商协会审核截止时间';
            currentObject.timeType = '4';
            currentObject.beginDate = (obj.vipFormStandard[0].sxhshjzsj).getTime();
          } else if (key === 'jyttjjzsj') {
            currentObject.stageName = '交易团推荐截止时间';
            currentObject.timeType = '5';
            currentObject.beginDate = (obj.vipFormStandard[0].jyttjjzsj).getTime();
          } else if (key === 'lxcjjs') {
            currentObject.stageName = '连续参加届数';
          }
          currentObj.vipTimeStandard.push(currentObject);
        }
      }
      return new Promise((resolve, reject) => {
        generateVIPApi.updateVipStands(currentObj).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 生成VIP企业
    generateVIPEnterprise({ commit }) {
      return new Promise((resolve, reject) => {
        generateVIPApi.generatVipCompany().then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看VIP企业名单
    selectVIPEnterList({ commit }, params) {
      return new Promise((resolve, reject) => {
        generateVIPApi.getVipCompanyInfoList(utility.urlEncode(JSON.stringify(params))).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
              if (value.recommendSource === '') {
                value.recommendSource = '';
              } else if (value.recommendSource === '1') {
                value.recommendSource = '商协会';
              } else if (value.recommendSource === '2') {
                value.recommendSource = '交易团';
              }
              if (value.businessApproveResult === '2') {
                value.auditResult = '审核不通过';
              } else if (value.businessApproveResult === '1') {
                value.auditResult = '审核通过';
              } else {
                value.auditResult = '审核中';
              }
              if (value.recommendStatus === '01') {
                value.recommendStatus = '已推荐';
              } else {
                value.recommendStatus = '未推荐';
              }
              value.exhibitionArea = $helper.getDicLabel(this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
              value.businessAssociation = $helper.getDicLabel(this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
              value.businessDelegation = $helper.getDicLabel(this.state.dictionary.osDictionaryData.businessDelegation, value.businessDelegation);
            });
          }
          commit('VIP_COMPANY_INFO_LIST', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
