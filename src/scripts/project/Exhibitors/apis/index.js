//进口展招展（招展代理）
export const agentApi = require("./agent").default;
//信息科业务
export const informationBusinessApi = require("./informationBusiness").default;
//公共的接口获取
export const commonApi = require("./common/commonApi").default;
// 招展注册
export const registApi = require("./regist/regist").default;
// 招展公司信息
export const companyInfoApi = require("./managingEnterpriseInformation/companyInfo").default;
// 发票
export const invoiceListApi = require("./invoice/invoiceList").default;
// 查看展位
export const exhibitionPositionApi = require("./exhibitionPosition/exhibitionPosition").default;
// 人证管理
export const certificateManageApi = require("./certificateManage/certificateManage").default;
// 登记展品
export const registeredExhibitsApi = require("./registeredExhibits/registeredExhibits").default;
// 邀请参展商采购商
export const inviteCustomApi = require("./inviteCustom/inviteCustom").default;
// 发布展商动态
export const exhibitorsDynamicApi = require("./exhibitorsDynamic/exhibitorsDynamic").default;
// 审核企业重要信息修改
export const settingReviewApi = require("./settingReview/settingReview").default;
// 代理管理
export const agentsApi = require("./agents/agent").default;
// 展商管理
export const modificaRnformatApi = require("./modificaRnformat/modificaRnformat").default;
//下载管理（后面不知道移到哪去）
export const downloadManageApi = require("./downloadManage/downloadManage").default;

// 4.申请展位
export const numberBoothApi = require("./numberBooth/numberBooth").default;
// 5.付款展位
export const payNotificationApi = require("./payNotification/payNotification").default;
// 10.获取邀请函
export const invitationCardApi = require("./invitationCard/invitationCard").default;
// 12.箱号列表
export const boxNumberListApi = require("./boxNumberList/boxNumberList").default;
// 12.展品管理
export const exhibitionManageApi = require("./exhibitionManage/exhibitionManage").default;
