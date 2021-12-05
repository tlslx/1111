import { subEnterpriseManageApi } from '../../../apis';
// import { $helper } from '@/scripts/project/utils';
import { $locals } from "@/utils"; // getToken()
export default {
  namespaced: true,
  state: {
    areaDelegationSubLinkData: [],
    delegationListLeftData: [],
    delegationMenuListLeftData: {},
    delegationListMainData: {},
    delegationAreaListSelectData: [],
    companyTableData: {},
    subGroupCompanyListData: [],
    leftNavData: {},
    exhibitonNumList: [],
    exhibitonNumListAll: [],
    saveExhibitonNumList: [], // 区域及地方分团
    saveCompanyExhibitonNumList: [], // 企业分团
    delegationAndSubGroupData: [] // 交易团分团二级联动
  },
  getters: {
    areaDelegationSubLinkData: state => state.areaDelegationSubLinkData,
    delegationListLeftData: state => state.delegationListLeftData,
    delegationMenuListLeftData: state => state.delegationMenuListLeftData,
    delegationListMainData: state => state.delegationListMainData,
    delegationAreaListSelectData: state => state.delegationAreaListSelectData,
    companyTableData: state => state.companyTableData,
    subGroupCompanyListData: state => state.subGroupCompanyListData,
    leftNavData: state => state.leftNavData, // 左侧导航菜单
    exhibitonNumList: state => state.exhibitonNumList,
    exhibitonNumListAll: state => state.exhibitonNumListAll,
    saveExhibitonNumList: state => state.saveExhibitonNumList, // 区域及地方分团
    saveCompanyExhibitonNumList: state => state.saveCompanyExhibitonNumList, // 企业分团
    delegationAndSubGroupData: state => state.delegationAndSubGroupData // 交易团分团二级联动
  },
  actions: {
    // 获取 区域-交易团-分团 三级联动列表
    getAreaDelegationSubLink({ commit }) {
      let token = $locals.get('USER_TOKEN', '');
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.areaDelegationSubLink({ Token: token });
        promises.then(res => {
          commit('AREA_SELECT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团列表-左侧table
    // getDelegationListLeft({ commit }) {
    //   let token = $locals.get('USER_TOKEN', '');
    //   return new Promise((resolve, reject) => {
    //     const promises = subEnterpriseManageApi.delegationListLeft({ Token: token });
    //     promises.then(res => {
    //       commit('AREA_LEFT_TABLE', res);
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // },
    // 获取交易团列表-新-左侧table
    postDelegationMenuListLeft({ commit }, params) {
      let token = $locals.get('USER_TOKEN', '');
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.delegationMenuListLeft(params, { Token: token });
        promises.then(res => {
          commit('AREA_MENULEFT_TABLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团列表-主区域
    getDelegationListMain({ commit }, params) {
      let token = $locals.get('USER_TOKEN', '');
      params.Token = token;
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.delegationListMain(params);
        promises.then(res => {
          commit('AREA_MAIN_TABLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增交易团列表-主区域
    postAddSubGroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.addSubGroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团区域列表-左侧
    getDelegationAreaListSelectLeft({ commit }) {
      let token = $locals.get('USER_TOKEN', '');
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.delegationAreaListSelectLeft({ Token: token });
        promises.then(res => {
          commit('AREA_LEFT_SELECT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新交易团分团
    postUpdateSubGroupMain({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.updateSubGroupMain(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新交易团区域
    postUpdateDelegationArea({ commit }, params) {
      let token = $locals.get('USER_TOKEN', '');
      return new Promise((resolve, reject) => {
        params.Token = token;
        const promises = subEnterpriseManageApi.updateDelegationArea(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除区域分团关系
    // postDeleteSubGroup({ commit }, val) {
    //   return new Promise((resolve, reject) => {
    //     const promises = subEnterpriseManageApi.deleteSubGroup(val);
    //     promises.then(res => {
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // },
    // 交易团分团-下载列表
    getSaveExceljyt({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.saveExcel(params, '交易团分团关系维护表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '交易团分团关系维护表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },

    // 2. 企业分团关系表维护
    // 获取企业名称-网上服务url的接口
    getCompanyInfoOuterTwo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.companyInfoOuterTwo(params);
        promises.then(res => {
          commit('COMPANY_TABLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业分团列表
    getSubGroupCompanyList({ commit }, params) {
      let token = $locals.get('USER_TOKEN', '');
      params.Token = token;
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.subGroupCompanyList(params);
        promises.then(res => {
          commit('SUB_COMPANY_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新企业分团关系
    postUpdateCompanySubGroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.updateCompanySubGroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增企业分团关系
    postAddCompanySubGroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.addCompanySubGroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除企业分团关系
    // postDeleteCompanySubGroup({ commit }, val) {
    //   return new Promise((resolve, reject) => {
    //     const promises = subEnterpriseManageApi.deleteCompanySubGroup(val);
    //     promises.then(res => {
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // },
    // 获取历史展届
    getExhibitionNumList({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.exhibitionNumList();
        promises.then(res => {
          let data = res.map(item => {
            return item.exhibitionNum;
          });
          data.splice(0, 1); // 去掉第一项
          commit('EXHIBIT_NUM_LIST', data);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取历史展届 全部展届
    getExhibitionNumListAll({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.exhibitionNumList();
        promises.then(res => {
          let data = res.map(item => {
            return { exhibitionNum: item.exhibitionNum, current: item.current, exhibitionPeriodNum: item.exhibitionPeriodNum };
          });
          commit('EXHIBIT_NUM_LIST_ALL', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 区域及地方分团-保存记录
    getSaveResult({ commit }, val) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.saveResult(val);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 区域及地方分团-获取已保存届数列表
    getSavedExhibitionNumList({ commit }, delegationId) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.savedExhibitionNumList(delegationId);
        promises.then(res => {
          commit('SAVE_EXHIBIT_NUM_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 保存企业分团记录
    getSaveCompanyResult({ commit }, val) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.saveCompanyResult(val);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取已保存届数列表
    getSavedCompanyExhibitionNumList({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.savedCompanyExhibitionNumList();
        promises.then(res => {
          commit('SAVE_COMPANY_EXHIBIT_NUM_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业分团-下载列表
    getSaveCompanyExcel({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.saveCompanyExcel(params, '企业分团关系维护表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '企业分团关系维护表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // // 交易团-区域-左侧
    // getSysDepartmentSearch({ commit }, pageInfo) {
    //   // let params = { customQueryParams: { levelCode: "0!2!", deptType: "7", state: 1 }, page: { current: 1, size: 10 }};
    //   let params = { customQueryParams: { levelCode: "0!2!", deptType: "7", state: 1 }};
    //   return new Promise((resolve, reject) => {
    //     params.page = pageInfo;
    //     const promises = subEnterpriseManageApi.sysDepartmentSearch(params);
    //     promises.then(res => {
    //       commit('LEFT_NAV', res);
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // }
    // 交易团分团二级联动
    getDelegationAndSubGroup({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.delegationAndSubGroup();
        promises.then(res => {
          commit('TWO_LINK_OPTIONS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 指派-修改所属分团
    postAssignCityToSubgroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.assignCityToSubgroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 取消指派-修改所属分团
    postCancelAssignCityToSubgroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.cancelAssignCityToSubgroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 指派-取消修改企业所属分团
    postCancelAssignCompanyToSubgroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = subEnterpriseManageApi.cancelAssignCompanyToSubgroup(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    AREA_SELECT(state, payload) {
      state.areaDelegationSubLinkData = payload;
    },
    AREA_LEFT_TABLE(state, payload) {
      state.delegationListLeftData = payload;
    },
    AREA_MENULEFT_TABLE(state, payload) { // 新的左侧菜单
      state.delegationMenuListLeftData = payload;
    },
    AREA_MAIN_TABLE(state, payload) {
      state.delegationListMainData = payload;
    },
    AREA_LEFT_SELECT(state, payload) {
      state.delegationAreaListSelectData = payload;
    },
    COMPANY_TABLE(state, payload) {
      state.companyTableData = payload;
    },
    SUB_COMPANY_LIST(state, payload) {
      state.subGroupCompanyListData = payload;
    },
    EXHIBIT_NUM_LIST(state, payload) { // 历史展届数
      state.exhibitonNumList = payload;
    },
    EXHIBIT_NUM_LIST_ALL(state, payload) { // 历史展届数
      state.exhibitonNumListAll = payload;
    },
    SAVE_EXHIBIT_NUM_LIST(state, payload) { //
      state.saveExhibitonNumList = payload;
    },
    SAVE_COMPANY_EXHIBIT_NUM_LIST(state, payload) { // 企业分团
      state.saveCompanyExhibitonNumList = payload;
    },
    // commit('SAVE_EXHIBIT_NUM_LIST', data);
    // LEFT_NAV(state, payload) {
    //   state.leftNavData = payload;
    // }
    TWO_LINK_OPTIONS(state, payload) { // 企业分团
      state.delegationAndSubGroupData = payload;
    }
  }
};
