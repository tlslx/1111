import request from '@/scripts/framework/http';
let host = kindo.config.api.positionArrangeUrl;

/**
 * 获取授权企业
 * @param {Object} params 查询参数
 * @returns {String} 请求地址
 */
export function getAuthorizedEnterprise() {
  return `${host}/api/paStandardToSpecial/getListPage`;
}

/**
 * 移除授权企业
 * @param {Array} ids ID数组
 * @returns {Promise} promise
 */
export function removeAuthorizedEnterprise(ids) {
  return request.postJson(`${host}/api/paStandardToSpecial/deleteAuthorizedEnterpriseBatchIds`, ids);
}

/**
 * 获取未授权企业
 * @param {Object} params 查询参数
 * @returns {String} 请求地址
 */
export function getUnauthorizedEnterprise() {
  return `${host}/api/paStandardToSpecial/getUnauthorizedEnterprisePage`;
}

/**
 * 批量授权企业
 * @param {Array} ids ID数组
 * @returns {Promise} promise
 */
export function warrantEnterprise(ids) {
  return request.postJson(`${host}/api/paStandardToSpecial/addAuthorizedEnterpriseBatchIds`, ids);
}

/**
 * 获取规则提示
 * @returns {Promise} promise
 */
export function getRulePrompt() {
  return request.get(`${host}/api/paLocationSetting/getRulePrompt`);
}

/**
 * 修改规则提示
 * @param {Object} data 规则内容
 * @returns {Promise} promise
 */
export function editRulePrompt(data) {
  return request.postJson(`${host}/api/paLocationSetting/updateRulePrompt`, JSON.stringify(data));
}

/**
 * 获取预安排企业
 * @param {Object} params 查询参数
 * @returns {String} 请求地址
 */
export function getPreArrangedEnterprise() {
  return `${host}/api/paPreArrangedEnterprises/getListPage`;
}

/**
 * 获取未安排企业
 * @param {Object} params 查询参数
 * @returns {String} 请求地址
 */
export function getUnPreArrangedEnterprise() {
  return `${host}/api/paPreArrangedEnterprises/getUnArrangeEnterprisePage`;
}

/**
 * 预安排企业
 * @param {Number} id ID
 * @returns {Promise} promise
 */
export function addArrangeEnterprise(id) {
  return request.postJson(`${host}/api/paPreArrangedEnterprises/addArrangeEnterpriseBatchIds`, [id]);
}

/**
 * 移除预安排企业
 * @param {Object} ids 对象集合
 * @returns {Promise} promise
 */
export function removePreArrangedEnterprise(ids) {
  return request.postJson(`${host}/api/paPreArrangedEnterprises/deleteArrangeEnterpriseBatchIds`, [ids]);
}

/**
 * 下载Excel模板
 * @returns {String} 下载链接
 */
export function download() {
  return `${host}/api/arrangementSchemeExcel/exportSchemeExcel`;
}

/**
 * 导入
 * @returns {String} 导入api
 */
export function leadUrl() {
  return `${host}/api/arrangementSchemeExcel/importSchemeExcel`;
}

/**
 * 位置安排列表（已废除）
 * @param {Object} params 查询参数
 * @returns {Promise} promise
 */
export function getSeats(params) {
  return request.get(`${host}/api/paArrScheme/getListPage`, params);
}

/**
 *  位置安排列表
 * @param {Object} params
 * @returns {String} 请求地址
 */
export function getApprove() {
  return `${host}/api/approve/getListPage`;
}

/**
 *  位置安排撤销操作
 * @param {Object} id id单条记录id值
 * @returns {Promise} promise
 */
export function cancelSchema(id) {
  return request.postJson(`${host}/api/approve/cancelSchema`, id);
}

/**
 * 位置安排查看操作
 * @param {Object} params 查询参数
 * @returns {Promise} promise
 */
export function getApproveDetails(params) {
  return request.get(`${host}/api/approve/getApproveDetails`, params);
}

/**
 *  位置安排开启流程提交
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function startApprove(data) {
  return request.postJson(`${host}/api/approve/startApprove`, data);
}

/**
 *  位置安排审核流程提交
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function submitApprove(data) {
  return request.postJson(`${host}/api/approve/submitApprove`, data);
}

/**
 *  位置安排已拒绝重新提交
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function reStartApprove(data) {
  return request.postJson(`${host}/api/approve/reStartApprove`, data);
}

/**
 * 位置安排批量下载PDF接口
 * @param {Object} ids 需要下载的id值或者id数组
 * @returns {Promise} promise
 */
export function downloadPDF(ids) {
  return `${host}/api/paPublish/getPdfBatchByZip?${ids}`;
}

/**
 * 位置安排方案公示接口
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function updatePublicityStatus(data) {
  return request.postJson(`${host}/api/paPublish/updatePublicityStatus`, data);
}

/**
 * 位置安排方案公布接口
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function updatePublishStatus(data) {
  return request.postJson(`${host}/api/paPublish/updatePublishStatus`, data);
}

/**
 * 位置安排保存方法
 * @param {Object} data 提交参数
 * @returns {Promise} promise
 */
export function updateSchema(data) {
  return request.postJson(`${host}/api/approve/updateSchema`, data);
}

/**
 * 规则设置导入抽签结果表格查询
 * @param {Object} params 查询参数
 * @returns {String} 请求地址
 */
export function getDrawResultListPage() {
  return `${host}/api/paDrawingResults/getDrawResultListPage`;
}

/**
 * 规则设置导入抽签结果导入excel文件
 * @param {Object} params 查询参数
 * @returns {Promise} promise
 */
export function importDrawResultExcel() {
  return `${host}/api/paDrawingResults/importDrawResultExcel`;
}

/**
 * 规则设置导入抽签结果批量删除
 * @param {Object} ids 删除参数
 * @returns {Promise} promise
 */
export function deleteDrawResultBatchById(ids) {
  return request.get(`${host}/api/paDrawingResults/deleteDrawResultBatchById`, ids);
}
