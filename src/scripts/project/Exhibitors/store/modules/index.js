//进口展招展（招展代理）
export const agent = require("./agent/agent").default;
//信息科业务
export const informationBusiness = require("./informationBusiness").default;
//公共的接口获取
export const commonStore = require("./common/commonStore").default;
// 招展注册
export const regist = require("./regist/regist").default;
// 招展公司信息
export const companyInfo = require("./managingEnterpriseInformation/companyInfo").default;
// 发票
export const invoiceList = require("./invoice/invoiceList").default;
// 查看展位
export const exhibitionPosition = require("./exhibitionPosition/exhibitionPosition").default;
// 人证管理
export const certificateManage = require("./certificateManage/certificateManage").default;
// 登记展品
export const registeredExhibits = require("./registeredExhibits/registeredExhibits").default;
// 邀请参展商采购商
export const inviteCustom = require("./inviteCustom/inviteCustom").default;
// 发布展商动态
export const exhibitorsDynamic = require("./exhibitorsDynamic/exhibitorsDynamic").default;
// 审核企业重要信息
export const settingReview = require("./settingReview/settingReview").default;

//下载模块（不知道移哪去，先这样）
export const downLoadManage = require("./downloadManage/downloadManage").default;

// 4.申请展位
export const numberBooth = require("./numberBooth/numberBooth").default;
// 5.付款展位
export const payNotification = require("./payNotification/payNotification").default;
// 10.获取邀请函
export const invitationCard = require("./invitationCard/invitationCard").default;
// 12.箱号列表
export const boxNumberList = require("./boxNumberList/boxNumberList").default;
// 代理管理
export const agents = require("./agents/agent").default;
// 展商管理
export const modificaRnformat = require("./modificaRnformat/modificaRnformat").default;
// 12.展品管理
export const exhibitionManage = require("./exhibitionManage/exhibitionManage").default;
