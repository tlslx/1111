// 公共接口
export const common = require("./common/common").default;
// 文件
export const file = require("./common/file").default;
// 字典
export const dictionary = require("./common/dictionary").default;
export const typeData = require("./common/typeData").default;
export const countriesRegions = require("./common/countriesRegions").default;
// online-service
// 首页
export const onlineServiceHomePage = require("./homePage").default;
// VIP参展企业管理-生成首批VIP企业名单列表
export const generateVIP = require("./enterpriseManage/generateVIP").default;
// VIP参展企业管理-工作部确认VIP企业名单
export const confirmEnterList = require("./enterpriseManage/confirmEnterList").default;
// VIP参展企业管理-设置VIP企业服务范围
export const setEnterServiceScope = require("./enterpriseManage/setEnterServiceScope").default;
// VIP参展企业管理-推荐VIP企业名单
export const recomVipEnterList = require("./enterpriseManage/recomVipEnterList").default;
// VIP参展企业管理-审核VIP企业名单
export const reviewVipEnterList = require("./enterpriseManage/reviewVipEnterList").default;
// VIP企业证件申请
export const vipEnterCertificate = require("./enterpriseManage/vipEnterCertificate").default;
// VIP参展企业管理-VIP企业推荐采购商
export const vipEnterManagement = require("./enterpriseManage/vipEnterManagement").default;

// 企业展位申请管理-企业用户注册
export const enterpriseRegister = require("./enterpriseApplyManage/enterpriseRegister").default;
// 申请与公司用户关联
export const personalRegister = require("./enterpriseApplyManage/personalRegister").default;
// 企业展位申请管理-公司资料管理
export const corpDataManagement = require("./enterpriseApplyManage/corpDataManagement").default;
// 企业展位申请管理-企业展品管理
export const enterExManagement = require("./enterpriseApplyManage/enterExManagement").default;
// 企业展位申请管理-联营企业管理
export const JointVentureManagement = require("./enterpriseApplyManage/JointVentureManagement").default;
// 企业展位数量调整
export const boothAdjustApply = require("./enterpriseParticipationManage/boothAdjustApply").default;
// 企业网上服务与调研管理-企业邀请客户
export const enterprisesInviteCustomers = require("./enterpriseServiceResearchManage/enterprisesInviteCustomers").default;
//企业申请联合布展业务
export const companyApplyUnionExhibition = require("./enterpriseServiceResearchManage/companyApplyUnionExhibition").default;
// 企业展位申请管理-企业展位申请
export const companyInfomation = require("./enterpriseApplyManage/companyInfomation").default;
//企业申请联合布展业务
export const enterpriseServiceResearchManage = require("./enterpriseServiceResearchManage/consortConfList").default;
//展品情况查询
export const exhibitionStatusQuery = require("./enterpriseServiceResearchManage/exhibitionStatusQuery").default;
//展商动态
export const exhibitorDynamicInfo = require("./enterpriseServiceResearchManage/exhibitorDynamicInfo").default;
// 品牌展位申请列表--企业资质
export const aptitudedInfo = require("./enterpriseApplyManage/aptitudedInfo").default;
// 企业申请参展商证
export const enterApplyExhibitCertiInfo = require("./enterpriseServiceResearchManage/enterApplyExhibitCerti").default;
// 企业申请车证
export const enterApplyCardInfo = require("./enterpriseServiceResearchManage/enterpriseApplyDriver").default;

