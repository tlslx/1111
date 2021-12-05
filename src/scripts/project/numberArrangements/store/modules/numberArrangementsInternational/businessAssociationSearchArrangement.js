import { businessAssociationSearchArrangementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    ordinaryarrangList: {},
    arrangepublishList: [],
    coceracheckList: {},
    coceraNumbercheckList: {},
    suggestchangeList: {},
    updateordinaryList: {},
    conceralList: []
  },
  getters: {
    ordinaryarrangList: state => state.ordinaryarrangList,
    arrangepublishList: state => state.arrangepublishList,
    coceracheckList: state => state.coceracheckList,
    coceraNumbercheckList: state => state.coceraNumbercheckList,
    suggestchangeList: state => state.suggestchangeList,
    updateordinaryList: state => state.updateordinaryList,
    conceralList: state => state.conceralList
  },
  mutations: {
    ORDINARYARRANGLIST(state, payload) {
      state.ordinaryarrangList = payload;
    },
    ARRANGEPUBLISHLIST(state, payload) {
      state.arrangepublishList = payload;
    },
    COCERACHECKLIST(state, payload) {
      state.coceracheckList = payload;
    },
    COCERANUMBERCHECKLIST(state, payload) {
      state.coceraNumbercheckList = payload;
    },
    SUGGESTCHANGELIST(state, payload) {
      state.suggestchangeList = payload;
    },
    UPDATEORDINARYLIST(state, payload) {
      state.updateordinaryList = payload;
    },
    CONCERALLIST(state, payload) {
      state.conceralList = payload;
    }
  },
  actions: {
    //商协会审核安排方案(查询)
    getOrdinaryArrangement({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getordinaryArrangement(obj).then(res => {
          for (let key in res.records) {
            res.records[key].operating = true;
            if (res.records[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res.records[key].exhibitionType = '中央通道';
            } else if (res.records[key].exhibitionType === 'STANDARD_BOOTH') {
              res.records[key].exhibitionType = '标摊';
            } else if (res.records[key].exhibitionType === 'SPECIAL_BOOTH') {
              res.records[key].exhibitionType = '绿色特装';
            } else if (res.records[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res.records[key].exhibitionType = '统一布展';
            }
            if (res.records[key].isCoceralVip === '0') {
              res.records[key].isCoceralVip = '否';
            } else if (res.records[key].isCoceralVip === '1') {
              res.records[key].isCoceralVip = '是';
            }
            if (res.records[key].schedulePlan === '0') {
              res.records[key].schedulePlan = '未安排';
            } else if (res.records[key].schedulePlan === '1') {
              res.records[key].schedulePlan = '已安排';
            }
            if (res.records[key].isBrandCompany === '0') {
              res.records[key].isBrandCompany = '否';
            } else if (res.records[key].isBrandCompany === '1') {
              res.records[key].isBrandCompany = '是';
            }
            if (res.records[key].examineStatus === '1') {
              res.records[key].examineStatus = '审核通过';
            } else if (res.records[key].examineStatus === '2') {
              res.records[key].examineStatus = '审核不通过';
            } else {
              res.records[key].examineStatus = '未审核';
            }
            if (res.records[key].brandAdhesionCheck === '0') {
              res.records[key].brandAdhesionCheck = '未审核';
            } else if (res.records[key].brandAdhesionCheck === '1') {
              res.records[key].brandAdhesionCheck = '审核通过';
            } else if (res.records[key].brandAdhesionCheck === '2') {
              res.records[key].brandAdhesionCheck = '审核不通过';
            }
            if (res.records[key].brandAdhesionNumberCheck === '0') {
              res.records[key].brandAdhesionNumberCheck = '未审核';
            } else if (res.records[key].brandAdhesionNumberCheck === '1') {
              res.records[key].brandAdhesionNumberCheck = '审核通过';
            } else if (res.records[key].brandAdhesionNumberCheck === '2') {
              res.records[key].brandAdhesionNumberCheck = '审核不通过';
            }
            if (res.records[key].suggestChange === '1') {
              res.records[key].suggestChange = '更换';
            } else if (res.records[key].suggestChange === '2') {
              res.records[key].suggestChange = '维持';
            }
            if (res.records[key].brandAdhesionResult === '0') {
              res.records[key].brandAdhesionResult = '未审核';
              res.records[key].adhesionNumberResult = res.records[key].applyAdjoinNumber;
              res.records[key].editFlag = '0';
            } else if (res.records[key].brandAdhesionResult === '1') {
              res.records[key].brandAdhesionResult = '审核通过';
              res.records[key].editFlag = '1';
            } else if (res.records[key].brandAdhesionResult === '2') {
              res.records[key].brandAdhesionResult = '审核不通过';
              res.records[key].editFlag = '0';
              res.records[key].adhesionNumberResult = '0';
            }
          }
          commit('ORDINARYARRANGLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //商协会审核品牌粘连
    getCoceralBrandAdhesionCheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getcoceralBrandAdhesionCheck(obj).then(res => {
          commit('COCERACHECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会审核品牌粘连数量
    getCoceralBrandAdhesionNumberCheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getcoceralBrandAdhesionNumberCheck(obj).then(res => {
          commit('COCERANUMBERCHECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会建议更换
    getSuggestChange({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getsuggestChange(obj).then(res => {
          commit('SUGGESTCHANGELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团查询公布批次
    getArrangePublish({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getarrangePublish(obj).then(res => {
          for (let key in res) {
            if (res[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res[key].exhibitionType = '中央通道';
            } else if (res[key].exhibitionType === 'STANDARD_BOOTH') {
              res[key].exhibitionType = '标摊';
            } else if (res[key].exhibitionType === 'SPECIAL_BOOTH') {
              res[key].exhibitionType = '特装';
            } else if (res[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res[key].exhibitionType = '统一布展';
            }
            if (res[key].publishStatus === '2') {
              res[key].publishStatus = '未发布';
            } else if (res[key].publishStatus === '1') {
              res[key].publishStatus = '已发布';
            }
          }
          commit('ARRANGEPUBLISHLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团设置公布批次
    getUpdateOrdinary({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getupdateOrdinary(obj).then(res => {
          commit('UPDATEORDINARYLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会审核按钮
    getCoceralAdhesion({ commit }, obj) {
      return new Promise((resolve, reject) => {
        businessAssociationSearchArrangementApi.getcoceralAdhesion(obj).then(res => {
          commit('CONCERALLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
