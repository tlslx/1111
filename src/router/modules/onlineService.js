export default [
  {
    name: '首页',
    path: '/onlineServiceHomePage',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/pages/onlineService/homePage'], resolve)
  },
  {
    name: 'VIP参展企业管理',
    path: 'VIPEnterpriseManage',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: '生成首批VIP企业名单列表',
        path: '/VIPEnterpriseManage',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '设置VIP企业筛选条件', path: '/generateVIP', component: resolve => require(['@/pages/onlineService/enterpriseManage/generateVIP'], resolve) },
          { name: '首批VIP企业名单', path: '/VIPEnterpriseList', component: resolve => require(['@/pages/onlineService/enterpriseManage/VIPEnterpriseList'], resolve) }
        ]
      },
      {
        name: '商协会推荐VIP企业名单',
        path: 'associaRecomVipEnterList',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '商协会推荐VIP企业名单', path: '/associaRecomVipEnterList', component: resolve => require(['@/pages/onlineService/enterpriseManage/associaRecomVipEnterList'], resolve) }
        ]
      },
      {
        name: '交易团推荐VIP企业名单',
        path: 'internaRecomVipEnterList',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '交易团推荐VIP企业名单', path: '/internaRecomVipEnterList', component: resolve => require(['@/pages/onlineService/enterpriseManage/internaRecomVipEnterList'], resolve) },
          { name: '查看VIP企业名单', path: '/internaReviewNoPassVipEnters', component: resolve => require(['@/pages/onlineService/enterpriseManage/internaReviewNoPassVipEnters'], resolve) }
        ]
      },
      {
        name: '商协会审核VIP企业名单',
        path: 'associaReviewVipEnterList',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '商协会审核VIP企业名单', path: '/associaReviewVipEnterList', component: resolve => require(['@/pages/onlineService/enterpriseManage/associaReviewVipEnterList'], resolve) },
          { hidden: true, name: '商协会审核VIP企业原因', path: '/associaReviewVipEnterListReason', component: resolve => require(['@/pages/onlineService/enterpriseManage/associaReviewVipEnterListReason'], resolve) }
        ]
      },
      {
        name: '工作部确认VIP企业名单',
        path: 'confirmVIPList',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '工作部确认VIP企业名单', path: '/confirmVIPList', component: resolve => require(['@/pages/onlineService/enterpriseManage/confirmVipEnterprise'], resolve) }
        ]
      },
      {
        name: "工作部设置VIP企业服务范围",
        path: "setVIPServiceScope",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "工作部设置VIP企业服务范围", path: '/setVIPServiceScope', component: resolve => require(['@/pages/onlineService/enterpriseManage/setEnterServiceScope'], resolve) },
          { name: "工作部设置VIP企业证件指标", path: '/setEnterCertifiIndicate', component: resolve => require(['@/pages/onlineService/enterpriseManage/setEnterCertificateIndicators'], resolve) },
          { name: "VIP企业最终审核状态", path: '/recomendStatusOfEnter', component: resolve => require(['@/pages/onlineService/enterpriseManage/recomendStatusOfEnter'], resolve) }
        ]
      },
      {
        name: "VIP企业证件申请",
        path: "vipEnterApplyCertificate",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "激活VIP企业", path: '/activeVipEnter', component: resolve => require(['@/pages/onlineService/enterpriseManage/activeVipEnter'], resolve) },
          { name: "VIP企业申请证件(筹展证)", path: '/applyDocumentsOutlaws', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsOutlaws'], resolve) },
          { name: "VIP企业申请证件(接待证)", path: '/applyDocumentsReception', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsReception'], resolve) },
          { name: "VIP企业申请证件(撤展证)", path: '/applyDocumentsMoveIn', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsMoveIn'], resolve) },
          { name: "VIP企业申请证件(内停车证)", path: '/applyDocumentsParking', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsParking'], resolve) },
          { name: "审核VIP证件申请(筹展证)", path: '/checkDocumentsApplyOutlaws', component: resolve => require(['@/pages/onlineService/enterpriseManage/checkDocumentsApplyOutlaws'], resolve) },
          { name: "审核VIP证件申请(撤展证)", path: '/checkDocumentsApplyMoveIn', component: resolve => require(['@/pages/onlineService/enterpriseManage/checkDocumentsApplyMoveIn'], resolve) },
          { name: "审核VIP证件申请(接待证)", path: '/checkDocumentsApplyReception', component: resolve => require(['@/pages/onlineService/enterpriseManage/checkDocumentsApplyReception'], resolve) },
          { name: "审核VIP证件申请(内停车证)", path: '/checkDocumentsApplyParking', component: resolve => require(['@/pages/onlineService/enterpriseManage/checkDocumentsApplyParking'], resolve) },
          { name: "VIP企业查看审核结果(筹展证)", path: '/vipCheckReviewResultsOutlaws', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipCheckReviewResultsOutlaws'], resolve) },
          { name: "VIP企业查看审核结果(撤展证)", path: '/vipCheckReviewResultsMoveIn', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipCheckReviewResultsMoveIn'], resolve) },
          { name: "VIP企业查看审核结果(接待证)", path: '/vipCheckReviewResultsReception', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipCheckReviewResultsReception'], resolve) },
          { name: "VIP企业查看审核结果(内停车证)", path: '/vipCheckReviewResultsParking', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipCheckReviewResultsParking'], resolve) },
          { name: "企业申请证件列表(筹展证)", path: '/applyDocumentsListOutlaws', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsListOutlaws'], resolve) },
          { name: "企业申请证件列表(撤展证)", path: '/applyDocumentsListMoveIn', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsListMoveIn'], resolve) },
          { name: "企业申请证件列表(接待证)", path: '/applyDocumentsListReception', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsListReception'], resolve) },
          { name: "企业申请证件列表(内停车证)", path: '/applyDocumentsListParking', component: resolve => require(['@/pages/onlineService/enterpriseManage/applyDocumentsListParking'], resolve) }
        ]
      },
      {
        name: "VIP企业申请会议室",
        path: "vipEnterApplyRoom",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "VIP企业查看会议室申请处理状态", path: '/vipCheckApplyDeal', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipCheckApplyDeal'], resolve) },
          { name: "VIP企业申请会议室", path: '/vipApplyRoom', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipApplyRoom'], resolve) }
        ]
      },
      {
        name: "VIP企业推荐采购商",
        path: "vipEnterManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "VIP企业提供采购商汇总信息", path: '/vipEnterRecoSumInfo', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipEnterRecoSumInfo'], resolve) },
          { hidden: true, name: "VIP企业推荐采购商", path: '/recommendBuyers', component: resolve => require(['@/pages/onlineService/enterpriseManage/recommendBuyers'], resolve) }
          // { name: "工作部查看汇总信息", path: '/checkSummaryInfo', component: resolve => require(['@/pages/onlineService/enterpriseManage/checkSummaryInfo'], resolve) }
        ]
      },
      {
        name: "VIP企业参加活动论坛",
        path: "vipActiveBBS",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "活动论坛列表", path: '/activeList', component: resolve => require(['@/pages/onlineService/enterpriseManage/activeList'], resolve) },
          { name: "申请参加活动论坛", path: '/activeApply', component: resolve => require(['@/pages/onlineService/enterpriseManage/activeApply'], resolve) },
          { name: "活动论坛信息列表", path: '/activeInfoList', component: resolve => require(['@/pages/onlineService/enterpriseManage/activeInfoList'], resolve) }
        ]
      },
      {
        name: "VIP企业反馈调查问卷",
        path: "vipEnterFeedQuestionnaire",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "站内信", path: '/vipEnterFeedQuestionnaire', component: resolve => require(['@/pages/onlineService/enterpriseManage/vipEnterFeedQuestionnaire'], resolve) }
        ]
      },
      {
        name: "工作部管理VIP企业",
        path: "manageVipEnter",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "工作部管理VIP企业", path: '/internaManageVipEnter', component: resolve => require(['@/pages/onlineService/enterpriseManage/internaManageVipEnter'], resolve) },
          { name: "工作部管理VIP企业统计报表", path: '/internaManageVipEnterTable', component: resolve => require(['@/pages/onlineService/enterpriseManage/internaManageVipEnterTable'], resolve) }
        ]
      }
    ]
  },
  {
    name: '企业展位申请管理',
    path: 'enterpriseApplyManage',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "个人用户",
        path: "personalRegister",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
        //  { name: "个人用户的详细资料", path: '/personalUserDetData', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/personalUserDetData'], resolve) },
        { name: "个人用户注册", path: '/applyAssWithCompanyUser', component: resolve => require(['@/components/project/onlineService/user/applyAssWithCompanyUser'], resolve) },
        // { hidden: true, name: "个人用户注册", path: '/applyAssWithCompanyUser', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/applyAssWithCompanyUser'], resolve) },
        { name: "关联公司用户", path: '/applyAssociatedCompanyUser', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/applyAssociatedCompanyUser'], resolve) }
        ]
      },
      {
        name: "企业用户",
        path: "enterpriseRegister",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
         { hidden: true, name: "用户注册（选择企业）", path: '/userRegisterEnterprise', component: resolve => require(['@/components/project/onlineService/user/userRegisterEnterprise'], resolve) },
         { hidden: true, name: "公司用户添加子账户列表", path: '/companyUsersAddSubaccounts', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/companyUsersAddSubaccounts'], resolve) },
         { hidden: true, name: "公司用户添加子账户", path: '/comUserAddSubaccount', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/comUserAddSubaccount'], resolve) },
         { hidden: true, name: "个人用户申请关联列表", path: '/individualApplyAssociatedList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/individualApplyAssociatedList'], resolve) },
         { name: "企业关联用户", path: '/checkAssociatedCompanyUser', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkAssociatedCompanyUser'], resolve) }
        ]
      },
      {
        name: "公司资料管理",
        path: "corporateDataManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "公司资料管理", path: '/basEntInf', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/basEntInf'], resolve) },
          { name: "审核公司资料", path: '/audComInf', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/audComInf'], resolve) },
          { name: "交易团审核公司重要资料", path: '/enterAudComInfList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/enterAudComInfList'], resolve) },
          { name: "工作部审核公司重要资料", path: '/workAudComInfList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/workAudComInfList'], resolve) },
          // { name: "审核公司资料明细", path: '/audComDet', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/audComDet'], resolve) },
          { hidden: true, name: "企业重要信息修改", path: '/entImpInfMod', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/entImpInfMod'], resolve) },
          { hidden: true, name: "审核公司资料详细", path: '/audComAll', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/audComAll'], resolve) },
          { hidden: true, name: "企业品牌登记", path: '/registeEnterBrands', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/registeEnterBrands'], resolve) }
        ]
      },
      {
        name: "企业展品管理",
        path: "enterExManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
         { name: "产品资料", path: '/enterExManagement', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/enterExManagement'], resolve) },
         { name: "企业产品", path: '/auditEnterProducts', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditEnterProducts'], resolve) },
         { hidden: true, name: "审核意见", path: '/auditOpinion', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditOpinion'], resolve) },
         { hidden: true, name: "新增产品", path: '/addProduction', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/addition'], resolve) },
         { hidden: true, name: "安全管理通知", path: '/safeManageNotice', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/safeManageNotice'], resolve) },
         { hidden: true, name: "报备登记表", path: '/registForm', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/registForm'], resolve) }
        ]
      },
      {
        name: "联营企业管理",
        path: "jointVentureManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
         { name: "维护参展联营企业列表", path: '/jointVentureManagement', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/jointVentureManagement'], resolve) },
        //  { name: "工作部审核联营企业", path: '/auditJointVenture', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditJointVenture'], resolve) },
         { name: "交易团审核联营企业", path: '/auditJointVentureDelegation', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditJointVentureDelegation'], resolve) },
        //  { name: "商协会审核联营企业", path: '/auditJointVentureAssociation', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditJointVentureAssociation'], resolve) },
         { hidden: true, name: "交易团审核意见", path: '/auditVenture', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditVenture'], resolve) },
        //  { hidden: true, name: "商协会审核意见", path: '/auditVentureAssociation', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditVentureAssociation'], resolve) },
        //  { hidden: true, name: "工作部审核意见", path: '/auditVentureWork', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/auditVentureWork'], resolve) },
         { hidden: true, name: "登记联营企业资料", path: '/registJointInfo', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/registJointInfo'], resolve) }
        ]
      },
      {
        name: "企业展位申请",
        path: 'company_information',
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          // { name: "品牌展位申请列表", path: "/brand_application_list", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandApplyList'], resolve) },
          // 普通
          { name: "一般性展位", path: "/brand_applicat_list", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandApplyDataList'], resolve) },
          { name: "企业确认品牌展位数量", path: "/brandConfirmNum", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandConfirmNum'], resolve) },
          { hidden: true, name: "主展展品申请单", path: "/main_exhibits_apply_form", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/mainExhibitsApplyForm'], resolve) },
          { hidden: true, name: "主展展品申请单", path: "/main_exhibits_apply", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/mainExhibitsApplyDataForm'], resolve) },
          { hidden: true, name: "一般性展位申请打印", path: "/brandApplyDataPrint", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandApplyDataPrint'], resolve) },

          // 品牌
          { hidden: true, name: "品牌展位申请清单", path: "/applyListing", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/applyListing'], resolve) },
          // { name: "品牌展位申请表", path: "/brand_appliaction_form/:id", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandAppliactionForm'], resolve) },
          { name: "品牌展位申请表", path: "/brandApplicationForm", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandApplicationForm'], resolve) },
          { name: "品牌展位", path: "/brandAppliactionTable", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandAppliactionTable'], resolve) },
          { name: "品牌展位申请编辑表", path: "/brand_apply_form_edit/:id", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandApplyFormEdit'], resolve) },
          { name: "企业资质", path: "/aptitudedTable", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/aptitudedTable'], resolve) },
          { name: "提交确认书", path: "/submitConfirmLetter", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/submitConfirmLetter'], resolve) },
          { name: "品牌展位确认", path: "/brandBoothConfirm", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/brandBoothConfirm'], resolve) },
          { name: "打印申请", path: "/printApplicationForm", component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/printApplicationForm'], resolve) }
        ]
      },
      {
        name: "海关商品编码对应展区调整申请",
        path: "commodityCodeAdjustApply",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { hidden: true, name: "申请海关商品编码对应展区调整（前台）", path: '/applyCommodityCodeAdjustFront', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/applyCommodityCodeAdjustFront'], resolve) },
          { hidden: true, name: "申请海关商品编码对应展区调整（前台列表）", path: '/applyCommodityCodeAdjustList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/applyCommodityCodeAdjustFrontList'], resolve) },
          { hidden: true, name: "审核展区调整（所有角色审核）", path: '/checkExhibitionAdjustAll', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkExhibitionAdjustAll'], resolve) },
          { name: "审核展区调整（交易团所有角色审核列表）", path: '/checkExhibitionAdjustAllList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkExhibitionAdjustAllList'], resolve) },
          { name: "审核展区调整（商协会所有角色审核列表）", path: '/checkExhibitionAdjustBusiness', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkExhibitionAdjustBusiness'], resolve) },
          { name: "审核展区调整（工作部所有角色审核列表）", path: '/checkExhibitionAdjustDepartment', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkExhibitionAdjustDepartment'], resolve) },
          { name: "审核展区调整（外贸所有角色审核列表）", path: '/checkExhibitionAdjustTrade', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/checkExhibitionAdjustTrade'], resolve) },
          { hidden: true, name: "审核展区调整（列表）", path: '/reviewExhibitionAdjustAllList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/reviewExhibitionAdjustAllList'], resolve) },
         //  { name: "交易团审核展区调整", path: '/tradeGroupCheckExhibitionAdjust', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/tradeGroupCheckExhibitionAdjust'], resolve) },
          { hidden: true, name: "企业申请展区调整列表及状态（后台）", path: '/enterpriseApplyExhibitionList', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/enterpriseApplyExhibitionList'], resolve) },
          { name: "企业申请展区调整列表及状态（后台）", path: '/enterpriseApplyExhibitionData', component: resolve => require(['@/pages/onlineService/enterpriseApplyManage/enterpriseApplyExhibitionFrontList'], resolve) }
        ]
      }
    ]
  },
  {
    name: "企业参展确认管理",
    path: "enterpriseconfirmManage",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "企业查看展位申请进度",
        path: "enterprisesCheckApplyProgress",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展位申请审核情况", path: '/boothApplyStatus', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothApplyStatus'], resolve) },
          { name: "展位申请（一般性）", path: '/boothApplyGeneral', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothApplyGeneral'], resolve) },
          { name: "企业资料审核结果", path: '/enterpriseDataCheckResults', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/enterpriseDataCheckResults'], resolve) },
          { name: "展位安排结果", path: '/boothArrangementResult', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothArrangementResult'], resolve) },
          { name: "展位确认登记", path: '/boothConfirmRegister', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothConfirmRegister'], resolve) }
        ]
      },
      {
        name: "企业展位数量调整",
        path: "enterpriseBoothNumAdjust",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { hidden: true, name: "企业展位数量调整", path: '/enterpriseBoothNumAdjust', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/enterpriseBoothNumAdjust'], resolve) },
          { hidden: true, name: "企业展位数量调整列表", path: '/enterpriseNumberAdjustData', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/enterpriseBoothNumAdjustData'], resolve) },
          { hidden: true, name: "企业展位数量调整列表", path: '/enterpriseNumberAdjustDataList', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/enterpriseBoothNumAdjustDataList'], resolve) },
          { hidden: true, name: "展位数量调整", path: '/boothNumAdjust', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothNumAdjust'], resolve) },
          { name: "展位数量调整", path: '/numberAdjustme', component: resolve => require(['@/pages/onlineService/enterpriseParticipationManage/boothNumAdjustDate'], resolve) }
        ]
      }
    ]
  },
  {
    name: "企业网上服务与调研管理",
    path: "enterpriseOnlineServie",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "企业申请参展商证",
        path: "enterpriseApplyExhibitorCertificate",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "企业提交办证申请", path: '/enterpriseSubmitApplyCertificate', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterpriseSubmitApplyCertificate'], resolve) },
          { name: "企业登记办证人员资料", path: '/enterpriseRegistData', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterpriseRegistData'], resolve) },
          { name: "办证人员资料列表", path: '/certificateHandlingInfoList', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/certificateHandlingInfoList'], resolve) },
          { name: "审核办证人员资料", path: '/checkCertificatehandlingInfo1', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkCertificatehandlingInfo1'], resolve) },
          { name: "审核办证人员资料2", path: '/checkCertificatehandlingInfo2', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkCertificatehandlingInfo2'], resolve) },
          { name: "登记办证人员资料", path: '/registrationCardPersonnel', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/registrationCardPersonnel'], resolve) }
        ]
      },
      {
        name: "企业申请车证",
        path: "enterpriseApplyCarLicense",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "司机人员信息列表", path: '/driverInforList', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/driverInforList'], resolve) },
          { name: "登记或修改司机人员信息", path: '/registerModifyDriverInfo', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/registerModifyDriverInfo'], resolve) },
          { name: "司机人员证件列表", path: '/driverIdentificationList', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/driverIdentificationList'], resolve) },
          { name: "企业管理员提交车证申请", path: '/enterpriseSubmitsCarLicenseApply', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterpriseSubmitsCarLicenseApply'], resolve) },
          { name: "车辆证件指标", path: '/carIdentificationIndex', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/carIdentificationIndex'], resolve) }
        ]
      },
      {
        name: "企业申请联合布展业务",
        path: "enterprisesApplyExhibition",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { hidden: true, name: "企业申请联合布展业务", path: '/enterprisesApplyExhibition', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterprisesApplyExhibitionbusiness'], resolve) },
          { hidden: true, name: "联合企业信息", path: '/jointEnterpriseInfo', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/jointEnterpriseInfo'], resolve) },
          { hidden: true, name: "新增联合企业信息(3)", path: '/newJointEnterpriseInfo', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/newJointEnterpriseInfo'], resolve) },
          { name: "联合布展", path: '/applicantCheckApplyProgress', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/applicantCheckApplyProgress'], resolve) },
          { hidden: true, name: "联合方查看审核进度", path: '/consortiumCheckApplyProgress', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/consortiumCheckApplyProgress'], resolve) },
          { hidden: true, name: "申请方确认", path: '/applicantconsortiumConfirm', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/applicantconsortiumConfirm'], resolve) },
          { hidden: true, name: "联合方确认", path: '/consortiumConfirm', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/consortiumConfirm'], resolve) },
          { name: "交易团审核联合布展", path: '/checkJointExhibitionTrade', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionTrade'], resolve) },
          { name: "商协会审核联合布展", path: '/checkJointExhibitionBus', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionBus'], resolve) },
          { name: "工作部审核联合布展", path: '/checkJointExhibitionWorking', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionWorking'], resolve) },
          { hidden: true, name: "审核联合布展(交易团)", path: '/checkJointExhibitionTrading', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionTrading'], resolve) },
          { hidden: true, name: "审核联合布展(商协会)", path: '/checkJointExhibitionBusiness', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionBusiness'], resolve) },
          { hidden: true, name: "审核联合布展(工作部)", path: '/checkJointExhibitionWork', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkJointExhibitionWork'], resolve) }
        ]
      },
      {
        name: "企业邀请客户",
        path: "enterprisesInviteCustomers",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "邀请客户", path: '/invitationList', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/invitationList'], resolve) },
          { hidden: true, name: "维护客户信息", path: '/maintainCustomerInfo', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/maintainCustomerInfo'], resolve) },
          { hidden: true, name: "添加客户信息", path: '/addCustomerInfo', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/addCustomerInfo'], resolve) },
          { hidden: true, name: "企业发送邀请邮件", path: '/enterprisesSendInvitations', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterprisesSendInvitations'], resolve) },
          { hidden: true, name: "邮件模版编辑", path: '/emailTemplate', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/emailTemplate'], resolve) },
          // { name: "当届邀请邮件的发送情况", path: '/sendCurrentInvitationMailStatus', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/sendCurrentInvitationMailStatus'], resolve) },
          // { name: "邀请邮件统计查看", path: '/inviteEmailStatsSee', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/inviteEmailStatsSee'], resolve) },
          // { name: "交易团邀请邮件发送情况", path: '/tradingGroupSendEmailStatus', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/tradingGroupSendEmailStatus'], resolve) },
          { name: "邮件模版维护", path: '/mailTemplateMaintenance', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/mailTemplateMaintenance'], resolve) }
        ]
      },
      {
        name: "企业发布展商动态",
        path: "enterpriseReleasesExhibitorState",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展商动态", path: '/dynamicListOperation', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/dynamicListOperation'], resolve) },
          { hidden: true, name: "企业发布展商动态", path: '/enterprisePutExhibitorState', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterprisePutExhibitorState'], resolve) },
          { name: "审核展商动态申请", path: '/checkExhibitorsApply', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkExhibitorsApply'], resolve) }
        ]
      },
      {
        name: "企业填报成交统计",
        path: "enterpriseFillStatistics",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "企业填报成交统计", path: '/enterpriseFillCjStatisticsFront', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterpriseFillCjStatisticsFront'], resolve) },
          // { name: "企业填报成交统计", path: '/enterpriseFillCjStatisticsBack', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/enterpriseFillCjStatisticsBack'], resolve) },
          { name: "成交统计录入表", path: '/transactionStatisticsTable', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/transactionStatisticsTable'], resolve) },
          { name: "成交统计录入（编码）", path: '/transactionStatisticsCode', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/transactionStatisticsCode'], resolve) },
          { name: "成交统计审核", path: '/checkStatisticsAudit', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/checkStatisticsAudit'], resolve) },
          { name: "交易团查询成交记录", path: '/tradingGroupQueryRecords', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/tradingGroupQueryRecords'], resolve) },
          { name: "交易团成交数据", path: '/tradingGroupCjData', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/tradingGroupCjData'], resolve) }
        ]
      },
      {
        name: "企业业务统计",
        path: "enterpriseBusinessStatistics",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展位申请情况查询", path: '/boothApplyStatusQuery', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/boothApplyStatusQuery'], resolve) },
          { name: "企业业务统计", path: '/enterpriseBusinessStatistics', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/currentInvitationEmailStatus'], resolve) },
          { name: "展位情况查询", path: '/exhibitionStatusQuery', component: resolve => require(['@/pages/onlineService/enterpriseServiceResearchManage/exhibitionStatusQuery'], resolve) }
        ]
      }
    ]
  }
];
