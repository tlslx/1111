/**
 * @file 投诉报障
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="创建投诉报障工单" name="first">
      <div style="margin:10px">
        <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="咨询投诉编码：" prop="counselingComplaintCode">
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="咨询投诉状态：" prop="consultationStatus">
                {{ruleForm.consultationStatus}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="咨询投诉报障类型：" prop="consultationComplaintType">
                <el-select class="small-select-width" v-model="ruleForm.consultationComplaintType" v-on:change="select" clearable>
                  <el-option label="咨询" value="1"></el-option>
                  <el-option label="投诉" value="2"></el-option>
                  <el-option label="保障" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="来源：" prop="source">
                {{ruleForm.source}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="广交会证件号：" prop="cantonFairDocumentNo">
                <el-input class="small-select-width" v-model="ruleForm.cantonFairDocumentNo" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="name">
                <el-input class="small-select-width" v-model="ruleForm.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="contactNumber">
                <el-input class="small-select-width" v-model="ruleForm.contactNumber" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input class="small-select-width" v-model="ruleForm.email" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="国家：" prop="country">
                <el-input class="small-select-width" v-model="ruleForm.country" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="语言：" prop="language">
                <el-input class="small-select-width" v-model="ruleForm.language" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题：" prop="title">
                <el-input class="small-select-width" v-model="ruleForm.title" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="问题描述：" prop="problemDescription">
                <el-input class="small-select-width" type="textarea" v-model="ruleForm.problemDescription" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:center">
            <el-button class="btn1" @click="submitRuleForm('ruleForm')">保存</el-button>
            <el-button class="btn2" @click="revert">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin:10px">
        <div slot="header" class="clearfix">
          <span>● 工单</span>
        </div>
        <div>
          <el-form :inline="true" class="search-form-inline">
            <el-form-item>
              <el-button type="warning" @click="handleAdd">派单</el-button>
              <el-button type="warning" @click="handleAdd">编辑工单</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="brandApplyData.records" v-loading="loading">
            <el-table-column label="工单号" prop="workOrder.workOrderNumber" align="center"></el-table-column>
            <el-table-column label="状态" prop="workOrder.workStatus" align="center"></el-table-column>
            <el-table-column label="工单类型" prop="workOrder.workType" align="center"></el-table-column>
            <el-table-column label="接单部门" prop="deptName" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="workOrder.createTime" align="center"></el-table-column>
            <el-table-column label="展览名称" prop="workOrder.exhName" align="center"></el-table-column>
            <el-table-column label="展期" prop="workOrder.numberPeriods" align="center"></el-table-column>
            <el-table-column label="展位号" prop="workOrder.positionNumber" align="center"></el-table-column>
            <el-table-column label="参展商" prop="workOrder.exhibitorName" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="工单信息编辑" name="second">
      <div style="margin:10px">
        <el-form :model="form" ref="form" label-width="140px" class="demo-ruleForm" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="工单号：" prop="workOrderNumber">
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投诉报障类型：" prop="height">
                <el-select class="small-select-width" v-model="form.height" clearable>
                  <el-option label="咨询" value="1"></el-option>
                  <el-option label="投诉" value="2"></el-option>
                  <el-option label="保障" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="来电人姓名：" prop="callerName">
                <el-input class="small-select-width" v-model="form.callerName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="来电号码：" prop="callerNumber">
                <el-input class="small-select-width" v-model="form.callerNumber" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="展览名称：" prop="exhibitionName">
                <div style="width:100%;">
                  <el-input class="small-select-width" v-model="form.exhibitionName" placeholder="请输入"></el-input>
                  <el-popover placement="right" trigger="click">
                    <el-table border v-loading="loading">
                      <el-table-column label="展览时间" prop="sessionNum" align="center"></el-table-column>
                      <el-table-column label="展览统称" prop="issueNum" align="center"></el-table-column>
                      <el-table-column label="展览名称（中）" prop="place" align="center"></el-table-column>
                      <el-table-column label="操作" prop="syntheticMaterialSpecifications" align="center"></el-table-column>
                    </el-table>
                    <el-button slot="reference" type="text" @click="isShow = !isShow">选择</el-button>
                  </el-popover>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="无限固话故障号码）其他联系方式：" prop="otherContactNumber">
                <el-input class="small-select-width" v-model="form.otherContactNumber" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="展位号（地点）：" prop="positionNumber">
                <div style="width:100%;">
                  <el-input class="small-select-width" v-model="form.positionNumber" placeholder="请输入"></el-input>
                  <el-popover placement="right" trigger="click">
                    <el-table border v-loading="loading">
                      <el-table-column label="展览时间" prop="sessionNum" align="center"></el-table-column>
                      <el-table-column label="展览统称" prop="issueNum" align="center"></el-table-column>
                      <el-table-column label="展览名称（中）" prop="place" align="center"></el-table-column>
                      <el-table-column label="操作" prop="syntheticMaterialSpecifications" align="center"></el-table-column>
                    </el-table>
                    <el-button slot="reference" type="text" @click="isShow = !isShow">获取信息</el-button>
                  </el-popover>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="期数：" prop="numberPeriods">
                <el-select class="small-select-width" v-model="form.numberPeriods" clearable>
                  <el-option label="第120期" value="1"></el-option>
                  <el-option label="第121期" value="2"></el-option>
                  <el-option label="第122期" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="展区：" prop="exhibitionArea">
                <el-input class="small-select-width" v-model="form.exhibitionArea" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="展厅：" prop="exhibitionHall">
                <el-select class="small-select-width" v-model="form.exhibitionHall" clearable>
                  <el-option label="A区" value="1"></el-option>
                  <el-option label="B区" value="2"></el-option>
                  <el-option label="C区" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参展商名称：" prop="exhibitorName">
                <el-input class="small-select-width" v-model="form.exhibitorName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投诉报障标题：" prop="complaintReportTitle">
                <el-input class="small-select-width" v-model="form.complaintReportTitle" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="投诉报障内容" prop="complaints">
            <el-input type="textarea" v-model="form.complaints"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投诉报障项目：" prop="complaintsReport">
                <div style="width:100%;">
                  <el-input class="small-select-width" v-model="form.complaintsReport" placeholder="请输入"></el-input>
                  <el-button type="text" @click="ruleDialogVisible = true">选择</el-button>
                  <el-dialog title="选择投诉报障项目" :visible.sync="ruleDialogVisible" width="70%">
                    <el-form :model="queryForm" :inline="true" class="search-form-inline">
                      <el-form-item label="项目类型：">
                        <el-select v-model="queryForm.projectName" clearable>
                          <el-option label="展具租赁" value="1"></el-option>
                          <el-option label="展具装搭" value="2"></el-option>
                          <el-option label="展览设备" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="部门名称：">
                        <el-select v-model="queryForm.chargeName" clearable>
                          <el-option label="王姐" value="1"></el-option>
                          <el-option label="赵千" value="2"></el-option>
                          <el-option label="李四" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="服务细项：">
                         <el-input v-model="queryForm.exhibitorName" placeholder="请输入"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="handleQuery">查询</el-button>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="warning" @click="ruleDialogVisible = false">选择</el-button>
                      </el-form-item>
                    </el-form>
                    <el-table border :data="brandApplyData.records" v-loading="loading">
                      <el-table-column type="selection" width="55" align="center"></el-table-column>
                      <el-table-column label="项目类型" prop="mainProjectCode" align="center"></el-table-column>
                      <el-table-column label="服务细项" prop="mainProjectName" align="center"></el-table-column>
                      <el-table-column label="部门" prop="place" align="center"></el-table-column>
                    </el-table>
                  </el-dialog>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科室班组：" prop="departmentTeam">
                <el-input class="small-select-width" v-model="form.departmentTeam" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接单员：" prop="receiver">
                <el-input class="small-select-width" v-model="form.receiver" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：" prop="phoneNumber">
                <el-input class="small-select-width" v-model="form.phoneNumber" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button class="btn1" @click="submitForm('form')">保存</el-button>
            <el-button class="btn2" @click="toBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      ruleDialogVisible: false,
      isShow: false,
      ruleForm: {
        consultationStatus: "",
        consultationComplaintType: "",
        source: "客户联络中心",
        cantonFairDocumentNo: "",
        name: "",
        contactNumber: "",
        email: "",
        country: "",
        language: "",
        title: "",
        problemDescription: ""
      },
      form: {
        typeName: "",
        callerName: "",
        callerNumber: "",
        exhibitionName: "",
        otherContactNumber: "",
        positionNumber: "",
        numberPeriods: "",
        exhibitionArea: "",
        exhibitionHall: "",
        exhibitorName: "",
        complaintReportTitle: "",
        complaints: "",
        complaintsReport: "",
        departmentTeam: "",
        receiver: "",
        phoneNumber: "",
        remarks: ""
      },
      rules: {
        consultationComplaintType: [{ required: true, message: "请选择", trigger: "change" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        problemDescription: [{ required: true, message: "请输入", trigger: "blur" }],
        typeName: [{ required: true, message: "请选择", trigger: "change" }],
        callerName: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionName: [{ required: true, message: "请输入", trigger: "blur" }],
        positionNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        numberPeriods: [{ required: true, message: "请选择", trigger: "change" }],
        exhibitionArea: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionHall: [{ required: true, message: "请选择", trigger: "change" }],
        complaintReportTitle: [{ required: true, message: "请输入", trigger: "blur" }],
        complaints: [{ required: true, message: "请输入", trigger: "blur" }],
        complaintsReport: [{ required: true, message: "请输入", trigger: "blur" }],
        departmentTeam: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('returnVisitorSatisfaction', []),
    ...mapGetters('submissionOrders', [])
  },
  methods: {
    ...mapActions('returnVisitorSatisfaction', ['addWorkOrderInfo']),
    ...mapActions('submissionOrders', ['addComplaintInfo']),
    select(val) {
      if (val === 1) {
        ruleForm.consultationStatus = "待回复";
      } else {
        ruleForm.consultationStatus = "待受理";
      }
    },
    // 表单提交
    submitRuleForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addComplaintInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/advisoryComplaintRecord');
          });
        } else {
          return false;
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addWorkOrderInfo(this.form).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/advisoryComplaintRecord');
          });
        } else {
          return false;
        }
      });
    },
    handleClick(tab, event) {

    },
    handleAdd() {
      this.activeName = second;
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.getBrandApplyQuery(this.brandApplyQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
    }

  }
};
</script>
<style scoped>
.demo-ruleForm {
  margin: 30px 0px 12px 0px;
  width: 100%;
}
.div_hint {
  color: red;
  position: relative;
  left: 30%;
  margin-top: 30px;
}
.btn1 {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.small-select-width {
  width: 170px;
}
</style>