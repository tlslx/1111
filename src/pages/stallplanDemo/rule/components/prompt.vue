<template>
  <el-page >
    <template slot="header">
      <rule-tabs
        :title="languageSource.RuleSettingLang.secondView"
        :languageSource="languageSource"
        activeName="prompt"
        @ruleTabsClick='handleClick'
      />
    </template>
    <template slot="body" >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form :model="promptForm" ref="promptForm" :rules="rules" label-width="160px" label-position="left">
            <el-form-item :label="languageSource.RuleSettingLang.arrangeRuleTips" prop="hintContent" class="m-b">
              <el-input type="textarea" v-model="promptForm.hintContent" rows="6" :placeholder="languageSource.RuleSettingLang.hintContentTips"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" >{{languageSource.CommonLang.save}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
      promptForm: {},
      rules: {
        // hintContent: [
        //   { required: true, message: '请输入安排规则提示内容', trigger: 'change' },
        //   { max: 255, message: '最多255个字符', trigger: 'change' }
        // ]
      },
      checkState: false
    };
  },
  created () {
    this.$http.get(this.config.api.getRulePrompt)
      .then(res => {
        this.promptForm = res;
      });
    //设置校验信息国际化
    let languageSource = this.languageSource;
    this.rules = {
      hintContent: [
        { required: true, message: languageSource.RuleSettingLang.hintContentTips, trigger: 'change' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      ]
    };
  },
  methods: {
    onSubmit () {
      this.$refs.promptForm.validate((valid) => {
        if (valid) {
          this.checkState = false;
          this.$store.commit('pageLoading', true);
          let data = {
            "settingId": this.promptForm.settingId,
            "hintContent": this.promptForm.hintContent
          };
          this.$http.postJson(this.config.api.editRulePrompt, JSON.stringify(data))
            .then(res => {
              this.$store.commit('pageLoading', false);
              this.$message({
                message: this.languageSource.CommonLang.operationSuccess,
                type: 'success'
              });
            });
        }
      });
    },
    //tab点击
    handleClick(tab) {
      this.$emit('tabClick', tab);
    }
  }
};
</script>

<style scoped>
.m-b {
  margin-top: 20px;
  margin-bottom: 18px;
}
</style>
