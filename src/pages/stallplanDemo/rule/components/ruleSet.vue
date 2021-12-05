<template>
  <el-page>
    <template slot="header">
      <rule-tabs
        :title="languageSource.RuleSettingLang.ruleSetTitle"
        :languageSource="languageSource"
        activeName="ruleSet"
        @ruleTabsClick='handleClick'
      />
    </template>
    <template slot="body" >
      <el-form :model="gearAuto" ref="gearAuto" :rules="rules" class="rule-style" label-position="left" label-width="170px">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item :label="languageSource.LocationLang.drawArrange">
              <el-radio-group v-model="gearAuto.arrangeByDrawValue" prop="arrangeByDrawValue" >
                <el-radio :label="1">从小到大</el-radio>
                <el-radio :label="2">从大到小</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item :label="languageSource.LocationLang.exhibitionPositionNum" >
              <el-radio-group v-model="gearAuto.arrangeByBoothQuantityValue" prop="arrangeByBoothQuantityValue" >
                <el-radio :label="1">从高到低</el-radio>
                <el-radio :label="2">从低到高</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item :label="languageSource.LocationLang.exhibitionPositionSame" >
              <el-radio-group v-model="gearAuto.arrangeByCantonCodeOrRandomValue" prop="arrangeByCantonCodeOrRandomValue" >
                <el-radio :label="1">广交会编码</el-radio>
                <el-radio :label="2">随机</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item :label="languageSource.LocationLang.specialAreaArrange" >
              <el-radio-group v-model="gearAuto.arrangeByExhibitionBoothNumberValue" prop="arrangeByExhibitionBoothNumberValue" >
                <el-radio label="1">从小到大</el-radio>
                <el-radio label="2">从大到小</el-radio>
                <el-radio label="3">随机</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item >
              <el-button type="primary" @click="onSubmit" :disabled="submitBtnState" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </el-page>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'prompt',
  mixins: [listPageBase],
  components: {
    'ruleTabs': () => import('./ruleTabs.vue')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'pageId': 'rule',
      config,
      gearAuto: {
        "arrangeByDrawValue": 0,
        "arrangeByBoothQuantityValue": 0,
        "arrangeByCantonCodeOrRandomValue": 0,
        "arrangeByExhibitionBoothNumberValue": '0'
      },
      rules: {
        arrangeByDrawValue: [],
        arrangeByCantonCodeOrRandomValue: [],
        arrangeByBoothQuantityValue: [],
        arrangeByExhibitionBoothNumberValue: []
      },
      submitBtnState: false,  //提交按钮可点击状态
      fullscreenLoading: false
    };
  },
  created () {
    //获取校验规则方法
    this.getRules();
  },
  methods: {
    onSubmit () {
      let gearAuto = this.gearAuto;
      if (gearAuto.arrangeByDrawValue === 0 && gearAuto.arrangeByCantonCodeOrRandomValue === 0 && gearAuto.arrangeByBoothQuantityValue === 0 && gearAuto.arrangeByExhibitionBoothNumberValue === '0') {
        this.$message.error(this.languageSource.RuleSettingLang.selectOneMsg);
        return false;
      }
      let data = {
        "arrangeByDraw": "按交易团抽签号安排",
        "arrangeByDrawValue": gearAuto.arrangeByDrawValue,
        "arrangeByBoothQuantity": '按展位数量',
        "arrangeByBoothQuantityValue": gearAuto.arrangeByBoothQuantityValue,
        "arrangeByCantonCodeOrRandom": '展位数量相同',
        "arrangeByCantonCodeOrRandomValue": gearAuto.arrangeByCantonCodeOrRandomValue,
        "arrangeByExhibitionBoothNumber": '按展区/专区的展位编号',
        "arrangeByExhibitionBoothNumberValue": gearAuto.arrangeByExhibitionBoothNumberValue,
        "id": '3ab56cd7e98d4e8e8ca6dd9ba7052ac2'
      };
      this.submitBtnState = true;
      this.fullscreenLoading = true;
      this.$http.post(this.config.api.saveRules, data)
        .then(res => {
          this.$message({
            message: this.languageSource.CommonLang.operationSuccess,
            type: 'success'
          });
          this.submitBtnState = false;
          this.fullscreenLoading = false;
        });
    },
    //tab点击
    handleClick(tab) {
      this.$emit('tabClick', tab);
    },
    //获取自动安排记录
    getRules () {
      this.fullscreenLoading = true;
      this.$http.get(this.config.api.getRules)
        .then(res => {
          this.fullscreenLoading = false;
          this.gearAuto = res;
        });
    }
  }
};
</script>

<style scoped>
.rule-style {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
