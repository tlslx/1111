export default [
  {
    name: '公共能力信息',
    path: 'commonInfo',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '组织机构管理', path: '/sysdepartmgr', component: resolve => require(['@/pages/sysmgr/sysdepartmgr'], resolve) },
      { name: '用户管理', path: '/sysusermgr', component: resolve => require(['@/pages/sysmgr/sysusermgr'], resolve) },
      { name: '角色权限管理', path: '/sysrolemgr', component: resolve => require(['@/pages/sysmgr/sysrolemgr'], resolve) },
      { name: '菜单管理', path: '/sysmenumgr', component: resolve => require(['@/pages/sysmgr/sysmenumgr'], resolve) },
      { name: '数据字典管理', path: '/sysdictmgr', component: resolve => require(['@/pages/sysmgr/sysdictmgr'], resolve) },
      { name: '组别管理', path: '/operatorGroupManage', component: resolve => require(['@/pages/ucp/operatorGroup/operatorGroupManage'], resolve) }
    ]
  }
];
