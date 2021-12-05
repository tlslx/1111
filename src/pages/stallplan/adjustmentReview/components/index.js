let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //位置安排列表
    get: `${host}/api/approve/getListPage`,
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //导入
    leadUrl: `${host}/api/arrangementSchemeExcel/importSchemeExcel`,
    //下载Excel模板
    download: `${host}/api/arrangementSchemeExcel/exportSchemeExcel`,
    //位置安排撤销操作
    cancelSchema: `${host}/api/approve/cancelSchema`,
    //位置安排批量下载PDF接口
    downloadPDF: `${host}/api/paPublish/getPdfBatchByZip`,
    //交易团审核查询
    getApplyList: `${host}/api/paApply/getListPage`,
    //交易团审核查看详情
    getApplyListDetails: `${host}/api/paApply/getApplyDetails`,
    //交易团审核提交
    submitApply: `${host}/api/paApply/submitApply`,
    //商协会位置安排查询
    getReviewList: `${host}/api/applyScheme/getListPage`,
    //位置安排查看操作
    getApproveDetails: `${host}/api/approve/getApproveDetails`,
    //位置安排开启流程提交
    startApprove: `${host}/api/approve/startApprove`,
    //位置安排审核流程提交
    submitApprove: `${host}/api/approve/submitApprove`,
    //位置安排已拒绝重新提交
    reStartApprove: `${host}/api/approve/reStartApprove`,
    //位置安排保存方法
    updateSchema: `${host}/api/approve/updateSchema`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //商协会表格查询
    businessGetList: `${host}/api/bcApply/getListPage`,
    //商协会拒绝接口
    businessRefuse: `${host}/api/bcApply/submitApply`,
    //商协会查看详情接口
    businessGetDetail: `${host}/api/bcApply/getApplyDetails`,
    //商协会发送位置安排
    businessSendApply: `${host}/api/bcApply/getSchemeByApplyId`,
    //商协会位置安排查询
    reviewArrangementGetList: `${host}/api/applyScheme/getListPage`,
    //商协会位置安排查看详情请求
    reviewArrangementGetDetail: `${host}/api/applyScheme/getApproveDetails`,
    //商协会位置安排开启流程提交
    reviewArrangementStartApprove: `${host}/api/applyScheme/startApprove`,
    //商协会位置安审核提交
    reviewArrangementSubmitApprove: `${host}/api/applyScheme/submitApprove`,
    //商协会位置安排撤销接口
    reviewArrangementCancel: `${host}/api/applyScheme/cancelSchema`,
    //商协会位置安排删除接口
    reviewArrangementDelete: `${host}/api/applyScheme/deleteSchema`,
    //商协会位置安排保存接口
    reviewArrangementUpdateSchema: `${host}/api/applyScheme/updateSchema`,
    //商协会位置安排保存接口
    reviewArrangementReSubmit: `${host}/api/applyScheme/reSubmitApprove`,
    //工作部审核页面
    workDepartmentReview: `${host}/api/drApplyScheme/getListPage`,
    //外贸司审核页面
    foreignTradeDepartmentReview: `${host}/api/trApplyScheme/getListPage`,
    //图片下载地址
    dowloadURL: `${host}/api/attachment/getFileByBatch`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`
  }
};
