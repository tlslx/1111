export default [
  {
    name: 'CF奖',
    path: 'diversification',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "企业申报CF奖",
        path: "enterpriseInformation",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "完善企业信息", path: '/perfectInformation', component: resolve => require(['@/pages/diversification/declare/perfectInformation'], resolve) },
          { name: "CF评选产品信息", path: '/productList', component: resolve => require(['@/pages/diversification/declare/productList'], resolve) },
          { name: "承诺书", path: '/commitment', component: resolve => require(['@/pages/diversification/declare/commitment'], resolve) },
          { name: "新增CF评选产品", path: '/addCfProduct', component: resolve => require(['@/pages/diversification/declare/addCfProduct'], resolve) },
          { name: "设计师信息管理", path: '/designerManagerment', component: resolve => require(['@/pages/diversification/declare/designerManagerment'], resolve) },
          { name: "设计师基本信息", path: '/designerInformation', component: resolve => require(['@/pages/diversification/declare/designerInformation'], resolve) }
        ]
      },
      {
        name: "CF奖系统管理",
        path: "cfSystemManagement",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "CF奖评选活动信息", path: '/competitionInformation', component: resolve => require(['@/pages/diversification/systemManagement/competitionInformation'], resolve) },
          { name: "产品大类管理", path: '/productCategories', component: resolve => require(['@/pages/diversification/systemManagement/productCategories'], resolve) },
          { name: "展区管理", path: '/exhibitionAreaManagement', component: resolve => require(['@/pages/diversification/systemManagement/exhibitionAreaManagement'], resolve) },
          { name: "用户管理", path: '/userManagement', component: resolve => require(['@/pages/diversification/systemManagement/userManagement'], resolve) },
          { name: "新增用户", path: '/addUser', component: resolve => require(['@/pages/diversification/systemManagement/addUser'], resolve) },
          { name: "角色权限信息", path: '/roleManagement', component: resolve => require(['@/pages/diversification/systemManagement/roleManagement'], resolve) }
        ]
      },
      {
        name: "CF奖评审",
        path: "cfReview",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "CF奖资质审核列表", path: '/cfReviewList', component: resolve => require(['@/pages/diversification/cfReview/cfReviewList'], resolve) },
          { name: "产品初评列表", path: '/productReviewList', component: resolve => require(['@/pages/diversification/cfReview/productReviewList'], resolve) },
          { name: "产品终评列表", path: '/productReviewListEnd', component: resolve => require(['@/pages/diversification/cfReview/productReviewListEnd'], resolve) },
          { name: "产品已发布列表", path: '/productReleasedList', component: resolve => require(['@/pages/diversification/cfReview/productReleasedList'], resolve) },
          { name: "评审投票信息", path: '/reviewVotinginformation', component: resolve => require(['@/pages/diversification/cfReview/reviewVotinginformation'], resolve) },
          { name: "企业信息编辑", path: '/productInfomationEdit', component: resolve => require(['@/pages/diversification/cfReview/productInfomationEdit'], resolve) },
          { name: "企业信息展示", path: '/productInfomationDetail', component: resolve => require(['@/pages/diversification/cfReview/productInfomationDetail'], resolve) },
          { name: "投票统计", path: '/voteStatistics', component: resolve => require(['@/pages/diversification/cfReview/voteStatistics'], resolve) }
        ]
      },
      {
        name: "CF奖专家投票",
        path: "cfExpertsVote",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "产品初评投票", path: '/productsInitialvote', component: resolve => require(['@/pages/diversification/cfExpertsVote/productsInitialvote'], resolve) },
          { name: "产品基本信息（初评）", path: '/productBasicInformation', component: resolve => require(['@/pages/diversification/cfExpertsVote/productBasicInformation'], resolve) },
          { name: "产品终评投票", path: '/productsEndVote', component: resolve => require(['@/pages/diversification/cfExpertsVote/productsEndVote'], resolve) },
          { name: "产品基本信息(终评)", path: '/productBasicInformationEnd', component: resolve => require(['@/pages/diversification/cfExpertsVote/productBasicInformationEnd'], resolve) }
        ]
      }
      // ,
      // {
      //   name: "业务报表",
      //   path: "businessReport",
      //   // iconCls: "el-icon-info",
      //   component: resolve => require(['@/components/framework/app/appBlock'], resolve),
      //   children: [
      //     { name: "产品评委投票情况", path: '/productsJudges', component: resolve => require(['@/pages/diversification/businessReport/productsJudges'], resolve) },
      //     { name: "参评企业基本信息清单", path: '/eligibleEnterprisesInformationList', component: resolve => require(['@/pages/diversification/businessReport/eligibleEnterprisesInformationList'], resolve) },
      //     { name: "设计机构基本信息清单", path: '/designAgencyInformationList', component: resolve => require(['@/pages/diversification/businessReport/designAgencyInformationList'], resolve) },
      //     { name: "参评产品总体情况清单", path: '/eligibleProductInformationList', component: resolve => require(['@/pages/diversification/businessReport/eligibleProductInformationList'], resolve) },
      //     { name: "参评产品评审情况清单", path: '/eligibleProductsReviewList', component: resolve => require(['@/pages/diversification/businessReport/eligibleProductsReviewList'], resolve) }
      //   ]
      // }
    ]
  }
];
