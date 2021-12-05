import { $req } from "../../../utils";
const BASE_URL = process.env.API_OS_URL;
const NA_BASE_URL = process.env.API_NA_URL;
const API_ASS_URL = process.env.API_ASS_URL;
export default {
  // 普通
  // 获取待企业确认品牌数量查询
  getSchemePublishData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(`${NA_BASE_URL}/api/SchemePublish/getList?json=` + param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取待企业确认品牌数量确认提交
  addSchemePublishConfirmData(param) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${NA_BASE_URL}/api/SchemePublish/numberAffirm/add`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取退回确认书
  getSchemePublishConfirmData(param) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${NA_BASE_URL}/api/SchemePublish/numberAffirm/get`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 企业确认品牌展位数量不变，提交确认书
  addAffirm(param) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(
          `${NA_BASE_URL}/api/SchemePublish/numberAffirm/addAffirm`,
          param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取确认书注意事项
  getConfirmBookNote() {
    return new Promise((resolve, reject) => {
      $req
        .get(`${NA_BASE_URL}/api/backConfirmation/explainSet/get`)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 判断当前登录企业上届是否为品牌企业
  getSchemePublishBrandFlagData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${BASE_URL}/api/ordinaryCompanyDemandRecord/getBrandFlag?param=`
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 企业确认主展展品确认提交
  postSchemePublishSubmitData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/add`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌
  // 品牌展位申请单内容查询
  postBrandApplyData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(
          `${NA_BASE_URL}/api/applyNumber/brandPosApply/getListAll`,
          data
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请单提交
  postSubmitBrandApplyData(data) {
    return new Promise((resolve, reject) => {
      // $req.postJson(`${NA_BASE_URL}/api/applyNumber/brandPosApply/add`, data).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
      $req
        .postJson(
          `${BASE_URL}/api/ordinaryCompanyDemandRecord/submitApplication`,
          data
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请表查询
  getBrandApplyFormQueryData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(`${NA_BASE_URL}/api/applyNumber/brandPosApplyNum/get`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请表申请
  postBrandApplyAddData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${NA_BASE_URL}/api/applyNumber/brandPosApplyNum/add`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请列表查询
  getBrandApplyQueryData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${NA_BASE_URL}/api/applyNumber/brandPosApplyNum/getListPage`,
          param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请列表编辑
  postBrandApplyEditData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(
          `${NA_BASE_URL}/api/applyNumber/brandPosApplyNum/updateById`,
          data
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 品牌展位申请列表删除
  getDelBrandApplyData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${NA_BASE_URL}/api/applyNumber/brandPosApplyNum/deleteById`,
          param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 新增一般性展位申请时判断企业在该展区是否黑名单
  getRewardPunishBlackInfo(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompanyDemandRecord/getRewardPunishBlackInfo?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 一般性展位
  getGeneralStandData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${BASE_URL}/api/ordinaryCompanyDemandRecord/getListPage?param=`
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 一般性删除
  postGeneralDeletion(param) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/delete`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 一般性新增联营
  getGeneralAddition(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${BASE_URL}/efOS/efOsAssociateEnterprisesInfo/getAssociateNameList?json=`
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 联营企业
  getAssociateNameList(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${API_ASS_URL}/efOS/efOsAssociateEnterprisesInfo/getAssociateNameList?json=`
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 一般性新增展品
  getGeneralNewExhibit(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(`${BASE_URL}/efOS/efOsExhibitInfo/getExhibitName?json=` + param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 一般性新增面积
  getNewArea(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(`${BASE_URL}/api/common/exhibitionAreaByCode/get`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 一般性展位编辑获取数据
  getBoothEditor(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${BASE_URL}/api/ordinaryCompanyDemandRecord/getOneDemand?param=`
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取上届展位数量
  getLastApplyNumber(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(`${NA_BASE_URL}/api/ordinaryCompanyDemandRecord/company/lastApplyNumber?boothType=` + param.boothType + '&companyId=' + param.companyId + '&exhibitionArea=' + param.exhibitionArea)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  /**
   * 暂存exhibition编辑数据到缓存
   * @param {*} param
   * @returns {Promise} promise
   */
  saveExhData(param) {
    return $req.post(`${BASE_URL}/efOS/comment/addResdis`, {
      resdisValue: param
    });
  },

  /**
   * 获取暂存的redis数据
   * @param { String } id
   * @returns { Promise } promise
   */
  getExhData(id) {
    return $req.get(`${BASE_URL}/efOS/comment/getResdis?redisKey=${id}`);
  },
  getSubmission(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/edit`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 文件删除
  postHandleRemove(param) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/efOS/file/deleteFile`, param)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 海关商品录入
  postSubmitCustomsApplyData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/efOsAdjustHsCode/addAdjustHsCode`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 海关商品修改
  postEditCustomsApplyData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/efOsAdjustHsCode/updateAdjustHsCode`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  //获取海关商品编码对应展区调整列表
  getCustomsProductListData(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          BASE_URL + "/api/efOsAdjustHsCode/getAdjustHsCodeList?param=" + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  //删除海关商品
  postDelCustomsGoodsData(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/efOsAdjustHsCode/deleteAdjustHsCode`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 审核展区调整
  reviewAreaAdjustment(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          `${BASE_URL}/api/efOsAdjustHsCode/getAdjustHsCodeList?param=` + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 审核展区调整(通过不通过)
  exhibitionAdjustment(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/efOsAdjustHsCode/approveAdjustHsCode`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 审核展区调整(通过不通过, 批量)
  exhibitionAdjustmentBatch(data) {
    return new Promise((resolve, reject) => {
      $req
        .postJson(`${BASE_URL}/api/efOsAdjustHsCode/approveAdjustHsCodes`, data)
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取企业资质信息参与次数
  getCountByCompanyId(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          BASE_URL
            + "/api/efBnAptitudeIntellectual/getCountByCompanyId?json="
            + param
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取展品大类
  getAreaCode(param) {
    return new Promise((resolve, reject) => {
      $req
        .get(
          BASE_URL
            + "/efOS/comment/getExhibitionAreaItem?areaCode="
            + param.areaCode
            + "&session="
            + param.session
        )
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取联营企业
  getAssociateEnterprisesDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + "/efOS/efOsAssociateEnterprisesInfo/getAssociateEnterprisesDetail?associateEnterprisesId=" + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
