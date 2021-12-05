let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //导入
    leadUrl: `${host}/api/arrangementSchemeExcel/importSchemeExcel`,
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //查询位置安排表格记录
    getApprove: `${host}/api/approve/getListPage`,
    //下载Excel模板
    download: `${host}/api/arrangementSchemeExcel/exportSchemeExcel`,
    //位置安排撤销操作
    cancelSchema: `${host}/api/approve/cancelSchema`,
    //位置安排下载PDF文件
    downloadPDF: `${host}/api/paPublish/getPdfBatchByZip`
  }
};
