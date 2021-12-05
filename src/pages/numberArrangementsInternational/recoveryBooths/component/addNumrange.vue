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
      <el-form-item label="展区" prop="exhibitionAreaCode">
        <el-select v-model="form.exhibitionAreaCode" placeholder="请选择展区">
          <el-option
            v-for="item in exhibitionArea"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="boothNumber">
        <el-input v-model="form.boothNumber" maxlength="11"></el-input>
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
    //验证申请面积
    let validateNum = (rule, value, callback) => {
      let str = /^\+?(0|[1-9][0-9]*)$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正整数'));
      } else {
        return callback();
      }
    };
    return {
      exhibitionArea: [],
      form: {
        exhibitionSession: "",
        exhibitionAreaCode: "",
        boothNumber: ""
      },
      rules: {
        exhibitionSession: [
          { required: true, message: "请输入届数", trigger: "blur" },
          { type: "number", message: "届数必须为数字值", trigger: "blur" }
        ],
        exhibitionAreaCode: [
          { required: true, message: "请选择展区", trigger: "change" }
        ],
        boothNumber: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          },
          { validator: validateNum }
          // { type: "number", message: "数量必须为数字值", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    // let dictData = await kindo.dictionary.get('exhibitionArea'); 
    // let Mapdata = dictData.map(item => {
    //   return { value: item.value, text: item.label };
    // });
    // this.exhibitionArea = Mapdata;
    // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "addList" 
    ])
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getAddNumregiste" 
    ]),
    ...mapActions('nainformation', ['getexhibitionArea']),
    // 确定按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.exhibitionArea.forEach((val, index) => {
            if (formName.exhibitionAreaCode === val.value) {
              formName["exhibitionArea"] = val.text;
            }
          });
          formName["operatorId"] = this.$store.getters.userInfo.userId;
          formName["operatorName"] = this.$store.getters.userInfo.userName;
          this.getAddNumregiste(formName).then(res => {
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
      this.form = {
        boothNumber: "",
        exhibitionSession: "",
        exhibitionAreaCode: ""
      };
      this.$emit("closeModal", false);
    }
  }
};
</script>
