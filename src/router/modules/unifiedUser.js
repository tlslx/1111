export default [
  {
    name: '账号统一管理',
    path: 'unifiedAccount',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '任务信息', path: '/taskInfo', component: resolve => require(['@/pages/unifiedUser/unifiedAccount/taskInfo'], resolve) },
      {
        hidden: true,
        name: '创建任务信息',
        path: '/createTask',
        component: resolve => require(['@/pages/unifiedUser/unifiedAccount/createTask'], resolve)
      },
      { name: '外部用户管理', path: '/externalUser', component: resolve => require(['@/pages/unifiedUser/unifiedAccount/externalUser'], resolve) },
      { name: '内部用户管理', path: '/formalUser', component: resolve => require(['@/pages/unifiedUser/unifiedAccount/formalUser'], resolve) }
    ]
  },
  {
    name: '在线用户信息查询',
    path: 'onlineQuery',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '用户信息查询', path: '/sysSsoOnlineInfo', component: resolve => require(['@/pages/unifiedUser/onlineQuery/sysSsoOnlineInfo'], resolve) }
    ]
  },
  {
    name: '系统授权认证管理',
    path: 'systemManagment',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '部门信息', path: '/departmentInfo', component: resolve => require(['@/pages/unifiedUser/systemManagement/departmentInfo'], resolve) },
      { name: '菜单信息', path: '/menuInfo', component: resolve => require(['@/pages/unifiedUser/systemManagement/menuInfo'], resolve) },
      { name: '角色信息', path: '/roleInfo', component: resolve => require(['@/pages/unifiedUser/systemManagement/roleInfo'], resolve) }
    ]
  },
  {
    name: '日志管理',
    path: 'logManagement',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [{ name: '登录日志', path: '/sysLoginLog', component: resolve => require(['@/pages/unifiedUser/logManagement/sysLoginLog'], resolve) }]
  },
  {
    name: '账号设置',
    path: 'accountSet',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '账号管理', path: '/accountInfo', component: resolve => require(['@/pages/unifiedUser/accountSet/accountInfo'], resolve) },
      { name: '修改密码', path: '/changePassword', component: resolve => require(['@/pages/unifiedUser/accountSet/changePassword'], resolve) },
      { name: "找回密码", path: '/findPwd', component: resolve => require(['@/pages/unifiedUser/accountSet/findPwd'], resolve) },
      {
        hidden: true,
        name: '修改手机号',
        path: '/revisePhoneNum',
        component: resolve => require(['@/pages/unifiedUser/accountSet/revisePhoneNum'], resolve)
      },
      { hidden: true, name: '发送邮箱', path: '/getEmail', component: resolve => require(['@/pages/unifiedUser/accountSet/getEmail'], resolve) },
      { hidden: true, name: '修改邮箱', path: '/reviseEmail', component: resolve => require(['@/pages/unifiedUser/accountSet/reviseEmail'], resolve) }
    ]
  }
];
