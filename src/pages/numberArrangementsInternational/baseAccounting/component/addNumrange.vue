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
      <el-form-item label="是否启用" prop="isshow">
        <el-select v-model="form.isshow">
          <el-option v-for="item in isshow" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="届数" prop="exhibitionSession">
        <el-select v-model="form.exhibitionSession">
          <el-option v-for="item in exhibitionSession" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入" v-model="form.name" maxlength="3"></el-input>
      </el-form-item>
      <el-form-item label="交易团" prop="delegation">
        <div style="display: flex; justify-content: space-between;">
          <el-input placeholder="请选择" v-model="form.delegation"></el-input>
          <el-button style="margin-left: 10px;" type="primary" @click="delegationVisible = true">选择交易团</el-button>
        </div>
      </el-form-item>
      <el-form-item label="展区" prop="exhibitionArea">
        <div style="display: flex; justify-content: space-between;">
          <el-input placeholder="请选择" v-model="form.exhibitionArea"></el-input>
          <el-button style="margin-left: 10px;" type="primary" @click="exhibitionVisible = true">选择展区</el-button>
        </div>
      </el-form-item>
      <el-dialog title="选择交易团" append-to-body :visible.sync="delegationVisible" width="30%;" style="float: left;">
        <el-checkbox-group v-model="delegationList" style="padding: 20px;">
          <el-checkbox v-for="(val, index) in delegation" :key="index"  :label="val.label" style="width: 24%;"></el-checkbox>
        </el-checkbox-group>
        <div style="text-align: center; padding-bottom: 20px;">
          <el-button type="primary" @click="oneSubmit">保存</el-button>
          <el-button @click="oneClear">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择展区" append-to-body :visible.sync="exhibitionVisible" width="30%;" style="float: left;">
        <el-checkbox-group v-model="checkList" style="padding: 20px;">
          <el-checkbox v-for="(val, index) in exhibitionArea" :key="index"  :label="val.label" style="width: 24%;"></el-checkbox>
        </el-checkbox-group>
        <div style="text-align: center; padding-bottom: 20px;">
          <el-button type="primary" @click="twoSubmit">保存</el-button>
          <el-button @click="twoClear">取消</el-button>
        </div>
      </el-dialog>
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
      exhibitionArea: [],
      delegation: [],
      exhibitionSession: [],
      checkList: [],
      delegationList: [],
      exhibitionVisible: false,
      delegationVisible: false,
      form: {
        isshow: '',
        exhibitionSession: "",
        delegation: '',
        name: '',
        exhibitionArea: ''
      },
      rules: {
        exhibitionSession: [
          { required: true, message: "请输入届数", trigger: "blur" },
          { type: "number", message: "届数必须为数字值", trigger: "blur" }
        ],
        isshow: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        delegation: [
          { required: true, message: "请选择交易团", trigger: "blur" }
        ],
        exhibitionArea: [
          { required: true, message: "请选择展区", trigger: "blur" }
        ]
      },
      isshow: [
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        }
      ]
    };
  },
  created() {
    // 获取展届
    this.getsysExhibitions().then(res => {
      let resData = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < resData.data.length; i++) {
        this.exhibitionSession.push(resData.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSession = this.exhibitionSession.sort(rul).map(item => {
        return { value: item, label: item };
      });
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegation = JSON.parse(JSON.stringify(res)).map(item => {
        return { value: item.deptCode, label: item.deptName };
      });
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionArea = JSON.parse(JSON.stringify(res)).map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
  },
  watch: {
    checkList(val) {
      if (val) {
        this.form.exhibitionArea = val.join(",");
      }
    },
    delegationList(val) {
      if (val) {
        this.form.delegation = val.join(",");
      }
    }
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
    ...mapActions("nainformation", [
      "getsysExhibitions", // 获取所有展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
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
    },
    //交易团选中值
    oneSubmit() {
      this.delegationVisible = false;
    },
    //交易团弹框清空值
    oneClear() {
      this.delegationList = [];
      this.delegationVisible = false;
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
