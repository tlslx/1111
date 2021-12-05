// 公共接口
export const common = require("./common/common").default;
// 字典
export const dictionary = require("./common/dictionary").default;
// 标摊展位施工图管理-展具管理
export const categoryManagement = require("./exhibitionStuffManagement/categoryManagement").default;
// 标摊展位施工图管理-展材管理
export const exhibitionToolManagement = require("./exhibitionManagement/exhibitionToolManagement").default;
// 标摊展位施工图管理-标准展位展具配置管理
export const sheme = require("./pipSheme/sheme").default;
// 标摊展位施工图管理-库存预警统计
export const stockAlert = require("./stockAlert/stockAlert").default;
// 标摊展位施工图管理-库存增减
export const stockFlu = require("./stockFlu/stockFlu").default;
// 标摊展位施工图管理-材料统计
export const materialStatistics = require("./materialStatistics/materialStatistics").default;
// 咨询投诉报障-提交工作单
export const submissionOrders = require("./submissionOrders/submissionOrders").default;
// 咨询投诉报障-回访客商及填写满意度
export const returnVisitorSatisfaction = require("./returnVisitorSatisfaction/returnVisitorSatisfaction").default;
// 工单模块-接单员
export const receiver = require("./receiver/receiver").default;
// 工单模块-工单设置
export const orderSetting = require("./orderSetting/orderSetting").default;
// 工单模块-工单指标
export const jobIndex = require("./jobIndex/jobIndex").default;
// 工单模块-工单作业、催单
export const OrdersReminders = require("./OrdersReminders/OrdersReminders").default;
// 咨询投诉报障-投诉报障主项目字典和投诉报障项目字典
export const dictionaryComplaintReportingMainItem = require("./dictionaryComplaintReportingMainItem/dictionaryComplaintReportingMainItem").default;

