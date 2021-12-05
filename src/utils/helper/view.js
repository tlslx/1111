/**
 * 视图工具类
 * @author timely-rain
 * @since 1.0.0, 2019/1/20
 */

/**
 * 视图常量
 * @author timely-rain
 * @since 1.0.0, 2019/1/16
 */
const ViewStatus = {
  Add: 'add', // 新增
  Update: 'update', // 修改
  Read: 'read' // 查看
};

/**
 * 视图工具
 * @author timely-rain
 * @since 1.0.0, 2019/1/16
 */
const ViewUtils = {
  /**
   * 判断是否为新增状态
   * @param {String} status 页面状态
   * @returns {boolean} 是否为新增状态
   */
  isAdd: function(status) {
    return status === ViewStatus.Add;
  },
  /**
   * 判断是否为更新状态
   * @param {String} status 页面状态
   * @returns {boolean} 是否为新增状态
   */
  isUpdate: function(status) {
    return status === ViewStatus.Update;
  },
  /**
   * 判断是否编辑状态
   * @param {String} status 页面状态
   * @returns {boolean} 是否编辑状态
   */
  isEdit: function(status) {
    return status !== ViewStatus.Read;
  },
  /**
   * 判断是否编辑状态
   * @param {String} status 页面状态
   * @returns {boolean} 是否编辑状态
   */
  isRead: function(status) {
    return status === ViewStatus.Read;
  }
};

export { ViewStatus, ViewUtils };
