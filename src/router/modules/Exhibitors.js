export default [
  {
    name: "进口展招展",
    path: "Exhibitors",
    iconCls: "el-icon-info",
    component: resolve =>
      require(["@/pages/Exhibitors/agent/index"], resolve),
    children: [
      // 以下设置为招展代理自身信息路由
      {
        name: "设置",
        path: "setting",
        component: () => import("@/pages/Exhibitors/agent/index"),
        children: [
          {
            name: "管理自身信息",
            path: "/personalInfo",
            component: () =>
              import("@/pages/Exhibitors/agent/setting/personal/baseInfo")
          },
          {
            name: "代理银行账号",
            path: "/bankAccount",
            component: () =>
              import("@/pages/Exhibitors/agent/setting/personal/bankAccount")
          },
          {
            name: "代理联系人",
            path: "/agentContact",
            component: () =>
              import("@/pages/Exhibitors/agent/setting/personal/agentContact")
          }
        ]
      },
      {
        name: "管理企业信息",
        path: "managingEnterpriseInformation",
        children: [
          {
            name: "完善企业信息",
            path: "/companyInfo",
            component: resolve =>
              require(["@/pages/Exhibitors/company/companyInfo"], resolve)
          },
          {
            name: "信息修改记录",
            path: "/infoUpdate",
            component: resolve =>
              require(["@/pages/Exhibitors/company/infoUpdate"], resolve)
          },
          {
            name: "信息修改详情",
            path: "/updateInfoDet",
            component: resolve =>
              require(["@/pages/Exhibitors/company/updateInfoDet"], resolve)
          }
        ]
      },
      {
        name: "查看发票形式",
        path: "invoice",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "查看发票",
            path: "/invoiceList",
            component: resolve =>
              require(["@/pages/Exhibitors/company/invoiceList"], resolve)
          },
          {
            name: "申请开具增值税发票信息",
            path: "/addInvoice",
            component: resolve =>
              require(["@/pages/Exhibitors/company/addInvoice"], resolve)
          }
        ]
      },
      {
        name: "注册",
        path: "regist",
        children: [
          {
            name: "注册",
            path: "/regist",
            component: resolve =>
              require(["@/pages/Exhibitors/company/regist"], resolve)
          }
        ]
      },
      {
        name: "查看展位",
        path: "exhibitionPosition",
        children: [
          {
            name: "查看展位安排",
            path: "/exhibitionPositionPlan",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/exhibitionPositionPlan"
              ], resolve)
          },
          {
            name: "展位图纸",
            path: "/exhibitionPositionPic",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/exhibitionPositionPic"
              ], resolve)
          }
        ]
      },
      {
        name: "管理人员信息",
        path: "certificate",
        children: [
          {
            name: "人证管理",
            path: "/certificateManage",
            component: resolve =>
              require(["@/pages/Exhibitors/company/certificateManage"], resolve)
          }
        ]
      },
      {
        name: "车证管理",
        path: "vehicleCertificate",
        children: [
          {
            name: "证件管理(车证)",
            path: "/certificateVehicle",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/certificateVehicle"
              ], resolve)
          }
        ]
      },
      {
        name: "邀请采购商",
        path: "invite",
        children: [
          {
            name: "邀请参展商与采购商",
            path: "/inviteCustom",
            component: resolve =>
              require(["@/pages/Exhibitors/company/inviteCustom"], resolve)
          }
        ]
      },
      {
        name: "登记展品",
        path: "registeredExhibits",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "展品列表",
            path: "/exhibitsList",
            component: resolve =>
              require(["@/pages/Exhibitors/company/exhibitsList"], resolve)
          }
        ]
      },
      {
        name: "企业发布参展商动态",
        path: "exhibitorsDynamic",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "展商动态列表",
            path: "/dynamicList",
            component: resolve =>
              require(["@/pages/Exhibitors/company/dynamicList"], resolve)
          },
          {
            name: "发布展商动态",
            path: "/publishDynamic",
            component: resolve =>
              require(["@/pages/Exhibitors/company/publishDynamic"], resolve)
          }
        ]
      },
      {
        name: "申请展位",
        path: "applicationBooth",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        iconCls: "el-icon-info",
        children: [
          {
            name: "申请展位列表",
            path: "/applicationBoothList",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/applicationBoothList"
              ], resolve)
          },
          {
            name: "申请展位新增",
            path: "/applicationBoothAdd",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/applicationBoothAdd"
              ], resolve)
          },
          {
            name: "申请展位编辑",
            path: "/applicationBoothEdit",
            component: resolve =>
              require([
                "@/pages/Exhibitors/company/applicationBoothEdit"
              ], resolve)
          }
        ]
      },
      {
        name: "付款信息",
        path: "payInformation",
        iconCls: "el-icon-info",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "付款信息",
            path: "/payNotification",
            component: resolve =>
              require(["@/pages/Exhibitors/company/payNotification"], resolve)
          }
        ]
      },
      {
        name: "获取邀请函",
        path: "obtainInvitationCard",
        iconCls: "el-icon-info",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "获取邀请函",
            path: "/invitationCard",
            component: resolve =>
              require(["@/pages/Exhibitors/company/invitationCard"], resolve)
          }
        ]
      },
      {
        name: "箱号列表",
        path: "boxNumList",
        iconCls: "el-icon-info",
        children: [
          {
            name: "箱号列表",
            path: "/boxNumberList",
            component: resolve =>
              require(["@/pages/Exhibitors/company/boxNumberList"], resolve)
          }
        ]
      },
      {
        name: "展品管理",
        path: "exhibitManagement",
        iconCls: "el-icon-info",
        component: resolve =>
          require(["@/components/framework/app/appBlock"], resolve),
        children: [
          {
            name: "展品管理",
            path: "/exhibitionManage",
            component: resolve =>
              require(["@/pages/Exhibitors/company/exhibitionManage"], resolve)
          },
          {
            name: "代理管理",
            path: "agent_management",
            iconCls: "el-icon-info",
            component: resolve => require(['@/components/framework/app/appBlock'], resolve),
            children: [
                { name: "管理代理信息", path: '/managemRnforma', component: resolve => require(['@/pages/Exhibitors/company/managemRnforma'], resolve) },
                { name: "填写基本信息", hidden: true, path: '/fillRnforma', component: resolve => require(['@/pages/Exhibitors/company/fillRnforma'], resolve) },
                { name: "填写基本信息", hidden: true, path: '/fillRnformas', component: resolve => require(['@/pages/Exhibitors/company/fillRnformas'], resolve) },
                { name: "填写联系人", hidden: true, path: '/fillContactPerson', component: resolve => require(['@/pages/Exhibitors/company/fillContactPerson'], resolve) },
                { name: "填写其他信息", hidden: true, path: '/fillRnformation', component: resolve => require(['@/pages/Exhibitors/company/fillRnformation'], resolve) }
            ]
          },
          {
            name: "企业管理",
            path: "businessAdministra",
            iconCls: "el-icon-info",
            component: resolve => require(['@/components/framework/app/appBlock'], resolve),
            children: [
                { name: "审核展位申请", path: '/reviewApplica', component: resolve => require(['@/pages/Exhibitors/company/viewRnforma/reviewApplica'], resolve) },
                { name: "查看企业详情", hidden: true, path: '/viewDetails', component: resolve => require(['@/pages/Exhibitors/company/viewRnforma/viewDetails'], resolve) },
                { name: "审核信息修改", path: '/modificaRnformat', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/modificaRnformat'], resolve) },
                { name: "查看修改详情", hidden: true, path: '/viewModificaDetails', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/viewModificaDetails'], resolve) },
                { name: "企业列表", path: '/enterpriseList', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/managementEnterpris'], resolve) },
                { name: "管理企业信息", hidden: true, path: '/managementEnterpriseRnformat', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/managementRnformat'], resolve) },
                { name: "查看企业信息", hidden: true, path: '/viewEnterprise', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/viewEnterprise'], resolve) }
                // { name: "查看产品信息", path: '/viewProductRnformat', component: resolve => require(['@/pages/Exhibitors/company/modificaRnformat/managementEnterpris'], resolve) }
            ]
          }
        ]
      }
      // {
      //   name: "CF奖系统管理",
      //   path: "cfSystemManagement",
      //   // iconCls: "el-icon-info",
      //   // component: resolve => require(['@/components/framework/app/appBlock'], resolve),
      //   children: [
      //     { name: "CF奖评选活动信息", path: '/competitionInformation', component: resolve => require(['@/pages/diversification/systemManagement/competitionInformation'], resolve) },
      //     { name: "产品大类管理", path: '/productCategories', component: resolve => require(['@/pages/diversification/systemManagement/productCategories'], resolve) },
      //     { name: "展区管理", path: '/exhibitionAreaManagement', component: resolve => require(['@/pages/diversification/systemManagement/exhibitionAreaManagement'], resolve) },
      //     { name: "用户管理", path: '/userManagement', component: resolve => require(['@/pages/diversification/systemManagement/userManagement'], resolve) },
      //     { name: "新增用户", path: '/addUser', component: resolve => require(['@/pages/diversification/systemManagement/addUser'], resolve) },
      //     { name: "角色权限信息", path: '/roleManagement', component: resolve => require(['@/pages/diversification/systemManagement/roleManagement'], resolve) }
      //   ]
      // },
      // {
      //   name: "CF奖评审",
      //   path: "cfReview",
      //   // iconCls: "el-icon-info",
      //   // component: resolve => require(['@/components/framework/app/appBlock'], resolve),
      //   children: [
      //     { name: "CF奖资质审核列表", path: '/cfReviewList', component: resolve => require(['@/pages/diversification/cfReview/cfReviewList'], resolve) },
      //     { name: "产品初评列表", path: '/productReviewList', component: resolve => require(['@/pages/diversification/cfReview/productReviewList'], resolve) },
      //     { name: "产品终评列表", path: '/productReviewListEnd', component: resolve => require(['@/pages/diversification/cfReview/productReviewListEnd'], resolve) },
      //     { name: "产品已发布列表", path: '/productReleasedList', component: resolve => require(['@/pages/diversification/cfReview/productReleasedList'], resolve) },
      //     { name: "评审投票信息", path: '/reviewVotinginformation', component: resolve => require(['@/pages/diversification/cfReview/reviewVotinginformation'], resolve) },
      //     { name: "企业信息编辑", path: '/productInfomationEdit', component: resolve => require(['@/pages/diversification/cfReview/productInfomationEdit'], resolve) },
      //     { name: "企业信息展示", path: '/productInfomationDetail', component: resolve => require(['@/pages/diversification/cfReview/productInfomationDetail'], resolve) },
      //     { name: "投票统计", path: '/voteStatistics', component: resolve => require(['@/pages/diversification/cfReview/voteStatistics'], resolve) }
      //   ]
      // }
    ]
  }
];
