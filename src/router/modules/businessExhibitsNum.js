export default [
  {
    name: "企业申请一般性展位数量安排",
    path: "numberBusinessExhibits",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      {
        name: "2.交易团（分团）审核企业参展资格",
        path: "/exhibitorQualification",
        component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
        children: [
          { name: "（已归纳）工作部设置时间", path: "/recognitionBooths", component: resolve => require(['@/pages/workplaceSettingTime/workDepartmentLastCommend/recognitionBooths'], resolve) },
          {
            name: "交易团审核企业基本信息",
            path: "/businessBasicEnterprise",
            component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
            children: [
              { name: "一般性交易团审核企业基本信息", path: "/businessAuditInformation", component: resolve => require(['@/pages/workplaceSettingTime/businessBasic/auditInformation'], resolve) },
              { name: "品牌交易团审核企业基本信息", path: "/businessBrandaudit", component: resolve => require(['@/pages/workplaceSettingTime/businessBasic/brandAudit'], resolve) },
              { name: "企业退回展位申请", path: "/companyBackBoothApply", component: resolve => require(['@/pages/workplaceSettingTime/businessBasic/companyBackBoothApply'], resolve) },
              { name: "（合并至此）审核企业资料/展位申请/追加申请", path: "/businessAuditData", component: resolve => require(['@/pages/workplaceSettingTime/businessBasic/enterpriseInformation'], resolve) },
              { name: "审核企业清单", path: "/brandEnterprise", component: resolve => require(['@/pages/workplaceSettingTime/businessBasic/brandEnterprise'], resolve) }
            ]
          }
        ]
      },
      {
        name: "3.商协会复核企业参展资格",
        path: "/exhibitorReview",
        component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
        children: [
          { name: "商协会复核", path: "/businessReview", component: resolve => require(['@/pages/workplaceSettingTime/exhibitorReview/businessReview'], resolve) },
          { name: "商协会通知交易团不通过的企业名单", path: "/businessNopassenterprise", component: resolve => require(['@/pages/workplaceSettingTime/exhibitorReview/nopassenterprise'], resolve) }
        ]

      },
      {
        name: "4.交易团提交一般性展位安排方案",
        path: "/subpanelGeneralArrangement",
        component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/shall'], resolve),
        children: [
          { name: "工作部设置规则", path: "/subworkDepartmentSetsrulespga", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subworkDepartmentSetsrulespga'], resolve) },
          { name: "交易团设置一般性展位数量安排", path: "/subjytszTradingGroup", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subjytszTradingGroup'], resolve) },
          { name: "商协会一般性展位数量方案汇总查看", path: "/subsxhCommercialSummaryview", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subsxhCommercialSummaryview'], resolve) },
          { name: "各团查询本团的一般性展位安排进度", path: "/subgtcxboothArrangement", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subgtcxboothArrangement'], resolve) },
          { name: "商协会审核粘连界面(方案)", path: "/subsxhCommerciaInterfacescheme", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subsxhCommerciaInterfacescheme'], resolve) },
          { name: "工作部查看修改一般性展位数量安排", path: "/subgzbWorkgeneralBooth", component: resolve => require(['@/pages/businessExhibitsNum/subpanelGeneralArrangement/subgzbWorkgeneralBooth'], resolve) }
        ]
      },
      {
        name: "5.分团提交一般性展位安排方案",
        path: "/ftSubgroupsSubmit",
        component: resolve => require(['@/pages/businessExhibitsNum/ftSubgroupsSubmit/shall'], resolve),
        children: [
          { name: "交易团管理员授权给分团", path: "/ftjytAdministratorSubgroup", component: resolve => require(['@/pages/businessExhibitsNum/ftSubgroupsSubmit/ftjytAdministratorSubgroup'], resolve) },
          { name: "分团填写一般性展位数量安排", path: "/ftBoothNumberArrangement", component: resolve => require(['@/pages/businessExhibitsNum/ftSubgroupsSubmit/ftBoothNumberArrangement'], resolve) },
          { name: "交易团审核分团数量安排方案", path: "/ftjytAuditSubgroup", component: resolve => require(['@/pages/businessExhibitsNum/ftSubgroupsSubmit/ftjytAuditSubgroup'], resolve) },
          { name: "交易团页面", path: "/ftImpower", component: resolve => require(['@/pages/businessExhibitsNum/ftSubgroupsSubmit/ftImpower'], resolve) }
        ]
      },
      {
        name: "6.铁石装饰品及户外水疗设施展位数量安排",
        path: "/ironworkNumberArrangements",
        component: resolve => require(['@/pages/businessExhibitsNum/shall'], resolve),
        children: [
          { name: "交易团收集企业申请", path: "/tradeGroupApply", component: resolve => require(['@/pages/businessExhibitsNum/tradeGroupApply'], resolve) },
          { name: "工作部汇总数据并安排展位数量", path: "/workTotaldataArrangment", component: resolve => require(['@/pages/businessExhibitsNum/workTotaldataArrangment'], resolve) },
          { name: "外贸司查看汇总表", path: "/foreignTradeSummaryTable", component: resolve => require(['@/pages/businessExhibitsNum/foreignTradeSummaryTable'], resolve) }
        ]
      },
      {
        name: "7.商协会查询各交易团一般性展位数量安排方案",
        path: "/businessAssociationInquiryScheme",
        component: resolve => require(['@/pages/businessExhibitsNum/shall'], resolve),
        children: [
          { name: "商协会管理员审核一般性展位安排", path: "/businessAssociationAuditBooth", component: resolve => require(['@/pages/businessExhibitsNum/businessAssociationSearchArrangement/businessAssociationAuditBooth'], resolve) }
        ]
      },
      {
        name: "8.交易团向企业分批公布一般性展位数量",
        path: "/tradeGroupAnnouncesBooth",
        component: resolve => require(['@/pages/businessExhibitsNum/shall'], resolve),
        children: [
          { name: "交易团设置公布批次", path: "/tradingGroupAnnouncesBatches", component: resolve => require(['@/pages/businessExhibitsNum/businessAssociationSearchArrangement/tradingGroupAnnouncesBatches'], resolve) }
        ]
      },
      {
        name: "9.企业或交易团申请调整企业展位数量",
        path: "/companyDelegatApplyBoothNumber",
        component: resolve => require(['@/pages/businessExhibitsNum/shall'], resolve),
        children: [
          { name: "交易团审核企业提交申请", path: "/delegationSubmitApply", component: resolve => require(['@/pages/businessExhibitsNum/delegationSubmitApply'], resolve) }
        ]
      },
      {
        name: "10.商会审核企业一般性展位数量调整",
        path: "/checkCompanyNumberReviews",
        component: resolve => require(['@/pages/businessExhibitsNum/shall'], resolve),
        children: [
          { name: "商会对交易团提交或审核的一般性展位数量调整审核", path: "/dealClusterNumberCheckout", component: resolve => require(['@/pages/businessExhibitsNum/dealClusterNumberCheckout'], resolve) },
          { name: "工作部审定企业一般性展位数量调整", path: "/workDepartNumberCheckout", component: resolve => require(['@/pages/businessExhibitsNum/workDepartNumberCheckout'], resolve) }
        ]
      }
    ]
  }
];
