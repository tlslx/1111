let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //位置安排审核查询接口
    // approveReviewGetList: `${host}/api/approveReview/getListPage`
    approveReviewGetList: `${host}/api/schema/getListReviewPage`
  }
};
