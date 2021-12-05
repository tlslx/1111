let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //导入
    leadUrl: `${host}/api/arrangementSchemeExcel/importSchemeExcel`,
    //下载Excel模板
    download: `${host}/api/arrangementSchemeExcel/exportSchemeExcel`,
    //交易团审核查询
    getApplyList: `${host}/api/paApply/getListPage`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //商协会表格查询
    businessGetList: `${host}/api/bcApply/getListPage`,
    //商协会查看详情接口
    businessGetDetail: `${host}/api/bcApply/getApplyDetails`,
    //商协会发送位置安排
    businessSendApply: `${host}/api/bcApply/getSchemeByApplyId`,
    //商协会位置安排删除接口
    reviewArrangementDelete: `${host}/api/applyScheme/deleteSchema`,
    //工作部审核页面
    workDepartmentReview: `${host}/api/drApplyScheme/getListPage`,
    //外贸司审核页面
    foreignTradeDepartmentReview: `${host}/api/trApplyScheme/getListPage`,
    //图片下载地址
    dowloadURL: `${host}/api/attachment/getFileByBatch`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`,
    //补丁方案审核
    // patchSchemeReviewGetList: `${host}/api/applySchemeReview/getListPage`
    patchSchemeReviewGetList: `${host}/api/patchschema/getListReviewPage`,
    //批量提交地址
    patchSchemesubmitApproveBatch: `${host}/api/patchschema/submitApproveBatch`
  }
};
