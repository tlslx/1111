let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //下载Excel模板
    download: `${host}/api/arrangementSchemeExcel/exportSchemeExcel`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //商协会发送位置安排
    businessSendApply: `${host}/api/bcApply/getSchemeByApplyId`,
    //商协会位置安排查询
    // reviewArrangementGetList: `${host}/api/applyScheme/getListPage`,
    reviewArrangementGetList: `${host}/api/patchschema/getListPage`,
    //商协会位置安排撤销接口
    // reviewArrangementCancel: `${host}/api/applyScheme/cancelSchema`,
    reviewArrangementCancel: `${host}/api/patchschema/cancelSchema`,
    //商协会位置安排删除接口
    reviewArrangementDelete: `${host}/api/applyScheme/deleteSchema`,
    //图片下载地址
    dowloadURL: `${host}/api/attachment/getFileByBatch`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`,
    //补丁方案新增 位置安排查询接口
    // sendArrangeGetList: `${host}/api/applySchemeReview/getApplyPage`,
    sendArrangeGetList: `${host}/api/applying/getArrangeApplyPage`,
    //获取规则提示
    getRulePrompt: `${host}/api/paLocationSetting/getRulePrompt`,
    //获取位置安排申请记录
    applyReviewGetList: `${host}/api/special/getApplyReviewListPage`,
    //根据选择集合查询企业调整信息
    getAdjustEnterpriseList: `${host}/api/special/getAdjustEnterpriseList`,
    //补丁方案新增查看详情
    reviewArrangementGetDetail: `${host}/api/patchschema/getApproveDetails`
  }
};
