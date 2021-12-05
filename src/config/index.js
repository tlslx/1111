/*
 * update by zhangwenqi
 * -------------------------------------------------
 * 项目初始化配置
 * 依赖于 config - 系统配置
 * 依赖于 constant - 系统常量
 */
// 配置
const config = {
  api: {
    baseUrl: process.env.API_BASE_URL, // 基础Api
    expUrl: process.env.API_EXP_URL, // 展览策划Api
    upms: process.env.API_DICT_URL, // 数据字典Api
    ssourl: process.env.SSO_BASE_URL, // 单点登录Api
    unifiedCollectUrl: process.env.API_UCP_URL, // 统一收款Api
    unifiedCollectPaymentUrl: process.env.API_UCP_PAY_URL, // 统一收款Api
    importExbUrl: process.env.API_IMPORTEXB_URL, //进口展招商Api
    positionArrangeUrl: process.env.API_NA_URL, //位置安排Api
    comsUrl: process.env.API_COMS_URL, // 公开服务Api
    workflowUrl: process.env.WORKFLOW_URL, // 工作流REST接口根路径
    activitiUrl: process.env.ACTIVITI_URL, // 流程编辑器页面访问
    reportUrl: process.env.API_REPORT_URL, // 展览策划Api
    snUrl: process.env.API_SN_URL, // 支撑性平台
    testUrl: process.env.API_TEST_URL, // 测试用
    authUrl: process.env.API_AUTH_URL, // 测试用
    osUrl: process.env.API_OS_URL // 网上服务
  }
};

// 常量
const constant = {
  // 用户token
  USER_TOKEN: 'USER_TOKEN',

  // 角色ID
  USER_ROLE: 'USER_ROLE',

  // 用户信息
  USER_INFO: 'USER_INFO',

  // 用户权限菜单列表
  USER_MENU: 'USER_MENU',

  // 用户权限菜单树
  USER_MENUTREE: 'USER_MENUTREE',

  // 用户按钮权限
  USER_BUTTON: 'USER_BUTTON',

  // 配置是否查看了更新日志
  CHANGE_LOG: 'CHANGE_LOG',

  // 主题样式
  THEME: 'THEME',

  // EL主题样式
  EL_THEME: 'EL_THEME'
};
// 声明全局变量, 核心变量
global.kindo = global.kindo || {};

kindo.config = config;
kindo.constant = constant;

export { constant, config };
