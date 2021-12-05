let host = kindo.config.api.positionArrangeUrl;
let expUrl = kindo.config.api.expUrl;

export default {
  api: {
    //导入
    leadUrl: `${host}/api/arrangementSchemeExcel/importSchemeExcel`,
    //解析上传的Excel文件
    uploadScheme: `${host}/api/schemeData/uploadScheme`,
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //查询位置安排表格记录
    // getApprove: `${host}/api/approve/getListPage`,
    getApprove: `${host}/api/schema/getListPage`,
    //下载Excel模板
    download: `${host}/api/arrangementSchemeExcel/exportSchemeExcel`,
    //位置安排删除操作
    // cancelSchema: `${host}/api/approve/cancelSchema`,
    cancelSchema: `${host}/api/schema/deleteSchema`,
    //获取规则提示
    getRulePrompt: `${host}/api/paLocationSetting/getRulePrompt`,
    //查询展会界数信息(展览策划外部接口)
    getsessionNumber: `${expUrl}/api/exp/exhibitions/current`,
    //根据展期查询展区信息(展览策划外部接口)
    getAreas: `${expUrl}/api/exp/exhibitionschemes/getAreas`,
    //查询自动安排已安排记录
    getRules: `${host}/api/role/getRules`,
    //获取插件在线安排表格数据
    getOnlinePlanTable: `${host}/api/role/getCompanyList`,
    //查看详情
    getApproveDetails: `${host}/api/schema/getApproveDetails`,
    //查询方案对比接口
    getSchemeForCompare: `${host}/api/schemeData/getSchemeForCompare`,
    //查询自动安排企业信息
    autoArrange: `${host}/api/role/autoArrange`,
    //根据展区查询展期信息(展览策划外部接口)
    getPeriods: `${expUrl}/api/exp/exhibitionschemes/getPeriods`,
    //根据展届查询展区信息(展览策划外部接口)
    getAuthAreas: `${expUrl}/api/exp/exhibitionschemes/getAuthAreas`,
    //根据展区查询展期信息(展览策划外部接口)
    getAuthPeriods: `${expUrl}/api/exp/exhibitionschemes/getAuthPeriods`,
    //根据展区展期信息查询布展类型信息(展览策划外部接口)
    getHallInfo: `${expUrl}/api/exp/exhibitionschemes/getHallInfo`
  }
};
