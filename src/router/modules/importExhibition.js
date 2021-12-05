export default [{
  name: '进口展招商',
  path: 'importExhibition',
  iconCls: 'el-icon-info',
  component: resolve => require(['@/components/framework/app/appBlock'], resolve),
  children: [
    {
      name: '归属关系管理',
      path: '/ownershipManagement',
      component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
      children: [
        { name: '个人归属关系管理', path: '/personalRelationmgr', component: resolve => require(['@/pages/importExhibition/ownershipManagement/personalRelation/personalRelationmgr'], resolve) },
        { name: '企业归属关系管理', path: '/enterpriseRelationmgr', component: resolve => require(['@/pages/importExhibition/ownershipManagement/enterpriseRelation/enterpriseRelationmgr'], resolve) },
        { name: '管理员查看历史归属信息', path: '/adminReviewmgr', component: resolve => require(['@/pages/importExhibition/ownershipManagement/adminReviewHistory/adminReviewmgr'], resolve) },
        { name: '企业归属机构管理', path: '/enterpriseOrgmgr', component: resolve => require(['@/pages/importExhibition/ownershipManagement/enterpriseOrg/enterpriseOrgmgr'], resolve) },
        { name: '机构关联企业管理', path: '/organizationEntmgr', component: resolve => require(['@/pages/importExhibition/ownershipManagement/organizationEnt/organizationEntmgr'], resolve) },
        { name: '管理员审核企业机构', path: '/adminAuditEntOrg', component: resolve => require(['@/pages/importExhibition/ownershipManagement/adminAudit/adminAuditEntOrg'], resolve) }
      ]
    },
    {
      name: '外部用户管理',
      path: '/externalUser',
      component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
      children: [
        { name: '用户注册', path: '/enterpriseRegistration', component: resolve => require(['@/pages/importExhibition/externalUserManagement/userRegistration/enterpriseRegistration'], resolve) },
        { hidden: true, path: '/personalRegistration', component: resolve => require(['@/pages/importExhibition/externalUserManagement/userRegistration/personalRegistration'], resolve) },
        { name: '用户登录', path: '/userLogin', component: resolve => require(['@/pages/importExhibition/externalUserManagement/userLogin/userLogin'], resolve) },
        { name: '合作机构用户管理', path: '/cptAgencymgr', component: resolve => require(['@/pages/importExhibition/externalUserManagement/agencyInfo/cptAgencymgr'], resolve) }
      ]
    },
    {
      name: '采购商邀请',
      path: '/buyerInvitation',
      component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
      children: [
        { name: '我的邀请', path: '/buyerInvitation', component: resolve => require(['@/pages/importExhibition/buyerInvitation/buyerInvitation'], resolve) },
        { name: '邀请模板管理', path: '/invitationTemplate', component: resolve => require(['@/pages/importExhibition/buyerInvitation/invitationTemplate'], resolve) },
        { name: '邀请情况统计查询', path: '/invitationStatistics', component: resolve => require(['@/pages/importExhibition/buyerInvitation/invitationStatistics'], resolve) }
      ]
    },
    {
      name: '证件业务',
      path: '/badgeBusiness',
      component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
      children: [
        // {
        //   name: '证件申请',
        //   path: '/badgeApplication',
        //   component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
        //   children: [
        //     { name: '个人用户证件申请', path: '/personalUserBadgeApplication', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/personalUserBadgeApplication'], resolve) },
        //     { name: '查看审核状态', path: '/viewBadgeAuditStatus', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/viewBadgeAuditStatus'], resolve) },
        //     { name: '证件申请审核', path: '/badgeApplicationReview', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/badgeApplicationReview'], resolve) },
        //     { name: '企业管理员提交申请', path: '/entAdminSubmitApplication', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/entAdminSubmitApplication'], resolve) },
        //     { name: '机构管理员提交申请', path: '/agencyAdminSubmitApplication', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/agencyAdminSubmitApplication'], resolve) },
        //     { name: '大会管理员提交申请', path: '/conferenceAdminSubmitApplication', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/conferenceAdminSubmitApplication'], resolve) },
        //     { name: '申请通道控制', path: '/applicationChannelControl', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeApplication/applicationChannelControl'], resolve) }
        //   ]
        // },
        // {
        //   name: '标签设置管理',
        //   path: '/labelSettingManagement',
        //   component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
        //   children: [
        //     { name: '个人用户标签信息', path: '/personalUserLabelInfo', component: resolve => require(['@/pages/importExhibition/badgeBusiness/labelSettingManagement/personalUserLabelInfo'], resolve) },
        //     { name: '企业用户标签信息', path: '/enterpriseUserLabelInfo', component: resolve => require(['@/pages/importExhibition/badgeBusiness/labelSettingManagement/enterpriseUserLabelInfo'], resolve) }
        //   ]
        // },
        {
          name: '办证指标管理',
          path: '/certificationIndexManagement',
          component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
          children: [
            { name: '设置默认指标', path: '/setDefaultIndex', component: resolve => require(['@/pages/importExhibition/badgeBusiness/certificationIndexManagement/setDefaultIndex'], resolve) }
            // { name: '各企业办证指标', path: '/eachEntCertificationIndex', component: resolve => require(['@/pages/importExhibition/badgeBusiness/certificationIndexManagement/eachEntCertificationIndex'], resolve) }
          ]
        },
        // {
        //   name: '资质审核',
        //   path: '/qualificationReview',
        //   component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
        //   children: [
        //     { name: '企业资质审核列表', path: '/qualificationReview', component: resolve => require(['@/pages/importExhibition/badgeBusiness/qualificationReview/qualificationReview'], resolve) },
        //     { name: '客户类型规则设定', path: '/customerTypeRuleSetting', component: resolve => require(['@/pages/importExhibition/badgeBusiness/qualificationReview/customerTypeRuleSetting'], resolve) }
        //   ]
        // },
        {
          name: '证件费用管理',
          path: '/badgeCostManagement',
          component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
          children: [
            { name: '证件费用规则', path: '/badgeCostRules', component: resolve => require(['@/pages/importExhibition/badgeBusiness/badgeCostManagement/badgeCostRules'], resolve) }
          ]
        },
        {
          name: '申请截止时间管理',
          path: '/applicationDeadlineManagement',
          component: resolve => require(['@/pages/importExhibition/importExb'], resolve),
          children: [
            { name: '申请截止时间', path: '/applicationDeadline', component: resolve => require(['@/pages/importExhibition/badgeBusiness/applicationDeadlineManagement/applicationDeadline'], resolve) }
          ]
        }
      ]
    }
  ]
}];
