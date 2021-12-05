export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/getList",
    getbyid: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/get",
    getall: kindo.config.api.expUrl + "/api/exp/exhibitions/getListAll",
    add: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/add",
    update: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/update",
    delete: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/delete",
    clone: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/clone",
    getnum: kindo.config.api.expUrl + "/api/exp/exhibitions/getPeriods"
  }
};
