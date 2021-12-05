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
      <el-form-item label="展位类别" prop="exhibitionArea">
        <div style="display: flex; justify-content: space-between;">
          <el-input v-model="form.exhibitionArea"></el-input>
          <el-button style="margin-left: 10px;" type="primary" @click="exhibitionVisible = true">选择展区</el-button>
        </div>
      </el-form-item>
      <el-dialog title="选择展区" append-to-body :visible.sync="exhibitionVisible" width="30%;" style="float: left;">
        <el-checkbox-group v-model="checkList" style="padding: 20px;">
          <el-checkbox v-for="(val) in exhibitionArea" :key="val.exhibitionAreaCode" :label="val.exhibitionArea" style="width: 24%;"></el-checkbox>
        </el-checkbox-group>
        <div style="text-align: center; padding-bottom: 20px;">
          <el-button type="primary" @click="twoSubmit">保存</el-button>
          <el-button @click="twoClear">取消</el-button>
        </div>
      </el-dialog>
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
      exhibitionVisible: false,
      exhibitionArea: [],
      checkList: [],
      form: {
        exhibitionArea: ""
      },
      rules: {
        exhibitionArea: [
          { required: true, message: "请选择展位类别", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    checkList(val) {
      if (val) {
        this.form.exhibitionArea = val.join(",");
      }
    }
  },
  mounted() {
    // 展位申请数据
    this.getlistopenApplication().then(res => {
      this.exhibitionArea = JSON.parse(JSON.stringify(res.records));
      // 去重
      let obj = {};
      this.exhibitionArea = this.exhibitionArea.reduce(
        (cur, next) => {
          obj[next.exhibitionAreaCode]
            ? ""
            : (obj[next.exhibitionAreaCode] = true && cur.push(next));
          return cur;
        },
        []
      );
      //  = res.records;
    });
  },
  computed: {
    ...mapGetters("boothNumrange", ["listopen", "addopenList"])
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getlistopenApplication",
      "getAddOpenApplication"
    ]),
    // 确定按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let newDate = [];
          let temp = formName.exhibitionArea.split(',');
          for (let key in this.exhibitionArea) {
            for (let i in temp) {
              if (temp[i] === this.exhibitionArea[key].exhibitionArea) {
                let newArry = {};
                newArry.areaRewardId = this.exhibitionArea[key].exhibitionAreaCode;
                newArry.exhibitionArea = this.exhibitionArea[key].exhibitionArea;
                newArry.delegationRewardId = this.fatDate.delegationRewardId;
                newArry.operatorId = this.$store.getters.userInfo.userId;
                newArry.operatorName = this.$store.getters.userInfo.userName;
                newDate.push(newArry);
              }
            }
          }
          if (newDate.length !== 0) {
            this.getAddOpenApplication(newDate).then(res => {
              this.checkList = [];
              this.closeModel();
              this.$message({
                type: "success",
                message: "开启成功!"
              });
            });
          }
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    },
    //展区选中值
    twoSubmit() {
      this.exhibitionVisible = false;
    },
    //交易团弹框清空值
    twoClear() {
      this.checkList = [];
      this.exhibitionVisible = false;
    }
  }
};
</script>
