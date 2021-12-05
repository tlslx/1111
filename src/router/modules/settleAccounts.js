export default [
  {
    name: "出口展览结算",
    path: "exportExhibitionSettlement",
    iconCls: 'el-icon-s-flag',
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      {
        name: "1.展览结算设置",
        path: "/exhibitionSettlement",
        component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/shall'], resolve),
        children: [
          { name: "参照企业设置（设置界面）", path: "/referCompanySetting", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/referCompanySetting'], resolve) },
          { name: "参照企业设置（查询结果界面）", path: "/referCompanySettingResult", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/referCompanySettingResult'], resolve) },
          { name: "标准展位价格设置", path: "/standardPriceSetting", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/standardPriceSetting'], resolve) },
          { name: "特定展位价格设置", path: "/specialPriceSetting", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/specialPriceSetting'], resolve) },
          { name: "收费函模板维护", path: "/chargeTemplatePreserve", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/chargeTemplatePreserve'], resolve) },
          { name: "收取订金通知", path: "/receiveDepositNotice", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/receiveDepositNotice'], resolve) },
          { name: "收费函模板设置", path: "/chargeTemplateSetting", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/chargeTemplateSetting'], resolve) },
          { name: "收费函模板审核", path: "/poorReviewTemplate", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/poorReviewTemplate'], resolve) },
          { name: "设置贫困企业信息", path: "/pootSetEnterprise", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/pootSetEnterprise'], resolve) },
          { name: "交易团确认提交贫困企业", path: "/poorTradeConfirmation", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/poorTradeConfirmation'], resolve) },
          { name: "审核贫困企业信息", path: "/poorEnterprises", component: resolve => require(['@/pages/settleAccounts/exportExhibitionSettlement/poorEnterprises'], resolve) }
        ]
      },
      {
        name: "2.结算配置管理",
        path: "/settlementConfigurationManagement",
        component: resolve => require(['@/pages/settleAccounts/settlementConfigurationManagement/shall'], resolve),
        children: [
          { name: "结算配置列表", path: "/SettlementConfigurationList", component: resolve => require(['@/pages/settleAccounts/settlementConfigurationManagement/SettlementConfigurationList'], resolve) },
          { name: "2", path: "/EstablishmentAndMaintenanceOfSettlementAllocation", component: resolve => require(['@/pages/settleAccounts/settlementConfigurationManagement/EstablishmentAndMaintenanceOfSettlementAllocation'], resolve) },
          { name: "标结算配置审核", path: "/AuditofBidSettlementConfiguration", component: resolve => require(['@/pages/settleAccounts/settlementConfigurationManagement/AuditofBidSettlementConfiguration'], resolve) }
        ]
      },
      {
        name: "3.展位定金",
        path: "/boothDeposit",
        component: resolve => require(['@/pages/settleAccounts/boothDeposit/shall'], resolve),
        children: [
          { name: "定金通知", path: "/depositNotification", component: resolve => require(['@/pages/settleAccounts/boothDeposit/depositNotification'], resolve) },
          { name: "建立及维护结算配置", path: "/depositSummary", component: resolve => require(['@/pages/settleAccounts/boothDeposit/depositSummary'], resolve) },
          { name: "预定款缴款通知详情", path: "/paymentNotice", component: resolve => require(['@/pages/settleAccounts/boothDeposit/paymentNotice'], resolve) },
          { name: "提交审批", path: "/submitApproval", component: resolve => require(['@/pages/settleAccounts/boothDeposit/submitApproval'], resolve) },
          { name: "审批", path: "/examineApprove", component: resolve => require(['@/pages/settleAccounts/boothDeposit/examineApprove'], resolve) },
          { name: "发送站内信3", path: "/sendStationMessages", component: resolve => require(['@/pages/settleAccounts/boothDeposit/sendStationMessages'], resolve) },
          { name: "确认企业缴费", path: "/confirmEnterprisePayment", component: resolve => require(['@/pages/settleAccounts/boothDeposit/confirmEnterprisePayment'], resolve) },
          { hidden: true, name: "编辑页面", path: "/companySureEdit", component: resolve => require(['@/pages/settleAccounts/boothDeposit/companySureEdit'], resolve) },
          { name: "查看企业缴费情况", path: "/viewPaymentSituation", component: resolve => require(['@/pages/settleAccounts/boothDeposit/viewPaymentSituation'], resolve) }
        ]
      },
      {
        name: "4.展位预定款",
        path: "/boothReservation",
        component: resolve => require(['@/pages/settleAccounts/boothReservation/shall'], resolve),
        children: [
          { name: "汇总展位预订款数据", path: "/collectBoothReservation", component: resolve => require(['@/pages/settleAccounts/boothReservation/collectBoothReservation'], resolve) },
          { name: "汇总计算预订款", path: "/summarizeAdvancePayment", component: resolve => require(['@/pages/settleAccounts/boothReservation/summarizeAdvancePayment'], resolve) },
          { name: "查看审核", path: "/viewAudit", component: resolve => require(['@/pages/settleAccounts/boothReservation/viewAudit/viewAudit'], resolve) },
          { name: "审核预订款数据", path: "/reviewBookingData", component: resolve => require(['@/pages/settleAccounts/boothReservation/reviewBookingData'], resolve) },
          { hidden: true, name: "审核预订款数据（查看）", path: "/reviewBookingDataView", component: resolve => require(['@/pages/settleAccounts/boothReservation/reviewBookingDataView'], resolve) },
          { name: "中心财务部审核预订款信息", path: "/reviewBookingInformation", component: resolve => require(['@/pages/settleAccounts/boothReservation/reviewBookingInformation'], resolve) },
          { hidden: true, name: "中心财务部审核预订款信息（查看）", path: "/reviewBookingInformationView", component: resolve => require(['@/pages/settleAccounts/boothReservation/reviewBookingInformationView'], resolve) },
          { name: "制作缴款通知", path: "/makePaymentNotice", component: resolve => require(['@/pages/settleAccounts/boothReservation/makePaymentNotice'], resolve) },
          { hidden: true, name: "预订款缴款通知详情", path: "/makePaymentNoticeDetile", component: resolve => require(['@/pages/settleAccounts/boothReservation/makePaymentNoticeDetile'], resolve) },
          { name: "发送站内信4", path: "/sendStationMessagesReser", component: resolve => require(['@/pages/settleAccounts/boothReservation/sendStationMessagesReser'], resolve) },
          { name: "交易团预订款汇总", path: "/summaryTradingpanelAdvance", component: resolve => require(['@/pages/settleAccounts/boothReservation/summaryTradingpanelAdvance'], resolve) }
        ]
      },
      {
        name: "5.展位预收费",
        path: "/boothReservation",
        component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/shall'], resolve),
        children: [
          { name: "展位预订款报表", path: "/summarizeExpensesTradeteam", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/summarizeExpensesTradeteam'], resolve) },
          { hidden: true, name: "获取展位数量", path: "/getNumberBooths", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/getNumberBooths'], resolve) },
          { name: "审核预收费数据", path: "/reviewAdvanceData", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/reviewAdvanceData'], resolve) },
          { hidden: true, name: "审核预收费数据(查看)", path: "/reviewAdvanceDataView", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/reviewAdvanceDataView'], resolve) },
          { name: "中心财务部审核预收费信息", path: "/centralAdvanceInformation", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/centralAdvanceInformation'], resolve) },
          { hidden: true, name: "中心财务部审核预收费信息(查看)", path: "/centralAdvanceInformationView", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/centralAdvanceInformationView'], resolve) },
          { name: "制作收费函", path: "/productionChargeLetter", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/productionChargeLetter'], resolve) },
          { hidden: true, name: "制作收费函（详情）", path: "/productionChargeLetterDetile", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/productionChargeLetterDetile'], resolve) },
          { name: "展位预收费报表", path: "/boothChargeReport", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/boothChargeReport'], resolve) },
          { name: "预收费明细", path: "/advanceChargeDetails", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/advanceChargeDetails'], resolve) },
          { name: "参展费用清单（分区域）一", path: "/exhibitionFeeListOne", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/exhibitionFeeListOne'], resolve) },
          { name: "参展费用清单（分区域）二", path: "/exhibitionFeeListTwo", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/exhibitionFeeListTwo'], resolve) },
          { name: "展位费用清单", path: "/listBoothFees", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/listBoothFees'], resolve) },
          { name: "预收费展位数统计表", path: "/statisticalNumberPrepaidBooths", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/statisticalNumberPrepaidBooths'], resolve) },
          { name: "预收费用展区统计总表", path: "/generalExhibitionPrepaidFees", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/generalExhibitionPrepaidFees'], resolve) },
          { name: "预收费用展区统计明细表", path: "/advanceExhibitionStatisticsList", component: resolve => require(['@/pages/settleAccounts/boothAdvanceCharge/advanceExhibitionStatisticsList'], resolve) }
        ]
      }
    ]
  }
];
