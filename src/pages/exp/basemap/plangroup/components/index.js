export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/schemeGroup/getList",
    getbyid: kindo.config.api.expUrl + "/api/exp/schemeGroup/getResultDetail",
    add: kindo.config.api.expUrl + "/api/exp/schemeGroup/add",
    gethall: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getAllHallTree",
    update: kindo.config.api.expUrl + "/api/exp/exhibitions/update",
    delete: kindo.config.api.expUrl + "/api/exp/schemeGroup/delete",
    clone: kindo.config.api.expUrl + "/api/exp/exhibitions/clone",
    getnum: kindo.config.api.expUrl + "/api/exp/exhibitions/getExhibitionNum",
    download: kindo.config.api.expUrl + "/api/exp/files/get"
  }
};
