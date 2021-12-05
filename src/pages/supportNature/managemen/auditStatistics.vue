<style lang='less' scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核统计查询" name="first">
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期选择">
            <el-date-picker
              v-model="ruleForm.datTime"
              type="daterange"
              range-separator="-"
              @change="dateTime"
              
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作员" prop="name">
            <el-input style="width: 200px;" :clearable='true' v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span>共查询到{{this.num}}条审核记录</span>
        <el-table :data="tableData" border style="width: 100%"> 
          <el-table-column prop="firstReviewPassed" align="center" label="初审通过数量">
          </el-table-column>
          <el-table-column prop="firstReviewFailed" align="center" label="初审不通过数量">
          </el-table-column>
          <el-table-column prop="finalReviewPassed" align="center" label="终审通过数量">
          </el-table-column>
          <el-table-column prop="finalReviewFailed" align="center" label="终审不通过数量">
          </el-table-column>
        </el-table>
        <el-button  type="text" size="small" @click="handelDownload">下载XLS</el-button>
        <!-- <el-button  type="text" size="small">打印</el-button> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      num: 150,
      ruleForm: {
        date: '',
        datTime: '',
        name: ''
      },
      tableData: [
      ],
      timeOne: '', 
      timeTne: '', 
      rules: {}
    };
  },
  created() {
    this.handelAuditStatistics({});
  },
  methods: {
    ...mapActions("managemen", [
      "getAuditStatistics"   // 审核统计查询
    ]),
    // 查询
    submitForm() {
      let obj = {
        beginTime: this.timeOne,
        endTime: this.timeTne,
        operatorName: this.ruleForm.name
      };
      this.handelAuditStatistics(obj);
      // this.getAuditStatistics(obj).then(res => {

      // });
    },
    // 下载
    handelDownload() {
      // beginTime=2019-06-12&endTime=2019-06-12&operatorName
      let url = `beginTime=${this.timeOne}&endTime=${this.timeTne}&operatorName=${this.ruleForm.name}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_SN_URL}/api/efSupExhManage/downExhiAuditList?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    handelAuditStatistics(obj) {
      this.getAuditStatistics(obj).then(res => {
        this.num = res.totalCount;
        this.tableData = [];
        this.tableData.push(res);
      });
    },
    // 日期选择
    dateTime(val) {
      if (val) {
        this.timeOne = val[0];
        this.timeTne = val[1];
      } else {
        this.timeOne = "";
        this.timeTne = "";
      }
    }
  }
};
</script>

