/**
 * @file 查看自动工单
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查看自动工单" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="工单号：" prop="workOrderNumber">
                  {{ruleForm.workOrderNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" prop="workStatus">
                  {{ruleForm.workStatus}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展览名称：" prop="exhName">
                  {{ruleForm.exhName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工单类型：" prop="workType">
                  {{ruleForm.workType}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建时间：" prop="createTime">
                  {{ruleForm.createTime}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="对应业务单号：" prop="businessOrderNumber">
                  {{ruleForm.businessOrderNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务单类型：" prop="businessNumber">
                  {{ruleForm.businessNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展期：" prop="numberPeriods">
                  {{ruleForm.numberPeriods}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展位号：" prop="positionNumber">
                  {{ruleForm.positionNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参展商：" prop="exhibitorName">
                  {{ruleForm.exhibitorName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="打印次数：" prop="printTwice">
                  {{ruleForm.printTwice}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{ruleForm.exhibitionArea}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{ruleForm.exhibitionHall}}
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
        <span>● 工单明细</span>
      </div>
      <div>
        <el-table border :data="brandApplyData.records" v-loading="loading">
          <el-table-column label="项目名称" prop="projectName" align="center"></el-table-column>
          <el-table-column label="单位" prop="unit" align="center"></el-table-column>
          <el-table-column label="单价" prop="singlePrice" align="center"></el-table-column>
          <el-table-column label="数量" prop="number" align="center"></el-table-column>
          <el-table-column label="服务期" prop="periodOfService" align="center"></el-table-column>
          <el-table-column label="服务期数量" prop="periodOfServiceNumber" align="center"></el-table-column>
          <el-table-column label="金额" prop="amount" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin:10px">
      <div slot="header" class="clearfix">
        <span>● 工单处理过程</span>
      </div>
      <div>
        <el-table border :data="workProjectData" v-loading="loading">
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
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      id: '',
      times: [],
      responseCorrelations: [],
      workProjectData: [{
        project: "",
        workAcceptorHall: ""
      }],
      ruleForm: {
        workOrderNumber: "",
        workStatus: "",
        exhName: "",
        workType: "",
        createTime: "",
        businessOrderNumber: "",
        businessNumber: "",
        numberPeriods: "",
        positionNumber: "",
        exhibitorName: "",
        printTwice: "",
        exhibitionArea: "",
        exhibitionHall: ""
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectWorkOrder(this.id).then(response => {
      let projectId = response.workOrder.projectId;
      console.log("response.workOrder.projectId", response.workOrder.projectId);
      _this.selectWorkProject(projectId).then(response2 => {
        this.workProjectData.push({
          project: response2.project,
          workAcceptorHall: response2.workAcceptorHall
        });
        this.workProjectData.splice(0, 1);
      }).catch(e => {
      });
      _this.ruleForm = response;
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('orderSetting', ['workProject'])
  },
  methods: {
    ...mapActions('OrdersReminders', ['selectWorkOrder']),
    ...mapActions('orderSetting', ['selectWorkProject']),
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