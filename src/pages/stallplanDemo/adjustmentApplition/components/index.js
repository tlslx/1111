let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //展位调整申请分页查询
    // getEnApplyStatus: `${host}/api/enApply/getListPage`,
    // getEnApplyStatus: `${host}/api/applying/getListPage`,
    getEnApplyStatus: `${host}/api/special/getApplyListPages`,
    //审核状态下拉框请求
    getApplyStatus: `${host}/api/paApply/getApplyStatus`,
    //展位调整申请撤回
    // cancelApply: `${host}/api/enApply/cancelApply`,
    cancelApply: `${host}/api/applying/cancelApply`,
    //展位调整申请删除
    // deleteApply: `${host}/api/enApply/deleteApply`,
    deleteApply: `${host}/api/applying/deleteApply`,
    //图片下载地址
    dowloadURL: `${host}/api/attachment/getFileByBatch`,
    //查询文件名接口
    getFileNameByIds: `${host}/api/attachment/getFileNameByIds`,
    //批量删除接口
    deleteApplyByIds: `${host}/api/applying/deleteApplyByIds`
  }
};
