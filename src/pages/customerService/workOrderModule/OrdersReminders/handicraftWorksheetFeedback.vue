/**
 * @file 新建手工工单反馈页面
 */
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-card class="box-card">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="新建手工工单反馈页面" name="first">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
              <el-form-item label="展览名称：" prop="exhName">
                {{workOrder.exhName}}
              </el-form-item>
              <el-form-item label="workTitle">
                {{workOrder.workTitle}}
              </el-form-item>
              <el-form-item label="workDetails">
                {{workOrder.workDetails}}
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="展厅：" prop="exhibitionHall">
                    {{workOrder.exhibitionHall}}
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
                  <el-form-item label="期数：" prop="numberPeriods">
                    {{workOrder.numberPeriods}}
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
              <el-form-item label="反馈内容">
                <el-input type="textarea" v-model="ruleForm.exhibitionNumber"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="10" :offset="14">
                  <el-form-item label="反馈时间：" prop="constructionLegend">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="反馈人">
                接单员
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button class="btn1" @click="submitForm('form')">反馈</el-button>
                <el-button class="btn2" @click="revert">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <div slot="header" class="clearfix">
          <span>● 指定负责人</span>
        </div>
        <div>
          <el-form :model="queryForm" :inline="true" class="search-form-inline">
            <el-form-item>
              <el-button type="warning" @click="openCope">新增</el-button>
              <el-dialog :visible.sync="OpenCopeExhibitionReceiver">
                <el-form :model="form" label-position="right" label-width="1px">
                  <el-form-item label="科室班组编码：" prop="deptId">
                    {{form.deptId}}
                  </el-form-item>
                  <el-form-item label="科室班组名称：" prop="deptName">
                    <el-select v-model="form.deptName" clearable>
                      <el-option v-for="item in deptNames" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="负责人：" prop="chargeName">
                    {{form.chargeName}}
                  </el-form-item>
                  <el-form-item label="手机：" prop="chargePhone">
                    {{form.chargePhone}}
                  </el-form-item>
                  <el-form-item label="座机：" prop="linkTel">
                    {{form.linkTel}}
                  </el-form-item>
                  <el-form-item class="el-form-item-btn">
                    <el-button class="btn1" @click="submitForm('form')">确认</el-button>
                    <el-button class="btn2" @click="closeCope">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-form-item>
          </el-form>
          <el-table border :data="workOrder" v-loading="loading">
            <el-table-column label="科室班组编码" prop="deptId" align="center"></el-table-column>
            <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
            <el-table-column label="负责人" prop="chargeName" align="center"></el-table-column>
            <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
            <el-table-column label="座机" prop="linkTel" align="center"></el-table-column>
            <el-table-column label="操作" prop="operate" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div slot="header" class="clearfix">
          <span>● 附件表</span>
        </div>
        <div>
          <el-form :model="queryForm" :inline="true" class="search-form-inline">
            <el-form-item>
              <el-button type="warning" @click="handleAdd">上传</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="brandApplyData.records" v-loading="loading">
            <el-table-column label="附件描述" prop="description" align="center"></el-table-column>
            <el-table-column label="操作" prop="operate" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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
    openCope() {
      this.OpenCopeExhibitionReceiver = true;
    },
    closeCope() {
      this.OpenCopeExhibitionReceiver = false;
    },
    handleClick(tab, event) {

    },
    feedback() {

    },
    revert() {

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