export default [
  // {
  //   name: "品牌展位数量安排管理",
  //   path: "number_arrangements",
  //   component: resolve => require(['@/components/framework/app/appBody'], resolve),
  //   children: [
  //     {
  //       name: "整体展位数量进度计划安排设置",
  //       path: '/normal_schedule',
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "整体安排", path: "/normal_schedule", component: resolve => require(['@/pages/numberArrangements/brandBooth'], resolve) },
  //         { name: "特殊安排", path: "/special_arrangements", component: resolve => require(['@/pages/numberArrangements/specialArrangements'], resolve) }
  //       ]
  //     },
  //     { name: "工作部品牌评审规则设置", path: '/brand_work_department', component: resolve => require(['@/pages/numberArrangements/brandWorkDepartment'], resolve) },
  //     {
  //       name: "企业展位申请管理",
  //       path: '/company_information',
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "公司资料管理", path: "/company_information", component: resolve => require(['@/pages/numberArrangements/companyInformation'], resolve) },
  //         { name: "企业展品管理", path: "/exhibit_information", component: resolve => require(['@/pages/numberArrangements/exhibitInformation'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "交易团审核企业参展资格",
  //       path: "/trade_group_audit",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { hidden: true, path: "/basic_information", component: resolve => require(['@/pages/numberArrangements/basicInformation'], resolve) },
  //         { name: "交易团审核企业基本信息", path: "/audit_firms", component: resolve => require(['@/pages/numberArrangements/auditFirms'], resolve) },
  //         { name: "交易团登记企业母子关系审核", path: "/motherchild_relation", component: resolve => require(['@/pages/numberArrangements/motherchildRelation'], resolve) },
  //         { name: "交易团管理员查看企业申请", path: "/administrator_view", component: resolve => require(['@/pages/numberArrangements/administratorView'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "交易团品牌评审打分推荐",
  //       path: "/brand_evaluation",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "交易团品牌评审打分推荐", path: "/brand_evaluation", component: resolve => require(['@/pages/numberArrangements/brandEvaluation'], resolve) },
  //         { name: "交易团推荐品牌企业筛选条件配置", path: "/recommended_enterprise", component: resolve => require(['@/pages/numberArrangements/recommendedEnterprise'], resolve) },
  //         { name: "交易团提交推荐方案", path: "/recommended_plan", component: resolve => require(['@/pages/numberArrangements/recommendedPlan'], resolve) },
  //         { name: "广交会品牌展位评审交易团推荐企业打印报送表", path: "/print_template", component: resolve => require(['@/pages/numberArrangements/printTemplate'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "商协会评审交易团推荐的参评企业",
  //       path: "/check_recommend_company",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "审核企业申请", path: "/check_company_apply", component: resolve => require(['@/pages/numberArrangements/checkCompanyApply'], resolve) },
  //         { hidden: true, name: "审核企业资质表", path: "/check_company_apply/review_enterprise_qualiy/:id", component: resolve => require(['@/pages/numberArrangements/reviewEnterpriseQualiy'], resolve) },
  //         { name: "登记企业母子关系及类别表", path: "/regist_parent_child_table", component: resolve => require(['@/pages/numberArrangements/registParentChildTable'], resolve) },
  //         { name: "商协会提交审核评分结果", path: "/submit_score_result", component: resolve => require(['@/pages/numberArrangements/submitScoreResult'], resolve) },
  //         { name: "工作部查看保存商协会提交方案表", path: "/see_coceral_submit_plan", component: resolve => require(['@/pages/numberArrangements/seeCoceralSubmitPlan'], resolve) },
  //         { name: "对比差异比", path: "/contrast_difference_ratio", component: resolve => require(['@/pages/numberArrangements/contrastDifferenceRatio'], resolve) }
  //       ]
  //     },
  //     { name: "商协会提交品牌数量安排方案", path: '/business_association_submission', component: resolve => require(['@/pages/numberArrangements/businessAssociationSubmission'], resolve) },
  //     {
  //       name: "外贸司审定数量调整确定方案并公示、公布方案",
  //       path: "/see_arrangement",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "外贸司批复经外贸中心复核的展位数量调整安排方案", path: "/see_arrangement", component: resolve => require(['@/pages/numberArrangements/seeArrangement'], resolve) },
  //         { name: "外贸司审批并公示安排结果", path: "/issue_public_notice", component: resolve => require(['@/pages/numberArrangements/issuePublicNotice'], resolve) },
  //         { name: "交易团反馈意见", path: "/register_feedback", component: resolve => require(['@/pages/numberArrangements/registerFeedback'], resolve) },
  //         { name: "外贸司查看交易团反馈意见汇总", path: "/summary_dissent_table", component: resolve => require(['@/pages/numberArrangements/summaryDissentTable'], resolve) },
  //         { name: "外贸司公布方案", path: "/release_plan", component: resolve => require(['@/pages/numberArrangements/releasePlan'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "外贸司公布品牌数量安排方案结果",
  //       path: "/number_brands",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "外贸司查看并确认安排方案", path: "/number_brands", component: resolve => require(['@/pages/numberArrangements/numberBrands'], resolve) },
  //         { name: "收取企业定金情况", path: "/collection_deposit", component: resolve => require(['@/pages/numberArrangements/collectionDeposit'], resolve) },
  //         { hidden: true, name: "交易团退回展位", path: "/collection_deposit/back_booths_apply/:data", component: resolve => require(['@/pages/numberArrangements/backBoothsApply'], resolve) },
  //         { name: "交易团查看退回展位列表", path: "/see_back_booths_list", component: resolve => require(['@/pages/numberArrangements/seeBackBoothsList'], resolve) },
  //         { name: "企业订金情况汇总", path: "/case_summary", component: resolve => require(['@/pages/numberArrangements/caseSummary'], resolve) }
  //       ]
  //     },
  //     {
  //       hidden: true,
  //       path: "/back_confirm",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { hidden: true, path: "/back_confirm", component: resolve => require(['@/pages/numberArrangements/backConfirm'], resolve) },
  //         { hidden: true, path: "/check_back", component: resolve => require(['@/pages/numberArrangements/checkBack'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "交易团审核已确认参展品牌企业基本资料",
  //       path: "/dumpling_audit",
  //       component: resolve => require(['@/pages/numberArrangements/datum'], resolve), children: [
  //         { name: "审核企业资质", path: "/dumpling_audit", component: resolve => require(['@/pages/numberArrangements/dumplingAudit'], resolve) },
  //         { hidden: true, path: "/review_business", component: resolve => require(['@/pages/numberArrangements/reviewBusiness'], resolve) },
  //         { name: "查询未缴齐订金企业", path: "/derpaid_deposit", component: resolve => require(['@/pages/numberArrangements/derpaidDeposit'], resolve) },
  //         { hidden: true, path: "/download", component: resolve => require(['@/pages/numberArrangements/download'], resolve) },
  //         { name: "交易团查看企业退回申请书", path: "/enterprise_return", component: resolve => require(['@/pages/numberArrangements/enterpriseReturn'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "外贸司公示意见汇总", path: "/department_summarize", component: resolve => require(['@/pages/numberArrangements/department'], resolve)
  //     },
  //     {
  //       name: "商协会重新提交品牌展位数量安排方案", path: "/association_resubmitted", component: resolve => require(['@/pages/numberArrangements/associationResubmitted'], resolve)
  //     },
  //     // {
  //     //   name: "外贸司调整确定品牌展位方案、公示方案", path: "/foreign_department", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/foreignDepartment'], resolve),
  //     //   children: [
  //     //     { name: '外贸司查看并确认安排方案', path: "/confirmed_arrangement", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/confirmedArrangement'], resolve) },
  //     //     {
  //     //       name: "生成报表", path: "/make", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/make'], resolve),
  //     //       children: [
  //     //         { name: "地区汇总表", path: "/area_table", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/areaTable'], resolve) },
  //     //         { name: "展区汇总表", path: "/exhibition", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/exhibition'], resolve) }
  //     //       ]
  //     //     }
  //     //   ]
  //     // },
  //     {
  //       name: "外贸司调整确定品牌展位方案、公示方案", path: "/foreign_department", component: resolve => require(['@/pages/numberArrangements/foreignDepartment'], resolve),
  //       children: [
  //         { name: '外贸司查看并确认安排方案', path: "/confirmed_arrangement", component: resolve => require(['@/pages/numberArrangements/confirmedArrangement'], resolve) },
  //         { name: "生成报表", path: "/make", component: resolve => require(['@/pages/numberArrangements/make'], resolve) },
  //         { name: "发布公示公告", path: "/publicNotices", component: resolve => require(['@/pages/numberArrangements/publicNotices'], resolve) }
  //         // { hidden: true, path: "/area_table", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/areaTable'], resolve) },
  //         // { hidden: true, path: "/exhibition", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/exhibition'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "交易团反馈品牌数量安排方案公示意见", path: "/feedback_brand", component: resolve => require(["@/pages/numberArrangements/shall"], resolve),
  //       children: [
  //         { name: "交易团反馈品牌数量安排方案公示意见", path: "/feedback_brand", component: resolve => require(["@/pages/numberArrangements/feedbackBrand"], resolve) },
  //         { hidden: true, path: "/download_templatefb", component: resolve => require(["@/pages/numberArrangements/downloadTemplateFB"], resolve) }
  //       ]
  //     },
  //     {
  //       name: "交易团汇总提交退回展位",
  //       path: "/enterprise_return_apply",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "交易团审核企业退回申请", path: "/enterprise_return_apply", component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply'], resolve) },
  //         { hidden: true, name: "退回申请详情页", path: "/enterprise_return_apply/return_apply_details_page/:id", component: resolve => require(['@/pages/numberArrangements/returnApplyDetailsPage'], resolve) },
  //         { name: "工作部查看汇总", path: "/work_view", component: resolve => require(['@/pages/numberArrangements/workView'], resolve) }
  //       ]
  //     },
  //     {
  //       name: "工作部汇总退回展位并重新安排",
  //       path: "/generate_return_booth",
  //       component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //       children: [
  //         { name: "统计生成退回展位企业列表清单", path: "/generate_return_booth", component: resolve => require(['@/pages/numberArrangements/generateReturnBooth'], resolve) },
  //         { name: "各展区重新安排展位数清单", path: "/rearrang_exhibitionArea_booths", component: resolve => require(['@/pages/numberArrangements/rearrangExhibitionAreaBooths'], resolve) },
  //         { name: "工作部按商会交团展区生成统计汇总表", path: "/statistical_summary_table", component: resolve => require(['@/pages/numberArrangements/statisticalSummaryTable'], resolve) },
  //         { name: "商协会提出品牌展位数量重新安排方案", path: "/submit_reschedul_proposal", component: resolve => require(['@/pages/numberArrangements/submitReschedulProposal'], resolve) },
  //         { name: "工作部复审商协会提出的企业品牌展位数量调整安排建议方案", path: "/brand_reschedul_proposal", component: resolve => require(['@/pages/numberArrangements/brandReschedulProposal'], resolve) },
  //         {
  //           name: "工作部复审品牌展位数量调整安排建议方案",
  //           path: "/brand_booths_proposal",
  //           component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
  //           children: [
  //             { name: "各展区品牌候选企业排序表", path: "/brand_booths_proposal/brand_candidates_table", component: resolve => require(['@/pages/numberArrangements/brandCandidatesTable'], resolve) },
  //             { name: "未安排企业评分比对表", path: "/brand_booths_proposal/no_score_comparison_table", component: resolve => require(['@/pages/numberArrangements/noScoreComparisonTable'], resolve) }
  //           ]
  //         },
  //         {
  //           name: "（已汇总至本届查询）部分品牌展位调整安排情况表", path: "/part_brand_table", component: resolve => require(['@/pages/numberArrangements/partBrandTable'], resolve)
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    name: "品牌展位数量安排管理",
    path: "numberArrangements",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      { name: "1.品牌企业参展确认情况查询", path: '/brandExhibitionInquiry', component: resolve => require(['@/pages/numberArrangements/brandExhibitionInquiry'], resolve) },
      {
        name: "2.交易团汇总提交退回展位",
        path: "/enterpriseReturnApply",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "交易团审核企业退回申请", path: "/enterpriseReturnApply", component: resolve => require(['@/pages/numberArrangements/enterpriseReturnApply'], resolve) },
          { hidden: true, name: "退回申请详情页", path: "/returnApplyDetailsPage", component: resolve => require(['@/pages/numberArrangements/returnApplyDetailsPage'], resolve) },
          { hidden: true, name: "交易团发起申请", path: "/returnApplyPage", component: resolve => require(['@/pages/numberArrangements/returnApplyPage'], resolve) },
          { hidden: true, name: "交易团发起申请打印页", path: "/returnApplyPagePrint", component: resolve => require(['@/pages/numberArrangements/returnApplyPagePrint'], resolve) },
          { name: "工作部查看汇总", path: "/workView", component: resolve => require(['@/pages/numberArrangements/workView'], resolve) }
        ]
      },
      {
        name: "3.工作部汇总退回展位并重新安排",
        path: "/generateReturnBooth",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "31.统计生成退回展位企业列表清单", path: "/generateReturnBooth", component: resolve => require(['@/pages/numberArrangements/generateReturnBooth'], resolve) },
          { name: "32.含退回情况汇总", path: "/rearrangExhibitionAreaBooths", component: resolve => require(['@/pages/numberArrangements/rearrangExhibitionAreaBooths'], resolve) },
          { name: "33.分类统计", path: "/statisticalSummaryTable", component: resolve => require(['@/pages/numberArrangements/statisticalSummaryTable'], resolve) },
          { name: "品牌展位退回情况汇总", path: "/brandBack", component: resolve => require(['@/pages/numberArrangements/brandBack'], resolve) },
          { name: "工作部复审商协会提出的企业品牌展位数量调整安排建议方案", path: "/brandReschedulProposal", component: resolve => require(['@/pages/numberArrangements/brandReschedulProposal'], resolve) },
          // {
          //   name: "工作部复审品牌展位数量调整安排建议方案",
          //   path: "/brandBoothsProposal",
          //   component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
          //   children: [
          //     { name: "各展区品牌候选企业排序表", path: "/brandCandidatesTable", component: resolve => require(['@/pages/numberArrangements/brandCandidatesTable'], resolve) },
          //     { name: "未安排企业清单表", path: "/noScoreComparisonTable", component: resolve => require(['@/pages/numberArrangements/noScoreComparisonTable'], resolve) }
          //   ]
          // },
          {
            name: "（已汇总至本届查询）部分品牌展位调整安排情况表", path: "/partBrandTable", component: resolve => require(['@/pages/numberArrangements/partBrandTable'], resolve)
          }
        ]
      },
      {
        name: "4.商协会提出品牌展位数量重新安排方案",
        path: '/companyInformation',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "1.待安排展位数清单", path: "/arrangBooths", component: resolve => require(['@/pages/numberArrangements/arrangBooths'], resolve) },
          { name: "2.查看待安排展位数", path: "/seeArrangeBoothList", component: resolve => require(['@/pages/numberArrangements/seeArrangeBoothList'], resolve) },
          { name: "3.商协会提出品牌展位数量重新安排方案", path: "/submitReschedulProposal", component: resolve => require(['@/pages/numberArrangements/submitReschedulProposal'], resolve) },
          { name: "商协会页面", path: "/businessAssociationPage", component: resolve => require(['@/pages/numberArrangements/businessAssociationPage'], resolve) },
          { name: "提交安排方案打印页", path: "/submitReschedulProposalPrint", component: resolve => require(['@/pages/numberArrangements/submitReschedulProposalPrint'], resolve) }
          // { name: "未安排企业清单表", path: "/noScoreComparisonTable", component: resolve => require(['@/pages/numberArrangements/noScoreComparisonTable'], resolve) }
        ]
      },
      {
        name: "5.复核品牌展位调整安排方案",
        path: '/checkBrandBoothPlan',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "1.复核调整安排方案", path: "/reviewAdjustmentProgramme", component: resolve => require(['@/pages/numberArrangements/reviewAdjustmentProgramme'], resolve) },
          { name: "2.候选企业排序表", path: "/brandCandidatesTable", component: resolve => require(['@/pages/numberArrangements/brandCandidatesTable'], resolve) },
          { name: "3.未安排企业清单表", path: "/noScoreComparisonTable", component: resolve => require(['@/pages/numberArrangements/noScoreComparisonTable'], resolve) }
        ]
      },
      { name: "6.外贸司审定品牌展位调整安排方案", path: '/approvedForeignTrade', component: resolve => require(['@/pages/numberArrangements/approvedForeignTrade'], resolve) },
      {
        name: "7.品牌展位调整安排方案公示",
        path: '/brandBoothseven',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "外贸司界面", path: "/viewPage", component: resolve => require(['@/pages/numberArrangements/brandBoothseven/foreignTradePage/viewPage'], resolve) },
          { name: "工作部界面", path: "/workviewPage", component: resolve => require(['@/pages/numberArrangements/brandBoothseven/workPage/workviewPage'], resolve) },
          { name: "交易团界面", path: "/jytviewPage", component: resolve => require(['@/pages/numberArrangements/brandBoothseven/internationalPage/jytviewPage'], resolve) },
          { name: "商协会界面", path: "/busAdjustSchedule", component: resolve => require(['@/pages/numberArrangements/brandBoothseven/businessAssociationPage/busAdjustSchedule'], resolve) }
        ]
      },
      {
        name: "8.品牌展位调整安排方案公布",
        path: '/brandBootheight',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "外贸司界面", path: "/eightWorkPage", component: resolve => require(['@/pages/numberArrangements/brandBootheight/foreignTradePage/eightWorkPage'], resolve) },
          { name: "外贸司界面(特殊)", path: "/eightSpecialWorkPage", component: resolve => require(['@/pages/numberArrangements/brandBootheight/foreignTradePage/eightSpecialWorkPage'], resolve) },
          { name: "工作部界面", path: "/eightWorkerPage", component: resolve => require(['@/pages/numberArrangements/brandBootheight/workPage/eightWorkerPage'], resolve) },
          { name: "交易团界面", path: "/eightIntemationPage", component: resolve => require(['@/pages/numberArrangements/brandBootheight/internationalPage/eightIntemationPage'], resolve) },
          { name: "商协会界面", path: "/eightBusinessPage", component: resolve => require(['@/pages/numberArrangements/brandBootheight/businessAssociationPage/eightBusinessPage'], resolve) }
        ]
      },
      {
        name: "整体展位数量进度计划安排设置",
        path: '/normalSchedule',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "整体安排", path: "/normalSchedule", component: resolve => require(['@/pages/numberArrangements/brandBooth'], resolve) },
          { name: "特殊安排", path: "/specialArrangements", component: resolve => require(['@/pages/numberArrangements/specialArrangements'], resolve) }
        ]
      },
      { name: "工作部品牌评审规则设置", path: '/brandWorkDepartment', component: resolve => require(['@/pages/numberArrangements/brandWorkDepartment'], resolve) },
      {
        name: "企业展位申请管理",
        path: '/companyInformation',
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "公司资料管理", path: "/companyInformation", component: resolve => require(['@/pages/numberArrangements/companyInformation'], resolve) },
          { name: "企业展品管理", path: "/exhibitInformation", component: resolve => require(['@/pages/numberArrangements/exhibitInformation'], resolve) }
        ]
      },
      {
        name: "交易团审核企业参展资格",
        path: "/tradeGroupAudit",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { hidden: true, path: "/basicInformation", component: resolve => require(['@/pages/numberArrangements/basicInformation'], resolve) },
          { name: "交易团审核企业基本信息", path: "/auditFirms", component: resolve => require(['@/pages/numberArrangements/auditFirms'], resolve) },
          { name: "交易团登记企业母子关系审核", path: "/motherchildRelation", component: resolve => require(['@/pages/numberArrangements/motherchildRelation'], resolve) },
          { name: "交易团管理员查看企业申请", path: "/administratorView", component: resolve => require(['@/pages/numberArrangements/administratorView'], resolve) }
        ]
      },
      {
        name: "交易团品牌评审打分推荐",
        path: "/brand_evaluation",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "交易团品牌评审打分推荐", path: "/brandEvaluation", component: resolve => require(['@/pages/numberArrangements/brandEvaluation'], resolve) },
          { name: "交易团推荐品牌企业筛选条件配置", path: "/recommendedEnterprise", component: resolve => require(['@/pages/numberArrangements/recommendedEnterprise'], resolve) },
          { name: "交易团提交推荐方案", path: "/recommendedPlan", component: resolve => require(['@/pages/numberArrangements/recommendedPlan'], resolve) },
          { name: "广交会品牌展位评审交易团推荐企业打印报送表", path: "/printTemplate", component: resolve => require(['@/pages/numberArrangements/printTemplate'], resolve) }
        ]
      },
      {
        name: "商协会评审交易团推荐的参评企业",
        path: "/checkRecommendCompany",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "审核企业申请", path: "/checkCompanyApply", component: resolve => require(['@/pages/numberArrangements/checkCompanyApply'], resolve) },
          { hidden: true, name: "审核企业资质表", path: "/reviewEnterpriseQualiy", component: resolve => require(['@/pages/numberArrangements/reviewEnterpriseQualiy'], resolve) },
          { name: "登记企业母子关系及类别表", path: "/registParentChildTable", component: resolve => require(['@/pages/numberArrangements/registParentChildTable'], resolve) },
          { name: "商协会提交审核评分结果", path: "/submitScoreResult", component: resolve => require(['@/pages/numberArrangements/submitScoreResult'], resolve) },
          { name: "工作部查看保存商协会提交方案表", path: "/seeCoceralSubmitPlan", component: resolve => require(['@/pages/numberArrangements/seeCoceralSubmitPlan'], resolve) },
          { name: "工作部输出对比差异表", path: "/contrastDifferenceRatio", component: resolve => require(['@/pages/numberArrangements/contrastDifferenceRatio'], resolve) }
        ]
      },
      { name: "4.商协会提交品牌数量安排方案", path: '/businessAssociationSubmission', component: resolve => require(['@/pages/numberArrangements/businessAssociationSubmission'], resolve) },
      {
        name: "外贸司审定数量调整确定方案并公示、公布方案",
        path: "/seeArrangement",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "外贸司批复经外贸中心复核的展位数量调整安排方案", path: "/seeArrangement", component: resolve => require(['@/pages/numberArrangements/seeArrangement'], resolve) },
          { name: "外贸司审批并公示安排结果", path: "/issuePublicNotice", component: resolve => require(['@/pages/numberArrangements/issuePublicNotice'], resolve) },
          { name: "交易团反馈意见", path: "/registerFeedback", component: resolve => require(['@/pages/numberArrangements/registerFeedback'], resolve) },
          { name: "外贸司查看交易团反馈意见汇总", path: "/summaryDissentTable", component: resolve => require(['@/pages/numberArrangements/summaryDissentTable'], resolve) },
          { name: "外贸司公布方案", path: "/releasePlan", component: resolve => require(['@/pages/numberArrangements/releasePlan'], resolve) }
        ]
      },
      {
        name: "外贸司公布品牌数量安排方案结果",
        path: "/numberBrands",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { name: "外贸司查看并确认安排方案", path: "/numberBrands", component: resolve => require(['@/pages/numberArrangements/numberBrands'], resolve) },
          { name: "收取企业定金情况", path: "/collectionDeposit", component: resolve => require(['@/pages/numberArrangements/collectionDeposit'], resolve) },
          { hidden: true, name: "交易团退回展位", path: "/backBoothsApply", component: resolve => require(['@/pages/numberArrangements/backBoothsApply'], resolve) },
          { name: "交易团查看退回展位列表", path: "/seeBackBoothsList", component: resolve => require(['@/pages/numberArrangements/seeBackBoothsList'], resolve) },
          { name: "企业订金情况汇总", path: "/caseSummary", component: resolve => require(['@/pages/numberArrangements/caseSummary'], resolve) }
        ]
      },
      {
        hidden: true,
        path: "/backConfirm",
        component: resolve => require(['@/pages/numberArrangements/shall'], resolve),
        children: [
          { hidden: true, path: "/backConfirm", component: resolve => require(['@/pages/numberArrangements/backConfirm'], resolve) },
          { hidden: true, path: "/checkBack", component: resolve => require(['@/pages/numberArrangements/checkBack'], resolve) }
        ]
      },
      {
        name: "交易团审核已确认参展品牌企业基本资料",
        path: "/dumplingAudit",
        component: resolve => require(['@/pages/numberArrangements/datum'], resolve), children: [
          { name: "审核企业资质", path: "/dumplingAudit", component: resolve => require(['@/pages/numberArrangements/dumplingAudit'], resolve) },
          { hidden: true, path: "/reviewBusiness", component: resolve => require(['@/pages/numberArrangements/reviewBusiness'], resolve) },
          { name: "查询未缴齐订金企业", path: "/derpaidDeposit", component: resolve => require(['@/pages/numberArrangements/derpaidDeposit'], resolve) },
          { hidden: true, path: "/download", component: resolve => require(['@/pages/numberArrangements/download'], resolve) },
          { name: "交易团查看企业退回申请书", path: "/enterpriseReturn", component: resolve => require(['@/pages/numberArrangements/enterpriseReturn'], resolve) }
        ]
      },
      {
        name: "外贸司公示意见汇总", path: "/departmentSummarize", component: resolve => require(['@/pages/numberArrangements/department'], resolve)
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
        name: "外贸司调整确定品牌展位方案、公示方案", path: "/foreignDepartment", component: resolve => require(['@/pages/numberArrangements/foreignDepartment'], resolve),
        children: [
          { name: '外贸司查看并确认安排方案', path: "/confirmedArrangement", component: resolve => require(['@/pages/numberArrangements/confirmedArrangement'], resolve) },
          { name: "生成报表", path: "/make", component: resolve => require(['@/pages/numberArrangements/make'], resolve) },
          { name: "发布公示公告", path: "/publicNotices", component: resolve => require(['@/pages/numberArrangements/publicNotices'], resolve) }
          // { hidden: true, path: "/area_table", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/areaTable'], resolve) },
          // { hidden: true, path: "/exhibition", component: resolve => require(['@/pages/numberArrangements/departmentSummarize/exhibition'], resolve) }
        ]
      },
      {
        name: "交易团反馈品牌数量安排方案公示意见", path: "/feedbackBrand", component: resolve => require(["@/pages/numberArrangements/shall"], resolve),
        children: [
          { name: "交易团反馈品牌数量安排方案公示意见", path: "/feedbackBrand", component: resolve => require(["@/pages/numberArrangements/feedbackBrand"], resolve) },
          { hidden: true, path: "/downloadTemplatefb", component: resolve => require(["@/pages/numberArrangements/downloadTemplateFB"], resolve) }
        ]
      }
      // {
      //   name: "商协会重新提交品牌展位数量安排方案", path: "/associationResubmitted", component: resolve => require(['@/pages/numberArrangements/associationResubmitted'], resolve)
      // }
    ]
  }
];
