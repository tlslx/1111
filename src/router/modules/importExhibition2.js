export default [{
  name: '进口展招展(招展代理)',
  path: 'Exhibitors_agent',
  iconCls: 'el-icon-info',
  component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
  children: [
    {
      name: "展商管理",
      path: "/Exhibitors_agent_exhibitorsManage",
      component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
      children: [
        {
          name: "管理企业信息",
          path: "/agent_companyMsg",
          component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
          children: [
            {
              name: "完善公司信息", // 跳转用
              path: "/agentPerfectInfo",
              component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/agentPerfectInfo"], resolve)
            },
            {
              name: "信息修改记录",
              path: "/agentInfoUpdate",
              component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/agentInfoUpdate"], resolve)
            },
            {
              name: "信息修改详情",
              path: "/agentUpdateInfoDet",
              component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/agentUpdateInfoDet"], resolve)
            },
            // {
            //   name: "企业列表",
            //   path: "/agent_company_list",
            //   component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/manageCompany/companyMsg/companyList"], resolve)
            // },
            // {
            //   name: "完善公司信息",
            //   path: "/agent_company_completeMsg/:id",
            //   component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/manageCompany/companyMsg/companyList/completeMsg"], resolve)
            // },
            // {
            //   name: "信息修改记录",
            //   path: "/agent_company_alertRecorde/:id",
            //   component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/manageCompany/companyMsg/companyList/msgRecorde"], resolve)
            // },
            // {
            //   name: "企业注册",
            //   path: "/agent_companyRegistry",
            //   component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/companyRegistry"], resolve)
            // },
            {
              name: "展品管理",
              path: "/agent_exhibitsManagement",
              component: resolve => require(["@/pages/Exhibitors/agent/exhibitorManage/exhibitsManage"], resolve)
            }
          ]
        }
      ]
    },
    {
      name: "参展申请",
      path: "/agent_join_reservation",
      component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
      children: [
        {
          name: "申请展位",
          path: "/agent_booth_reservation",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/reservationBooth"], resolve)
        },
        {
          name: "申请展位-新增",
          path: "/booth_reservation_add",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/reservationBooth/reservationBoothAdd"], resolve)
        },
        {
          name: "申请展位-编辑",
          path: "/booth_reservation_edit",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/reservationBooth/reservationBoothEdit"], resolve)
        },
        // --------------
        {
          name: "审核企业展位申请",
          path: "/agent_companyBooth_reservation",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/reservationCompanyBooth"], resolve)
        },
        {
          name: "查看企业/产品详情",
          path: "/agent_companyBooth_msg",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/reservationCompanyBooth/companyMsgCheck"], resolve)
        },
        // --------------
        {
          name: "展位预分配",
          path: "/agent_booth_allot",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/boothAllot"], resolve)
        },
        // --------------
        {
          name: "付款信息",
          path: "/agent_booth_paymentMsg",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/paymentMsg"], resolve)
        },
        // --------------
        {
          name: "获取发票",
          path: "/agent_booth_getInvoice",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/getInvoice"], resolve)
        },
        {
          name: "申请开具增值税发票信息",
          path: "/agent_booth_addInvoice",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/getInvoice/agentAddInvoice"], resolve)
        },
        // --------------
        {
          name: "查看合同",
          path: "/agent_pact_examine",
          component: resolve => require(["@/pages/Exhibitors/agent/boothManage/checkPact"], resolve)
        }
      ]
    },
    {
      name: "展商服务",
      path: "/Exhibitors_agent_serve",
      component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
      children: [
        {
          name: "申请邀请函",
          path: "/agent_serve_applyInvitation",
          component: resolve => require(["@/pages/Exhibitors/agent"], resolve),
          children: [
            {
              name: "申请邀请函（主体）",
              path: "/agent_serve_InvitationList",
              component: resolve => require(["@/pages/Exhibitors/agent/applyInvitation"], resolve)
            },
            {
              name: "企业列表",
              path: "/agent_serve_company_list",
              component: resolve => require(["@/pages/Exhibitors/agent/applyInvitation/applyCompanyList"], resolve)
            }
          ]
        }
      ]
    }
  ]
}];
