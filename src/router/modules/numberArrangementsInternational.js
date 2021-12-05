export default [
  {
    name: "交易团一般性展位数量（含中央通道）安排管理",
    path: "numberArrangementsInternational",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      {
        name: "展位重核-展位需求申报",
        path: "/setcalculationRules",
        component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
        children: [
          { name: "设置切块支持数", path: "/setCutting", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/setCutting'], resolve) },
          { name: "核算展位基数", path: "/setcalculationRules", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/setCalculationRules'], resolve) },
          { name: "工作部设置交易团申请展区范围", path: "/applicationExhibition", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/applicationExhibition'], resolve) },
          {
            name: "查看交易团需求申报结果（交易团维度）", path: "/delegationResult", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
            children: [
              { name: "查看交易团需求申报结果", path: "/boothDemand", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/boothDemand'], resolve) }
            ]
          },
          { name: "外贸司审核展位基数", path: "/foreigntradeDepartment", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/foreignTradeDepartment'], resolve) },
          {
            name: "交易团页面", path: "/tradingGroup", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
            children: [
              {
                name: "交易团确认本团的各期一般性展位数量",
                path: "/numberBooths",
                component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
                children: [
                  { name: "确认本团的各期一般性展位数量", path: "/generalExhibitionNumber", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/generalExhibitionNumber'], resolve) },
                  { name: "打印预览", path: "/printDate", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/printDate'], resolve) }
                ]
              },
              { name: "各团各期各展区展位需求申报", path: "/demandDeclaration", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/demandDeclaration'], resolve) }
            ]
          }
          // { name: "基数调整记录", path: "/baseAdjustment", component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/baseAdjustment'], resolve) }
        ]
      },
      {
        name: "基数不重核公布交易团一般性展位数量", path: "/numberGeneralbooths", component: resolve => require(['@/pages/numberArrangementsInternational/numberGeneralBooths/numberGeneralBooths'], resolve),
        children: [
          { name: "基数不重核一般性展位数量安排", path: "/recheckNumber", component: resolve => require(['@/pages/numberArrangementsInternational/numberGeneralBooths/recheckNumber'], resolve) },
          { name: "工作部在管理页面导入第一、二期中央通道最终状态展位数量", path: "/departmentManagement", component: resolve => require(['@/pages/numberArrangementsInternational/numberGeneralBooths/departmentManagement'], resolve) },
          { name: "工作部设定交易团一般性展位数", path: "/workSettradinggroup", component: resolve => require(['@/pages/numberArrangementsInternational/numberGeneralBooths/workSettradinggroup'], resolve) },
          { name: "交易团查看方案", path: "/looksProposal", component: resolve => require(['@/pages/numberArrangementsInternational/numberGeneralBooths/looksProposal'], resolve) }
        ]
      },
      {
        name: "交易团提交一般性展位退回申请", path: "/submitGeneral", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/submitGeneral'], resolve),
        children: [
          { name: "交易团提出退回申请", path: "/exchangeRequest", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/exchangeRequest'], resolve) },
          { name: "工作处审批退回申请", path: "/examinesApproves", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/examinesApproves'], resolve) },
          { name: "自动生成交易团展位数调整记录", path: "/automaticallyGenerate", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/automaticallyGenerate'], resolve) },
          { name: "查看调整后交易团在改展区的最终展位数", path: "/exhibitionAdjustment", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/exhibitionAdjustment'], resolve) },
          { name: "工作处汇总通知已通过的申请", path: "/consolidatedApproved", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/consolidatedApproved'], resolve) },
          { name: "工作部页面", path: "/submitsWorkPage", component: resolve => require(['@/pages/numberArrangementsInternational/submitsGeneral/submitsWorkPage'], resolve) }
        ]
      },
      {
        name: "交易团特定范围展位申请", path: "specificAreaboothTradegroup", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/shall'], resolve),
        children: [
          { name: "工作部设置模板", path: "/departmentSetsupmodules", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/departmentSetsupmodules'], resolve) },
          { name: "交易团特定展位申报", path: "/specificboothDeclaration", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/specificboothDeclaration'], resolve) },
          { name: "交易团特定展位申报(铁石水疗打印)", path: "/specificboothDeclarationIronspaPrint", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/specificboothDeclarationIronspaPrint'], resolve) },
          { name: "交易团特定展位申报(通用模板打印)", path: "/specificboothDeclarationOrdinaryPrint", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/specificboothDeclarationOrdinaryPrint'], resolve) },
          { name: "工作部确定各交易团申报展位数量情况", path: "/workdepartmentDetermine", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/workdepartmentDetermine/workdepartmentDetermine'], resolve) },
          { name: "外贸司审核安排表", path: "/foreigntradeReviewsSchedule", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/foreigntradeReviewsSchedule'], resolve) },
          { name: "录入并公布方案", path: "/workInputRelease", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/workInputRelease'], resolve) },
          { name: "交易团查看方案", path: "/tradinggroupScenarioView", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/tradinggroupScenarioView'], resolve) },
          { name: "特定展位需求工作部页面", path: "/workPage", component: resolve => require(['@/pages/numberArrangementsInternational/specificAreaboothTradegroup/workPage/workPage'], resolve) }
        ]
      },
      {
        name: "交易团发布并调整各类别展位数量",
        path: "/release_adjust",
        component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/shall'], resolve),
        children: [
          { name: "工作部设置调整规则", path: "/setadjustmentRules", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/setAdjustmentRules'], resolve) },
          { name: "交易团发布调整需求", path: "/adjustDemand", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/adjustDemand/adjustDemand'], resolve) },
          { name: "交易团提交调整申请", path: "/adjustApplication", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/adjustApplication/adjustApplication'], resolve) },
          { hidden: true, path: "/printedPage", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/adjustApplication/printedPage'], resolve) },
          { name: "还原往届调整", path: "/reductionAdjustment", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/reductionAdjustment/reductionAdjustment'], resolve) },
          { name: "商协会审核交易团展位调整申请", path: "/merchantsGroups", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/merchantsGroups'], resolve) },
          { name: "工作部审核交易团展位调整申请", path: "/boothapplicationTradegroup", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/boothApplicationTradegroup/boothApplicationTradegroup'], resolve) },
          { name: "交易团查看", path: "/panView", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/panelView'], resolve) },
          { name: "处理他团等量/不等量调整申请打印", path: "/printedPageOne", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/printedPageOne'], resolve) },
          { name: "工作部录入展位调整", path: "/inputboothAdjustment", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/inputBoothAdjustment'], resolve) },
          { name: "工作部展位管理", path: "/workDepartmenta", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/workDepartment'], resolve) },
          { name: "交易团展位管理", path: "/workDepartmentb", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/groupManagement/workDepartmentb'], resolve) },
          { name: "等量/不等量调整（工作部页面）", path: "/equalUnequal", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/equalUnequal'], resolve) },
          { name: "等量/不等量调整（交易团页面）", path: "/equalUnequalIntemational", component: resolve => require(['@/pages/numberArrangementsInternational/releaseAdjust/equalUnequalIntemational'], resolve) }
        ]
      },
      {
        name: "工作部安排上届回收实际使用者得展位",
        path: "/actualUsercall",
        component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
        children: [
          { name: "外贸中心汇总实际使用者名单", path: "/tradeCentersummary", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/tradeCenterSummary'], resolve) },
          { name: "交易团审核“实际使用者得”对应企业参展资格", path: "/tradingGroupauditactualuser", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/tradingGroupauditActualuser'], resolve) },
          { name: "商协会复核“实际使用者得”展位对应企业名单", path: "/commercialActualusers", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/commercialActualusers'], resolve) },
          { name: "交易团查看复核结果", path: "/foreigntradeGroupview", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/foreigntradeGroupview'], resolve) },
          { name: "外贸中心汇总企业参展资格审核情况表", path: "/participationQualifications", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/participationQualifications'], resolve) },
          { name: "外贸司审核", path: "/foreigntradeDepartment", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/foreigntradeDepartment'], resolve) },
          { name: "外贸中心同步至一般性展位数量安排", path: "/foreigntradeSynchronization", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/foreigntradeSynchronization'], resolve) }
          // { name: "录入展位调整", path: "/input_booth_adjustment", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/inputBoothAdjustment'], resolve) }
        ]
      },
      {
        name: "工作部安排上届回收用于组展表彰的一般性展位",
        path: "/actualUserBooth",
        component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
        children: [
          { name: "用于表彰安排的回收展位汇总", path: "/boothNumrange", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/boothNumrange'], resolve) },
          { name: "确定表彰对象交易团列表", path: "/boothCommendationList", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/commendationList'], resolve) },
          { name: "生成交易团获表彰展位数", path: "/boothArrange", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/boothArrange'], resolve) },
          // { name: "交易团在表彰安排的展位类别范围内申报类别需求", path: "/boothDeclareddemand", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/declaredDemand'], resolve) },
          { name: "审核交易团申请", path: "/boothExaminedemand", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/examineDemand'], resolve) },
          // { name: "制定表彰安排展位的安排方案", path: "/boothArrangementplan", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/arrangementplan'], resolve) },
          {
            name: "制定表彰安排展位的安排方案", path: "/boothArrangementScheme", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
            children: [
              { name: "组展表彰展位安排", path: "/boothArrangementplan", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/arrangementplan'], resolve) },
              {
                name: "生成展位安排表", path: "/boothSchedule", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
                children: [
                  { name: "生成展位安排表", path: "/tradingGroupPage", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/schedulelist'], resolve) },
                  { name: "打印模板", path: "/boothPrinttemplate", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/printtemplate'], resolve) }
                ]
              }
            ]
          },
          {
            name: "交易团页面", path: "/foreignTrade", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
            children: [
              { name: "交易团在表彰安排的展位类别范围内申报类别需求", path: "/boothDeclareddemand", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/declaredDemand'], resolve) }
            ]
          },
          {
            name: "外贸司界面", path: "/foreignTrade", component: resolve => require(['@/pages/numberArrangementsInternational/actualUserCall/shall'], resolve),
            children: [
              { name: "外贸司审定表彰展位安排", path: "/authorizedBooth", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/authorizedBooth'], resolve) }
            ]
          }
          // { name: "公布获表彰交易团奖励的展位类别及数量安排结果", path: "/boothArrangementresult", component: resolve => require(['@/pages/numberArrangementsInternational/recoveryBooths/arrangementresult'], resolve) }
        ]
      },
      { name: "工作部查看各交易团各展区一般性展位安排进度", path: "/panelView", component: resolve => require(['@/pages/numberArrangementsInternational/panelView/panelView'], resolve) }
    ]
  }
];
