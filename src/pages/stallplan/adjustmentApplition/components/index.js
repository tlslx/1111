let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //展位调整申请新增申请
    startApply: `${host}/api/enApply/startApply`,
    //展位调整申请查询展位号/根据展位号和企业ID查剩余字段数
    selectSchemeByCompanyId: `${host}/api/paApplicationAdjustAdd/selectSchemeByCompanyId`,
    //展位调整申请查询企业信息
    selectCompanyByName: `${host}/api/paApplicationAdjustAdd/selectCompanyByName`,
    //审核状态下来框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //展位调整申请分页查询
    getEnApplyStatus: `${host}/api/enApply/getListPage`,
    //展位调整申请提交(拒绝之后重新提交)
    submitApply: `${host}/api/enApply/submitApply`,
    //展位调整申请撤回
    cancelApply: `${host}/api/enApply/cancelApply`,
    //展位调整申请删除
    deleteApply: `${host}/api/enApply/deleteApply`,
    //展位申请图片上传
    uploadURL: `${host}/api/attachment/save`,
    //图片下载地址
    dowloadURL: `${host}/api/attachment/getFileByBatch`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`
  }
};
