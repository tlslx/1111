// 查询用户信息
export const accountInfoApi = require("./unifiedUsers/queryUser").default;
// 找回密码
export const findPwdApi = require("./unifiedUsers/queryCode").default;
// 角色信息
export const roleManagementApi = require("./diversification/roleManagement").default;
// 新增用户
export const addUserApi = require("./diversification/addUser").default;
// 产品大类
export const getLastActivityCodeInfoApi = require("./diversification/productCategories").default;
// 展区管理
export const getExhibitionAreaManagementApi = require("./diversification/exhibitionAreaManagement").default;
// 用户管理
export const getUserManagementApi = require("./diversification/userManagement").default;
