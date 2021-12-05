export default [
  {
    name: "系统管理",
    path: "system",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "1系统信息", path: '/sysSystemInfo', component: resolve => require(['@/pages/manager/sysSystemInfo'], resolve) },
      { name: "1字典信息", path: '/sysDataDict', component: resolve => require(['@/pages/manager/sysDataDict'], resolve) },
      { name: "1用户信息", path: '/sysUser', component: resolve => require(['@/pages/manager/sysUser'], resolve) },
      { name: "1部门信息", path: '/sysDepartment', component: resolve => require(['@/pages/manager/sysDepartment'], resolve) },
      { name: "1菜单信息", path: '/sysMenu', component: resolve => require(['@/pages/manager/sysMenu'], resolve) },
      { name: "1角色信息", path: '/sysRole', component: require('@/pages/manager/sysRole') },
      { name: "1系统评价", path: '/sysFeedbackRate', component: resolve => require(['@/pages/manager/sysFeedbackRate'], resolve) },
      { name: "1百度", path: 'http://www.baidu.com' },
      { hidden: true, name: "", path: '/sysOperation', component: resolve => require(['@/pages/manager/sysOperation'], resolve) },
      { hidden: true, name: "", path: '/sysPermission', component: resolve => require(['@/pages/manager/sysPermission'], resolve) },
      { hidden: true, name: "", path: '/sysUnifyUser', component: resolve => require(['@/pages/manager/sysUnifyUser'], resolve) },
      { hidden: true, name: "", path: '/sysUserRole', component: resolve => require(['@/pages/manager/sysUserRole'], resolve) }
    ]
  }
];
