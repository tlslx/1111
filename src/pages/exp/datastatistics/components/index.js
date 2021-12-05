export default {
  api: {
    get: kindo.config.api.reportUrl + "/api/exp/report/query",
    export: kindo.config.api.reportUrl + "/api/exp/report/export",
    getdict: kindo.config.api.reportUrl + "/api/exp/report/queryDic",
    getdepart: kindo.config.api.comsUrl + "/api/sysDepartment/getListAll",
    getall: kindo.config.api.expUrl + "/api/exp/exhibitions/getListAll",
    getcategory: kindo.config.api.reportUrl + "/api/exp/report/queryProductCategory",
    getproMenu: kindo.config.api.osUrl + "/efOS/efOsExhibitCategory/getExhibitCategoryMap",
    getimportMenu: kindo.config.api.reportUrl + "/api/exp/report/queryExpRegionData",
    getnation: kindo.config.api.reportUrl + "/api/exp/report/queryNationaRegionData",
    getrecruiment: kindo.config.api.reportUrl + "/api/exp/report/queryRecruimentData"
  }
};
