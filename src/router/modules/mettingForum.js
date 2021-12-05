export default [
  {
    name: '会议论坛',
    path: 'mettingForum',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "论坛系统管理",
        path: "mettingSystemManagement",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "广交会-会议赞助管理", path: '/sponsorsManage', component: resolve => require(['@/pages/mettingForum/systemManagement/sponsorsManage'], resolve) },
          { name: "广交会-嘉宾信息管理", path: '/guestInformationManage', component: resolve => require(['@/pages/mettingForum/systemManagement/guestInformationManage'], resolve) },
          { name: "广交会-听众信息管理", path: '/audienceInformationManage', component: resolve => require(['@/pages/mettingForum/systemManagement/audienceInformationManage'], resolve) },
          { name: "广交会-标签管理", path: '/labelManage', component: resolve => require(['@/pages/mettingForum/systemManagement/labelManage'], resolve) },
          { name: "广交会-类别管理", path: '/categoryManage', component: resolve => require(['@/pages/mettingForum/systemManagement/categoryManage'], resolve) },
          { name: "广交会-行业管理", path: '/professionManage', component: resolve => require(['@/pages/mettingForum/systemManagement/professionManage'], resolve) },
          { name: "广交会-展区管理", path: '/exhibitionAreaManage', component: resolve => require(['@/pages/mettingForum/systemManagement/exhibitionAreaManage'], resolve) },
          { name: "广交会-归属单位管理", path: '/vestingUnitManage', component: resolve => require(['@/pages/mettingForum/systemManagement/vestingUnitManage'], resolve) }
        ]
      },
      { name: "广交会-创建会议论坛", path: '/addMettingForum', component: resolve => require(['@/pages/mettingForum/addMettingForum/addMettingForum'], resolve) },
      { name: "广交会-会议论坛列表", path: '/mettingForumList', component: resolve => require(['@/pages/mettingForum/mettingForumList/mettingForumList'], resolve) },
      { name: "广交会-会议论坛详情", path: '/mettingForumDetail', component: resolve => require(['@/pages/mettingForum/mettingForumList/mettingForumDetail'], resolve) },
      { name: "广交会-会议论坛报名记录", path: '/mettingForumSignupList', component: resolve => require(['@/pages/mettingForum/mettingForumSignup/mettingForumSignupList'], resolve) },
      { name: "广交会-会议论坛留言管理", path: '/mettingForumMsgList', component: resolve => require(['@/pages/mettingForum/mettingForumMsg/mettingForumMsgList'], resolve) },
      { name: "广交会-会议论坛留言详情", path: '/mettingForumMsgDetail', component: resolve => require(['@/pages/mettingForum/mettingForumMsg/mettingForumMsgDetail'], resolve) },
      { name: "广交会-会议赞助审核", path: '/sponsorShipReview', component: resolve => require(['@/pages/mettingForum/sponsorShipReview/sponsorShipReview'], resolve) },
      { name: "听众-会议论坛报名", path: '/mettingForumSignupAduience', component: resolve => require(['@/pages/mettingForum/mettingForumSignupAduience/mettingForumSignupAduience'], resolve) },
      { name: "听众-会议论坛详情", path: '/mettingForumAduienceDetail', component: resolve => require(['@/pages/mettingForum/mettingForumSignupAduience/mettingForumAduienceDetail'], resolve) },
      { name: "听众-会议论坛报名记录详情", path: '/mettingForumAduienceListDetail', component: resolve => require(['@/pages/mettingForum/mettingForumSignupAduience/mettingForumAduienceListDetail'], resolve) },
      { name: "听众-会议论坛报名记录", path: '/mettingForumSignupAduienceList', component: resolve => require(['@/pages/mettingForum/mettingForumSignupAduience/mettingForumSignupAduienceList'], resolve) },
      {
        name: "业务报表",
        path: "businessReports",
        // iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "申请参会机构/演讲嘉宾信息", path: '/participatingAgenciesInformation', component: resolve => require(['@/pages/mettingForum/businessReports/participatingAgenciesInformation'], resolve) },
          { name: "受邀演讲嘉宾信息", path: '/invitedSpeechInformation', component: resolve => require(['@/pages/mettingForum/businessReports/invitedSpeechInformation'], resolve) },
          { name: "演讲嘉宾出席论坛情况", path: '/speackerAttendForumInformation', component: resolve => require(['@/pages/mettingForum/businessReports/speackerAttendForumInformation'], resolve) },
          { name: "演讲嘉宾出席论坛对比表", path: '/speackerAttendForumCompareList', component: resolve => require(['@/pages/mettingForum/businessReports/speackerAttendForumCompareList'], resolve) },
          { name: "听众出席活动统计", path: '/aduiceAttendanceStatistics', component: resolve => require(['@/pages/mettingForum/businessReports/aduiceAttendanceStatistics'], resolve) },
          { name: "听众出席论坛表", path: '/aduiceAttendForumList', component: resolve => require(['@/pages/mettingForum/businessReports/aduiceAttendForumList'], resolve) },
          { name: "赞助商基本信息清单", path: '/sponsorBaseInformationList', component: resolve => require(['@/pages/mettingForum/businessReports/sponsorBaseInformationList'], resolve) },
          { name: "赞助商赞助情况", path: '/sponsorSituationList', component: resolve => require(['@/pages/mettingForum/businessReports/sponsorSituationList'], resolve) },
          { name: "会议论坛总体基本信息清单", path: '/mettingForumInformationList', component: resolve => require(['@/pages/mettingForum/businessReports/mettingForumInformationList'], resolve) },
          { name: "会议论坛类型统计清单", path: '/mettingForumCategoryList', component: resolve => require(['@/pages/mettingForum/businessReports/mettingForumCategoryList'], resolve) },
          { name: "会议论坛具体信息", path: '/mettingForumDetailList', component: resolve => require(['@/pages/mettingForum/businessReports/mettingForumDetailList'], resolve) },
          { name: "会议论坛收费情况", path: '/mettingForumCollectfeesList', component: resolve => require(['@/pages/mettingForum/businessReports/mettingForumCollectfeesList'], resolve) },
          { name: "会议论坛出席情况", path: '/mettingForumAttendList', component: resolve => require(['@/pages/mettingForum/businessReports/mettingForumAttendList'], resolve) }
        ]
      }
    ]
  }
];
