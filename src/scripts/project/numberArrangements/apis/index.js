// 公共-展位数量安排专用
export const nacommonApi = require("./common/nacommon").default;
// 公共展区等下拉菜单信息-展位数量安排专用
export const nainformationApi = require("./common/nainformation").default;

// number-arrangements
// 品牌展位数量安排管理-工作部品牌评审规则设置
export const brandWorkDepartmentApi = require("./numberArrangements/brandWorkDepartment").default;
// 品牌展位数量安排管理-交易团审核企业品牌申请
export const tradeGroupAuditApi = require("./numberArrangements/tradeGroupAudit").default;
// 品牌展位数量安排管理-商协会提交品牌展位数量安排方案
export const businessAssociationSubmissionApi = require("./numberArrangements/businessAssociationSubmission").default;
// 品牌展位数量安排管理-外贸司调整确定品牌展位方案/公示方案
export const adjustmentForeignTradeDivisionApi = require("./numberArrangements/adjustmentForeignTradeDivision").default;
// 品牌展位数量安排管理-工作部设置VIP企业服务范围
// export const setEnterServiceScopeApi = require("./numberArrangements/setEnterServiceScope").default;
// 品牌展位数量安排管理-交易团品牌评审打分推荐
export const brandEvaluationApi = require("./numberArrangements/brandEvaluation").default;
// 品牌展位数量安排管理-商协会评审交易团推荐的参评企业
export const checkRecommendCompanyApi = require("./numberArrangements/checkRecommendCompany").default;
// 品牌展位数量安排管理-企业展位申请管理
export const companyInfomationApi = require("./numberArrangements/companyInfomation").default;
// 品牌展位数量安排管理-展位数量进度计划安排设置
export const brandBoothApi = require("./numberArrangements/brandBooth").default;
//交易团审核已确认参展品牌企业基本资料
export const enquireUnderpaidApi = require("./numberArrangements/enquireUnderpaid").default;
//商协会提交品牌展位数量安排方案
export const numberArrangementApi = require("./numberArrangements/numberArrangement").default;
//外贸司公示意见汇总
export const departmentApi = require("./numberArrangements/department").default;
//企业确认品牌展位数
export const enterprisesConfirmApi = require("./numberArrangements/enterprisesConfirm").default;
// 外贸司查看并确认安排方案
export const foreignDepartmentApi = require("./numberArrangements/foreignDepartment").default;

// 品牌数量反馈意见
export const feedbackBrandApi = require("./numberArrangements/feedbackBrand").default;
// 品牌展位数量安排管理-外贸司公布品牌数量安排方案结果
export const numberBrandsApi = require("./numberArrangements/numberBrands").default;
// 品牌展位数量安排管理-工作部汇总退回展位并重新安排
export const workDepartReturnApi = require("./numberArrangements/workDepartReturn").default;
// 品牌展位数量安排管理-交易团审核企业退回展位
export const enterpriseReturnApplyApi = require("./numberArrangements/enterpriseReturnApply").default;


// 交易团一般性展位数量（含中央通道）安排管理
// 1.制定一般性展位基数核算方案
export const baseAccountingApi = require("./numberArrangementsInternational/baseAccounting").default;

// 5.交易团特定范围展位申请
export const specificAreaboothTradegroupApi = require("./numberArrangementsInternational/specificAreaboothTradegroup").default;
// 6.交易团发布并调整各类别展位数量
export const releaseAdjustApi = require("./numberArrangementsInternational/releaseAdjust").default;
// 7.工作部安排上届回收实际使用者得展位
export const actualUserCallApi = require("./numberArrangementsInternational/actualUserCall").default;
// 交易团提交一般性展位退回申请
export const generalApplicationApi = require("./numberArrangementsInternational/generalApplication").default;
// 基数不重核公布交易团一般性展位数量
export const numberGeneralBoothsApi = require("./numberArrangementsInternational/numberGeneralBooths").default;
// 8.工作部安排上届回收用于组展表彰的一般性展位
export const boothNumrangeApi = require("./numberArrangementsInternational/boothNumrange").default;

// 企业申请一般性展位数量安排

// 4.交易团提交一般性展位安排方案
export const subpanelGeneralArrangementApi = require("./businessExhibitsNum/subpanelGeneralArrangement").default;
// 6.铁石装饰品及户外水疗设施展位数量安排
export const ironworkNumberArrangementsApi = require("./businessExhibitsNum/ironworkNumberArrangements").default;
// 7..商协会查询各交易团一般性展位数量安排方案
export const businessAssociationSearchArrangementApi = require("./numberArrangementsInternational/businessAssociationSearchArrangement").default;
// 9.企业或交易团申请调整企业展位数量
export const companyDelegationApplyBoothNumberApi = require("./businessExhibitsNum/companyDelegationApplyBoothNumber").default;
// 10.商会审核企业一般性展位数量调整
export const checkCompanyNumberReviewsApi = require("./businessExhibitsNum/checkCompanyNumberReviews").default;
// 企业申请一般性展位数量安排(2交易团分团审核企业参展资格)
export const quantitativeArrangementApi = require("./numberArrangementsInternational/quantitativeArrangement").default;

// 新题材展位数量安排

// 1.企业申请新题材企业评审
export const newThemeCompanyApplyApi = require("./newThemeBoothNumArrangements/newThemeCompanyApply").default;
// 交易团审核推荐企业
export const newThemeCheckRecommendCompanyApi = require("./newThemeBoothNumArrangements/newThemeCheckRecommendCompany").default;
// 2.商协会推荐
export const newThemeRecommendCompanyApi = require("./newThemeBoothNumArrangements/newThemeRecommendCompany").default;
// 4.复核企业条件
export const newThemeWorkDepartCheckNumberApi = require("./newThemeBoothNumArrangements/newThemeWorkDepartCheckNumber").default;
// 新题材 5-8
export const thenewThemelApi = require("./newThemeBoothNumArrangements/thenewThemel").default;


//补录联营
export const supplementEnterpriseApi = require("./numberArrangementsInternational/supplementEnterprise").default;

//品牌展位常规安排
export const brandBoothArrangementApi = require("./numberArrangements/brandBoothArrangement").default;
