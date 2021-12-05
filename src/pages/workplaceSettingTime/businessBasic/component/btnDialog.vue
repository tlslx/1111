<style lang="less" scoped>
/deep/.el-dialog__body {
  height: 100%;
}
</style>
<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="150px">
    <el-form-item label="审核结果公布时间" prop="source">
      <el-select v-model="form.source" placeholder="请选择时间">
        <el-option v-for="item in batchTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <!-- jcrao 不需要不通过原因  5/23
    <el-form-item label="不通过原因" prop="examineOpinion" v-if="isshow">
      <el-input v-model.trim="form.examineOpinion" maxlength="200" placeholder="请输入内容"></el-input>
    </el-form-item>
    -->
    <el-form-item style="padding-bottom: 10px;">
      <el-button type="primary" :disabled="subDisab" @click="onSubmit(form)">提交</el-button>
      <el-button @click="closeModel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["onebtnData", "subDisab"],
  data() {
    return {
      options: [],
      batchTime: [],
      form: {
        source: "",
        examineOpinion: '',
        roleJsonStr: []
      },
      isshow: false,
      fileList2: [],
      timeAll: [
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_0' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_1' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_2' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_3' }
      ],
      rules: {
        source: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        examineOpinion: [
          {
            required: true,
            message: "请填入不通过原因",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "batchList", // //获取审核结果的公布批次时间
      "quaList"
    ]),
    ...mapGetters("nainformation", ["getCes"])
  },
  watch: {
    "onebtnData.examineOpinion": {
      handler(val) {
        if (val === '不通过') {
          this.isshow = true;
        } else {
          this.isshow = false;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    let newArry = [];
    for (let key in this.$store.getters.userInfo.role) {
      let newobj = {};
      newobj.roleId = this.$store.getters.userInfo.role[key].roleId;
      newobj.roleName = this.$store.getters.userInfo.role[key].roleName;
      newArry.push(newobj);
    }
    this.form.roleJsonStr = JSON.stringify(newArry);
    for (let i = 0; i < this.timeAll.length; i++) {
      let temp = {};
      temp.subKey = this.timeAll[i].time;
      this.getBatchtime(temp).then(res => {
        if (i === 0) {
          this.batchTime.push({ label: '即时发布', value: 0 });
        } else {
          this.batchTime.push({ label: "第" + i + '批次' + res.startTime + '-' + res.endTime, value: i });
          this.batchTime.sort((a, b) => {
            return a.value - b.value;
          });
        }
      });
    }
  },
  mounted() {
    // 当前展届
    this.getcurrentExhibitionSession();
    // this.onebtnData.row.companyId
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getBatchtime", //获取审核结果的公布批次时间
      "getQualificationaudit",
      // "gettime", // 公布批次时间的接口 与 getBatchtime 是同一接口 无用功 19/5/22日
      "publishtimeCheckCompany" // 设置企业资料公布批次时间
    ]),
    ...mapActions("nainformation", [
      "getcurrentExhibitionSession" // 展届
    ]),
    onSubmit(val) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let newArry = {};
          let newDate = [];
          for (let key in this.batchTime) {
            if (val.source === this.batchTime[key].publishBatch) {
              newArry.publishTime = this.batchTime[key].value;
            }
          }
          if (this.onebtnData.examineOpinion === "通过") {
            newArry.examineStatus = 1;
            newArry.examineOpinion = '通过';
          } else {
            newArry.examineStatus = 2;
            newArry.examineOpinion = val.examineOpinion;
          }
          for (let key in this.batchTime) {
            if (this.batchTime[key].value === val.source) {
              let newLabel = this.batchTime[key].label;
              newDate = newLabel.split('-');
            }
          }
          if (val.source === 0) {
            newArry.publishId = "0";
          } else if (val.source === 1) {
            newArry.publishId = "1";
          } else if (val.source === 2) {
            newArry.publishId = "2";
          } else if (val.source === 3) {
            newArry.publishId = "3";
          }
          newArry.roleJsonStr = this.form.roleJsonStr;
          newArry.ownId = this.onebtnData.row.companyId;
          newArry.examineUserId = this.$store.getters.userInfo.userId;
          newArry.examineUserCn = this.$store.getters.userInfo.userName;
          newArry.examineOrg = this.onebtnData.row.delegationId;
          newArry.examineOrgCn = this.onebtnData.row.delegationName;
          newArry.delegationType = this.onebtnData.row.delegationType;
          //newArry.publishTime
          if (newArry.publishId === "0") {
            let date = new Date();
            let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            newArry.publishTime = `${date.getFullYear()}/${month}/${strDate}`;
          } else {
            newArry.publishTime = newDate[1];
          }
          newArry["exhibitionSession"] = this.getCes;
          // 修改人 李康 修改时间 19/5/22
          // this.getQualificationaudit(newArry).then(res => {
          //   this.$message({
          //     type: "success",
          //     message: "保存成功!"
          //   });
          //   this.closeModel();
          // });
          this.publishtimeCheckCompany(newArry).then(res => {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.closeModel();
          });
        }
      });
    },
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    },
    handleRemove(file, fileList) {
      //   console.log(file, fileList, "kkkk");
    },
    handlePreview(file) {
      //   console.log(file, "kkkk");
    },
    changeFile(file, fileList) {
      //   console.log(file, fileList, "kkk");
    }
  }
};
</script>
