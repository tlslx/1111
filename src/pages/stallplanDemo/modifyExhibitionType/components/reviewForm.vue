<template>
  <el-container>
    <el-header >
      <headline :label="languageSource.AdjustmentApply.seatAdjustReview" />
    </el-header>

    <el-main >
      <el-form ref="searchForm" :model="searchForm" :inline="false" label-width="120px" label-position="left">
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.oldEnterpriseName" prop="enterpriseName" >
              <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
              <el-select v-model="searchForm.exhibitionProperty" clearable :placeholder="languageSource.LocationLang.exhibitionPositionTypeTip">
                <el-option
                  v-for="nature in exhibitionPropertyOption"
                  :key="nature.value"
                  :label="nature.label"
                  :value="nature.label">
                </el-option>
              </el-select>
              <i class="el-icon-info i-s">
                <span class="tip-text">{{languageSource.AdjustmentApply.seatTips}}</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
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
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionAreaName">
              <el-select v-model="searchForm.exhibitionAreaName" :placeholder="languageSource.LocationLang.exhibitionAreaTip">
                <el-option
                  v-for="area in regionOfExhibition"
                  :key="area.value"
                  :label="area.label"
                  :value="area.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentContent" prop="adjustContent">
              <el-select v-model="searchForm.adjustContent" clearable :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips">
                <el-option
                  v-for="nature in adjustContentOption"
                  :key="nature.value"
                  :label="nature.label"
                  :value="nature.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.returnNum" prop="returnExhibitionNumber">
              <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.boothNum" prop="exhibitionNum">
              <el-input v-model="searchForm.exhibitionNum" clearable :maxlength="255"></el-input>
              <i class="el-icon-info i-s">
                <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="2"><el-button type="primary" class="checkBtn" >{{languageSource.AdjustmentApply.verify}}</el-button></el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.backNum" prop="returnExhibitionCount">
              <el-select v-model="searchForm.returnExhibitionCount" clearable :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips">
                <el-option
                  v-for="nature in returnExhibitionCountOption"
                  :key="nature.value"
                  :label="nature.label"
                  :value="nature.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'reviewForm',
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'searchForm': {},
      //展位性质
      'exhibitionPropertyOption': [
        { 'label': '一般性特装', 'value': '一般性特装' },
        { 'label': '新题材', 'value': '新题材' },
        { 'label': '贫困', 'value': '贫困' }
      ],
      //布展类型
      'exhibitionTypeOption': [
        { 'label': '特装', 'value': '特装' },
        { 'label': '标摊', 'value': '标摊' }
      ],
      //调整内容
      'adjustContentOption': [
        { 'label': '特装改标摊', 'value': '特装改标摊' },
        { 'label': '标摊改特装', 'value': '标摊改特装' }
      ],
      //退回展位数量
      'returnExhibitionCountOption': [
        { 'label': '1', 'value': '1' },
        { 'label': '2', 'value': '2' },
        { 'label': '全部退回', 'value': '全部退回' }
      ],
      //展区
      'regionOfExhibition': []
    };
  },
  async created () {
    //读取数据字典
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
  },
  methods: {

  }
};
</script>

<style scoped>
  .checkBtn {
    margin-left: 10px;
    margin-top: 3px;
  }
  .i-s {
    color: #F56C6C;
    margin-top: 10px;
  }
  .tip-text {
    color: #606266;
    font-size: 12px;
    margin-left: 5px;
  }
</style>
