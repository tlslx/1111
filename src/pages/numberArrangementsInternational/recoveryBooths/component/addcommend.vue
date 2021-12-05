<style lang="less" scoped>
.addNumrange {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
</style>
<template>
  <div class="addNumrange">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="届数" prop="exhibitionSession">
        <el-input v-model.number="form.exhibitionSession" maxlength="3"></el-input>
      </el-form-item>
      <el-form-item label="交易团" prop="delegationId">
        <el-select v-model="form.delegationId" placeholder="请选择展区">
          <el-option
            v-for="item in delegation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-algin: center;">
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
        <el-button @click="closeModel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      delegation: [],
      form: {
        exhibitionSession: "",
        delegationId: ""
      },
      rules: {
        exhibitionSession: [
          { required: true, message: "请输入届数", trigger: "blur" },
          { type: "number", message: "届数必须为数字值", trigger: "blur" }
        ],
        delegationId: [
          { required: true, message: "请选择交易团", trigger: "change" }
        ]
      }
    };
  },
  async created() {
    this.delegation = await kindo.dictionary.get('delegation'); 
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "AddapplicationList" 
    ])
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getAddApplication" 
    ]),
    // 确定按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.delegation.forEach((val, index) => {
            if (formName.delegationId === val.value) {
              formName["delegationName"] = val.label;
            }
          });
          formName["operatorId"] = this.$store.getters.userInfo.userId;
          formName["operatorName"] = this.$store.getters.userInfo.userName;
          this.getAddApplication(formName).then(res => {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.closeModel();
          });
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    }
  }
};
</script>
