export default [
  {
    name: "展位安排",
    path: "stallplan",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "规则设置", path: '/stallplan/rule', component: resolve => require(['@/pages/stallplan/rule'], resolve) },
      { name: "位置安排", path: '/stallplan/seat', component: resolve => require(['@/pages/stallplan/seat'], resolve) },
      { name: "外包审核", path: '/stallplan/seatOutsourceReview', component: resolve => require(['@/pages/stallplan/seatOutsourceReview'], resolve) },
      { name: "工作部审核", path: '/stallplan/seatWorkReview', component: resolve => require(['@/pages/stallplan/seatWorkReview'], resolve) },
      { name: "外贸司审核", path: '/stallplan/seatForeignReview', component: resolve => require(['@/pages/stallplan/seatForeignReview'], resolve) },
      { name: "展位调整申请", path: '/stallplan/adjustmentApplition', component: resolve => require(['@/pages/stallplan/adjustmentApplition'], resolve) },
      { hidden: true, name: "展位调整申请新增表单", path: '/stallplan/applyDialog', component: resolve => require(['@/pages/stallplan/adjustmentApplition/components/applyDialog'], resolve) },
      {
        name: "展位调整审核",
        path: 'adjustmentReview',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "交易团审核", path: '/stallplan/businessDelegation', component: resolve => require(['@/pages/stallplan/adjustmentReview/businessDelegation'], resolve) },
          { name: "商协会审核", path: '/stallplan/businessAssociation', component: resolve => require(['@/pages/stallplan/adjustmentReview/businessAssociation'], resolve) },
          { name: "商协会位置安排", path: '/stallplan/reviewArrangement', component: resolve => require(['@/pages/stallplan/adjustmentReview/reviewArrangement'], resolve) },
          { name: "补丁方案工作部审核", path: '/stallplan/workDepartmentReview', component: resolve => require(['@/pages/stallplan/adjustmentReview/workDepartment/review'], resolve) },
          { name: "补丁方案外贸司审核", path: '/stallplan/foreignTradeReview', component: resolve => require(['@/pages/stallplan/adjustmentReview/foreignTradeDepartment/review'], resolve) },
          { hidden: true, name: "外贸司审核汇总", path: '/stallplan/foreignTradeDepartment', component: resolve => require(['@/pages/stallplan/adjustmentReview/foreignTradeDepartment'], resolve) },
          { hidden: true, name: "工作部汇总", path: '/stallplan/workDepartment', component: resolve => require(['@/pages/stallplan/adjustmentReview/workDepartment'], resolve) },
          { hidden: true, name: "展位审核在线安排", path: '/stallplan/reviewArea', component: resolve => require(['@/pages/stallplan/adjustmentReview/reviewArea'], resolve) },
          { hidden: true, name: "位置调整", path: '/stallplan/reviewForm', component: resolve => require(['@/pages/stallplan/adjustmentReview/businessDelegation/components/reviewForm'], resolve) },
          { hidden: true, name: "交易团/商协会审核页面", path: '/stallplan/businessCheck', component: resolve => require(['@/pages/stallplan/adjustmentReview/businessDelegation/components/businessCheck'], resolve) }
        ]
      },
      { hidden: true, name: "修改布展类型", path: '/stallplan/modifyExhibitionType', component: resolve => require(['@/pages/stallplan/modifyExhibitionType'], resolve) },
      { hidden: true, name: "在线安排", path: '/stallplan/area', component: resolve => require(['@/pages/stallplan/area'], resolve) },
      { hidden: true, name: "查看进度", path: '/stallplan/schedule', component: resolve => require(['@/pages/stallplan/schedule'], resolve) }
    ]
  }, {
    name: "展位安排demo",
    path: "stallplanDemo",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "规则设置 ", path: '/rule', component: resolve => require(['@/pages/stallplanDemo/rule'], resolve) },
      { name: "位置安排 ",
        path: 'seat',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "位置安排申请", path: '/seatApply', component: resolve => require(['@/pages/stallplanDemo/seatApply'], resolve) },
          { name: "位置安排审核", path: '/seatReview', component: resolve => require(['@/pages/stallplanDemo/seatReview'], resolve) },
          { hidden: true, name: "在线安排 ", path: '/stallplanDemo/seatArea', component: resolve => require(['@/pages/stallplanDemo/seatArea'], resolve) },
          { hidden: true, name: "查看进度 ", path: '/stallplanDemo/schedule', component: resolve => require(['@/pages/stallplanDemo/schedule'], resolve) },
          { name: "位置安排方案公示公布", path: '/seatPublicity', component: resolve => require(['@/pages/stallplanDemo/seatRelease'], resolve) },
          { name: "插件联调", path: '/pluginDemo', component: resolve => require(['@/pages/stallplanDemo/pluginDemo'], resolve) },
          { hidden: true, name: "插件联调查看", path: '/pluginDemoArea', component: resolve => require(['@/pages/stallplanDemo/pluginDemoArea'], resolve) }
        ]
      },
      { name: "展位调整",
        path: 'demo',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          // {
          //   name: "展位调整申请",
          //   path: '/adjustment',
          //   component: resolve => require(['@/components/framework/app/appBlock'], resolve),
          //   children: [
          { name: "展位调整申请新增", path: '/adjustmentApplition', component: resolve => require(['@/pages/stallplanDemo/adjustmentApplition'], resolve) },
          { hidden: true, name: "展位调整申请新增表单 ", path: '/stallplanDemo/applyDialog', component: resolve => require(['@/pages/stallplanDemo/applyDialog'], resolve) },
          { name: "展位调整申请审核", path: '/adjustmentReview', component: resolve => require(['@/pages/stallplanDemo/adjustmentReview'], resolve) },
          { hidden: true, name: "展位调整申请查看", path: '/stallplanDemo/businessCheck', component: resolve => require(['@/pages/stallplanDemo/businessCheck'], resolve) },
          //   ]
          // }, {
          //   name: "补丁方案",
          //   path: 'patchScheme',
          //   component: resolve => require(['@/components/framework/app/appBlock'], resolve),
          //   children: [
          { name: "补丁方案新增", path: '/patchSchemeAdd', component: resolve => require(['@/pages/stallplanDemo/patchSchemeAdd'], resolve) },
          { hidden: true, name: "补丁方案查看 ", path: '/stallplanDemo/patchSchemeArea', component: resolve => require(['@/pages/stallplanDemo/patchSchemeArea'], resolve) },
          { name: "补丁方案审核", path: '/patchSchemeReview', component: resolve => require(['@/pages/stallplanDemo/patchSchemeReview'], resolve) },
          { name: "补丁方案公示公布", path: '/patchSchemePublicity', component: resolve => require(['@/pages/stallplanDemo/patchRelease'], resolve) }
            // ]
          // }
        ]
      },
      { hidden: true, name: "修改布展类型", path: '/stallplan/modifyExhibitionType', component: resolve => require(['@/pages/stallplan/modifyExhibitionType'], resolve) }
    ]
  }
];
