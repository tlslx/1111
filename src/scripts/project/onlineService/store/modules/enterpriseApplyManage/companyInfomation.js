import { companyInfomationApi } from "../../../apis";
import { $helper } from "../../../../utils";
import utility from "@/scripts/framework/utility";
export default {
  namespaced: true,
  state: {
    exhRedisId: "",
    // 普通
    schemePublishList: [], // 品牌展位申请单内容查询
    getBrandFlag: {}, // 判断当前登录企业上届是否为品牌企业
    // 品牌
    brandConfirmAddAffirm: {}, // 企业确认品牌展位数量不变，提交确认书
    brandSubmitConfirmBook: {}, // 退展位收费约束机制的时间机制确认书
    brandSubmitConfirmBookData: {}, // 获取提交确认书内容
    backBoothNum: [], // 退回展位号
    brandApplyList: {}, // 品牌展位申请单内容查询
    brandApplyQuery: {}, // 品牌展位申请表内容查询
    brandApplyIdData: {}, // 品牌展位申请表内容查询返回申请id
    brandApplyData: {}, // 品牌展位申请列表查询
    getStand: [], // 一般性展位
    postDelet: {},
    getAddit: [],
    getAssoc: [], //联营企业
    getExhibit: [],
    getVenture: [],
    postRemove: {},
    postGetubmi: {},
    postEditData: [],
    // 海关商品
    customsGoods: {}, // 海关商品录入
    getCustomsList: {}, // 海关商品列表
    delCustomsGoods: {}, // 删除海关商品
    updataCustomsGoods: {}, // 更新海关商品
    getReviewArea: {}, // 审核展区调整
    postAreaAdjust: {}, // 审核展区调整(通过不通过)
    postReviewtBatch: {} // 审核展区调整(通过不通过, 批量)
  },
  getters: {
    exhRedisId: state => state.exhRedisId,
    // 普通
    schemePublishList: state => state.schemePublishList, // 品牌展位申请单内容查询
    getBrandFlag: state => state.getBrandFlag, // 判断当前登录企业上届是否为品牌企业
    // 品牌
    brandConfirmAddAffirm: state => state.brandConfirmAddAffirm, // 企业确认品牌展位数量不变，提交确认书
    brandSubmitConfirmBook: state => state.brandSubmitConfirmBook, // 退展位收费约束机制的时间机制确认书,
    brandSubmitConfirmBookData: state => state.brandSubmitConfirmBookData, // 获取提交确认书内容
    backBoothNum: state => state.backBoothNum, // 退回展位号
    brandApplyList: state => state.brandApplyList, // 品牌展位申请单内容查询
    brandApplyQuery: state => state.brandApplyQuery, // 品牌展位申请表内容查询
    brandApplyIdData: state => state.brandApplyIdData, // 品牌展位申请列表查询
    brandApplyData: state => state.brandApplyData, // 品牌展位申请列表查询
    // 一般性展位
    getStand: state => state.getStand,
    // 一般性删除
    postDelet: state => state.postDelet,
    // 一般性新增联营
    getAddit: state => state.getAddit,
    // 联营企业
    getAssoc: state => state.getAssoc,
    // 一般性新增展品
    getExhibit: state => state.getExhibit,
    // 一般性新增面积
    getVenture: state => state.getVenture,
    // 一般性编辑
    postRemove: state => state.postRemove,
    postGetubmi: state => state.postGetubmi,
    // 获取待企业确认品牌数量确认提交
    postEditData: state => state.postEditData,
    // 海关商品
    customsGoods: state => state.customsGoods, // 海关商品录入
    getCustomsList: state => state.getCustomsList, // 海关商品列表
    delCustomsGoods: state => state.delCustomsGoods, // 删除海关商品
    updataCustomsGoods: state => state.updataCustomsGoods, // 更新海关商品
    getReviewArea: state => state.getReviewArea, // 审核展区调整
    postAreaAdjust: state => state.postAreaAdjust, // 审核展区调整(通过不通过)
    postReviewtBatch: state => state.postReviewtBatch, // 审核展区调整(通过不通过, 批量)
    getAreaCode: state => state.getAreaCode
  },
  mutations: {
    // 普通
    SCHEME_PUBLISH_LIST(state, payload) {
      state.schemePublishList = payload;
    },
    GET_BRAND_FLAG(state, payload) {
      state.getBrandFlag = payload;
    },
    // 品牌
    BRAND_APPLY_LIST(state, payload) {
      state.brandApplyList = payload;
    },
    // 获取提交确认书内容
    GET_SUBMIT_CONFIRM_BOOK_DATA(state, payload) {
      state.brandSubmitConfirmBookData = payload;
    },
    // 企业确认品牌展位数量不变，提交确认书
    BRAND_CONFIRM_ADD_AFFIRM(state, payload) {
      state.brandConfirmAddAffirm = payload;
    },
    // 退展位收费约束机制的时间机制确认书
    SUBMIT_CONFIRM_BOOK(state, payload) {
      state.brandSubmitConfirmBook = payload;
    },
    // 获取退回展位号数组
    GET_BACK_BOOTH_NUM(state, payload) {
      state.backBoothNum = payload;
    },
    BRAND_APPLY_QUERY(state, payload) {
      state.brandApplyQuery = payload;
    },
    BRAND_APPLY_ID_DATA(state, payload) {
      state.brandApplyIdData = payload;
    },
    BRAND_APPLY_DATA(state, payload) {
      state.brandApplyData = payload;
    },
    // 一般性展位
    GET_APPLY_DATA(state, payload) {
      state.getStand = payload;
    },
    // 一般性删除
    POST_APPLY_DATA(state, payload) {
      state.postDelet = payload;
    },
    // 一般性新增联营
    GET_APPLY_ADDR(state, payload) {
      state.getAddit = payload;
    },
    // 联营企业
    GET_ASSOC_NAME(state, payload) {
      state.getAssoc = payload;
    },
    // 一般性新增展品
    GET_APPLY_NEW(state, payload) {
      state.getExhibit = payload;
    },
    // 一般性新增面积
    GET_APPLY_VENT(state, payload) {
      state.getVenture = payload;
    },
    // 一般性编辑
    POST_APPLY_VENT(state, payload) {
      state.postRemove = JSON.parse(JSON.stringify(payload));
    },
    // 一般性编辑提交
    POST_APPLY_SSION(state, payload) {
      state.exhRedisId = "";
      state.postGetubmi = payload;
    },
    // 保存编辑数据
    SAVE_EXH_DATA(state, payload) {
      state.exhRedisId = payload;
    },
    // 从缓存中获取数据
    GET_EXH_DATA(state, payload) {
      state.postGetubmi = payload;
    },
    // 获取待企业确认品牌数量确认提交
    POST_APPLY_ADD(state, payload) {
      state.postEditData = payload;
    },
    // 海关商品录入
    CUSTOMS_GOODS(state, payload) {
      state.customsGoods = payload;
    },
    // 海关商品列表
    GET_CUSTOMS_LIST(state, payload) {
      state.getCustomsList = payload;
    },
    // 删除海关商品
    DEL_CUSTOMS_GOODS(state, payload) {
      state.delCustomsGoods = payload;
    },
    // 更新海关商品
    UPDATA_CUSTOMS_GOODS(state, payload) {
      state.updataCustomsGoods = payload;
    },
    // 审核展区调整
    GET_CUSTOMS_TMENT(state, payload) {
      state.getReviewArea = payload;
    },
    // 审核展区调整(通过不通过)
    POST_CUSTOMS_TMENT(state, payload) {
      state.postAreaAdjust = payload;
    },
    // 审核展区调整(通过不通过, 批量)
    POST_CUSTOMS_BATCH(state, payload) {
      state.postReviewtBatch = payload;
    },
    // 获取企业资质信息参与次数
    GET_COUNT_COMPANY(state, payload) {
      state.getCountCompany = payload;
    },
    GET_AREA_CODE(state, payload) {
      state.getAreaCode = payload;
    },
    GET_LAST_APPLYNUM(state, payload) {
      state.getLastApplyNumber = payload;
    },
    GET_UNION_DETAIL(state, payload) {
      state.getUnionDetail = payload;
    }
  },
  actions: {
    // 普通
    // 判断当前登录企业上届是否为品牌企业
    getSchemePublishBrandFlag({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getSchemePublishBrandFlagData(Object)
          .then(res => {
            commit("GET_BRAND_FLAG", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 企业确认主展展品确认提交
    postSchemePublishSubmit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postSchemePublishSubmitData(Object)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌
    // 获取待企业确认品牌数量查询
    getSchemePublish({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getSchemePublishData(utility.urlEncode(JSON.stringify(params)))
          .then(res => {
            commit("SCHEME_PUBLISH_LIST", res);
            // 获取展区选择数据
            res.exhibitionAreaOpts = $helper.filterDataToSelect(
              res,
              "exhibitionArea",
              "exhibitionAreaName"
            );
            // 获取商协会选择数据
            res.coceralOpts = $helper.filterDataToSelect(
              res,
              "coceralId",
              "coceralName"
            );
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取退回确认书
    getSchemePublishConfirm({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getSchemePublishConfirmData(params)
          .then(res => {
            if (res) {
              let backBoothNum
                = res.backBooth !== "" ? res.backBooth.split(",") : [];
              commit("GET_BACK_BOOTH_NUM", backBoothNum);
            }
            commit("GET_SUBMIT_CONFIRM_BOOK_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },

    // 品牌展位申请单内容查询
    postBrandApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postBrandApplyData(Object)
          .then(res => {
            commit("BRAND_APPLY_LIST", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 企业确认品牌展位数量不变，提交确认书
    enterConfirmAddAffirm({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .addAffirm(Object)
          .then(res => {
            commit("BRAND_CONFIRM_ADD_AFFIRM", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取确认书注意事项
    getConfirmNote({ commit }) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getConfirmBookNote()
          .then(res => {
            commit("SUBMIT_CONFIRM_BOOK", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 企业确认品牌展位数量減少，提交展位退回确认书
    addSubmitConfirmBookData({ commit }, params) {
      let currentObject = {
        backConfirmation: {
          exhibitionSession: params.exhibitionSession,
          dealClusterName: params.dealClusterName,
          companyName: params.companyName,
          exhibitionPeriod: params.exhibitionPeriod,
          exhibitionArea: params.exhibitionArea,
          exhibitionAreaName: params.exhibitionAreaName,
          dealClusterId: params.dealClusterId,
          cantonFairCode: params.cantonFairCode,
          companyId: params.companyId,
          companyCode: params.companyCode,
          lastBoothNumber: params.lastBoothNum,
          backBooth: params.backBooth,
          currentChangeNumber: params.currentChangeNumber,
          currentReserveNumber: params.currentReserveNumber,
          backBoothNumber: params.selfBackNumber,
          backType: params.backType,
          backReason: params.backReason
        },
        numberAffirm: {
          // 本届保留品牌展位数
          affirmBoothNumber: params.affirmBoothNumber,
          cantonFairCode: params.cantonFairCode,
          exhibitionAreaName: params.exhibitionAreaName,
          companyId: params.companyId,
          backBoothNumber: params.selfBackNumber,
          exhibitionArea: params.exhibitionArea,
          lastBoothNum: params.lastBoothNum,
          selfBackNumber: params.selfBackNumber,
          companyCode: params.companyCode,
          lastBoothNumber: params.lastBoothNumber,
          companyName: params.companyName
        }
      };
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .addSchemePublishConfirmData(currentObject)
          .then(res => {
            commit("POST_APPLY_ADD", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请单提交
    postSubmitBrandApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postSubmitBrandApplyData(Object)
          .then(res => {
            commit("BRAND_APPLY_ID_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请表查询
    getBrandApplyFormQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getBrandApplyFormQueryData(Object)
          .then(res => {
            commit("BRAND_APPLY_QUERY", res);
            // 获取展区选择数据
            res.exhibitionAreaOpts = $helper.filterDataToSelect(
              res.exhibitionAreaList,
              "exhibitionAreaCode",
              "exhibitionAreaName"
            );
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请表申请
    postBrandApplyAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postBrandApplyAddData(Object)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请列表查询
    getBrandApplyQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getBrandApplyQueryData(Object)
          .then(res => {
            commit("BRAND_APPLY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请列表编辑
    postBrandApplyEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postBrandApplyEditData(Object)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 品牌展位申请列表删除
    getDelBrandApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getDelBrandApplyData(Object)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增一般性展位申请时判断企业在该展区是否黑名单
    judgeGeneralStandIsBlack({ commit }, object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi.getRewardPunishBlackInfo(utility.urlEncode(JSON.stringify(object))).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 一般性展位
    getGeneralStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getGeneralStandData(Object)
          .then(res => {
            commit("GET_APPLY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 一般性删除
    postGenDeletion({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postGeneralDeletion(obj)
          .then(res => {
            commit("POST_APPLY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 一般性新增联营
    getGeneralAddi({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getGeneralAddition(obj)
          .then(res => {
            // if (res.length === 0) {
            //   res.push({ associateId: 'none', nameCh: '无联营企业' });
            // }
            res.push({ associateId: "none", nameCh: "无联营企业" });
            commit("GET_APPLY_ADDR", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 联营企业
    getAssociateNameListS({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getAssociateNameList(obj)
          .then(res => {
            commit("GET_ASSOC_NAME", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 一般性新增展品
    getGeneralVenture({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getGeneralNewExhibit(utility.urlEncode(JSON.stringify(obj)))
          .then(res => {
            commit("GET_APPLY_NEW", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 一般性新增面积
    getGeneralExhibit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getNewArea(obj)
          .then(res => {
            commit("GET_APPLY_VENT", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取上届展位数量
    getLastApplyNumberInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getLastApplyNumber(obj)
          .then(res => {
            commit("GET_LAST_APPLYNUM", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 一般性编辑
    getHandRemove({ commit }, obj) {
      if (obj.hasOwnProperty('exhRedisId')) {
        companyInfomationApi.getExhData(obj.exhRedisId);
      }
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getBoothEditor(obj)
          .then(res => {
            commit("POST_APPLY_VENT", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 编辑提交
    postGetSubmission({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getSubmission(obj)
          .then(res => {
            commit("POST_APPLY_SSION", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 保存编辑
    saveExhData({ commit }, obj) {
      const strObj = JSON.stringify(obj);
      return companyInfomationApi.saveExhData(strObj).then(res => {
        commit("SAVE_EXH_DATA", res);
      });
    },
    getExhData({ commit }, id) {
      return companyInfomationApi.getExhData(id).then(res => {
        commit("POST_APPLY_SSION", res);
      });
    },
    // },
    // 海关商品录入
    postSubmitCustomsApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postSubmitCustomsApplyData(Object)
          .then(res => {
            commit("CUSTOMS_GOODS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 海关商品修改
    postEditCustomsApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postEditCustomsApplyData(Object)
          .then(res => {
            commit("UPDATA_CUSTOMS_GOODS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //海关商品列表
    getCustomsProductList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getCustomsProductListData(Object)
          .then(res => {
            commit("GET_CUSTOMS_LIST", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //海关商品删除
    postDelCustomsGoods({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .postDelCustomsGoodsData(Object)
          .then(res => {
            commit("DEL_CUSTOMS_GOODS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 审核展区调整
    getReviewAreaAdjustment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .reviewAreaAdjustment(obj)
          .then(res => {
            commit("GET_CUSTOMS_TMENT", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 审核展区调整(通过不通过)
    postReviewAreaAdjustment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .exhibitionAdjustment(obj)
          .then(res => {
            commit("POST_CUSTOMS_TMENT", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 审核展区调整(通过不通过, 批量)
    postReviewAreaAdjustmentBatch({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .exhibitionAdjustmentBatch(obj)
          .then(res => {
            commit("POST_CUSTOMS_BATCH", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取企业资质信息参与次数
    getCountByCompanyIdInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getCountByCompanyId(utility.urlEncode(JSON.stringify(obj)))
          .then(res => {
            commit("GET_COUNT_COMPANY", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取展品大类
    getAreaCodeInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getAreaCode(obj)
          .then(res => {
            commit("GET_AREA_CODE", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取展品大类
    getAssociateEnterprisesDetailInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        companyInfomationApi
          .getAssociateEnterprisesDetail(obj)
          .then(res => {
            commit("GET_UNION_DETAIL", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
