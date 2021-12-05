/**
 * @file 反馈投诉报障工单
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="反馈投诉报障工单" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="工单号：" prop="workOrderNumber">
                  {{id}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" prop="status">
                  {{workOrder.status}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型：" prop="workOrderType">
                  {{workOrder.workOrderType}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="咨询投诉编号：" prop="counselingComplainId">
                  {{workOrder.counselingComplainId}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来电人姓名：" prop="callerName">
                  {{workOrder.callerName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="（无限固话故障号码）其他联系方式：" prop="otherContactNumber">
                  {{workOrder.otherContactNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来电号码：" prop="callerNumber">
                  {{workOrder.callerNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参展商名称：" prop="exhibitorName">
                  {{workOrder.exhibitorName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展览名称：" prop="exhibitionName">
                  {{workOrder.exhibitionName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="期数：" prop="numberPeriods">
                  {{workOrder.numberPeriods}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展位号（地点）：" prop="positionNumber">
                  {{workOrder.positionNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{workOrder.exhibitionHall}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{workOrder.exhibitionArea}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉报障标题：" prop="complaintReportTitle">
                  {{workOrder.complaintReportTitle}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="投诉报障内容：" prop="complaints">
                  {{workOrder.complaints}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="投诉报障项目：" prop="complaintsReport">
                  {{workOrder.complaintsReport}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="科室班组：" prop="departmentTeam">
                  {{workOrder.departmentTeam}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="接单员：" prop="receiver">
                  {{workOrder.receiver}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号码：" prop="phoneNumber">
                  {{workOrder.phoneNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="反馈状态：" prop="isForm">
                  <el-select :disabled="true" v-model="ruleForm.isForm" clearable>
                    <el-option v-for="item in isForms" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="反馈说明">
              <el-input type="textarea" v-model="ruleForm.exhibitionNumber"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button class="btn1" @click="submitForm('form')">反馈</el-button>
              <el-button class="btn2" @click="closeCope">打印</el-button>
              <el-button class="btn2" @click="revert">返回</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin:10px">
      <div slot="header" class="clearfix">
        <span>● 工单处理过程</span>
      </div>
      <div>
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="" prop="sequenceNum" align="center"></el-table-column>
          <el-table-column label="步骤" prop="opr" align="center"></el-table-column>
          <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorId" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
          <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
          <el-table-column label="座机" prop="linkTel" align="center"></el-table-column>
          <el-table-column label="处理时间" prop="oprTime" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      isForms: [],
      id: "020190606144831707",
      ruleForm: {
        typeName: "",
        removeLegend: "",
        exhibitionNumber: "",
        isForm: "",
        height: "",
        constructionLegend: ""
      },
      form: {
        typeName: "",
        secondTypeName: "",
        exhibitionNumber: "",
        exhibitionName: "",
        unitMeasurement: "",
        exhibitionQuantity: ""
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectWorkOrder(this.id).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('OrdersReminders', ['workOrder'])
  },
  methods: {
    ...mapActions('OrdersReminders', ['selectWorkOrder']),
    revert() {
      this.$router.push("/myWorkOrde");
    },
    openCope() {
      this.OpenCopeExhibitionReceiver = true;
    },
    closeCope() {
      this.OpenCopeExhibitionReceiver = false;
    },
    handleClick(tab, event) {

    },
    feedback() {

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