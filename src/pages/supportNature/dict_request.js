/**
 * @overview 获取字典的相关代码
 * @author ycliuj
 * @version 1.0.0
 *
 * @example
 *  import { getJYT } from './dict_request';
 */

import http from '@/scripts/framework/http';

//获取外贸中心
export const getFTC = () => {
  return http.get(process.env.API_SN_URL + '/api/sysDepartment/getForeignTradeCenter', '').then(res => {
    const data = [].concat(res);
    let dictMap = {};
    // eslint-disable-next-line no-return-assign
    data.forEach(item => dictMap[item.deptId] = item.deptName);
    return dictMap;
  });
};
//获取交易团
export const getJYT = () => {
  let param = {
    current: 1,
    size: 1000
  };
  return http.get(process.env.API_SN_URL + '/api/sysDepartment/searchBusinessDelegation', param).then(data => {
    let dictMap = {};
    // eslint-disable-next-line no-return-assign
    data.records.forEach(item => dictMap[item.deptId] = item.deptName);
    return dictMap;
  });
};
//获取商协会
export const getSXH = () => {
  let param = {
    current: 1,
    size: 1000
  };
  return http.get(process.env.API_SN_URL + "/api/sysDepartment/searchBusinessAssociation", param).then(data => {
    // console.log(data);
    let dictMap = {};
    // eslint-disable-next-line no-return-assign
    data.records.forEach(item => dictMap[item.deptId] = item.deptName);
    return dictMap;
  });
};
//获取外贸司
export const getWMS = () => {
  return http.get(process.env.API_SN_URL + '/api/sysDepartment/getForeignTradeDivision', '').then(res => {
    const data = [].concat(res);
    let dictMap = {};
    // eslint-disable-next-line no-return-assign
    data.forEach(item => dictMap[item.deptId] = item.deptName);
    return dictMap;
  });
};
//获取公司
export const getCCl = (param) => {
  return http.get(process.env.API_OS_URL + "/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo", param).then(res => {
    return res;
  });
};

//获取展区字典
export const getExhibitionAreaDict = () => {
  return http.get(process.env.API_SN_URL + '/api/sysDataDictItem/findDicItemListByExhibitionArea').then(data => {
    let dict = {};
    data.records.forEach(item => {
      dict[item.itemCode] = item.itemText;
    });
    return dict;
  });
};

//获取展区数据
export const getExhibitionArea = exhibitionNum => {
  let params = {
    exhibitionNum
  };
  return http.get(process.env.API_SN_URL + '/api/exp/exhibitionschemes/getAreas', params).then(data => {
    let dict = {};
    // eslint-disable-next-line no-return-assign
    data.forEach(item => dict[item.exhibitionAreaCode] = item.exhibitionAreaText);
    return dict;
  });
};

// 查询展区字典
export const queryExhAreaTag = (currentPage, pageSize) => {
  return http.get(process.env.API_SN_URL + '/api/progress/tag/queryExhAreaTag?current=' + currentPage + '&size=' + pageSize);
};
