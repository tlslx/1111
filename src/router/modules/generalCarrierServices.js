export default [
  {
    name: '大会承运商服务',
    path: 'generalCarrierServices',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      { name: "承运商-完善企业资料", path: '/carrierCmInfoEdit', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierCmInfoEdit/carrierCmInfoEdit'], resolve) },
      { name: "承运商-企业资料详情", path: '/carrierCmInfoDetail', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierCmInfoEdit/carrierCmInfoDetail'], resolve) },
      { name: "参展商-搬运服务申请", path: '/exhibitorTransportServiceApply', component: resolve =>
          require(['@/pages/generalCarrierServices/exhibitorTransportServiceApply/exhibitorTransportServiceApply'], resolve) },
      { name: "承运商-搬运服务", path: '/carrierTransportService', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierTransportService/carrierTransportService'], resolve) },
      { name: "承运商-人证申请列表", path: '/carrierCertificatesApplyList', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierCertificatesApplyList/carrierCertificatesApplyList'], resolve) },

      { name: "承运商-车证申请列表", path: '/carrierCarApplyList', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierCarApply/carrierCarApplyList'], resolve) },
      { name: "承运商-车证申请信息", path: '/carrierCarApplyDetail', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierCarApply/carrierCarApplyDetail'], resolve) },

      { name: "广交会-经办人人证申请审核", path: '/operatorCertificatesReview', component: resolve =>
          require(['@/pages/generalCarrierServices/operatorCertificatesReview/operatorCertificatesReview'], resolve) },
      { name: "广交会-科长人证申请审核", path: '/sectionChiefCertificatesReview', component: resolve =>
          require(['@/pages/generalCarrierServices/sectionChiefCertificatesReview/sectionChiefCertificatesReview'], resolve) },
      { name: "广交会-经办人车证申请审核", path: '/operatorCarCertificatesList', component: resolve =>
          require(['@/pages/generalCarrierServices/operatorCarCertificatesList/operatorCarCertificatesList'], resolve) },
      { name: "广交会-车证申请信息", path: '/cantonFairCarCertificatesDetail', component: resolve =>
          require(['@/pages/generalCarrierServices/cantonFairCarCertificatesDetail/cantonFairCarCertificatesDetail'], resolve) },
      { name: "广交会-科长车证申请审核", path: '/sectionChiefCarCertificatesList', component: resolve =>
          require(['@/pages/generalCarrierServices/sectionChiefCarCertificatesList/sectionChiefCarCertificatesList'], resolve) },
      { name: "广交会-搬运服务记录", path: '/transportServiceList', component: resolve =>
          require(['@/pages/generalCarrierServices/transportServiceList/transportServiceList'], resolve) },
      { name: "广交会-证件指标管理", path: '/certificateIndexManagement', component: resolve =>
          require(['@/pages/generalCarrierServices/certificateIndexManagement/certificateIndexManagement'], resolve) },
      { name: "广交会-承运商账号管理", path: '/carrierAccountManagement', component: resolve =>
          require(['@/pages/generalCarrierServices/carrierAccountManagement/carrierAccountManagement'], resolve) }
    ]
  }
];
