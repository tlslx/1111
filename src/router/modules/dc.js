
export default [
  {
    hidden: true,
    name: "平时车证管理",
    path: "平时车证管理",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "车证申请", path: '/dcParkingpermitApply', component: resolve => require(['@/pages/dc/dcParkingpermitApply'], resolve) },
      { name: "车证申请明细", path: '/dcParkingpermitApplyDetail', component: resolve => require(['@/pages/dc/dcParkingpermitApplyDetail'], resolve) },
      { hidden: true, path: '/dcParkingpermitApplyDetailReport', component: resolve => require(['@/pages/dc/dcParkingpermitApplyDetailReport'], resolve) },
      { hidden: true, path: '/dcParkingpermitApplyDetailReport2', component: resolve => require(['@/pages/dc/dcParkingpermitApplyDetailReport2'], resolve) },
      { hidden: true, path: '/dcDeptCountReport', component: resolve => require(['@/pages/dc/dcDeptCountReport'], resolve) },
      { hidden: true, path: '/dcDeptSettleReport', component: resolve => require(['@/pages/dc/dcDeptSettleReport'], resolve) },
      { name: "黑名单", path: '/dcParkingpermitBlacklist', component: resolve => require(['@/pages/dc/dcParkingpermitBlacklist'], resolve) },
      { name: "车证违章", path: '/dcParkingpermitViolation', component: resolve => require(['@/pages/dc/dcParkingpermitViolation'], resolve) },
      { name: "车证失效", path: '/dcParkingpermitInvalid', component: resolve => require(['@/pages/dc/dcParkingpermitInvalid'], resolve) },
      { name: "车证类型", path: '/dcParkingpermitType', component: resolve => require(['@/pages/dc/dcParkingpermitType'], resolve) },
      { name: "停车位置", path: '/dcParkingpermitParkingPlace', component: resolve => require(['@/pages/dc/dcParkingpermitParkingPlace'], resolve) },
      { name: "服务单位", path: '/dcParkingpermitServerUnit', component: resolve => require(['@/pages/dc/dcParkingpermitServerUnit'], resolve) }
    ]
  }
];
