export default [
  {
    name: '模板图制作',
    path: 'templateMap',
    iconCls: 'el-icon-info',
    component: (resolve) => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: '模板图管理', path: '/management', component: resolve => require(['@/pages/templateMap/management'], resolve) },
      { name: '模板图审核', path: '/review', component: resolve => require(
      ['@/pages/templateMap/review'], resolve) }
    ]
  }
];
