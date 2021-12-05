export default [
  {
    name: '展览基础信息',
    path: 'sysmgr',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '用户管理', path: '/sysusermgr', component: resolve => require(['@/pages/sysmgr/sysusermgr'], resolve) },
      { name: '角色权限管理', path: '/sysrolemgr', component: resolve => require(['@/pages/sysmgr/sysrolemgr'], resolve) }
    ]
  }
];
