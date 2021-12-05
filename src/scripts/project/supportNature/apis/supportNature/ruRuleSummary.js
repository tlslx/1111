// import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 获取 奖罚信息汇总管理 下载
  downloadListjf(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/rpRecord/downloadList' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/rpRecord/downloadList', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  }
};
