<template>
<el-form :model="promptForm" ref="promptForm" :rules="rules" label-width="160px">
  <el-form-item :label="languageSource.RuleSettingLang.arrangeRuleTips" prop="hintContent" class="m-b">
    <el-input type="textarea" v-model="promptForm.hintContent" rows="6" style="width: 50%;" placeholder="请填写需要说明的规则提示内容"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">{{languageSource.CommonLang.save}}</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'prompt',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      promptForm: {},
      rules: {
        hintContent: [
          { required: true, message: '请输入安排规则提示内容', trigger: 'change' },
          { max: 255, message: '最多255个字符', trigger: 'change' }
        ]
      }
    };
  },
  created () {
    this.$http.get(this.config.api.getRulePrompt)
      .then(res => {
        this.promptForm = res;
      });
  },
  methods: {
    onSubmit () {
      this.$refs.promptForm.validate((valid) => {
        if (valid) {
          this.$store.commit('pageLoading', true);
          let data = {
            "settingId": this.promptForm.settingId,
            "hintContent": this.promptForm.hintContent
          };
          this.$http.postJson(this.config.api.editRulePrompt, JSON.stringify(data))
            .then(res => {
              this.$store.commit('pageLoading', false);
              this.$message({
                message: '规则提示修改成功',
                type: 'success'
              });
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.m-b {
  margin-bottom: 18px;
}
</style>
