import reports from "@/pages/demo/reports";
export default [
  {
    hidden: false,
    name: "Demo",
    path: "Demo",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "demo", path: '/demo', component: resolve => require(['@/pages/demo/demoList'], resolve) },
      { name: "multidemo", path: '/multidemo', component: resolve => require(['@/pages/demo/multiDemoList'], resolve) },
      { name: "detailtablelist", path: '/detailtablelist', component: resolve => require(['@/pages/demo/detailTableList'], resolve) },
      { name: "detailtable", path: '/detailtable', component: resolve => require(['@/pages/demo/detailTablePage'], resolve) },
      { name: "datagridedit", path: '/datagridedit', component: resolve => require(['@/pages/demo/datagridEditDemo'], resolve) },
      { name: "treegrid", path: '/treegrid', component: resolve => require(['@/pages/demo/treegridDemo'], resolve) },
      { name: "fileUpload", path: '/fileUpload', component: resolve => require(['@/pages/demo/fileUpload/fileUploadList'], resolve) },
      { name: "news", path: '/news', component: resolve => require(['@/pages/demo/news/newsList'], resolve) },
      { name: "test", path: '/test', component: resolve => require(['@/pages/demo/test'], resolve) },
      { name: "role", path: '/role', component: resolve => require(['@/pages/demo/role/roleList'], resolve) },
      { name: "module", path: '/module', component: resolve => require(['@/pages/demo/news/moduleList'], resolve) },
      { name: "demoReport", path: '/demoReport', component: resolve => require(['@/pages/demo/demoReport'], resolve) },
      { name: "reports", path: '/reports', component: reports },
      { name: "mt", path: '/mt', component: resolve => require(['@/pages/message/sysMessageTemplate'], resolve) },
      { name: "msc", path: '/msc', component: resolve => require(['@/pages/message/sysMessageServiceConfig'], resolve) },
      { name: "msr", path: '/msr', component: resolve => require(['@/pages/message/sysMessageSendRecord'], resolve) },
      { name: "im", path: '/im', component: resolve => require(['@/pages/message/sysInternalMessage'], resolve) },
      { name: "treeMenuDemo", path: '/treeMenuDemo', component: resolve => require(['@/pages/demo/treeMenuDemo'], resolve) }
    ]
  }

];
