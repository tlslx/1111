/**
 * @file 回复
 */
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-card class="box-card">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="回复" name="first">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="咨询投诉编码：" prop="counselingComplaintCode">
                    {{byIdComplaint.counselingComplaintCode}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="咨询投诉状态：" prop="consultationStatus">
                    {{byIdComplaint.consultationStatus}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="咨询投诉类型：" prop="consultationComplaintType">
                    {{byIdComplaint.consultationComplaintType}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="广交会证件号：" prop="cantonFairDocumentNo">
                    {{byIdComplaint.cantonFairDocumentNo}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="name">
                    {{byIdComplaint.name}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="contactNumber">
                    {{byIdComplaint.contactNumber}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="邮箱：" prop="email">
                    {{byIdComplaint.email}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="国家：" prop="country">
                    {{byIdComplaint.country}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="语言：" prop="language">
                    {{byIdComplaint.language}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标题：" prop="title">
                    {{byIdComplaint.title}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="问题描述：" prop="problemDescription">
                {{byIdComplaint.problemDescription}}
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="录入员：" prop="recordPerson">
                    {{byIdComplaint.recordPerson}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="录入时间：" prop="recordTime">
                    {{byIdComplaint.recordTime}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="回复内容：" prop="replyContent">
                <el-input type="textarea" v-model="ruleForm.replyContent"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="回复者：" prop="replyUser">
                    <el-input v-model="ruleForm.replyUser"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="回复时间：" prop="replyTime">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="text-align:center">
                <el-button class="btn1" @click="submitForm">回复</el-button>
                <el-button class="btn2" @click="toBack">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <div slot="header" class="clearfix">
          <span>● 工单（查看处理过程）</span>
        </div>
        <div>
          <el-table border :data="brandApplyData.records" v-loading="loading">
            <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
            <el-table-column label="工单号" prop="workOrder.workOrderNumber" align="center"></el-table-column>
            <el-table-column label="状态" prop="workOrder.workStatus" align="center"></el-table-column>
            <el-table-column label="工单类型" prop="workOrder.workType" align="center"></el-table-column>
            <el-table-column label="接单部门" prop="deptName" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="workOrder.createTime" align="center"></el-table-column>
            <el-table-column label="展览名称" prop="workOrder.exhName" align="center"></el-table-column>
            <el-table-column label="展期" prop="workOrder.numberPeriods" align="center"></el-table-column>
            <el-table-column label="展位号" prop="workOrder.positionNumber" align="center"></el-table-column>
            <el-table-column label="参展商" prop="workOrder.exhibitorName" align="center"></el-table-column>
            <el-table-column label="标题" prop="workOrder.workTitle" align="center"></el-table-column>
            <!-- <el-table-column label="问题描述" prop="workOrder.exhName" align="center"></el-table-column> -->
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      id: '',
      ruleForm: {
        replyContent: "",
        replyUser: "",
        replyTime: ""
      }
    };
  },
  created() {
    this.getQuery();
    let _this = this;
    this.loading = true;
    this.selectByIdComplaint(this.id).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('submissionOrders', ['byIdComplaint'])
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getQuery'
  },
  methods: {
    ...mapActions('submissionOrders', ['selectByIdComplaint']),
    ...mapActions('returnVisitorSatisfaction', ['addVisitRecordInfo']),
    handleClick(tab, event) {

    },
    toBack() {
      this.$router.back();
    },
    // 表单提交
    submitForm() {
      let _this = this;
      this.loading = true;
      this.addVisitRecordInfo(this.ruleForm).then(response => {
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.clearfix {
  font-weight: bold;
  margin: 12px;
}
</style>