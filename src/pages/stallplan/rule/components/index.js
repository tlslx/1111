let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //获取未安排企业
    getUnPreArrangedEnterprise: `${host}/api/paPreArrangedEnterprises/getUnArrangeEnterprisePage`,
    //预安排企业
    addArrangeEnterprise: `${host}/api/paPreArrangedEnterprises/addArrangeEnterpriseBatchIds`,
    //获取预安排企业
    getPreArrangedEnterprise: `${host}/api/paPreArrangedEnterprises/getListPage`,
    //移除预安排企业
    removePreArrangedEnterprise: `${host}/api/paPreArrangedEnterprises/deleteArrangeEnterpriseBatchIds`,
    //获取规则提示
    getRulePrompt: `${host}/api/paLocationSetting/getRulePrompt`,
    //修改规则提示
    editRulePrompt: `${host}/api/paLocationSetting/updateRulePrompt`,
    //规则设置导入抽签结果表格查询
    getDrawResultListPage: `${host}/api/paDrawingResults/getDrawResultListPage`,
    //规则设置导入抽签结果批量删除
    deleteDrawResultBatchById: `${host}/api/paDrawingResults/deleteDrawResultBatchById`,
    //规则设置导入抽签结果导入excel文件
    importDrawResultExcel: `${host}/api/paDrawingResults/importDrawResultExcel`,
    //获取授权企业
    getAuthorizedEnterprise: `${host}/api/paStandardToSpecial/getListPage`,
    //移除授权企业
    removeAuthorizedEnterprise: `${host}/api/paStandardToSpecial/deleteAuthorizedEnterpriseBatchIds`,
    //获取未授权企业
    getUnauthorizedEnterprise: `${host}/api/paStandardToSpecial/getUnauthorizedEnterprisePage`,
    //批量授权企业
    warrantEnterprise: `${host}/api/paStandardToSpecial/addAuthorizedEnterpriseBatchIds`
  }
};
