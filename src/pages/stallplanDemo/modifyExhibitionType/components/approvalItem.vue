<template>
  <div class="c-m">
    <el-form ref="searchForm" :model="searchForm" :inline="false" label-width="120px" label-position="left">
      <!-- 交易团审核只有设置新企业一项，其它项都需要隐藏，商协会、工作部、外贸司审核所有的项都有 -->
      <el-row>
        <el-col :span="7">
          <el-form-item :label="languageSource.AdjustmentApply.setNewEnterprise" prop="enterpriseName" >
            <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255" ></el-input>
            <i class="el-icon-info i-s">
              <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
            </i>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
          <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionType">
            <el-select v-model="searchForm.exhibitionType" clearable :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips">
              <el-option
                v-for="nature in exhibitionTypeOption"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item :label="languageSource.AdjustmentApply.arrangeNum" prop="returnExhibitionCount">
            <el-select v-model="searchForm.returnExhibitionCount" clearable :placeholder="languageSource.AdjustmentApply.arrangeNumTips">
              <el-option
                v-for="nature in returnExhibitionCountOption"
                :key="nature.value"
                :label="nature.label"
                :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
          <el-form-item :label="languageSource.AdjustmentApply.arrangeCode" prop="arrangeExhibitionNum">
            <el-select v-model="searchForm.arrangeExhibitionNum" clearable :placeholder="languageSource.AdjustmentApply.arrangeCodeTips">
              <el-option
                v-for="nature in arrangeExhibitionNumOption"
                :key="nature.value"
                :label="nature.label"
                :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">&nbsp;&nbsp;</el-col>
        <el-col :span="7">
        </el-col>
      </el-row>
    </el-form>
    <kindo-table
      ref="detailTable"
      :pagination="false"
    >
      <el-table-column prop="exhibitionAreaName" :label="languageSource.AdjustmentApply.reviewTime" min-width="110" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionAreaName" :label="languageSource.AdjustmentApply.reviewPerson" min-width="110" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionAreaName" :label="languageSource.CommonLang.operation" min-width="110" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionAreaName" :label="languageSource.AdjustmentApply.reviewDescription" min-width="110" header-align="center" align="center"></el-table-column>
    </kindo-table>
  </div>
</template>

<script>

export default {
  name: 'approvalItem',
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'searchForm': {},
      //布展类型
      'exhibitionTypeOption': [
        { 'label': '特装', 'value': '特装' },
        { 'label': '标摊', 'value': '标摊' }
      ],
      //调整内容
      'arrangeExhibitionNumOption': [
        { 'label': 'A1234', 'value': 'A1234' },
        { 'label': 'A2234', 'value': 'A2234' },
        { 'label': '全部展位', 'value': '全部展位' }
      ],
      //退回展位数量
      'returnExhibitionCountOption': [
        { 'label': '1', 'value': '1' },
        { 'label': '2', 'value': '2' },
        { 'label': '全部展位', 'value': '全部展位' }
      ]
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.i-s {
  color: #F56C6C;
  margin-top: 10px;
}
.tip-text {
  color: #606266;
  font-size: 12px;
  margin-left: 5px;
}
.c-m {
  margin-bottom: 20px
}
</style>
