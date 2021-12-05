export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/buttomgraph/getAuditPage",
    getTree: kindo.config.api.expUrl + "/api/exp/fairground/getListAll",
    getbyid: kindo.config.api.expUrl + "/api/exp/buttomgraph/get",
    getapprove: kindo.config.api.expUrl + "/api/exp/buttomgraph/getApproveLog",
    start: kindo.config.api.expUrl + "/api/exp/workflow/startInstance",
    restart: kindo.config.api.expUrl + "/api/exp/approve/reStartApprove",
    redo: kindo.config.api.expUrl + "/api/exp/workflow/startInstance",
    submit: kindo.config.api.expUrl + "/api/exp/buttomgraph/auditButtomGraph",
    download: kindo.config.api.comsUrl + "/api/fs/downloads",
    viewpic: kindo.config.api.comsUrl + "/api/fs/view/"
  }
};
