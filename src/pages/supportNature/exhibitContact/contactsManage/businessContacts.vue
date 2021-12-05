/**
 * @file 业务联系人通讯录管理
 * @date:2019/5/8
 */
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="组展单位联系人" name="first">
        <group-exhibit-contracts></group-exhibit-contracts>
      </el-tab-pane>
      <el-tab-pane label="第三方单位联系人" name="second">
        <contracts></contracts>
      </el-tab-pane> -->
      <el-tab-pane label="短信联系人" name="first">
        <sms-recipient></sms-recipient>
      </el-tab-pane>
      <el-tab-pane label="筹撤展期间联络员管理" name="second">
        <liaison-contacts></liaison-contacts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SmsRecipient from "./SmsRecipient.vue"; // 短信联系人
import LiaisonContacts from "./liaisonContacts.vue"; // 短信联系人
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  components: { SmsRecipient, LiaisonContacts },
  mixins: [listPageBase],
  data() {
    return {
      pageId: 'businessContacts',
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  padding-top: 10px;
}
</style>
