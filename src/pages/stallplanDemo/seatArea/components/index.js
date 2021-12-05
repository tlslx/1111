let host = kindo.config.api.positionArrangeUrl;
let expUrl = kindo.config.api.expUrl;
const snUrl = kindo.config.api.snUrl;
const comsUrl = kindo.config.api.comsUrl;
export default {
  api: {
    //位置安排查看操作
    // getApproveDetails: `${host}/api/approve/getApproveDetails`,
    getApproveDetails: `${host}/api/schema/getApproveDetails`,
    //位置安排查审核查看详情
    getApproveReviewDetails: `${host}/api/schema/getApproveReviewDetails`,
    //位置安排开启流程提交
    // startApprove: `${host}/api/approve/startApprove`,
    startApprove: `${host}/api/schema/startApprove`,
    //位置安排审核流程提交
    // submitApprove: `${host}/api/approve/submitApprove`,
    submitApprove: `${host}/api/schema/submitApprove`,
    //位置安排已拒绝重新提交
    // reStartApprove: `${host}/api/approve/reStartApprove`,
    reStartApprove: `${host}/api/schema/reSumbmitApprove`,
    //位置安排保存方法
    // updateSchema: `${host}/api/approve/updateSchema`
    updateSchema: `${host}/api/schema/saveSchema`,
    //获取插件在线安排表格数据
    getOnlinePlanTable: `${host}/api/role/getCompanyList`,
    //插件方案保存接口
    updateSchemeData: `${host}/api/schemeData/updateSchemeData`,
    //查询位置安排表格记录
    getApprove: `${host}/api/schema/getListPage`,
    //查询方案对比接口
    getSchemeForCompare: `${host}/api/schemeData/getSchemeForCompare`,
    //对比方案查询详情
    getCompareSchemeData: `${host}/api/schemeData/getCompareSchemeData`,
    //对比导出接口
    exportCompareScheme: `${host}/api/schemeData/exportCompareScheme`,
    //获取已公布的方案明细接口
    getCheckData: `${host}/api/check/getCheckData`,
    //查询展会界数信息(展览策划外部接口)
    getsessionNumber: `${expUrl}/api/exp/exhibitions/current`,
    //根据展区查专区信息
    getSpecialArea: `${expUrl}/api/exp/exhibitionschemes/getSpecialArea`,
    //在线安排新接口（数量安排子系统地址）
    // getOnlineList: 'http://139.159.158.200:8000/api/speciaAreaExternal/applyInforForEnterpriseBooth/getListPage',
    //联调完成后将地址换成host
    getOnlineList: 'http://139.9.71.183:9003/api/speciaAreaExternal/applyInforForEnterpriseBooth/getListPage',
    //根据选择集合查询企业调整信息
    getAdjustEnterpriseList: `${host}/api/special/getAdjustEnterpriseList`,
    // 获取企业奖惩名单
    getBlackInfo: `${snUrl}/api/ot/rewardPunish/getBlackInfo`,
    //补丁方案新增查看详情
    reviewArrangementGetDetail: `${host}/api/patchschema/getApproveDetails`,
    //补丁方案审核查看详情
    reviewArrangementGetReviewDetail: `${host}/api/patchschema/getApproveReviewDetails`,
    //查看检查安排进度接口
    getArrangeSchedulePage: `${host}/api/check/getArrangeSchedulePage`,
    //根据展区查询展期信息(展览策划外部接口)
    getPeriods: `${expUrl}/api/exp/exhibitionschemes/getPeriods`,
    //根据展届查询展区信息(展览策划外部接口)
    getAuthAreas: `${expUrl}/api/exp/exhibitionschemes/getAuthAreas`,
    //根据展区查询展期信息(展览策划外部接口)
    getAuthPeriods: `${expUrl}/api/exp/exhibitionschemes/getAuthPeriods`,
    //根据展区展期信息查询布展类型信息(展览策划外部接口)
    getHallInfo: `${expUrl}/api/exp/exhibitionschemes/getHallInfo`,
    // 查询展厅数据(展览策划外部接口)
    getExpHalls: `${expUrl}/api/exp/booths/getExpHalls`,
    //根据展期展届中央通道展区编码查询绘制展厅的信息(展览策划外部接口)
    getExpBoothInfo: `${expUrl}/api/exp/booths/getExpBoothInfo`,
    // 企业重评模板下载
    downloadReappraisal: `${host}/api/special/getReevaluationFile`,
    // 企业重评文件上传
    uploadReappraisal: `${host}/api/special/downloadReevaluationFile`,
    // 企业重评文件下载
    downloadReappraisalFile: `${host}/api/attachment/query`,
    // 公共接口,文件下载
    downloadFile: `${comsUrl}/api/fs/download`,
    getIcon: `${comsUrl}/api/fs/get`
  }
};
