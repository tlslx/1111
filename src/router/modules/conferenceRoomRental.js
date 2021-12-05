export default [
  {
    name: '会议室租用',
    path: 'conferenceRoomRental',
    iconCls: 'el-icon-info',
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
      {
        name: "会议室申请", path: "applyList", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "申请列表", path: '/meetingRoomApplyList', component: resolve => require(['@/pages/conferenceRoomRental/applyList/meetingRoomApplyList'], resolve) },
          { name: "申请", path: '/meetingRoomApply', component: resolve => require(['@/pages/conferenceRoomRental/applyList/meetingRoomApply'], resolve) },
          { name: "申请详情", path: '/meetingRoomApplyDetail', component: resolve => require(['@/pages/conferenceRoomRental/applyList/meetingRoomApplyDetail'], resolve) },
          { name: "付款费用明细", path: '/paymentList', component: resolve => require(['@/pages/conferenceRoomRental/applyList/paymentList'], resolve) }
        ]
      },
      {
        name: "会议室受理", path: "acceptedList", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "受理列表", path: '/meetingRoomAcceptedList', component: resolve => require(['@/pages/conferenceRoomRental/acceptedList/meetingRoomAcceptedList'], resolve) },
          { name: "审批", path: '/meetingRoomApprove', component: resolve => require(['@/pages/conferenceRoomRental/acceptedList/meetingRoomApprove'], resolve) },
          // { name: "详情-修改", path: '/meetingRoomDetailEdit', component: resolve => require(['@/pages/conferenceRoomRental/acceptedList/meetingRoomDetailEdit'], resolve) },
          { name: "详情", path: '/meetingRoomAcceptedDetail', component: resolve => require(['@/pages/conferenceRoomRental/acceptedList/meetingRoomAcceptedDetail'], resolve) }
        ]
      },
      {
        name: "会议室资质审核", path: "qualificationAuditing", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "资质审核列表", path: '/qualificationAuditingList', component: resolve => require(['@/pages/conferenceRoomRental/qualificationAuditing/qualificationAuditingList'], resolve) },
          { name: "资质审核详情", path: '/qualificationAuditingDetail', component: resolve => require(['@/pages/conferenceRoomRental/qualificationAuditing/qualificationAuditingDetail'], resolve) }
        ]
      },
      {
        name: "展务科审核", path: "zwk", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "展务科审批", path: '/zwkApproval', component: resolve => require(['@/pages/conferenceRoomRental/zwk/zwkApproval'], resolve) },
          { name: "展务科审批详情", path: '/zwkApprovalDetail', component: resolve => require(['@/pages/conferenceRoomRental/zwk/zwkApprovalDetail'], resolve) }
        ]
      },
      {
        name: "会议室预订列表", path: "reservation", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室预订列表", path: '/reservationList', component: resolve => require(['@/pages/conferenceRoomRental/reservation/reservationList'], resolve) },
          { name: "会议室预订详情", path: '/reservationDetail', component: resolve => require(['@/pages/conferenceRoomRental/reservation/reservationDetail'], resolve) }
        ]
      },
      {
        name: "会议室预订审核", path: "reservationReview", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室预订审核列表", path: '/reservationReviewList', component: resolve => require(['@/pages/conferenceRoomRental/reservationReview/reservationReviewList'], resolve) },
          { name: "会议室预订审核详情", path: '/reservationReviewDetail', component: resolve => require(['@/pages/conferenceRoomRental/reservationReview/reservationReviewDetail'], resolve) }
        ]
      },
      {
        name: "会议室预订复审", path: "reservationSecondReview", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室预订复审列表", path: '/reservationSecondReviewList', component: resolve => require(['@/pages/conferenceRoomRental/reservationSecondReview/reservationSecondReviewList'], resolve) },
          { name: "会议室预订复审详情", path: '/reservationSecondReviewDetail', component: resolve => require(['@/pages/conferenceRoomRental/reservationSecondReview/reservationSecondReviewDetail'], resolve) }
        ]
      },
      {
        name: "工程公司会议室管理", path: "engineering", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室管理", path: '/engineeringManager', component: resolve => require(['@/pages/conferenceRoomRental/engineering/engineeringManager'], resolve) },
          { name: "会议室明细", path: '/engineeringDetails', component: resolve => require(['@/pages/conferenceRoomRental/engineering/engineeringDetails'], resolve) },
          { name: "会议室明细详情", path: '/meetingRoomDetail', component: resolve => require(['@/pages/conferenceRoomRental/engineering/meetingRoomDetail'], resolve) },
          { name: "会议室明细修改", path: '/detailModification', component: resolve => require(['@/pages/conferenceRoomRental/engineering/detailModification'], resolve) },
          { name: "会议室费用补录", path: '/additionalDetails', component: resolve => require(['@/pages/conferenceRoomRental/engineering/additionalDetails'], resolve) }
        ]
      },
      {
        name: "工程公司会议室结算", path: "engineering", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室结算列表", path: '/balanceList', component: resolve => require(['@/pages/conferenceRoomRental/engineeringBalance/balanceList'], resolve) },
          { name: "会议室结算详情", path: '/balanceDetail', component: resolve => require(['@/pages/conferenceRoomRental/engineeringBalance/balanceDetail'], resolve) }
        ]
      },
      {
        name: "工程公司会议室退款", path: "engineeringRefund", component: resolve => require(['@/components/framework/app/appBlock'], resolve),
        children: [
          { name: "会议室退款列表", path: '/refundList', component: resolve => require(['@/pages/conferenceRoomRental/engineeringRefund/refundList'], resolve) },
          { name: "会议室退款申请", path: '/refund', component: resolve => require(['@/pages/conferenceRoomRental/engineeringRefund/refund'], resolve) },
          { name: "会议室退款记录", path: '/refundRecord', component: resolve => require(['@/pages/conferenceRoomRental/engineeringRefund/refundRecord'], resolve) }
        ]
      }
    ]
  }
];
