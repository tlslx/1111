/**
 * @file 反馈自动工单
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="反馈自动工单" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="工单号：" prop="workOrderNumber">
                  {{id}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" prop="workStatus">
                  {{workOrder.workStatus}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展览名称：" prop="exhName">
                  {{workOrder.exhName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工单类型：" prop="workType">
                  {{workOrder.workType}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建时间：" prop="createTime">
                  {{workOrder.createTime}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="对应业务单号：" prop="businessOrderNumber">
                  {{workOrder.businessOrderNumber}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务单类型：" prop="businessNumber">
                  {{workOrder.businessNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展期：" prop="numberPeriods">
                  {{workOrder.numberPeriods}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展位号：" prop="positionNumber">
                  {{workOrder.positionNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参展商：" prop="exhibitorName">
                  {{workOrder.exhibitorName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="打印次数：" prop="printTwice">
                  {{workOrder.printTwice}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{workOrder.exhibitionArea}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{workOrder.exhibitionHall}}
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
            <el-form-item label="上传附件">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
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
        <span>● 工单明细</span>
      </div>
      <div>
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="" prop="commitTime" align="center"></el-table-column>
          <el-table-column label="项目名称" prop="commitTime" align="center"></el-table-column>
          <el-table-column label="单位" prop="subscribePerson" align="center"></el-table-column>
          <el-table-column label="单价" prop="subscribeTime" align="center"></el-table-column>
          <el-table-column label="数量" prop="point" align="center"></el-table-column>
          <el-table-column label="服务期" prop="status" align="center"></el-table-column>
          <el-table-column label="服务期数量" prop="subscribeTime" align="center"></el-table-column>
          <el-table-column label="金额" prop="status" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin:10px">
      <div slot="header" class="clearfix">
        <span>● 工单处理过程</span>
      </div>
      <div>
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="" prop="sequenceNum" align="center"></el-table-column>
          <el-table-column label="步骤" prop="opr" align="center"></el-table-column>
          <!-- <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorId" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
          <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
          <el-table-column label="座机" prop="linkTel" align="center"></el-table-column> -->
          <el-table-column label="处理时间" prop="oprTime" align="center"></el-table-column>
        </el-table>
      </div>
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
      dialogImageUrl: '',
      dialogVisible: false,
      isForms: [],
      id: "020190606144826757",
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