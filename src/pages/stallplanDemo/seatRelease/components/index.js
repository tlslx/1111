let host = kindo.config.api.positionArrangeUrl;

export default {
  api: {
    //位置安排方案公示接口
    updatePublicityStatus: `${host}/api/paPublish/updatePublicityStatus`,
    //位置安排方案公布接口
    updatePublishStatus: `${host}/api/paPublish/updatePublishStatus`,
    //位置安排下载PDF文件
    downloadPDF: `${host}/api/paPublish/getPdfBatchByZip`,
    //位置安排方案公示公布接口
    setRelease: `${host}/api/paPublish/getPublishPage`,
    //位置安排方案公示公布接口
    patchRelease: `${host}/api/paPublish/getPatchPublishPage`
  }
};
