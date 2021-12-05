// 查询用户信息
export const accountInfo = require("./unifiedUsers/queryUser").default;
// 验证手机验证码
export const findPwdInfo = require("./unifiedUsers/queryCode").default;
// 角色信息
export const roleManagement = require("./diversification/roleManagement").default;
// 新增用户
export const addUserInfo = require("./diversification/addUser").default;
// 产品类别
export const getLastActivityCode = require("./diversification/productCategories").default;
// 展区管理
export const getExhibitionAreaManagementInfo = require("./diversification/exhibitionAreaManagement").default;
// 用户管理
export const getUserManagement = require("./diversification/userManagement").default;
