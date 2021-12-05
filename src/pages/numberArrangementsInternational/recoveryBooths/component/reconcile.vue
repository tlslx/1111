<style lang="less" scoped>
.openApplication {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
</style>
<template>
  <div class="openApplication">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="调和系数" prop="configValue">
        <el-input type="text" placeholder="请输入内容" maxlength="4" v-model.trim="form.configValue"></el-input>
      </el-form-item>
      <el-form-item style="text-algin: center;">
        <el-button type="primary" @click="onSubmit(form)">确认</el-button>
        <el-button @click="closeModel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fatDate"],
  data() {
    let validateNum = (rule, value, callback) => {
      let str = /^(1|0\.\d{1,2})$/;
      if (!str.test(value)) {
        return callback(new Error('调和系数大于0,小于等于1,请不要超过两位小数,请不要输入1.00,1.0这样的数字'));
      } else {
        return callback();
      }
    };
    return {
      form: {
        configValue: ""
      },
      rules: {
        configValue: [
          { required: true, message: "请输入调和系数", trigger: "blur" },
          { validator: validateNum }
        ]
      }
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("boothNumrange", ["savereconcileList"])
  },
  methods: {
    ...mapActions("boothNumrange", ["getsaveReconcileInfo"]),
    // 确定按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          formName["operatorId"] = this.$store.getters.userInfo.userId;
          formName["operatorName"] = this.$store.getters.userInfo.userName;
          this.getsaveReconcileInfo(formName).then(res => {
            this.closeModel();
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          });
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModel", false);
    }
  }
};
</script>