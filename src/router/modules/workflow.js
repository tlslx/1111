export default [
  {
    hidden: false,
    path: "workflow",
    name: "流程管理",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "流程模板", path: '/workflowDefinition', component: resolve => require(['@/pages/workflow/workflowDefinition'], resolve) },
      { name: "流程定义", path: '/workflowPublish', component: resolve => require(['@/pages/workflow/workflowPublish'], resolve) }
    ]
  }
];
