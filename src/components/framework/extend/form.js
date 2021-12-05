import http from '@/scripts/framework/http';
import { Form } from 'element-ui';
import Utility from '@/scripts/framework/utility';

Form.props.labelWidth = { type: String, default: '100px' };
Form.props.baseUrl = { type: String, default: '' };
Form.props.dataUrl = String;
Form.props.addUrl = String;
Form.props.updateUrl = String;
Form.props.beforeSubmit = Function;
Form.props.subData = {};

Form.methods.load = function (params) {
  return new Promise((resolve, reject) => {
    if (typeof this.dataUrl === 'undefined') {
      reject('Form未设置DataUrl属性');
      return;
    }
    let url = Utility.genServiceUrl(this.baseUrl, this.dataUrl);
    http.get(url, params).then((data) => {
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  });
};

Form.methods.submit = function (isEdit = false, submitType = "default") {
  return new Promise((resolve, reject) => {
    let url = '';
    if (isEdit) {
      url = this.updateUrl;
    } else {
      url = this.addUrl;
    }
    if (typeof url === 'undefined') {
      reject(isEdit ? 'Form未设置UpdateUrl属性' : 'Form未设置AddUrl属性');
      return;
    }
    // debugger
    if (Utility.isFunction(this.beforeSubmit) && this.beforeSubmit() === false) {
      reject('');
      return;
    }
    let subTables = [];
    let subtableNames = [];
    if (this.subData) {
      this.subData.forEach(item => {
        subtableNames.push(item.name);
        subTables.push(JSON.stringify(item.data));
      });
    }

    url = Utility.genServiceUrl(this.baseUrl, url);
    if (submitType === "default") {
      let requestData = JSON.parse(JSON.stringify(this.model));
      requestData.subTables = subTables;
      requestData.subTableNames = subtableNames;
      requestData.subTableLength = subtableNames.length;
      http.postJson(url,
        JSON.stringify(requestData))
      .then((data) => { 
        resolve(data);
      }).catch((error) => { 
        reject(error);
      });
    } else {
      http.post(url, {
        json: JSON.stringify({
          formData: JSON.stringify(this.model),
          subTables: subTables,
          subTableNames: subtableNames,
          subTableLength: subtableNames.length
        })
      }).then((data) => { 
        resolve(data);
      }).catch((error) => { 
        reject(error);
      });
    }
  });
};
export default Form;
