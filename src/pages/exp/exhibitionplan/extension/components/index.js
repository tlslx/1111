export default {
  api: {
    get: kindo.config.api.expUrl + "/api/exp/exhibitions/getList",
    getbyid: kindo.config.api.expUrl + "/api/exp/exhibitions/get",
    add: kindo.config.api.expUrl + "/api/exp/exhibitions/add",
    getall: kindo.config.api.expUrl + "/api/exp/exhibitions/getListAll",
    getinit: kindo.config.api.expUrl + "/api/exp/exhibitions/getInitExhibition",
    update: kindo.config.api.expUrl + "/api/exp/exhibitions/update",
    delete: kindo.config.api.expUrl + "/api/exp/exhibitions/delete",
    clone: kindo.config.api.expUrl + "/api/exp/exhibitions/clone",
    getnum: kindo.config.api.expUrl + "/api/exp/exhibitions/getExhibitionNum",
    getnow: kindo.config.api.expUrl + "/api/exp/exhibitions/current",
    current: kindo.config.api.expUrl + "/api/exp/exhibitions/setCurrent"
  }
};
