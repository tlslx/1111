export default [
  {
    name: '标摊展位施工图管理',
    path: 'placeDrawManegement',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "展具管理",
        path: "exhibitionStuffManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展具约束规则管理", path: '/stuffRestrainManagement', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionStuffManagement/stuffRestrainManagement'], resolve) },
          { name: "展具管理", path: '/categoryManagement', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionStuffManagement/categoryManagement'], resolve) },
          { name: "新增展具一级分类", path: '/addtopCategory', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionStuffManagement/addtopCategory'], resolve) },
          { name: "新增展具二级分类", path: '/addTwoCategory', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionStuffManagement/addTwoCategory'], resolve) },
          { name: "添加展具组成展材", path: '/addToolFormStuff', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionStuffManagement/addToolFormStuff'], resolve) }
        ]
      },
      {
        name: "展材管理",
        path: "exhibitionManagement",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展材管理", path: '/exhibitionToolManagement', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionManagement/exhibitionToolManagement'], resolve) },
          { name: "添加展材", path: '/addexhibitionTool', component: resolve => require(['@/pages/customerService/placeDrawManegement/exhibitionManagement/addexhibitionTool'], resolve) }
        ]
      },
      {
        name: "复制标准展位展具配置方案",
        path: "copeSheme",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "复制标准展位展具配置方案", path: '/copeSheme', component: resolve => require(['@/pages/customerService/placeDrawManegement/copeSheme/copeSheme'], resolve) }
        ]
      },
      {
        name: "标准展位展具配置管理",
        path: "pipSheme",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "标准展位展具配置管理", path: '/sheme', component: resolve => require(['@/pages/customerService/placeDrawManegement/pipSheme/sheme'], resolve) },
          { name: "添加标准展位展具配置", path: '/addsheme', component: resolve => require(['@/pages/customerService/placeDrawManegement/pipSheme/addsheme'], resolve) },
          { name: "标准展位展具配置详情", path: '/modifySheme', component: resolve => require(['@/pages/customerService/placeDrawManegement/pipSheme/modifySheme'], resolve) }
        ]
      },
      {
        name: "材料统计",
        path: "materialStatistics",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "材料统计", path: '/materialStatistics', component: resolve => require(['@/pages/customerService/placeDrawManegement/materialStatistics/materialStatistics'], resolve) },
          { name: "展厅展位施工图", path: '/hallPlaceDraw', component: resolve => require(['@/pages/customerService/placeDrawManegement/materialStatistics/hallPlaceDraw'], resolve) }
        ]
      },
      {
        name: "库存预警设置",
        path: "stockAlert",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "库存预警设置", path: '/stockAlert', component: resolve => require(['@/pages/customerService/placeDrawManegement/stockAlert/stockAlert'], resolve) },
          { name: "添加库存预警设置", path: '/addStockAlert', component: resolve => require(['@/pages/customerService/placeDrawManegement/stockAlert/addStockAlert'], resolve) },
          { name: "预警消息列表详细", path: '/detailStockAlert', component: resolve => require(['@/pages/customerService/placeDrawManegement/stockAlert/detailStockAlert'], resolve) }
        ]
      },
      {
        name: "库存增减",
        path: "stockFlu",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "库存增减", path: '/stockFlu', component: resolve => require(['@/pages/customerService/placeDrawManegement/stockFlu/stockFlu'], resolve) },
          { name: "添加库存增减", path: '/addStockFlu', component: resolve => require(['@/pages/customerService/placeDrawManegement/stockFlu/addStockFlu'], resolve) }
        ]
      }
    ]
  },
  { 
    name: "咨询投诉报障",
    path: "consultingComplaints",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "提交工作单",
        path: "submissionOrders",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "用户填写完成投诉报障列表", path: '/completeComplaintList', component: resolve => require(['@/pages/customerService/consultingComplaints/submissionOrders/completeComplaintList'], resolve) },
          { name: "填写咨询投诉报障内容", path: '/fillComplaintConsultation', component: resolve => require(['@/pages/customerService/consultingComplaints/submissionOrders/fillComplaintConsultation'], resolve) },
          { name: "用户投诉报障详细", path: '/userComplaintsDetail', component: resolve => require(['@/pages/customerService/consultingComplaints/submissionOrders/userComplaintsDetail'], resolve) }
        ]
      },
      {
        name: "回访客商及填写满意度",
        path: "returnVisitorSatisfaction",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "咨询投诉报障记录", path: '/advisoryComplaintRecord', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/advisoryComplaintRecord'], resolve) },
          { name: "投诉报障", path: '/complaintAndReport', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/complaintAndReport'], resolve) },
          { name: "回访客商", path: '/visitCustomer', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/visitCustomer'], resolve) },
          { name: "查看详细", path: '/viewDetails', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/viewDetails'], resolve) },
          { name: "回复", path: '/reply', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/reply'], resolve) },
          { name: "结单", path: '/statement', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/statement'], resolve) },
          { name: "投诉报障工单", path: '/complaintReportWorkOrder', component: resolve => require(['@/pages/customerService/consultingComplaints/returnVisitorSatisfaction/complaintReportWorkOrder'], resolve) }
        ]
      },
      {
        name: "投诉报障主项目字典和投诉报障项目字典",
        path: "dictionaryComplaintReportingMainItem",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "投诉报障主项目字典", path: '/dictionaryComplaintMainProject', component: resolve => require(['@/pages/customerService/consultingComplaints/dictionaryComplaintReportingMainItem/dictionaryComplaintMainProject'], resolve) },
          { name: "投诉报障项目字典", path: '/dictionaryComplaintProject', component: resolve => require(['@/pages/customerService/consultingComplaints/dictionaryComplaintReportingMainItem/dictionaryComplaintProject'], resolve) }
        ]
      }
    ]
  },
  { 
    name: "工单模块",
    path: "workOrderModule",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "接单员设置", path: '/orderClerk', component: resolve => require(['@/pages/customerService/workOrderModule/orderClerk'], resolve) },
      { name: "接单员列表", path: '/receiverList', component: resolve => require(['@/pages/customerService/workOrderModule/receiverList'], resolve) },
      {
        name: "工单设置",
        path: "orderSetting",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "工单服务项目管理", path: '/serviceItemManagement', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/serviceItemManagement'], resolve) },
          { name: "添加工单服务项目", path: '/addOrderServiceItems', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/addOrderServiceItems'], resolve) },
          { name: "修改工单服务项目", path: '/modifyOrderServiceItems', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/modifyOrderServiceItems'], resolve) },
          { name: "施工组设置", path: '/constructionGroupSetting', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/constructionGroupSetting'], resolve) },
          { name: "施工组列表", path: '/constructionGroupList', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/constructionGroupList'], resolve) },
          { name: "施工组详情", path: '/constructionGroupDetails', component: resolve => require(['@/pages/customerService/workOrderModule/orderSetting/constructionGroupDetails'], resolve) }
        ]
      },
      {
        name: "工单作业、催单",
        path: "OrdersReminders",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "我的工单", path: '/myWorkOrde', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/myWorkOrde'], resolve) },
          { name: "新建手工工单", path: '/newHandicraftOrder', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/newHandicraftOrder'], resolve) },
          { name: "查看手工工单", path: '/viewManualWorkOrder', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/viewManualWorkOrder'], resolve) },
          { name: "查看自动工单", path: '/viewAutoWorkOrder', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/viewAutoWorkOrder'], resolve) },
          { name: "查看投诉报障工单", path: '/checkComplaint', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/checkComplaint'], resolve) },
          { name: "自动工单（反馈）", path: '/feedbackAutoOrder', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/feedbackAutoOrder'], resolve) },
          { name: "新建手工工单反馈页面", path: '/handicraftWorksheetFeedback', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/handicraftWorksheetFeedback'], resolve) },
          { name: "投诉报障工单（反馈）", path: '/feedbackComplaint', component: resolve => require(['@/pages/customerService/workOrderModule/OrdersReminders/feedbackComplaint'], resolve) }
        ]
      },
      {
        name: "工单反馈、查询",
        path: "orderFeedbackQuery",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "工单快速反馈", path: '/quickFeedback', component: resolve => require(['@/pages/customerService/workOrderModule/orderFeedbackQuery/quickFeedback'], resolve) }
        ]
      },
      {
        name: "工单指标",
        path: "jobIndex",
        iconCls: "el-icon-info",
        component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "作业指标", path: '/operationIndex', component: resolve => require(['@/pages/customerService/workOrderModule/jobIndex/operationIndex'], resolve) },
          { name: "指标管理", path: '/indexManagement', component: resolve => require(['@/pages/customerService/workOrderModule/jobIndex/indexManagement'], resolve) },
          { name: "查看投诉报障工单", path: '/viewComplaintReport', component: resolve => require(['@/pages/customerService/workOrderModule/jobIndex/viewComplaintReport'], resolve) }
        ]
      }
    ]
  }
];
