export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/schemegraphs/getAuditList",
    getbyid: kindo.config.api.expUrl + "/api/exp/schemegraphs/get",
    submit: kindo.config.api.expUrl + "/api/exp/schemegraphs/audit/process",
    download: kindo.config.api.comsUrl + "/api/fs/downloads",
    viewpic: kindo.config.api.comsUrl + "/api/fs/view/"
  }
};
