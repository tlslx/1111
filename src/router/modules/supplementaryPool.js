export default [
  {
    name: "补录联营企业",
    path: "supplementaryJointventure",
    component: resolve => require(['@/components/framework/app/appBody'], resolve),
    children: [
      {
        name: "1.交易团提交追加联营申请",
        path: "/businessDelegationApply",
        component: resolve => require(['@/pages/numberArrangementsInternational/baseAccounting/shall'], resolve),
        children: [
          // { name: "（已归纳）工作部开放交易团补录权限及时间窗口", path: "/workDepartmentJurisdiction", component: resolve => require(['@/pages/supplementEnterprise/businessDelegationapply/openAccess'], resolve) },
          { name: "交易团提交追加撤销联营申请", path: "/cancellationApplication", component: resolve => require(['@/pages/supplementEnterprise/businessDelegationapply/cancellationApplication'], resolve) },
          { name: "外贸中心审核交易团追加联营申请", path: "/supplementaryApplication", component: resolve => require(['@/pages/supplementEnterprise/businessDelegationapply/supplementaryApplication'], resolve) }
        ]
      },
      {
        name: "2.工作部查阅追加联营申请记录",
        path: "/additionalApplicationRecords",
        component: resolve => require(['@/pages/supplementEnterprise/applicationRecord/additionalApplication'], resolve)
      }
    ]
  }
];
