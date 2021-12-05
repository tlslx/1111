/**
 * @file 邀请情况列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="邀请情况列表" name="0" >
      <invitation-list></invitation-list>
    </el-tab-pane>
    <el-tab-pane label="当届邀请邮件发送情况" name="1">
      <send-status></send-status>
    </el-tab-pane>
    <el-tab-pane label="邀请邮件统计查看" name="2">
      <invite-see></invite-see>
    </el-tab-pane>
    <el-tab-pane label="交易团邀请邮件发送情况" name="3">
      <trading-status></trading-status>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import invitationList from "@/components/project/onlineService/enterpriseServiceResearchManage/invitationList.vue";
import sendCurrentInvitationMailStatus from "@/components/project/onlineService/enterpriseServiceResearchManage/sendCurrentInvitationMailStatus.vue";
import inviteEmailStatsSee from "@/components/project/onlineService/enterpriseServiceResearchManage/inviteEmailStatsSee.vue";
import tradingGroupSendEmailStatus from "@/components/project/onlineService/enterpriseServiceResearchManage/tradingGroupSendEmailStatus.vue";
export default {
  components: {
    "invitation-list": invitationList,
    "send-status": sendCurrentInvitationMailStatus,
    "invite-see": inviteEmailStatsSee,
    "trading-status": tradingGroupSendEmailStatus
  },
  data() {
    return {
      activeName: "0"
    };
  },
  computed: {}
};
</script>
<style></style>
