/**
 * @file 工单快速反馈
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="工单快速反馈" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
              <el-row>
              <el-col :span="12">
                <el-form-item label="请扫描或输入工单号：" prop="workOrderNumber">
                  {{ruleForm.workOrderNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="反馈结果：" prop="feedbackResults">
                  <el-input clearable v-model="queryForm.feedbackResults"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
                  {ruleForm.exhName}}
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
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{ruleForm.exhibitionArea}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{ruleForm.exhibitionHall}}
                </el-form-item>
              </el-col>
            </el-row>
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
        <el-table border :data="brandApplyData.records" v-loading="loading">
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
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      dialogImageUrl: '',
      dialogVisible: false,
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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