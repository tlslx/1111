let host = kindo.config.api.positionArrangeUrl;
let expUrl = kindo.config.api.expUrl;

export default {
  api: {
    //展位调整申请新增申请
    // startApply: `${host}/api/enApply/startApply`,
    startApply: `${host}/api/applying/startApply `,
    //展位调整申请查询展位号/根据展位号和企业ID查剩余字段数
    selectSchemeByCompanyId: `${host}/api/paApplicationAdjustAdd/selectSchemeByCompanyId`,
    //展位调整申请查询企业信息
    selectCompanyByName: `${host}/api/paApplicationAdjustAdd/selectCompanyByName`,
    //展位调整申请提交(拒绝之后重新提交)
    // submitApply: `${host}/api/enApply/submitApply`,
    submitApply: `${host}/api/applying/submitApply`,
    //展位申请图片上传
    uploadURL: `${host}/api/attachment/save`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`,
    //根据展区查展期信息
    getAuthPeriods: `${expUrl}/api/exp/exhibitionschemes/getAuthPeriods`,
    //查询展会界数信息(展览策划外部接口)
    getsessionNumber: `${expUrl}/api/exp/exhibitions/current`
  }
};
