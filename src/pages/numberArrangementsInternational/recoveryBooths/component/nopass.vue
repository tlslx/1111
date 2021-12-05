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
      <el-form-item label="原因" prop="examineOpinion">
        <el-input type="textarea" maxlength="200" placeholder="请输入内容" v-model.trim="form.examineOpinion"></el-input>
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
    return {
      form: {
        examineOpinion: ""
      },
      rules: {
        examineOpinion: [
          { required: true, message: "请填写不通过原因", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("boothNumrange", ["updatecommend"])
  },
  methods: {
    ...mapActions("boothNumrange", ["getUpdateCommend"]),
    // 确定按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.fatDate.isshow) {
            // console.log(this.fatDate, 'kkk');
            let newDate = [];
            for (let key in this.fatDate.row) {
              let temp = {};
              temp.recordId = this.fatDate.row[key].recordId;
              temp.examineUserCn = this.$store.getters.userInfo.userName;
              temp.examineUserId = this.$store.getters.userInfo.userId;
              temp.operatorName = this.$store.getters.userInfo.userName;
              temp.operatorId = this.$store.getters.userInfo.userId;
              temp.examineStatus = this.fatDate.eventType;
              temp.examineOpinion = formName.examineOpinion;
              newDate.push(temp);
            }
            this.getUpdateCommend(newDate).then(res => {
              this.closeModel();
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            });

          } else {
            formName["recordId"] = this.fatDate.row.recordId;
            formName["examineUserId"] = this.$store.getters.userInfo.userId;
            formName["examineUserCn"] = this.$store.getters.userInfo.userName;
            formName["operatorId"] = this.$store.getters.userInfo.userId;
            formName["operatorName"] = this.$store.getters.userInfo.userName;
            formName["examineStatus"] = this.fatDate.eventType;
            formName["examineOpinion"] = formName.examineOpinion;
            this.getUpdateCommend(formName).then(res => {
              this.closeModel();
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            });
          }
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.$refs.form.resetFields(); //重置
      this.$emit("closeModel", false);
    }
  }
};
</script>
