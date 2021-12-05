export default [
  {
    name: '统一收款',
    path: 'ucp',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: '工程公司',
        path: '/payment',
        component: resolve => require(['@/pages/ucp/ucp'], resolve),
        children: [
          {
            name: '基础数据',
            path: '/basicdata',
            component: resolve => require(['@/pages/ucp/ucp'], resolve),
            children: [
              { name: '银行账号', path: '/bankAccountManage', component: resolve => require(['@/pages/ucp/bankAccount/bankAccountManage'], resolve) },
              { name: '收款账号', path: '/collectAccountManage', component: resolve => require(['@/pages/ucp/collectAccount/collectAccountManage'], resolve) },
              { name: '支付方式', path: '/paymentMethod', component: resolve => require(['@/pages/ucp/paymentMethod/paymentMethod'], resolve) },
              { name: '组别管理', path: '/operatorGroupManage', component: resolve => require(['@/pages/ucp/operatorGroup/operatorGroupManage'], resolve) },
              { name: '收款员管理', path: '/operatorManage', component: resolve => require(['@/pages/ucp/operator/operatorManage'], resolve) },
              { name: '对账配置', path: '/billConfig', component: resolve => require(['@/pages/ucp/billConfig/billConfig'], resolve) }
            ]
          },
          {
            name: '预付款业务',
            path: '/prepay',
            component: resolve => require(['@/pages/ucp/ucp'], resolve),
            children: [
              {
                name: '财务后台',
                path: '/accountant',
                component: resolve => require(['@/pages/ucp/ucp'], resolve),
                children: [
                  { name: '账号管理', path: '/rechargeAccountsManage', component: resolve => require(['@/pages/ucp/rechargeAccount/rechargeAccountsManage'], resolve) },
                  { name: '汇款审核', path: '/remitApproveRecords', component: resolve => require(['@/pages/ucp/remitRecord/inner/remitApproveRecords'], resolve) },
                  { name: '充值记录', path: '/rechargeRecordsManage', component: resolve => require(['@/pages/ucp/recharge/rechargeRecordsManage'], resolve) },
                  { name: '退款审核', path: '/rechargeRefundApproveRecords', component: resolve => require(['@/pages/ucp/refund/rechargeRefundApproveRecords'], resolve) }
                ]
              },
              {
                name: '参展企业',
                path: '/enterprise',
                component: resolve => require(['@/pages/ucp/ucp'], resolve),
                children: [
                  { name: '账号管理', path: '/unitRechargeAccountsManage', component: resolve => require(['@/pages/ucp/rechargeAccount/unitRechargeAccountsManage'], resolve) },
                  { name: '公司操作员管理', path: '/enterpriseOperator', component: resolve => require(['@/pages/ucp/rechargeAccount/enterpriseOperator'], resolve) },
                  { name: '账号申请', path: '/accountApply', component: resolve => require(['@/pages/ucp/rechargeAccount/accountApply'], resolve) },
                  { name: '账户详情', path: '/accountApplyDetail', component: resolve => require(['@/pages/ucp/rechargeAccount/accountApplyDetail'], resolve) },
                  { name: '账户充值', path: '/recharge', component: resolve => require(['@/pages/ucp/recharge/recharge'], resolve) },
                  { name: '汇款登记', path: '/remitRecordsEdit', component: resolve => require(['@/pages/ucp/remitRecord/outer/remitRecordsEdit'], resolve) },
                  { name: '汇款登记列表', path: '/remitRecords', component: resolve => require(['@/pages/ucp/remitRecord/outer/remitRecords'], resolve) },
                  { name: '充值记录', path: '/rechargeRecords', component: resolve => require(['@/pages/ucp/recharge/outer/rechargeRecords'], resolve) },
                  { name: '退款申请', path: '/rechargeRefundApply', component: resolve => require(['@/pages/ucp/refund/rechargeRefundApply'], resolve) },
                  { name: '退款记录', path: '/rechargeRefundRecordsManage', component: resolve => require(['@/pages/ucp/refund/outer/rechargeRefundRecordsManage'], resolve) }
                ]
              }
            ]
          },
          {
            name: '支付业务',
            path: '/payment',
            component: resolve => require(['@/pages/ucp/ucp'], resolve),
            children: [{ name: '订单导入-TEST', path: '/testOrder', component: resolve => require(['@/pages/ucp/pay/testOrder'], resolve) }, { name: '支付页面', hidden: true, path: '/individualsCompanyPay', component: resolve => require(['@/pages/ucp/pay/individualsCompanyPay'], resolve) }]
          },
          {
            name: '退款审核跳转页面',
            path: '/refundAudit',
            component: resolve => require(['@/pages/ucp/refund/refundAudit'], resolve),
            hidden: true
          },
          {
            name: '现场业务',
            path: '/liveRefund',
            component: resolve => require(['@/pages/ucp/ucp'], resolve),
            children: [
              {
                name: '财务后台',
                path: '/accountant',
                component: resolve => require(['@/pages/ucp/ucp'], resolve),
                children: [{ name: '退款申请-Test', path: '/refundApply', component: resolve => require(['@/pages/ucp/refund/refundApply'], resolve) }, { name: '退款待办', path: '/refundApproveRecords', component: resolve => require(['@/pages/ucp/refund/refundApproveRecords'], resolve) }, { name: '退款登记列表', path: '/refundRegisterRecords', component: resolve => require(['@/pages/ucp/refund/refundRegisterRecords'], resolve) }]
              },
              {
                name: '参展企业',
                path: '/enterprise',
                component: resolve => require(['@/pages/ucp/ucp'], resolve),
                children: [{ name: '退款记录', path: '/refundRecords', component: resolve => require(['@/pages/ucp/refund/outer/refundRecords'], resolve) }]
              }
            ]
          },
          {
            name: '发票管理',
            path: '/invoiceManage',
            component: resolve => require(['@/pages/ucp/ucp'], resolve),
            children: [{ name: '电子发票查询', path: '/elecInvoiceManage', component: resolve => require(['@/pages/ucp/invoiceManage/elecInvoiceManage'], resolve) }, { name: '增值税发票登记', path: '/taxInvoiceManage', component: resolve => require(['@/pages/ucp/invoiceManage/taxInvoiceManage'], resolve) }, { name: '增值税发票列表', path: '/taxInvoiceList', component: resolve => require(['@/pages/ucp/invoiceManage/taxInvoiceList'], resolve) }]
          }
        ]
      },
      {
        name: '中心集团',
        path: '/centerOffice',
        component: resolve => require(['@/pages/ucp/ucp'], resolve),
        children: [
          { name: '配置费汇款登记', path: '/configurationFee', component: resolve => require(['@/pages/ucp/rechargeAccount/configurationFee'], resolve) },
          { name: '配置费登记列表', path: '/configurationFeeList', component: resolve => require(['@/pages/ucp/rechargeAccount/configurationFeeList'], resolve) },
          { name: '展位费汇款登记', path: '/boothFee', component: resolve => require(['@/pages/ucp/rechargeAccount/boothFee'], resolve) },
          { name: '展位费登记列表', path: '/boothFeeList', component: resolve => require(['@/pages/ucp/rechargeAccount/boothFeeList'], resolve) }
        ]
      },
      {
        name: '公共后台',
        path: '/commonManage',
        component: resolve => require(['@/pages/ucp/ucp'], resolve),
        children: [{ name: '收款记录', path: '/collectRecords', component: resolve => require(['@/pages/ucp/collectRecords/collectRecords'], resolve) }]
      }
    ]
  }
];
