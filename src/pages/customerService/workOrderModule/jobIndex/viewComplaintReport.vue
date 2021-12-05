/**
 * @file 查看投诉报障工单
 */
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-card class="box-card">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="查看投诉报障工单" name="first">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工单号：" prop="typeName">92648272</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态：" prop="secondTypeName">已经受理</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="类型：" prop="exhibitionNumber">
                    <el-select :disabled="true" v-model="ruleForm.exhibitionNumber" clearable>
                      <el-option v-for="item in exhibitionNumbers" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="咨询投诉编号：" prop="exhibitionName">97274287249</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="来电人姓名：" prop="unitMeasurement">王慧</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="（无限固话故障号码）其他联系方式：" prop="exhibitionQuantity"></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="来电号码：" prop="specification"></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="参展商名称：" prop="length"></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="展览名称：" prop="width"></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="期数：" prop="height">
                    <el-select :disabled="true" v-model="ruleForm.height" clearable>
                      <el-option v-for="item in heights" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="展位号（地点）：" prop="quantity">F9A8</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="展厅：" prop="isForm">
                    <el-select :disabled="true" v-model="ruleForm.isForm" clearable>
                      <el-option v-for="item in isForms" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="展区：" prop="isMixture">
                    <el-select :disabled="true" v-model="ruleForm.isMixture" clearable>
                      <el-option v-for="item in isMixtures" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="投诉报障标题：" prop="isOverlapping"></el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="投诉报障内容">
                <el-input type="textarea" v-model="ruleForm.isLaminate"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="投诉报障项目：" prop="layerSpacing">租用展具</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="科室班组：" prop="isFixed">统筹科</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="接单员：" prop="isVisible">王慧</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号码：" prop="rendering">19737847334</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="反馈状态：" prop="constructionLegend">
                    <el-select :disabled="true" v-model="ruleForm.constructionLegend" clearable>
                      <el-option v-for="item in constructionLegends" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="反馈说明">
                <el-input type="textarea" v-model="ruleForm.removeLegend"></el-input>
              </el-form-item>
              <el-form-item class="el-form-item-btn">
                <el-button type="warning" @click="feedback">反馈</el-button>
                <el-button type="primary" @click="print">打印</el-button>
                <el-button @click="revert">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <div slot="header" class="clearfix">
          <span>● 工单处理过程</span>
        </div>
        <div>
          <el-table border :data="brandApplyData.records" v-loading="loading">
            <el-table-column label="" prop="sessionNum" align="center"></el-table-column>
            <el-table-column label="步骤" prop="commitTime" align="center"></el-table-column>
            <el-table-column label="科室班组名称" prop="subscribePerson" align="center"></el-table-column>
            <el-table-column label="接单员" prop="subscribeTime" align="center"></el-table-column>
            <el-table-column label="接单员" prop="point" align="center"></el-table-column>
            <el-table-column label="手机" prop="status" align="center"></el-table-column>
            <el-table-column label="座机" prop="subscribeTime" align="center"></el-table-column>
            <el-table-column label="处理时间" prop="point" align="center"></el-table-column>
            <el-table-column label="备注" prop="status" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      exhibitionNumbers: [],
      heights: [],
      isForms: [],
      isMixtures: [],
      constructionLegends: [],
      ruleForm: {
        exhibitionNumber: "",
        height: "",
        isForm: "",
        isMixture: "",
        isLaminate: "",
        constructionLegend: "",
        removeLegend: ""
      },
      rules: {
        exhibitionNumber: [{ required: true, message: "请选择", trigger: "change" }],
        unitMeasurement: [{ required: true, message: "", trigger: "" }],
        width: [{ required: true, message: "", trigger: "" }],
        height: [{ required: true, message: "请选择", trigger: "change" }],
        quantity: [{ required: true, message: "", trigger: "" }],
        isForm: [{ required: true, message: "请选择", trigger: "change" }],
        isMixture: [{ required: true, message: "请选择", trigger: "change" }],
        isOverlapping: [{ required: true, message: "", trigger: "" }],
        isLaminate: [{ required: true, message: "请输入", trigger: "blur" }],
        layerSpacing: [{ required: true, message: "", trigger: "" }],
        isFixed: [{ required: true, message: "", trigger: "" }]
      }
    };
  },
  computed: {
    ...mapGetters('companyInfomation', ['brandApplyData'])
  },
  methods: {
    handleClick(tab, event) {

    },
    feedback() {

    },
    print() {

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