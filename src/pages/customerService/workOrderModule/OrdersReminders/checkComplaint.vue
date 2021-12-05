/**
 * @file 查看投诉报障工单
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查看投诉报障工单" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="工单号：" prop="workOrderNumber">
                  {{ruleForm.workOrderNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" prop="status">
                  {{ruleForm.status}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型：" prop="workOrderType">
                  {{ruleForm.workOrderType}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="咨询投诉编号：" prop="counselingComplainId">
                  {{ruleForm.counselingComplainId}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来电人姓名：" prop="callerName">
                  {{ruleForm.callerName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="（无限固话故障号码）其他联系方式：" prop="otherContactNumber">
                  {{ruleForm.otherContactNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来电号码：" prop="callerNumber">
                  {{ruleForm.callerNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参展商名称：" prop="exhibitorName">
                  {{ruleForm.exhibitorName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展览名称：" prop="exhibitionName">
                  {{ruleForm.exhibitionName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="期数：" prop="numberPeriods">
                  {{ruleForm.numberPeriods}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展位号（地点）：" prop="positionNumber">
                  {{ruleForm.positionNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{ruleForm.exhibitionHall}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{ruleForm.exhibitionArea}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投诉报障标题：" prop="complaintReportTitle">
                  {{ruleForm.complaintReportTitle}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="投诉报障内容：" prop="complaints">
                  {{ruleForm.complaints}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="投诉报障项目：" prop="complaintsReport">
                  {{ruleForm.complaintsReport}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="科室班组：" prop="departmentTeam">
                  {{ruleForm.departmentTeam}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="接单员：" prop="receiver">
                  {{ruleForm.receiver}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号码：" prop="phoneNumber">
                  {{ruleForm.phoneNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="回复内容；" prop="replyContent">
              <el-input type="textarea" v-model="ruleForm.replyContent" placeholder="请输入"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回复者：" prop="replyUser">
                  <el-input v-model="ruleForm.replyUser" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回复时间：" prop="replyTime">
                  <el-input v-model="ruleForm.replyTime" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="回复内容；" prop="replyContent">
              <el-input type="textarea" v-model="ruleForm.replyContent"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回复者：" prop="replyUser">
                  <el-input v-model="ruleForm.replyUser" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回复时间：" prop="replyTime">
                  <el-input v-model="ruleForm.replyTime" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="text" style="text-decoration:underline;" @click="openCope">查看历史回复记录</el-button>
              <el-dialog title="历史查询记录" :visible.sync="OpenCopeExhibitionReceiver">
                <template>
                  <table v-for="(item,index) in times" :key="index">
                    <tr v-for="(data,k) in item.responseCorrelations" :key="k">
                      <td class="column">{{data.replyUser}}</td>
                      <td>{{data.replyContent}}</td>
                    </tr>
                  </table>
                </template>
              </el-dialog>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button class="btn1" @click="submitForm('form')">回复</el-button>
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
        <el-table border :data="brandApplyData.records" v-loading="loading">
          <el-table-column label="" prop="sequenceNum" align="center"></el-table-column>
          <el-table-column label="步骤" prop="opr" align="center"></el-table-column>
          <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorId" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
          <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
          <el-table-column label="座机" prop="linkTel" align="center"></el-table-column>
          <el-table-column label="备注" prop="status" align="center"></el-table-column>
          <el-table-column label="处理时间" prop="status" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin:60px;text-align:center">
      <el-form>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('form')">下载楣版模版</el-button>
          <el-button class="btn2" @click="closeCope">打印参展证明</el-button>
          <el-button class="btn2" @click="revert">下载参展证明</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      heights: [],
      isForms: [],
      constructionLegends: [],
      secondTypeNames: [],
      exhibitionNumber: [],
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
      },
      rules: {
        typeName: [{ required: true, message: "请输入", trigger: "blur" }],
        removeLegend: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        isForm: [{ required: true, message: "请选择", trigger: "change" }],
        height: [{ required: true, message: "请选择", trigger: "change" }],
        constructionLegend: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters('companyInfomation', ['brandApplyData'])
  },
  methods: {
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