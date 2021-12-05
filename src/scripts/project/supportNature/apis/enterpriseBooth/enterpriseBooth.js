import { $req } from '../../../utils';
import utility from '@/scripts/framework/utility';
const API_SN_URL = process.env.API_SN_URL;
const API_NA_URL = process.env.API_NA_URL;
const API_REPORT_URL = process.env.API_REPORT_URL;

export default {
  // 查询展位申请情况
  getListPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/exhibitionApply/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位申请不合格原因查询
  exhibitionApplyNoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/exhibitionApplyNo/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 品牌申请情况汇总
  brandApplyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/brandApply/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 本届各团展位申请情况与上届对比查询
  applyContrastData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/report/boothApplyOfDelegation/query?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各展区企业申请情况统计
  companyApplyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/companyApply/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各交易团初审情况统计
  delegationApplyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/delegationApply/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各团各展区申请企业不合格原因查询
  exhibitionApplyNoReasonData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_NA_URL + `/api/speciaAreaExternal/exhibitionApplyNoReason/getListPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取当届展会展期信息
  getCurrentData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + '/api/exp/exhibitions/current').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展届展期获取展区和专区的信息
  getAreasData(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_SN_URL + '/api/exp/exhibitionschemes/getAreas', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团
  searchBusinessDelegationData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + '/api/sysDepartment/searchBusinessDelegation?size=' + param.size + '&current=' + param.current).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有展会信息
  getListAllData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + '/api/exp/exhibitions/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取当届展会展期信息
  currentData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + '/api/exp/exhibitions/current').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  /**
  * 拼接对象为请求字符串
  * @param {Object} obj - 待拼接的对象
  * @returns {string} - 拼接成的请求字符串
  */
  encodeSearchParams(obj) {
    const params = [];

    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      // 如果值为undefined我们将其置空
      if (typeof value === 'undefined') {
        value = '';
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join('='));
    });

    return params.join('&');
  },
  // 各交易团各展区申请情况汇总
  businessDelegationAndAreaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/report/businessDelegationAndArea/query?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 产品大类
  sysDataDictItemData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/sysDataDictItem/findDicItemListByBigCategoryOfExhibits`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //获取交易团所属地区
  getBusinessPlaceData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/sysDataDictItem/findDicItemListByTradingGroupRegion`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 当届工作总结,开展调研情况
  efSupSurveyInfoStaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupSurveyInfoSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取标准值
  getStandingData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupSurveyInfoSta/getStanding?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 设置标准值
  updateStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupSurveyInfoSta/updateStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改标准值
  editData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupSurveyInfoSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 违规使用或空置展位 查询
  efSupIllegalRemainBoothStaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupIllegalRemainBoothSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 违规使用或空置展位 设置标准值
  illegalRemainBoothUpdateStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupIllegalRemainBoothSta/updateStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 违规使用或空置展位 修改标准值
  illegalRemainBoothEditData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupIllegalRemainBoothSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专业化宣传工作情况 查询
  efSupPropagandaInfoStaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupPropagandaInfoSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专业化宣传工作情况 获取标准值
  proGetStandingData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupPropagandaInfoSta/getStanding?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专业化宣传工作情况 设置标准值
  proUpdateStandStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupPropagandaInfoSta/updateStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专业化宣传工作情况 修改
  proUpdateStandEditData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupPropagandaInfoSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展品质量监督工作执行情况 查询
  efSupWorkData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupWorkSuperviseSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展品质量监督工作执行情况 获取标准值
  superviseGetStandingData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupWorkSuperviseSta/getStanding?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展品质量监督工作执行情况 设置标准值
  superviseUpdateStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupWorkSuperviseSta/updateStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展品质量监督工作执行情况 修改
  supWorkSuperviseEditData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupWorkSuperviseSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 31号表格获取列表
  queryApplyInfoByExhibitionArea(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_REPORT_URL + '/api/report/queryApplyInfoByExhibitionArea/query', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业一般性特装展位数调整情况达标 查询
  efSupChangeStaSearchData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupChangeSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业一般性特装展位数调整情况达标 获取标准值
  efGetStandingData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupChangeSta/getStanding?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业一般性特装展位数调整情况达标 设置标准值
  efEditStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupChangeSta/editStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业一般性特装展位数调整情况达标 修改
  efSupChangeStaEditData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupChangeSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 退展位情况 查询
  efSupBoothStaPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupBoothNumberReturnSta/page?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 退展位情况 获取标准值
  efSupBoothStaStandingData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_REPORT_URL + `/api/efSupBoothNumberReturnSta/getStanding?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 退展位情况 设置标准值
  efUpdateStandData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupBoothNumberReturnSta/updateStand?json=' + utility.urlEncode(JSON.stringify(param))).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 退展位情况 修改
  efSupBoothStaEditData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_REPORT_URL + '/api/efSupBoothNumberReturnSta/edit', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团列表 查询
  getSubgroupSwitchData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/subGroupSwitch/getSubgroupSwitch?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团列表 设置开或关
  setSubgroupSwitchData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_SN_URL + '/api/subGroupSwitch/setSubgroupSwitchChange', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位数量 设定需求申报类型 获取调研方案列表
  getWorkPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/efSupSurveyScheme/getWorkPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位数量 设定需求申报类型 新增
  surveySchemeAddData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_SN_URL + '/api/efSupSurveyScheme/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位数量 设定需求申报类型(不限制数量) 新增
  surveySchemeAddTypeZeroData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_SN_URL + '/api/efSupSurveyScheme/addTypeZero', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据字典获取展区
  findDicItemListByExhibiAreaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/sysDataDictItem/findDicItemListByExhibitionArea`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团特定展位需求申报 查询
  getDelegationPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/efSupSurveyScheme/getDelegationPage?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 调研结果查询统计-展区维度（工作部管理员）
  getStaticsOfExhibitionAreaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/efSupSurveyScheme/getStaticsOfExhibitionArea?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 调研结果查询统计-交易团维度（工作部管理员）
  getStaticsOfDelegationData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/efSupSurveyScheme/getStaticsOfDelegation?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 调研结果查询统计-详细（工作部管理员）
  getDetailStaticsData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_SN_URL + `/api/efSupSurveyScheme/getDetailStatics?${this.encodeSearchParams(param)}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
