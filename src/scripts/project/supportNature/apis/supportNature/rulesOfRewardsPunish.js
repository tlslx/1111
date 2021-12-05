/**
 * @js 奖罚规则及行为管理
*/
import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  //依据届数，期数，展区，展位号来获取企业信息，奖惩的
  getMsgCompany(param) {
    return $req.get("http://10.40.143.225:9020" + "/api/seatArrange/getCompany?" + param);
  },
  // 导出奖惩规则管理列表
  rpRuleExport(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/rpRule/export' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/rpRule/export', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },
  // 导出常用文件管理列列表
  fileManageExport(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/fileManage/export' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/fileManage/export', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },
  // 导出处罚管理列表
  punishNotificatonExport(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/punishNotificaton/export' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/punishNotificaton/export', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },
  // 导出展位违规处理列表
  exhibitPositionOpinionExport(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/opinion/export' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/opinion/export', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },
  // 处罚通知管理模板下载
  punishNotificatonTemplateExport(params) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/file' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url);
    });
  },
  // 文件管理列表中的单行文件下载
  fileManageTableRow(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/fileManage' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
    });
  },
  // 获取事件类别
  selectDictByCodes() {
    let paramsL = {
      dictCodes: '',
      eventCode: '',
      type: ''
    };
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/efSupEventType/selectDictByCodes', paramsL).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
