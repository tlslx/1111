export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/buttomgraph/getListPage",
    getbyid: kindo.config.api.expUrl + "/api/exp/buttomgraph/get",
    getaudit: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getListAllByType",
    getTree: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getHallTree",
    getapprove: kindo.config.api.expUrl + "/api/exp/buttomgraph/getApproveLog",
    // getcoms: kindo.config.api.comsUrl + "/api/sysRole/getListPage",
    getdept: kindo.config.api.baseUrl + "/api/sysDepartment/getListAll",
    start: kindo.config.api.expUrl + "/api/exp/buttomgraph/startButtomGraph",
    redo: kindo.config.api.expUrl + "/api/exp/buttomgraph/cancel",
    submit: kindo.config.api.expUrl + "/api/exp/buttomgraph/auditButtomGraph",
    consult: kindo.config.api.expUrl + "/api/exp/buttomgraph/consultation",
    updatebase: kindo.config.api.expUrl + "/api/exp/exphallprivilege/updateBaseGraph",
    download: kindo.config.api.comsUrl + "/api/fs/downloads",
    downone: kindo.config.api.comsUrl + "/api/fs/download/",
    viewpic: kindo.config.api.comsUrl + "/api/fs/view/"
  }
};
