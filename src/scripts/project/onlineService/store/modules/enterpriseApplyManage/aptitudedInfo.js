import { aptitudedInfoApi } from "../../../apis";
import utility from "@/scripts/framework/utility";
import { $helper } from "@/scripts/project/utils";
export default {
  namespaced: true,
  state: {
    // 获取企业资质
    aptitudedInfoList: {
      id: null,
      data: [],
      summaryArray: []
    },
    addCustomData: [],
    deleteCustomData: [],
    updateCustomData: [],
    addBrandOutsideData: [],
    deleteBrandOutsideData: [],
    updateBrandOutsideDate: [],
    addTerritoryData: [],
    deleteTerritoryData: [],
    updateTerritoryDate: [],
    addBuildContentData: [],
    deleteBuildContentData: [],
    updateBuildContentData: [],
    addInternationalData: [],
    deleteInternationalData: [],
    updateInternationalData: [],
    addIntellectualData: [],
    deleteIntellectualData: [],
    updateIntellectualData: [],
    addUtonomyData: [],
    deleteUtonomyData: [],
    updateUtonomyData: [],
    addAptitudesData: [],
    deleteAptitudesData: [],
    updateAptitudesData: [],
    addStandardData: [],
    deleteStandardData: [],
    updateStandardData: []
  },
  getters: {
    // 获取企业资质
    aptitudedInfoList: state => state.aptitudedInfoList,
    // 海关编码
    addCustomData: state => state.addCustomData,
    deleteCustomData: state => state.deleteCustomData,
    updateCustomData: state => state.updateCustomData,
    // 境外注册商标
    addBrandOutsideData: state => state.addBrandOutsideData,
    deleteBrandOutsideData: state => state.deleteBrandOutsideData,
    updateBrandOutsideDate: state => state.updateBrandOutsideDate,
    // 境内注册商标
    addTerritoryData: state => state.addTerritoryData,
    deleteTerritoryData: state => state.deleteTerritoryData,
    updateTerritoryDate: state => state.updateTerritoryDate,
    // 品牌建设内容
    addBuildContentData: state => state.addBuildContentData,
    deleteBuildContentData: state => state.deleteBuildContentData,
    updateBuildContentData: state => state.updateBuildContentData,
    // 登记国际通行认证
    addInternationalData: state => state.addInternationalData,
    deleteInternationalData: state => state.deleteInternationalData,
    updateInternationalData: state => state.updateInternationalData,
    // 登记研发创新和自主知识产权
    addIntellectualData: state => state.addIntellectualData,
    deleteIntellectualData: state => state.addIntellectualData,
    updateIntellectualData: state => state.updateIntellectualData,
    // 行业自律登记
    addUtonomyData: state => state.addUtonomyData,
    deleteUtonomyData: state => state.addUtonomyData,
    updateUtonomyData: state => state.updateUtonomyData,
    // 广交会参展表现等级内容
    addAptitudesData: state => state.addAptitudesData,
    deleteAptitudesData: state => state.addAptitudesData,
    updateAptitudesData: state => state.updateAptitudesData,
    // 登记国家或行业标准
    addStandardData: state => state.addStandardData,
    deleteStandardData: state => state.deleteStandardData,
    updateStandardData: state => state.updateStandardData
  },
  mutations: {
    // 获取企业资质
    APTITUEDE_INFO_LIST(state, payload) {
      state.aptitudedInfoList = payload;
    },
    // 海关编码
    ADD_CUSTOM_DATA(state, payload) {
      state.addCustomData = payload;
    },
    DELETE_CUSTOM_DATA(state, payload) {
      state.deleteCustomData = payload;
    },
    UPDATE_CUSTOM_DATA(state, payload) {
      state.updateCustomData = payload;
    },
    // 境外注册商标
    ADD_BRANDOUT_DATA(state, payload) {
      state.addBrandOutsideData = payload;
    },
    DELETE_BRANDOUT_DATA(state, payload) {
      state.deleteBrandOutsideData = payload;
    },
    UPDATE_BRANDOUT_DATA(state, payload) {
      state.updateBrandOutsideDate = payload;
    },
    // 境内注册商标
    ADD_TERRITORY_DATA(state, payload) {
      state.addTerritoryData = payload;
    },
    DELETE_TERRITORY_DATA(state, payload) {
      state.deleteTerritoryData = payload;
    },
    UPDATE_TERRITORY_DATA(state, payload) {
      state.updateTerritoryDate = payload;
    },
    // 品牌建设内容
    ADD_BUILDCONTENT_DATA(state, payload) {
      state.addBuildContentData = payload;
    },
    DELETE_BUILDCONTENT_DATA(state, payload) {
      state.deleteBuildContentData = payload;
    },
    UPDATE_BUILDCONTENT_DATA(state, payload) {
      state.updateBuildContentData = payload;
    },
    // 登记国际通行认证
    ADD_INTERNATIONAL_DATA(state, payload) {
      state.addInternationalData = payload;
    },
    DELETE_INTERNATIONAL_DATA(state, payload) {
      state.deleteInternationalData = payload;
    },
    UPDATE_INTERNATIONAL_DATA(state, payload) {
      state.updateInternationalData = payload;
    },
    // 登记研发创新和自主知识产权
    ADD_INTELLECTUAL_DATA(state, payload) {
      state.addIntellectualData = payload;
    },
    DELETE_INTELLECTUAL_DATA(state, payload) {
      state.deleteIntellectualData = payload;
    },
    UPDATE_INTELLECTUAL_DATA(state, payload) {
      state.updateIntellectualData = payload;
    },
    // 行业自律登记
    ADD_UTONOMY_DATA(state, payload) {
      state.addUtonomyData = payload;
    },
    DELETE_UTONOMY_DATA(state, payload) {
      state.deleteUtonomyData = payload;
    },
    UPDATE_UTONOMY_DATA(state, payload) {
      state.updateUtonomyData = payload;
    },
    // 广交会参展表现等级内容
    ADD_APTITUDES_DATA(state, payload) {
      state.addAptitudesData = payload;
    },
    DELETE_APTITUDES_DATA(state, payload) {
      state.deleteAptitudesData = payload;
    },
    UPDATE_APTITUDES_DATA(state, payload) {
      state.updateAptitudesData = payload;
    },
    // 登记国家或行业标准
    ADD_STANDARD_DATA(state, payload) {
      state.addStandardData = payload;
    },
    DELETE_STANDARD_DATA(state, payload) {
      state.deleteStandardData = payload;
    },
    UPDATE_STANDARD_DATA(state, payload) {
      state.updateStandardData = payload;
    },
    ADD_ACT_PRO(state, payload) {
      state.addActPro = payload;
    },
    DEL_ACT_PRO(state, payload) {
      state.delActPro = payload;
    },
    UPDATE_ACT_PRO(state, payload) {
      state.updateActPro = payload;
    },
    DEL_EXH_HIS(state, payload) {
      state.delExhHis = payload;
    },
    ADD_EXH_HIS(state, payload) {
      state.addExhHis = payload;
    },
    UPDATE_EXH_HIS(state, payload) {
      state.updateExhHis = payload;
    }
  },
  actions: {
    // 获取企业资质
    getAptitudedInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .getAptitudedData(utility.urlEncode(JSON.stringify(params)))
          .then(res => {
            res.records.forEach((value, index) => {
              value.sequenceNum = res.size & (res.current - 1 + (index + 1));
              // let _this = this;
              value.idO = value.brandPattern;
              value.idT = value.brandRegisteredCertificate;
              // 认证类型
              // if (value.authenticationCategory) {
              //   value.authenticationCategory = $helper.getDicLabel(
              //     this.state.dictionary.dictionaryData.authenticationCategory,
              //     value.authenticationCategory
              //   );
              // }
              // 海关编码证书
              if (value.aptitudesCustomsId) {
                value.aptitudesCustomsId
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.aptitudesCustomsId;
              }
              value.contentFile
                = process.env.API_OS_URL
                + "/efOS/file/getImg?fileId="
                + value.contentFile;
              // 证明材料
              if (value.fileId) {
                value.fileId
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.fileId;
              }
              // value.imageUrl = process.env.API_OS_URL  "/efOS/file/queryFile?fileId="  value.fileId;
              // value.fileId = process.env.API_OS_URL  "/efOS/file/getImg?fileId="  value.fileId;
              // 证书扫描件
              if (value.certificate) {
                value.certificate
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.certificate;
              }
              // value.brandRegisteredCertificate = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.actorProjectId;
              // 商标注册证书
              if (value.brandRegisteredCertificate) {
                value.brandRegisteredCertificate
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.brandRegisteredCertificate;
              }
              // 商标图案
              if (value.brandPattern) {
                value.brandPattern
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.brandPattern;
              }
              // 海关编码证书
              if (value.customsCodeCertificate) {
                value.customsCodeCertificate
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.customsCodeCertificate;
              }
              // value.correlationCompanyName = $helper.getDicLabel(_this.state.dictionary.dictionaryData.correlationCompanyName, value.correlationCompanyName);
              // 与本企业的关系
              // if (value.aptitudeSource) {
              //   value.aptitudeSource = $helper.getDicLabel(
              //     this.state.dictionary.dictionaryData.aptitudeSourceT,
              //     value.aptitudeSource
              //   );
              // }
              // 关系证明
              if (value.proofRelationship) {
                value.proofRelationship
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.proofRelationship;
              }
              // value.authenticationCategory = $helper.getDicLabel(_this.state.dictionary.dictionaryData.authenticationCategory, value.authenticationCategory);
              // 处理参与时间
              if (value.actorDate && value.actorDate !== "") {
                value.actorDate = value.actorDate.split(" ")[0];
              }

              if (["05", "09"].includes(params.aptitudeKind) && value.certificateCode) {
                value.certificateCode
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.certificateCode;
              }

              if (value.remark) {
                value.remark
                  = process.env.API_OS_URL
                  + "/efOS/file/getImg?fileId="
                  + value.remark;
              }

              if (value.indate) {
                value.indate = value.indate.replace(",", "至");
              }
              // 处理审核状态
              if (value.approveStatus === "1") {
                value.approveStatus = "通过";
              } else if (value.approveStatus === "2") {
                value.approveStatus = "不通过";
              } else {
                value.approveStatus = "待审核";
              }
            });
            commit("APTITUEDE_INFO_LIST", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增海关编码
    addCustomInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addCustom(params)
          .then(res => {
            commit("ADD_CUSTOM_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除海关编码
    deleteCustomInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteCustom(params)
          .then(res => {
            commit("DELETE_CUSTOM_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新海关编码
    updateCustomInfo({ commit }, params) {
      if (
        params.customsCodeCertificate
        && params.customsCodeCertificate.indexOf("=") !== -1
      ) {
        params.customsCodeCertificate = params.customsCodeCertificate.split(
          "="
        )[0];
      }
      if (
        params.correlationCompanyName
        && typeof params.correlationCompanyName === "string"
      ) {
        params.correlationCompanyName = $helper.getDicCode(
          this.state.dictionary.dictionaryData.correlationCompanyName,
          params.correlationCompanyName
        );
      }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateCustom(params)
          .then(res => {
            commit("UPDATE_CUSTOM_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增境外商标
    addBrandOutsideInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addBrandOutside(params)
          .then(res => {
            commit("ADD_BRANDOUT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除境外商标
    deleteBrandOutsideInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteBrandOutside(params)
          .then(res => {
            commit("DELETE_BRANDOUT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新境外商标
    updateBrandOutsideInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      if (params.brandPattern && params.brandPattern.indexOf("=") !== -1) {
        params.brandPattern = params.brandPattern.split("=")[1];
      }
      if (
        params.proofRelationship
        && params.proofRelationship.indexOf("=") !== -1
      ) {
        params.proofRelationship = params.proofRelationship.split("=")[1];
      }
      // if (params.correlationCompanyName && (typeof (params.correlationCompanyName) === 'string')) {
      //   params.correlationCompanyName = $helper.getDicCode(this.state.dictionary.dictionaryData.correlationCompanyName, params.correlationCompanyName);
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateBrandOutside(params)
          .then(res => {
            commit("UPDATE_BRANDOUT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增境内商标
    addTerritoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addTerritory(params)
          .then(res => {
            commit("ADD_TERRITORY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除境内商标
    deleteTerritoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteTerritory(params)
          .then(res => {
            commit("DELETE_BRANDOUT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新境内商标
    updateTerritoryInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      if (
        params.proofRelationship
        && params.proofRelationship.indexOf("=") !== -1
      ) {
        params.proofRelationship = params.proofRelationship.split("=")[1];
      }
      if (params.brandPattern && params.brandPattern.indexOf("=") !== -1) {
        params.brandPattern = params.brandPattern.split("=")[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (params.correlationCompanyName && (typeof (params.correlationCompanyName) === 'string')) {
      //   params.correlationCompanyName = $helper.getDicCode(this.state.dictionary.dictionaryData.correlationCompanyName, params.correlationCompanyName);
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateTerritory(params)
          .then(res => {
            commit("UPDATE_BRANDOUT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增品牌建设内容
    addBuildContentInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addBuildContent(params)
          .then(res => {
            commit("ADD_BUILDCONTENT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除品牌建设内容
    deleteBuildContentInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteBuildContent(params)
          .then(res => {
            commit("DELETE_BUILDCONTENT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新品牌建设内容
    updateBuildContentInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[0];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateBuildContent(params)
          .then(res => {
            commit("UPDATE_BUILDCONTENT_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增登记国际通行认证
    addInternationalInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addInternational(params)
          .then(res => {
            commit("ADD_INTERNATIONAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除登记国际通行认证
    deleteInternationalInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteInternational(params)
          .then(res => {
            commit("DELETE_INTERNATIONAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新登记国际通行认证
    updateInternationalInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      // if (params.correlationCompanyName && (typeof (params.correlationCompanyName) === 'string')) {
      //   params.correlationCompanyName = $helper.getDicCode(this.state.dictionary.dictionaryData.correlationCompanyName, params.correlationCompanyName);
      // }
      // if (params.authenticationCategory && (typeof (params.authenticationCategory) === 'string')) {
      //   params.authenticationCategory = $helper.getDicCode(this.state.dictionary.dictionaryData.authenticationCategory, params.authenticationCategory);
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateInternational(params)
          .then(res => {
            commit("UPDATE_INTERNATIONAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增登记研发创新和自主知识产权
    addIntellectualInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addIntellectual(params)
          .then(res => {
            commit("ADD_INTELLECTUAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除登记研发创新和自主知识产权
    deleteIntellectualInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteIntellectual(params)
          .then(res => {
            commit("DELETE_INTELLECTUAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新登记研发创新和自主知识产权
    updateIntellectualInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      if (
        params.proofRelationship
        && params.proofRelationship.indexOf("=") !== -1
      ) {
        params.proofRelationship = params.proofRelationship.split("=")[1];
      }
      //certificate
      if (
        params.certificate
        && params.certificate.indexOf("=") !== -1
      ) {
        params.certificate = params.certificate.split("=")[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateIntellectual(params)
          .then(res => {
            commit("UPDATE_INTELLECTUAL_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增行业自律登记
    addUtonomyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addUtonomy(params)
          .then(res => {
            commit("ADD_UTONOMY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除行业自律登记
    deleteUtonomyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteUtonomy(params)
          .then(res => {
            commit("DELETE_UTONOMY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新行业自律登记
    updateUtonomyInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateUtonomy(params)
          .then(res => {
            commit("UPDATE_UTONOMY_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增广交会参展表现等级内容
    addAptitudesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addAptitudes(params)
          .then(res => {
            commit("ADD_APTITUDES_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除广交会参展表现等级内容
    deleteAptitudesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteAptitudes(params)
          .then(res => {
            commit("DELETE_APTITUDES_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新广交会参展表现等级内容
    updateAptitudesInfo({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateAptitudes(params)
          .then(res => {
            commit("UPDATE_APTITUDES_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增登记国家或行业标准
    addStandardInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addStandard(params)
          .then(res => {
            commit("ADD_STANDARD_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除登记国家或行业标准
    deleteStandardInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteStandard(params)
          .then(res => {
            commit("DELETE_STANDARD_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新登记国家或行业标准
    updateStandardInfo({ commit }, params) {
      if (
        params.proofRelationship
        && params.proofRelationship.indexOf("=") !== -1
      ) {
        params.proofRelationship = params.proofRelationship.split("=")[1];
      }

      if (params.remark && params.remark.indexOf("=") !== -1) {
        params.remark = params.remark.split("=")[1];
      }

      if (
        params.certificateCode
        && params.certificateCode.indexOf("=") !== -1
      ) {
        params.certificateCode = params.certificateCode.split("=")[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateStandard(params)
          .then(res => {
            commit("UPDATE_STANDARD_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增近两年参加国际专业展
    addActorProjectInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addActorProjectInfos(params)
          .then(res => {
            commit("ADD_ACT_PRO", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除近两年参加国际专业展
    deleteActorProjectInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteActorProjectInfos(params)
          .then(res => {
            commit("DEL_ACT_PRO", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新近两年参加国际专业展
    updateActorProjectInfos({ commit }, params) {
      if (params.fileId && params.fileId.indexOf("=") !== -1) {
        params.fileId = params.fileId.split("=")[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateActorProjectInfos(params)
          .then(res => {
            commit("UPDATE_ACT_PRO", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增参与商务部组织对外经济合作、援助项目
    addExhibitHistoryInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .addExhibitHistoryInfos(params)
          .then(res => {
            commit("ADD_EXH_HIS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 删除参与商务部组织对外经济合作、援助项目
    deleteExhibitHistoryInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .deleteExhibitHistoryInfos(params)
          .then(res => {
            commit("DEL_EXH_HIS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 更新参与商务部组织对外经济合作、援助项目
    updateExhibitHistoryInfos({ commit }, params) {
      if (
        params.brandRegisteredCertificate
        && params.brandRegisteredCertificate.indexOf("=") !== -1
      ) {
        params.brandRegisteredCertificate = params.brandRegisteredCertificate.split(
          "="
        )[1];
      }
      // if (params.aptitudeSource && (typeof (params.aptitudeSource) === 'string')) {
      //   params.aptitudeSource = $helper.getDicCode(this.state.dictionary.dictionaryData.aptitudeSourceT, params.aptitudeSource);
      // }
      // if (
      //   params.correlationCompanyName
      //   && typeof params.correlationCompanyName === "string"
      // ) {
      //   params.correlationCompanyName = $helper.getDicCode(
      //     this.state.dictionary.dictionaryData.correlationCompanyName,
      //     params.correlationCompanyName
      //   );
      // }
      return new Promise((resolve, reject) => {
        aptitudedInfoApi
          .updateExhibitHistoryInfos(params)
          .then(res => {
            commit("UPDATE_EXH_HIS", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
