export default [
  {
    name: '综合查询',
    path: 'integratedQuery',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "企业展位申请情况",
        path: "enterpriseBoothApplication",
        component: resolve => require(['@/pages/integratedQuery/enterpriseBoothApplication'], resolve),
        children: [
          { name: "按展区查询展位申请情况", path: '/searchForBooth', component: resolve => require(['@/pages/integratedQuery/enterpriseBoothApplication/searchForBooth'], resolve) },
          { name: "各交易团各展区申请情况汇总", path: '/eachTradingGroup', component: resolve => require(['@/pages/integratedQuery/enterpriseBoothApplication/eachTradingGroup'], resolve) },
          { name: "申请不合格原因查询", path: '/unqualifiedApplica', component: resolve => require(['@/pages/integratedQuery/enterpriseBoothApplication/unqualifiedApplica'], resolve) }
        ]
      }
    ]
  }
];
