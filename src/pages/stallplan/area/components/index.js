let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //位置安排查看操作
    getApproveDetails: `${host}/api/approve/getApproveDetails`,
    //位置安排开启流程提交
    startApprove: `${host}/api/approve/startApprove`,
    //位置安排审核流程提交
    submitApprove: `${host}/api/approve/submitApprove`,
    //位置安排已拒绝重新提交
    reStartApprove: `${host}/api/approve/reStartApprove`,
    //位置安排保存方法
    updateSchema: `${host}/api/approve/updateSchema`
  }
};
