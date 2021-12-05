export default [
  {
    name: '展览基础信息',
    path: 'exhBasicInfo',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '展览场地管理', path: '/exhSiteManage', component: resolve => require(['@/pages/exhBasicInfo/exhSiteManage'], resolve) }
    ]
  }
];
