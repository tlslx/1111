export default [
  {
    name: "底图制作",
    path: "basemap",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "底图管理", path: '/mapmanage', component: resolve => require(['@/pages/basemap/mapmanage'], resolve) },
      { name: "底图审核", path: '/mapaudit', component: resolve => require(['@/pages/basemap/mapaudit'], resolve) }
    ]
  },
  {
    name: "方案图制作",
    path: "basemap",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "方案图管理", path: '/planmanage', component: resolve => require(['@/pages/basemap/planmanage'], resolve) },
      { name: "方案图审核", path: '/planaudit', component: resolve => require(['@/pages/basemap/planaudit'], resolve) },
      { name: "历史框架图查看", path: '/planhistory', component: resolve => require(['@/pages/basemap/planhistory'], resolve) },
      { name: "方案组", path: '/plangroup', component: resolve => require(['@/pages/basemap/plangroup'], resolve) }
    ]
  }
];
