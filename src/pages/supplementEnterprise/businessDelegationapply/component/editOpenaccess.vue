<style lang="less" scoped>
.editOpenaccess {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
</style>
<template>
  <div class="editOpenaccess">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="届数:" prop="delegation">
        124
      </el-form-item>
      <el-form-item label="交易团:" prop="delegation">
        <el-select v-model="form.delegation" placeholder="请选择交易团">
          <el-option
            v-for="item in delegation"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补录类型:" prop="supplement">
        <el-select v-model="form.supplement" placeholder="请选择交易团">
          <el-option
            v-for="item in supplementDate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限开始时间:" class="inline-item" size="small" prop="publishBatchOne">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.publishBatchOne"
          style="width: 100%;"
          clearable
          :picker-options="pickerOptionsTh"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="权限结束时间:" class="inline-item" size="small" prop="publishBatchTwo">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.publishBatchTwo"
          style="width: 100%;"
          clearable
          :picker-options="pickerOptionsTh"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="展区:" prop="areaRewardId">
        <el-select v-model="form.areaRewardId" placeholder="请选择展区">
          <el-option
            v-for="item in exhibitionArea"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称:" prop="name">
        宝芝林
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
      exhibitionArea: [],
      pickerOptionsTh: {
        disabledDate(time) {
          return time.getTime() < new Date();
        }
      },
      supplementDate: [
        {
          value: '1',
          label: '新增'
        },
        {
          value: '2',
          label: '修改'
        }, 
        {
          value: '3',
          label: '撤销'
        }
      ],
      delegation: [],
      form: {
        areaRewardId: "",
        delegation: '',
        publishBatchOne: '',
        publishBatchTwo: ''
      },
      rules: {
        publishBatchOne: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        publishBatchTwo: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        areaRewardId: [
          { required: true, message: "请选择展区类别", trigger: "change" }
        ],
        delegation: [
          { required: true, message: "请选择展区类别", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    // 展位申请数据
    let dictData = JSON.parse(localStorage.getItem("dictData"));
    this.exhibitionArea = dictData.exhibitionArea;
    this.delegation = dictData.delegation;
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
          // console.log(formName, this.fatDate, "formName");
          formName["delegationRewardId"] = this.fatDate.delegationRewardId;
          formName["operatorId"] = this.$store.getters.userInfo.userId;
          formName["operatorName"] = this.$store.getters.userInfo.userName;
          this.getAddOpenApplication(formName).then(res => {
            this.closeModel();
            this.$message({
              type: "success",
              message: "开启成功!"
            });
          });
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.form = {
        areaRewardId: ""
      };
      this.$emit("closeModal", false);
    }
  }
};
</script>
