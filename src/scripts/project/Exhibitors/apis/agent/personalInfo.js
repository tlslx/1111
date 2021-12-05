import http from '@/scripts/framework/http';

const BASE_API = process.env.API_POT_URL;

// 获取招展代理基本信息
export const getBaseInfo = () => http.get(`${BASE_API}/api/ifoExhibitionAgent/getBaseInfo`);

// 招展代理管理自身信息（修改）
export const updateBaseInfo = (params) => http.postJson(`${BASE_API}/api/ifoExhibitionAgent/updateBaseInfo`, params);

// 查看招展代理联系人列表
export const getAgentContacts = (params) => http.get(`${BASE_API}/api/ifoExhibitionAgent/getAgentContacts`, params);

// 删除代理联系人
export const deleteContact = (params) => http.postJson(`${BASE_API}/api/ifoExhibitionAgent/deleteContact`, params);

// 新增代理联系人
export const addAgentContacts = (params) => http.postJson(`${BASE_API}/api/ifoExhibitionAgent/addContact`, params);

// 修改代理联系人
export const updateContact = (params) => http.postJson(`${BASE_API}/api/ifoExhibitionAgent/updateContact`, params);

// 获取企业性质
export const getOrgTypeArray = () => http.get(`${BASE_API}/api/dataDictItem/findDicItemListByIfoOrgNature`);

export default {
  getBaseInfo,
  updateBaseInfo,
  getAgentContacts,
  deleteContact,
  addAgentContacts,
  updateContact,
  getOrgTypeArray
};

