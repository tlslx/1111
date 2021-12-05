<style lang="less" scoped>
.recognitionBooths {
  background: #fff;
  .recogFrom {
    margin-left: 10%;
    width: 40%;
  }
}
</style>
<template>
  <el-tabs v-model="activeName" class="recognitionBooths">
    <el-tab-pane label="设置企业审核结果公布批次时间" name="first">
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        label-width="300px"
        :rules="formRules"
        class="recogFrom"
      >
        <el-form-item
          label="第一批公布时间："
          required
          class="inline-item"
          size="small"
          prop="publishBatchOne"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.publishBatchOne"
            style="width: 100%;"
            clearable
            :picker-options="pickerOptionsTh"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="第二批公布时间：" class="inline-item" size="small" prop="publishBatchTwo">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.publishBatchTwo"
            style="width: 100%;"
            clearable
            :default-value="timeDefaultShow"
            :picker-options="pickerOptionsTh"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="第三批公布时间：" class="inline-item" size="small" prop="publishBatchThree">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.publishBatchThree"
            style="width: 100%;"
            clearable
            :picker-options="pickerOptionsTh"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="企业粘连数量截止录入时间："
          class="inline-item"
          size="small"
          prop="companyAdhesionNumberDate"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.companyAdhesionNumberDate"
            style="width: 100%;"
            clearable
            :picker-options="pickerOptionsTh"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商协会品牌粘连审核截止录入时间：" size="small" prop="brandAdhesionCheckDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.brandAdhesionCheckDate"
            style="width: 100%;"
            clearable
            :picker-options="pickerOptionsTh"
          ></el-date-picker>
        </el-form-item>
        <el-row>
          <div style="text-align: center; margin-left: 25%;">
            <el-button type="primary" @click="onSubmit(form)">保存</el-button>
            <el-button>返回</el-button>
          </div>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { $date } from "@/scripts/project/utils";
export default {
  name: "recognitionBooths",
  data() {
    return {
      loading: false,
      pickerOptionsTh: {
        disabledDate(time) {
          return time.getTime() < new Date();
        }
      },
      activeName: "first",
      timeDefaultShow: "",
      form: {
        publishBatchOne: "",
        publishBatchTwo: "",
        publishBatchThree: "",
        companyAdhesionNumberDate: "",
        brandAdhesionCheckDate: ""
      },
      formRules: {
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
        publishBatchThree: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        companyAdhesionNumberDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        brandAdhesionCheckDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    // this.getQuerytime().then((res) => {
    //   if (res.publishBatchThree !== '') {
    //   } else {
    //     this.form.publishBatchThree = '';
    //   }
    //   console.log(this.form.publishBatchThree, this.form, 'kkk');
    // });
    this.getDate();
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "setupTime", // 保存设置企业审核结果公布批次时间
      "querytimeList" // 查询设置企业审核结果公布批次时间
    ])
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getSetuptime", // 保存设置企业审核结果公布批次时间
      "getQuerytime" // 查询设置企业审核结果公布批次时间
    ]),
    // 保存按钮
    onSubmit(val) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let newDate = [];
          for (let key in val) {
            let obj = {};
            obj.publishBatch = key;
            obj.publishDate = $date.format(
              new Date(val[key].getTime()),
              "yyyy-MM-dd"
            );
            newDate.push(obj);
          }
          for (let key in newDate) {
            if (key < 3) {
              newDate[key].orderId = key - 0 + 1;
            }
          }
          this.$confirm("此操作企业审核结果公布批次时间, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.getSetuptime(newDate).then(res => {
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.getDate();
              });
            })
            .catch(() => {
              this.getDate();
              this.$message({
                type: "info",
                message: "取消成功"
              });
            });
        } else {
          return false;
        }
      });
    },
    // 初始页面
    getDate() {
      // this.loading = true;
      let _this = this;
      this.getQuerytime()
        .then(res => {
          this.loading = false;
          if (res.publishBatchOne !== "") {
            this.form.publishBatchOne = new Date(res.publishBatchOne);
          } else {
            res.publishBatchOne = "";
          }
          if (res.publishBatchTwo !== "") {
            _this.form.publishBatchTwo = new Date(res.publishBatchTwo);
          } else {
            _this.form.publishBatchTwo = "";
          }
          if (res.publishBatchThree !== "") {
            _this.form.publishBatchThree = new Date(res.publishBatchThree);
          } else {
            _this.form.publishBatchThree = "";
          }
          if (res.companyAdhesionNumberDate !== "") {
            this.form.companyAdhesionNumberDate = new Date(res.companyAdhesionNumberDate);
          } else {
            _this.form.companyAdhesionNumberDate = "";
          }
          if (res.brandAdhesionCheckDate !== "") {
            this.form.brandAdhesionCheckDate = new Date(res.brandAdhesionCheckDate);
          } else {
            _this.form.brandAdhesionCheckDate = "";
          }
        })
        .catch(e => {
          this.loading = false;
        });
    }
  }
};
</script>


