import { $req } from "../../../utils";
const BASER_URL = process.env.API_NA_URL;
export default {
  // 查看安排方案
  arrangement(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/foreignTradeDept/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司方案确定
  departmentProgram(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/foreignTradeDept/planAffirm/save', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看安排方案保存
  scheduleSaved(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/foreignTradeDept/adjustBrandNumberPlan/save', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司查看地区汇总表
  foreignDepart(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/foreignTradeDept/regionStatistics/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司查看展区汇总表
  ForeignEpartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/foreignTradeDept/exhibitionAreaStatistics/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布公示公告
  publicNotices(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/foreignTradeDept/publicity/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });    
  },
  // 公示post
  publicPotices(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/foreignTradeDept/publicity/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });    
  },
  // 公示保存  
  publicSave(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/foreignTradeDept/adjustBrandNumberPlan/save', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });    
  },
  // 公示上传
  publicUpload(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/file/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });    
  } 
};
