// 公共
export const commonApi = require("./common/common").default;
// 文件
export const fileApi = require("./common/file").default;
// online-service
// 首页
export const onlineServiceHomePageApi = require("./homePage").default;
// VIP参展企业管理-生成首批VIP企业名单列表
export const generateVIPApi = require("./enterpriseManage/generateVIP").default;
// VIP参展企业管理-调整VIP企业名单
export const confirmEnterListApi = require("./enterpriseManage/confirmEnterList").default;
// VIP参展企业管理-工作部设置VIP企业服务范围
export const setEnterServiceScopeApi = require("./enterpriseManage/setEnterServiceScope").default;
// VIP参展企业管理-推荐VIP企业名单
export const recomVipEnterListApi = require("./enterpriseManage/recomVipEnterList").default;
// VIP参展企业管理-审核VIP企业名单
export const reviewVipEnterListApi = require("./enterpriseManage/reviewVipEnterList").default;
// VIP参展企业管理-VIP企业证件申请
export const vipEnterCertificateApi = require("./enterpriseManage/vipEnterCertificate").default;
// VIP参展企业管理-VIP企业推荐采购商
export const vipEnterManagementApi = require("./enterpriseManage/vipEnterManagement").default;

// 申请与公司用户关联
export const personalRegisterApi = require("./enterpriseApplyManage/personalRegister").default;
// 企业展位申请管理-企业用户注册
export const enterpriseRegisterApi = require("./enterpriseApplyManage/enterpriseRegister").default;
// 企业展位申请管理-公司资料管理
export const corpDataManagementApi = require("./enterpriseApplyManage/corpDataManagement").default;
// 企业展位申请管理-企业展品管理
export const enterExManagementApi = require("./enterpriseApplyManage/enterExManagement").default;
// 企业展位申请管理-联营企业管理
export const JointVentureManagementApi = require("./enterpriseApplyManage/JointVentureManagement").default;
// 企业展位数量
export const boothAdjustApplyApi = require("./enterpriseParticipationManage/boothAdjustApply").default;
// 企业网上服务与调研管理-企业邀请客户
export const enterprisesInviteCustomerApi = require("./enterpriseServiceResearchManage/enterprisesInviteCustomer").default;
// 企业申请联合布展业务
export const companyApplyUnionExhibitionApi = require("./enterpriseServiceResearchManage/companyApplyUnionExhibition").default;
// 企业展位申请管理-企业展位申请
export const companyInfomationApi = require("./enterpriseApplyManage/companyInfomation").default;
//企业申请联合布展业务
export const enterpriseServiceResearchManageApi = require("./enterpriseServiceResearchManage/consortConfList").default;
//展品情况查询
export const exhibitionStatusQueryApi = require("./enterpriseServiceResearchManage/exhibitionStatusQuery").default;
//展商动态
export const exhibitorDynamicInfoApi = require("./enterpriseServiceResearchManage/exhibitorDynamicInfo").default;
// 品牌展位申请列表-企业资质
export const aptitudedInfoApi = require("./enterpriseApplyManage/aptitudedInfo").default;
// 企业申请参展商证
export const enterApplyExhibitCertiApi = require("./enterpriseServiceResearchManage/enterApplyExhibitCerti").default;
// 企业申请车证
export const enterApplyDriverApi = require("./enterpriseServiceResearchManage/enterpriseApplyDriver").default;
