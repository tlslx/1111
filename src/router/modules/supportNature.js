export default [
  {
    name: '出口展展览支撑性管理',
    path: 'supportNature',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: '组展进度设置',
        path: 'organizationProgress',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: '发布组展进度计划', path: '/organizeExhibition', component: resolve => require(['@/pages/supportNature/organizeExhibition'], resolve) },
          { hidden: true, name: '修改组展进度计划', path: '/revisionExhibition', component: resolve => require(['@/pages/supportNature/revisionExhibition'], resolve) },
          { name: '组展单位标签管理', path: '/organizeLabelManagement', component: resolve => require(['@/pages/supportNature/organizeLabelManagement'], resolve) },
          { hidden: true, name: '新建组展单位标签', path: '/addLabelManagement', component: resolve => require(['@/pages/supportNature/addLabelManagement'], resolve) },
          { hidden: true, name: '修改组展单位标签', path: '/editLabelManagement', component: resolve => require(['@/pages/supportNature/editLabelManagement'], resolve) },
          { name: '展区标签管理', path: '/exhibitionLabelManagement', component: resolve => require(['@/pages/supportNature/exhibitionLabelManagement'], resolve) },
          { hidden: true, name: '特例详情列表', path: '/specialCaseList', component: resolve => require(['@/pages/supportNature/specialCaseList'], resolve) },
          { hidden: true, name: '新增组展特例标签', path: '/addSpecialCaseList', component: resolve => require(['@/pages/supportNature/addSpecialCaseList'], resolve) },
          { hidden: true, name: '修改组展特例标签', path: '/editSpecialCaseList', component: resolve => require(['@/pages/supportNature/editSpecialCaseList'], resolve) },
          { name: '外贸中心-查看组展进度计划', path: '/foreignTradeCenter', component: resolve => require(['@/pages/supportNature/foreignTradeCenter'], resolve) },
          { name: '组展单位-查看组展进度计划', path: '/exOrganizerWatch', component: resolve => require(['@/pages/supportNature/exOrganizerWatch'], resolve) },
          { name: '组展单位-查看当前进度计划', path: '/exOrganizer', component: resolve => require(['@/pages/supportNature/exOrganizer'], resolve) }
        ]
      },
      {
        name: '业务联系人通讯录管理',
        path: 'businessContacts',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/businessContacts'], resolve),
        children: [
          { name: '发布组展进度计划', path: '/addGroupExhibitContracts',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/addGroupExhibitContracts'], resolve) },
          { name: '编辑组展单位联系人', path: '/editGroupExhibitContracts',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/editGroupExhibitContracts'], resolve) },

          { name: '新增第三方联系人', path: '/addContracts',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/addContracts'], resolve) },
          { name: '短信收件人', path: '/addSmsRecipient',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/addSmsRecipient'], resolve) }
        ]
      },
      {
        name: '筹撤展期间联络员管理',
        path: 'liaisonContacts',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/liaisonContacts'], resolve),
        children: [
          { name: '新增筹撤展期间联络员', path: '/addLiaisonContacts',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/addLiaisonContacts'], resolve) },
          { name: '编辑筹撤展期间联络员', path: '/editLiaisonContacts',
            component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/editLiaisonContacts'], resolve) }
        ]
      },
      {
        name: '管理展品数据',
        path: 'managemen',
        iconCls: 'el-icon-info',
        component: resolve => require(['@/pages/supportNature/managemen/managemens'], resolve),
        children: [
          { name: '展品数据审核', path: '/operatorExhibit',
            component: resolve => require(['@/pages/supportNature/managemen/managemen'], resolve) },
          { name: '不通过原因管理', path: '/reasonsPass',
            component: resolve => require(['@/pages/supportNature/managemen/reasonsPass'], resolve) },
          { name: '展品信息修改', hidden: true, path: '/exhibitModification',
            component: resolve => require(['@/pages/supportNature/managemen/exhibitModification'], resolve) },
          { name: '审核统计查询', path: '/auditStatistics',
            component: resolve => require(['@/pages/supportNature/managemen/auditStatistics'], resolve) }
          // { name: '编辑筹撤展期间联络员', path: '/editLiaisonContacts',
          //   component: resolve => require(['@/pages/supportNature/exhibitContact/contactsManage/editLiaisonContacts'], resolve) }
        ]
      },
      {
        name: "下载管理模块",
        path: "/support_nature_downLoad",
        component: resovle => require(["@/pages/supportNature/checkDownLoad"], resovle)
      }
    ]
  }
];
