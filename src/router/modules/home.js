export default [
  {
    hidden: true,
    path: "home",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "错误页面", path: '/error', component: resolve => require(['@/pages/home/error'], resolve) },
      { name: "错误页面-404", path: '/404', component: resolve => require(['@/pages/home/404'], resolve) },
      { name: "登录", path: '/login', component: resolve => require(['@/pages/home/login'], resolve) },
      { name: "登出", path: '/Logout', component: resolve => require(['@/pages/home/logout'], resolve) },
      { name: "首页 ", path: '/index', component: resolve => require(['@/pages/home/index'], resolve) },
      { name: "默认", path: '/mainPage', component: resolve => require(['@/pages/home/mainPage'], resolve) },
      { name: "注册 ", path: '/register', component: resolve => require(['@/pages/home/onlineService/register'], resolve) },
      { name: "忘记密码 ", path: '/findPwd', component: resolve => require(['@/pages/home/personal/findPwd'], resolve) }
    ]
  }
];
