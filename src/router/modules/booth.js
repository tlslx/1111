export default [
  {
    name: "品牌展位数量安排管理",
    path: "numberArrangements",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      {
        name: "整体展位数量进度计划安排设置",
        path: '/normal_schedule',
        component: resolve => require(['@/pages/numberArrangements/brandBooth/shall'], resolve),
        children: [
          { name: "整体安排", path: "/normal_schedule", component: resolve => require(['@/pages/numberArrangements/brandBooth/brandBooth'], resolve) },
          { name: "特殊安排", path: "/special_arrangements", component: resolve => require(['@/pages/numberArrangements/brandBooth/specialArrangements'], resolve) }
        ]
      },
      { name: "工作部品牌评审规则设置", path: '/brand_work_department', component: resolve => require(['@/pages/numberArrangements/brandWorkDepartment/brandWorkDepartment'], resolve) },
      {
        name: "企业展位申请管理",
        path: '/company_information',
        component: resolve => require(['@/pages/numberArrangements/enterpriseApplication/shall'], resolve),
        children: [
          { name: "公司资料管理", path: "/company_information", component: resolve => require(['@/pages/numberArrangements/enterpriseApplication/companyInformation'], resolve) },
          { name: "企业展品管理", path: "/exhibit_information", component: resolve => require(['@/pages/numberArrangements/enterpriseApplication/exhibitInformation'], resolve) }
        ]
      },
      {
        name: "交易团审核企业参展资格",
        path: "/trade_group_audit",
        component: resolve => require(['@/pages/numberArrangements/tradeGroupAudit/shall'], resolve),
        children: [
          { hidden: true, path: "/basic_information", component: resolve => require(['@/pages/numberArrangements/tradeGroupAudit/basicInformation'], resolve) },
          { name: "交易团审核企业基本信息", path: "/audit_firms", component: resolve => require(['@/pages/numberArrangements/tradeGroupAudit/auditFirms'], resolve) },
          { name: "交易团登记企业母子关系审核", path: "/motherchild_relation", component: resolve => require(['@/pages/numberArrangements/tradeGroupAudit/motherchildRelation'], resolve) },
          { name: "交易团管理员查看企业申请", path: "/administrator_view", component: resolve => require(['@/pages/numberArrangements/tradeGroupAudit/administratorView'], resolve) }
        ]
      },
      {
        name: "交易团品牌评审打分推荐",
        path: "/brand_evaluation",
        component: resolve => require(['@/pages/numberArrangements/brandEvaluation/shall'], resolve),
        children: [
          { name: "交易团品牌评审打分推荐", path: "/brand_evaluation", component: resolve => require(['@/pages/numberArrangements/brandEvaluation/brandEvaluation'], resolve) },
          { name: "交易团推荐品牌企业筛选条件配置", path: "/recommended_enterprise", component: resolve => require(['@/pages/numberArrangements/brandEvaluation/recommendedEnterprise'], resolve) },
          { name: "交易团提交推荐方案", path: "/recommended_plan", component: resolve => require(['@/pages/numberArrangements/brandEvaluation/recommendedPlan'], resolve) },
          { name: "广交会品牌展位评审交易团推荐企业打印报送表", path: "/print_template", component: resolve => require(['@/pages/numberArrangements/brandEvaluation/printTemplate'], resolve) }
        ]
      },
      {
        name: "商协会评审交易团推荐的参评企业",
        path: "/check_recommend_company",
        component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/shall'], resolve),
        children: [
          { name: "审核企业申请", path: "/check_company_apply", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/checkCompanyApply'], resolve) },
          { hidden: true, name: "审核企业资质表", path: "/check_company_apply/review_enterprise_qualiy/:id", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/reviewEnterpriseQualiy'], resolve) },
          { name: "登记企业母子关系及类别表", path: "/regist_parent_child_table", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/registParentChildTable'], resolve) },
          { name: "商协会提交审核评分结果", path: "/submit_score_result", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/submitScoreResult'], resolve) },
          { name: "工作部查看保存商协会提交方案表", path: "/see_coceral_submit_plan", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/seeCoceralSubmitPlan'], resolve) },
          { name: "对比差异比", path: "/contrast_difference_ratio", component: resolve => require(['@/pages/numberArrangements/checkRecommendCompany/contrastDifferenceRatio'], resolve) }
        ]
      },
      { name: "商协会提交品牌数量安排方案", path: '/numberArrangements/businessAssociationSubmission', component: resolve => require(['@/pages/businessAssociationSubmission/businessAssociationSubmission'], resolve) },
      {
        name: "外贸司审定数量调整确定方案并公示、公布方案",
        path: "/see_arrangement",
        component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/shall'], resolve),
        children: [
          { name: "外贸司批复经外贸中心复核的展位数量调整安排方案", path: "/see_arrangement", component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/seeArrangement'], resolve) },
          { name: "外贸司审批并公示安排结果", path: "/issue_public_notice", component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/issuePublicNotice'], resolve) },
          { name: "交易团反馈意见", path: "/register_feedback", component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/registerFeedback'], resolve) },
          { name: "外贸司查看交易团反馈意见汇总", path: "/summary_dissent_table", component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/summaryDissentTable'], resolve) },
          { name: "外贸司公布方案", path: "/release_plan", component: resolve => require(['@/pages/numberArrangements/adjustmentForeignTradeDivision/releasePlan'], resolve) }
        ]
      },
      {
        name: "外贸司公布品牌数量安排方案结果",
        path: "/number_brands",
        component: resolve => require(['@/pages/numberArrangements/numberBrands/shall'], resolve),
        children: [
          { name: "外贸司查看并确认安排方案", path: "/number_brands", component: resolve => require(['@/pages/numberArrangements/numberBrands/numberBrands'], resolve) },
          { name: "收取企业定金情况", path: "/collection_deposit", component: resolve => require(['@/pages/numberArrangements/numberBrands/collectionDeposit'], resolve) },
          { hidden: true, name: "交易团退回展位", path: "/collection_deposit/back_booths_apply/:data", component: resolve => require(['@/pages/numberArrangements/numberBrands/backBoothsApply'], resolve) },
          { name: "交易团查看退回展位列表", path: "/see_back_booths_list", component: resolve => require(['@/pages/numberArrangements/numberBrands/seeBackBoothsList'], resolve) },
          { name: "企业订金情况汇总", path: "/case_summary", component: resolve => require(['@/pages/numberArrangements/numberBrands/caseSummary'], resolve) }
        ]
      },
      {
        hidden: true,
        path: "/back_confirm",
        component: resolve => require(['@/pages/numberArrangements/backConfirm/shall'], resolve),
        children: [
          { hidden: true, path: "/back_confirm", component: resolve => require(['@/pages/numberArrangements/backConfirm/backConfirm'], resolve) },
          { hidden: true, path: "/check_back", component: resolve => require(['@/pages/numberArrangements/backConfirm/checkBack'], resolve) }
        ]
      },
      {
        name: "交易团审核已确认参展品牌企业基本资料",
        path: "/dumpling_audit",
        component: resolve => require(['@/pages/numberArrangements/exhibitionBrand/datum'], resolve), children: [
          { name: "审核企业资质", path: "/dumpling_audit", component: resolve => require(['@/pages/numberArrangements/exhibitionBrand/dumplingAudit'], resolve) },
          { hidden: true, path: "/review_business", component: resolve => require(['@/pages/numberArrangements/exhibitionBrand/reviewBusiness'], resolve) },
          { name: "查询未缴齐订金企业", path: "/derpaid_deposit", component: resolve => require(['@/pages/numberArrangements/exhibitionBrand/derpaidDeposit'], resolve) },
          { hidden: true, path: "/download", component: resolve => require(['@/pages/numberArrangements/exhibitionBrand/download'], resolve) },
          { name: "交易团查看企业退回申请书", path: "/enterprise_return", component: resolve => require(['@/pages/numberArrangements/backConfirm/enterpriseReturn'], resolve) }
        ]
      },
      {
        name: "外贸司公示意见汇总", path: "/departmentSummarize", component: resolve => require(['@/pages/departmentSummarize/department'], resolve)
      },
      {
        name: "商协会重新提交品牌展位数量安排方案", path: "/associationResubmitted", component: resolve => require(['@/pages/numberArrangements/associationResubmitted'], resolve)
      },
      // {
      //   name: "外贸司调整确定品牌展位方案、公示方案", path: "/foreign_department", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/foreignDepartment'], resolve),
      //   children: [
      //     { name: '外贸司查看并确认安排方案', path: "/confirmed_arrangement", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/confirmedArrangement'], resolve) },
      //     {
      //       name: "生成报表", path: "/make", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/make'], resolve),
      //       children: [
      //         { name: "地区汇总表", path: "/area_table", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/areaTable'], resolve) },
      //         { name: "展区汇总表", path: "/exhibition", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/exhibition'], resolve) }
      //       ]
      //     }
      //   ]
      // },
      {
        name: "外贸司调整确定品牌展位方案、公示方案", path: "/foreign_department", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/foreignDepartment'], resolve),
        children: [
          { name: '外贸司查看并确认安排方案', path: "/confirmed_arrangement", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/confirmedArrangement'], resolve) },
          { name: "生成报表", path: "/make", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/make'], resolve) },
          { name: "发布公示公告", path: "/publicNotices", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/publicNotices'], resolve) }        
          // { hidden: true, path: "/area_table", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/areaTable'], resolve) },
          // { hidden: true, path: "/exhibition", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/exhibition'], resolve) }         
        ]
      },
      {
        name: "交易团反馈品牌数量安排方案公示意见", path: "/feedback_brand", component: resolve => require(["@/pages/numberArrangements/feedbackBrand/shall"], resolve),
        children: [
          { name: "交易团反馈品牌数量安排方案公示意见", path: "/feedback_brand", component: resolve => require(["@/pages/numberArrangements/feedbackBrand/feedbackBrand"], resolve) },
          { hidden: true, path: "/download_templatefb", component: resolve => require(["@/pages/numberArrangements/feedbackBrand/downloadTemplateFB"], resolve) }
        ]
      },
      {
        name: "交易团汇总提交退回展位",
        path: "/enterprise_return_apply",
        component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply/shall'], resolve),
        children: [
          { name: "交易团审核企业退回申请", path: "/enterprise_return_apply", component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply/enterpriseReturnApply'], resolve) },
          { hidden: true, name: "退回申请详情页", path: "/enterprise_return_apply/return_apply_details_page/:id", component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply/returnApplyDetailsPage'], resolve) },
          { name: "工作部查看汇总", path: "/work_view", component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply/workView'], resolve) }
        ]
      },
      {
        name: "工作部汇总退回展位并重新安排",
        path: "/generate_return_booth",
        component: resolve => require(['@/pages/numberArrangements/workDepartReturn/shall'], resolve),
        children: [
          { name: "统计生成退回展位企业列表清单", path: "/generate_return_booth", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/generateReturnBooth'], resolve) },
          { name: "各展区重新安排展位数清单", path: "/rearrang_exhibitionArea_booths", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/rearrangExhibitionAreaBooths'], resolve) },
          { name: "工作部按商会交团展区生成统计汇总表", path: "/statistical_summary_table", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/statisticalSummaryTable'], resolve) },
          { name: "商协会提出品牌展位数量重新安排方案", path: "/submit_reschedul_proposal", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/submitReschedulProposal'], resolve) },
          { name: "工作部复审商协会提出的企业品牌展位数量调整安排建议方案", path: "/brand_reschedul_proposal", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/brandReschedulProposal'], resolve) },
          {
            name: "工作部复审品牌展位数量调整安排建议方案",
            path: "/brand_booths_proposal",
            component: resolve => require(['@/pages/numberArrangements/workDepartReturn/shall'], resolve),
            children: [
              { name: "各展区品牌候选企业排序表", path: "/brand_booths_proposal/brand_candidates_table", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/brandCandidatesTable'], resolve) },
              { name: "未安排企业评分比对表", path: "/brand_booths_proposal/no_score_comparison_table", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/noScoreComparisonTable'], resolve) }
            ]
          },
          {
            name: "（已汇总至本届查询）部分品牌展位调整安排情况表", path: "/part_brand_table", component: resolve => require(['@/pages/numberArrangements/workDepartReturn/partBrandTable'], resolve)
          }
        ]
      }
    ]
  }
];
