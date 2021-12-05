let host = kindo.config.api.positionArrangeUrl;
let expUrl = kindo.config.api.expUrl;

export default {
  api: {
    //查询展会界数信息(展览策划外部接口)
    getsessionNumber: `${expUrl}/api/exp/exhibitions/current`,
    //公布图纸页面接口
    getPublishDrawList: `${host}/api/publishDraw/getPublishDrawList`,
    //查看详情接口
    getPublishDrawDetail: `${host}/api/publishDraw/getPublishDrawDetail`
  }
};
