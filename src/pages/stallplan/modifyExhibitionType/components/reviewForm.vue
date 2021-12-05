<template>
  <el-container>
    <el-header >
      <headline label="位置调整审核" />
    </el-header>

    <el-main >
      <el-form ref="searchForm" :model="searchForm" :inline="false" size="small" label-width="120px" >
        <el-row>
          <el-col :span="7">
            <el-form-item label="原企业名称：" prop="enterpriseName" >
              <el-input v-model="searchForm.enterpriseName" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
              <el-select v-model="searchForm.exhibitionProperty" clearable placeholder="请选择展位类型">
                <el-option
                  v-for="nature in exhibitionPropertyOption"
                  :key="nature.value"
                  :label="nature.label"
                  :value="nature.value">
                </el-option>
              </el-select>
              <i class="el-icon-info i-s">
                <span class="tip-text">贫困地区企业直接提交至外贸中心审核</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionType">
              <el-select v-model="searchForm.exhibitionType" clearable placeholder="请选择布展类型">
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
            <el-form-item label="展区：" prop="exhibitionAreaName">
              <el-select v-model="searchForm.exhibitionAreaName" clearable placeholder="请选择展区">
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
              <el-select v-model="searchForm.adjustContent" clearable placeholder="请选择布展类型">
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
            <el-form-item label="退回展位号：" prop="returnExhibitionNumber">
              <el-input v-model="searchForm.enterpriseName" clearable ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="展位数量：" prop="exhibitionNum">
              <el-input v-model="searchForm.exhibitionNum" clearable ></el-input>
              <i class="el-icon-info i-s">
                <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="2"><el-button type="primary" class="checkBtn" size="small">校验</el-button></el-col>
          <el-col :span="7">
            <el-form-item label="退回展位数量：" prop="returnExhibitionCount">
              <el-select v-model="searchForm.returnExhibitionCount" clearable placeholder="请选择布展类型">
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
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
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
