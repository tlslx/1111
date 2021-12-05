export default [
  {
    name: "新题材展位数量安排",
    path: "newThemeBoothNumArrangements",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      { name: "企业申请信息设置", path: "companyApplySetInfo", component: resolve => require(['@/pages/newThemeBoothNumArrangements/companyApplySetInfo'], resolve) },
      {
        name: "1.企业申请新题材企业评审",
        path: "newThemeCompanyApply",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/shall'], resolve),
        children: [
          { name: "企业申请情况查询", path: "/centeralCompanyApplyTable", component: resolve => require(['@/pages/newThemeBoothNumArrangements/centeralCompanyApplyTable'], resolve) }
        ]
      },
      {
        name: "交易团审核推荐企业",
        path: "newThemeCheckRecommendCompany",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/shall'], resolve),
        children: [
          { name: "交易团审核企业列表", path: "/checkCompanyTable", component: resolve => require(['@/pages/newThemeBoothNumArrangements/checkCompanyTable'], resolve) },
          { hidden: true, name: "审核企业清单", path: "/checkCompanyDetails", component: resolve => require(['@/pages/newThemeBoothNumArrangements/checkCompanyDetails'], resolve) },
          { name: "打印交易团推荐", path: "/checkCompanyTablePrint", component: resolve => require(['@/pages/newThemeBoothNumArrangements/checkCompanyTablePrint'], resolve) }
        ]
      },
      {
        name: "2.商协会推荐",
        path: "newThemeRecommendCompany",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/shall'], resolve),
        children: [
          { name: "商协会对对应申请企业推荐", path: "/recommendApplyCompany", component: resolve => require(['@/pages/newThemeBoothNumArrangements/recommendApplyCompany'], resolve) },
          { hidden: true, name: "企业详情", path: "/companyDetails", component: resolve => require(['@/pages/newThemeBoothNumArrangements/companyDetails'], resolve) },
          { name: "工作部设置商协会查看范围", path: "/workDepartSettingRange", component: resolve => require(['@/pages/newThemeBoothNumArrangements/workDepartSettingRange'], resolve) },
          { hidden: true, name: "打印商协会对对应申请企业推荐", path: "/recommendApplyCompanyPrint", component: resolve => require(['@/pages/newThemeBoothNumArrangements/recommendApplyCompanyPrint'], resolve) }
        ]
      },
      {
        name: "3.查看审核推荐情况",
        path: "/centeralToViewMessage",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/centeralToViewMessage'], resolve)
      },
      {
        name: "4.复核企业条件",
        path: "newThemeWorkDepartCheckNumber",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/shall'], resolve),
        children: [
          { name: "企业复核资质", path: "/centeralCheckBoothUseTable", component: resolve => require(['@/pages/newThemeBoothNumArrangements/centeralCheckCompanyTable'], resolve) },
          { hidden: true, name: "审核企业信息", path: "/newThemeCheckCompanyInfo", component: resolve => require(['@/pages/newThemeBoothNumArrangements/checkCompanyInfo'], resolve) }
        ]
      },
      {
        name: "5.展位数量安排",
        path: "/nfBoothna",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/nfBoothna/shall'], resolve),
        children: [
          { name: "商协会复核展位数量安排", path: "/nfbareView", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nfBoothna/nfbareView'], resolve) },
          { name: "外贸司审核查看公示新题材展位安排结果", path: "/nfftReview", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nfBoothna/nfftReview'], resolve) },
          { name: "工作部设置展位安排方案", path: "/workDepartSettingPlan", component: resolve => require(['@/pages/newThemeBoothNumArrangements/workDepartSettingPlan'], resolve) },
          { name: "企业展位数量安排明细表", path: "/companyBoothNumArrangementsTable", component: resolve => require(['@/pages/newThemeBoothNumArrangements/companyBoothNumArrangementsTable'], resolve) },
          { name: "企业展位数量安排明细表（管理员）", path: "/companyBoothNumArrangeTableAdmin", component: resolve => require(['@/pages/newThemeBoothNumArrangements/companyBoothNumArrangementsTableAdmin'], resolve) }
        ]
      },
      {
        name: "6.展位数量调整",
        path: "/nsAdjustna",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsAdjustna/shall'], resolve),
        children: [
          { name: "外贸中心调整重新安排方案", path: "/nsWorkftcreposition", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsAdjustna/nsWorkftcreposition'], resolve) },
          { name: "外贸司查看审核展位安排调整方案", path: "/nsftExamine", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsAdjustna/nsftExamine'], resolve) },
          { name: "商协会查看展位安排结果", path: "/nsbaExamine", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsAdjustna/nsbaExamine'], resolve) },
          { name: "交易团审核企业申请/代企业申请调整企业展位数量", path: "/nsInternationalaudit", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsAdjustna/nsInternationalaudit'], resolve) }
        ]
      },
      {
        name: "7.展位数量公示管理",
        path: "/nsePublicityna",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsePublicityna/shall'], resolve),
        children: [
          { name: "外贸司展位数量公示", path: "/nseftPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsePublicityna/nseftPage/nseftPage'], resolve) },
          { name: "工作部展位数量公示", path: "/nseworkPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsePublicityna/nseworkPage/nseworkPage'], resolve) },
          { name: "商协会展位数量公示", path: "/nsebaPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsePublicityna/nsebaPage/nsebaPage'], resolve) },
          { name: "交易团展位数量公示", path: "/nseintPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nsePublicityna/nseintPage/nseintPage'], resolve) }
        ]
      },
      {
        name: "8.展位数量公布管理",
        path: "/nePublishna",
        component: resolve => require(['@/pages/newThemeBoothNumArrangements/nePublishna/shall'], resolve),
        children: [
          { name: "外贸司展位数量公布", path: "/neftPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nePublishna/neftPage/neftPage'], resolve) },
          { name: "工作部展位数量公布", path: "/neworkPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nePublishna/neworkPage/neworkPage'], resolve) },
          { name: "商协会展位数量公布", path: "/nebaPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nePublishna/nebaPage/nebaPage'], resolve) },
          { name: "交易团展位数量公布", path: "/neintPage", component: resolve => require(['@/pages/newThemeBoothNumArrangements/nePublishna/neintPage/neintPage'], resolve) }
        ]
      }
    ]
  }
];
