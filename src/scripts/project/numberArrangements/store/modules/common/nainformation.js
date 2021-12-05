import { nainformationApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getCbea: [],
    getCibd: [],
    getCibi: [],
    getCpl: [],
    getCep: [],
    getCes: [],
    getEba: [],
    getEabi: [],
    getEab: [],
    getEabp: [],
    getEibc: [],
    getDgd: [],
    getAcd: [],
    getSubc: [],
    getSysd: [],
    getSdbc: [],
    getSdbi: [],
    getCompan: [],
    getDbsg: [],
    getSsdbi: [],
    getSsex: [],
    getEadl: [],
    getBlack: []
  },
  getters: {
    getCbea: state => state.getCbea,
    getCibd: state => state.getCibd,
    getCibi: state => state.getCibi,
    getCpl: state => state.getCpl,
    getCep: state => state.getCep,
    getCes: state => state.getCes,
    getEba: state => state.getEba,
    getEabi: state => state.getEabi,
    getEab: state => state.getEab,
    getEabp: state => state.getEabp,
    getEibc: state => state.getEibc,
    getDgd: state => state.getDgd,
    getAcd: state => state.getAcd,
    getSubc: state => state.getSubc,
    getSysd: state => state.getSysd,
    getSdbc: state => state.getSdbc,
    getSdbi: state => state.getSdbi,
    getCompan: state => state.getCompan,
    getDbsg: state => state.getDbsg,
    getSsdbi: state => state.getSsdbi,
    getSsex: state => state.getSsex,
    getEadl: state => state.getEadl,
    getBlack: state => state.getBlack
  },
  mutations: {
    GET_CBEA(state, payload) {
      state.getCbea = payload;
    },
    GET_CIBD(state, payload) {
      state.getCibd = payload;
    },
    GET_CIBI(state, payload) {
      state.getCibi = payload;
    },
    GET_CPL(state, payload) {
      state.getCpl = payload;
    },
    GET_CEP(state, payload) {
      state.getCep = payload;
    },
    GET_CES(state, payload) {
      state.getCes = payload;
    },
    GET_EBA(state, payload) {
      state.getEba = payload;
    },
    GET_EABI(state, payload) {
      state.getEabi = payload;
    },
    GET_EAB(state, payload) {
      state.getEab = payload;
    },
    GET_EABP(state, payload) {
      state.getEabp = payload;
    },
    GET_EIBC(state, payload) {
      state.getEibc = payload;
    },
    GET_DGD(state, payload) {
      state.getDgd = payload;
    },
    GET_ACD(state, payload) {
      state.getAcd = payload;
    },
    GET_SUBC(state, payload) {
      state.getSubc = payload;
    },
    GET_SYSD(state, payload) {
      state.getSysd = payload;
    },
    GET_SDBC(state, payload) {
      state.getSdbc = payload;
    },
    GET_SDBI(state, payload) {
      state.getSdbi = payload;
    },
    GET_COMPAN(state, payload) {
      state.getCompan = payload;
    },
    GET_DBSG(state, payload) {
      state.getDbsg = payload;
    },
    GET_SSDBI(state, payload) {
      state.getSsdbi = payload;
    },
    GET_SSEX(state, payload) {
      state.getSsex = payload;
    },
    GET_EADL(state, payload) {
      state.getEadl = payload;
    },
    GET_BLACK(state, payload) {
      state.getBlack = payload;
    }
  },
  actions: {
    // 根据展区code查询商协会名称
    getcoceralByExhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCoceralByExhibitionArea(Object).then(res => {
          commit('GET_CBEA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据交易团id查询交易团下属企业id，名称，广交会编码
    getcompanyInfoByDeleId({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCompanyInfoByDeleId(Object).then(res => {
          commit('GET_CIBD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据企业ID查询企业信息
    getcompanyInfoById({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCompanyInfoById(Object).then(res => {
          commit('GET_CIBI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区查询企业的展品
    getcompanyProductList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCompanyProductList(Object).then(res => {
          commit('GET_CPL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据当届展区查询展期
    getcurrentExhibitionPeriod({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCurrentExhibitionPeriod(Object).then(res => {
          commit('GET_CEP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取当前的展届  不需要传参
    getcurrentExhibitionSession({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCurrentExhibitionSession(Object).then(res => {
          commit('GET_CES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取展区列表   需要 exhibitionSession 当前展届
    getexhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionArea(Object).then(res => {
          commit('GET_EBA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据商会机构id查询展区列表
    getexhibitionAreaByAssociationId({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionAreaByAssociationId(Object).then(res => {
          commit('GET_EABI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区code获取标准展区面积
    getexhibitionAreaByCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionAreaByCode(Object).then(res => {
          commit('GET_EAB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区查询企业的展品(getListAll)
    getexhibitionAreaByPeriod({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionAreaByPeriod(Object).then(res => {
          commit('GET_EABP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区code查询专区信息  需要 exhibitionAreaCode 展区code
    getexhibitionInfoByCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionInfoByCode(Object).then(res => {
          commit('GET_EIBC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 搜索组织机构-所有交易团   不需要传参
    getdelegationDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getDelegationDepartment(Object).then(res => {
          commit('GET_DGD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 搜索组织机构-所有商会     不需要传参
    getassociationDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getAssociationDepartment(Object).then(res => {
          commit('GET_ACD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取交易团下分团的数据
    getsubCluster({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSubCluster(Object).then(res => {
          commit('GET_SUBC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据组织机构类型和父id查询机构列表 
    getsysDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSysDepartment(Object).then(res => {
          commit('GET_SYSD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据组织机构Code和类型查询明细 
    getsysDepartmentByCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSysDepartmentByCode(Object).then(res => {
          commit('GET_SDBC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据组织机构id查询明细 
    getsysDepartmentById({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSysDepartmentById(Object).then(res => {
          commit('GET_SDBI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看本届申请参展的企业 
    getcompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getCompany(Object).then(res => {
          commit('GET_COMPAN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据分团code获取交易团信息 
    getdelegationBySubGroup({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getDelegationBySubGroup(Object).then(res => {
          commit('GET_DBSG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据组织机构id查询明细 
    getsysDepartById({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSysDepartById(Object).then(res => {
          commit('GET_SSDBI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有展届信息 
    getsysExhibitions({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getSysExhibitions(Object).then(res => {
          commit('GET_SSEX', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询展区和展区 新题材专用
    getexhibitionAreaDTOList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getExhibitionAreaDTOList(Object).then(res => {
          commit('GET_EADL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取企业黑名单信息
    getblackInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nainformationApi.getBlackInfo(Object).then(res => {
          commit('GET_BLACK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
