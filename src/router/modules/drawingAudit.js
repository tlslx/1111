export default [
//  {
//    name: '首页',
//    path: '/onlineServiceHomePage',
//    iconCls: 'el-icon-info',
//    component: resolve => require(['@/pages/onlineService/homePage'], resolve)
//  },
  {
    name: '施工企业违规管理业务',
    path: 'badManagement',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '违规报告', path: '/violationCommit', component: resolve => require(['@/pages/drawingAudit/badManagement/violationCommit'], resolve) },
      { name: '施工违规报告', path: '/violationReportResult', component: resolve => require(['@/pages/drawingAudit/badManagement/violationReportResult'], resolve) },
      { name: '惩罚处理', path: '/violationPunishment', component: resolve => require(['@/pages/drawingAudit/badManagement/violationPunishment'], resolve) },
      { name: '查看/导出违规名单', path: '/violationList', component: resolve => require(['@/pages/drawingAudit/badManagement/violationList'], resolve) }
    ]
  }
];
