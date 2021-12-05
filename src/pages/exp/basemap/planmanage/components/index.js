export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/schemegraphs/getListPage",
    getbyid: kindo.config.api.expUrl + "/api/exp/schemegraphs/get",
    getaudit: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getListAllByType",
    getTree: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getHallTree",
    getapprove: kindo.config.api.expUrl + "/api/exp/approve/getApproveDetails",
    // getcoms: kindo.config.api.comsUrl + "/api/sysRole/getListPage",
    getdept: kindo.config.api.baseUrl + "/api/sysDepartment/getListAll",
    start: kindo.config.api.expUrl + "/api/exp/schemegraphs/audit/submit",
    restart: kindo.config.api.expUrl + "/api/exp/schemegraphs/audit/submit",
    redo: kindo.config.api.expUrl + "/api/exp/schemegraphs/audit/cancel",
    submit: kindo.config.api.expUrl + "/api/exp/schemegraphs/audit/consultation",
    updatebase: kindo.config.api.expUrl + "/api/exp/exphallprivilege/updateSchemeGraph",
    download: kindo.config.api.comsUrl + "/api/fs/downloads",
    viewpic: kindo.config.api.comsUrl + "/api/fs/view/",
    getall: kindo.config.api.expUrl + "/api/exp/exhibitions/future",
    getnum: kindo.config.api.expUrl + "/api/exp/exhibitions/getPeriods",
    getselect: kindo.config.api.expUrl + "/api/exp/schemegraphs/select",
    publish: kindo.config.api.expUrl + "/api/exp/schemegraphs/publish",
    checkExisted: kindo.config.api.expUrl + "/api/exp/schemegraphs/checkExisted",
    getinit: kindo.config.api.expUrl + "/api/exp/booths/getExpBoothInfo",
    getIcon: kindo.config.api.comsUrl + "/api/fs/get"
  }
};
