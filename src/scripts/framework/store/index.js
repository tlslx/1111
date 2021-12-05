import Vue from 'vue';
import Vuex from 'vuex';
import right from './modules/right';
import userInfo from './modules/userInfo';
import dataDictionary from './modules/dataDictionary';
import tagsView from './modules/tagsView';
import * as modules from '../../project/numberArrangements/store/modules';
import * as unifiedUsersModules from '../../project/unifiedUsers/store/modules';
import * as supportNatureModules from '../../project/supportNature/store/modules';
import * as onlineServiceModules from '../../project/onlineService/store/modules';
import * as drawingAuditModules from '../../project/drawingAudit/store/modules';
import * as exhibitorsModules from '../../project/Exhibitors/store/modules';
import * as customerServiceModules from '../../project/customerService/store/modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    token: '',
    pageLoading: false
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo.data,
    right: state => state.right.rightData,
    routers: state => state.right.routers,
    addRouters: state => state.right.addRouters,
    dataDictionary: state => state.dataDictionary.data,
    isSystemAdmin: state => state.userInfo.isSystemAdmin
  },
  modules: Object.assign({
    right,
    userInfo,
    dataDictionary,
    tagsView
  }, modules, unifiedUsersModules, supportNatureModules, onlineServiceModules, drawingAuditModules, exhibitorsModules, customerServiceModules),
  mutations: {
    setToken(state, { token }) {
      state.token = token;
    },
    pageLoading(state, loading) {
      state.pageLoading = loading;
    }
  },
  strict: debug
});
