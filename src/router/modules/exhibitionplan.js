export default [
  {
    name: '展览方案管理',
    path: 'exhibitionplan',
    iconCls: 'el-icon-info',
    component: (resolve) => require(['@/components/framework/app/appBlock'], resolve),
    children: [{ name: '展览展期管理', path: '/extension', component: (resolve) => require(['@/pages/exhibitionplan/extension'], resolve) },
    { name: '展区方案设置', path: '/setting', component: resolve => require(['@/pages/exhibitionplan/setting'], resolve) },
    { name: '展位价格设置', path: '/price', component: resolve => require(['@/pages/exhibitionplan/price'], resolve) },
    { name: '专区方案预设', path: '/zonePlanPreset', component: resolve => require(['@/pages/exhibitionplan/zonePlanPreset'], resolve) },
    { name: '专区方案设置', path: '/zonePlanSetting', component: resolve => require(['@/pages/exhibitionplan/zonePlanSetting'], resolve) },
    { name: '专区方案审核', path: '/zonePlanReview', component: resolve => require(['@/pages/exhibitionplan/zonePlanReview'], resolve) }
    ]
  }
];
