/**
 * @file 企业展品管理---审核意见
*/
<style></style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作部审核联营企业" name="first">
      <el-form :model="form" ref="form" label-width="60%"  label-position="right" style="width: 50%; margin-top: 30px;">
        <el-form-item label="联营企业名称：">
          {{ form.nameCh }}
        </el-form-item>
        <el-form-item label="联营企业地址：">
          {{ form.addressCh }}
        </el-form-item>
        <el-form-item label="法人代表：">
          {{ form.legalPerson }}
        </el-form-item>
        <el-form-item label="联系电话（手机）：">
          {{ form.phone }}
        </el-form-item>
        <el-form-item label="审核意见：">
          <el-input type="textarea" :rows="5" maxlength="255" v-model="form.approveExplain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" v-loading.fullscreen.lock="fullscreenLoading">通过</el-button>
          <el-button @click="resetForm" v-loading.fullscreen.lock="fullscreenLoading">不通过</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      fullscreenLoading: false,
      form: {
        nameCh: '', // 企业名称
        addressCh: '', // 地址
        legalPerson: '', // 法人代表
        phone: '', // 手机
        approveExplain: '', // 审核意见
        approveStatus: '', // 审核状态
        workDepartmentResult: '' // 工作部审核结果
      }
    };
  },
  computed: {
    ...mapGetters('JointVentureManagement', ['getopinion'])
  },
  methods: {
    ...mapActions('JointVentureManagement', ['approveAssociateEnterprisesInfo']),
    // 审核通过
    submitForm() {
      this.fullscreenLoading = true;
      this.form.approveStatus = "1";
      let param = {
        "associateEnterprisesInfos": [
          {
            "associateId": this.form.associateId,
            "approveStatus": this.form.approveStatus,
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "type": "AG",
            "workDepartmentResult": "1",
            "approveExplain": this.form.approveExplain
          }
        ]
      };
      this.approveAssociateEnterprisesInfo(param).then(res => {
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
        this.$message.success("审核通过");
        this.$router.push("/auditJointVenture");
      });
    },
    // 审核不通过
    resetForm() {
      this.fullscreenLoading = true;
      this.form.approveStatus = "2";
      let param = {
        "associateEnterprisesInfos": [
          {
            "associateId": this.form.associateId,
            "approveStatus": this.form.approveStatus,
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "type": "AG",
            "workDepartmentResult": "2",
            "approveExplain": this.form.approveExplain
          }
        ]
      };
      this.approveAssociateEnterprisesInfo(param).then(res => {
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
        this.$message.success("审核不通过");
        this.$router.push("/auditJointVenture");
      });
    }
  },
  // 获取上一页面带来的值
  created() {
    let row = this.$route.query.row;
    this.form = row;
  }
};
</script>
