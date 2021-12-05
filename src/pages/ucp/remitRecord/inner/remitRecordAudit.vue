
<template>
  <el-form :ref="name" :model="form" :rules="rules">
    <el-row>
      <el-form-col :span="24">
        <el-form-item label="审核意见：" prop="approveRemark">
          <el-input type="textarea" v-model="form.approveRemark" :rows="4"></el-input>
        </el-form-item>
      </el-form-col>
    </el-row>
  </el-form>
</template>

<script>
import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      activeTab: 'baseInfo',
      form: { approveRemark: '', primaryKey: '' },
      rules: {
        approveRemark: [
          { required: true, message: '请输入审核意见', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    pageLoad() {
    },
    submitForm() {
      let _this = this;
      let id = this.params.id;
      this.$http.post(kindo.config.api.unifiedCollectUrl + "/api/remitRecords/updateAuditStateById", { "id": id, "state": "3", "remark": this.form.approveRemark }).then(
        function (res) {
          _this.submitSuccess(res);

        },
        function () {
        }
      );
    }
  }
};
</script>

<style>
.el-form-item__content {
  margin-left: 0px;
}
</style>

