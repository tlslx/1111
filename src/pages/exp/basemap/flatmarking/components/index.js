export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/schemegraphs/getAuditList",
    getall: kindo.config.api.expUrl + "/api/exp/exhibitions/getListAll",
    getinit: kindo.config.api.expUrl + "/api/exp/planargraphs/showInitExhibitionHall",
    getbyid: kindo.config.api.expUrl + "/api/exp/planargraphs/showExhibitionHall",
    getexpCode: kindo.config.api.expUrl + "/api/exp/fairground/getListPage",
    saveinfo: kindo.config.api.expUrl + "/api/exp/planargraphs/saveGraph"
  }
};
