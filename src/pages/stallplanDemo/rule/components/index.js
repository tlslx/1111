let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //获取未安排企业
    getUnPreArrangedEnterprise: `${host}/api/paPreArrangedEnterprises/getUnArrangeEnterprisePage`,
    //获取企业信息新接口(数量安排外部接口)
    // getEnterpriseList: 'http://139.159.158.200:8000/api/speciaAreaExternal/applyInforForEnterpriseBooth/getListPage',
    //联调完成后将地址换成host
    getEnterpriseList: 'http://139.9.71.183:9003/api/speciaAreaExternal/applyInforForEnterpriseBooth/getListPage',
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
    warrantEnterprise: `${host}/api/paStandardToSpecial/addAuthorizedEnterpriseBatchIds`,
    //自动安排规则设置保存
    saveRules: `${host}/api/role/saveRules`,
    //查询自动安排已安排记录
    getRules: `${host}/api/role/getRules`,
    //导入抽签结果下载
    downloadModel: `${host}/api/paDrawingResults/downloadModel`
  }
};
