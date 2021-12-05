/**
 * @file 查看详细
 */
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-card class="box-card">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="查看详细" name="first">
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
                  <el-form-item label="回复速度：" prop="customerRecoverySpeed">
                    <el-rate v-model="ruleForm.customerRecoverySpeed"></el-rate>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理满意度：" prop="customerProcessingSatisfaction">
                    <el-rate v-model="ruleForm.customerProcessingSatisfaction"></el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="服务人员态度：" prop="customerServiceStaffAttitude">
                    <el-rate v-model="ruleForm.customerServiceStaffAttitude"></el-rate>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="综合满意度：" prop="customerComprehensiveSatisfaction">
                    <el-rate v-model="ruleForm.customerComprehensiveSatisfaction"></el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="回访是否成功：" prop="isReturnVisitSuccess">
                    <el-select v-model="ruleForm.isReturnVisitSuccess" clearable>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否结单：" prop="isCheck">
                    <el-select v-model="ruleForm.isCheck" clearable>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="回访说明：" prop="returnVisitInstructions">
                <el-input type="textarea" v-model="ruleForm.returnVisitInstructions"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="回访者：" prop="visitor">
                    <el-input v-model="ruleForm.visitor"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="回访时间：" prop="returnVisitTime">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="回访次数：">
              </el-form-item>
              <el-form-item>
                <el-button type="text" style="text-decoration:underline;" @click="ruleDialogVisible = !ruleDialogVisible">回访记录</el-button>
                <el-dialog title="回访记录" :visible.sync="ruleDialogVisible" width="70%">
                  <el-table border :data="brandApplyData.records" v-loading="loading">
                    <el-table-column label="是否回访成功" prop="mainProjectCode" align="center"></el-table-column>
                    <el-table-column label="是否结单" prop="mainProjectName" align="center"></el-table-column>
                    <el-table-column label="回访说明" prop="place" align="center"></el-table-column>
                    <el-table-column label="回访人姓名" prop="mainProjectCode" align="center"></el-table-column>
                    <el-table-column label="回访时间" prop="mainProjectName" align="center"></el-table-column>
                  </el-table>
                </el-dialog>
              </el-form-item>
              <el-form-item label="结单说明：">
                <el-input type="textarea" v-model="ruleForm.statementDescription"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结单者：" prop="statemenHolder">
                    <el-input v-model="ruleForm.statemenHolder"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结单时间：" prop="statementTime">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="text-align:center">
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
        typeName: "",
        removeLegend: "",
        exhibitionNumber: "",
        isForm: "",
        height: "",
        constructionLegend: ""
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