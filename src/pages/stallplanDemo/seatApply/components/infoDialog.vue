<template>
  <el-dialog
    :title="languageSource.RuleSettingLang.arrangeRuleTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="50%">
    <el-form :model="promptForm" ref="promptForm" label-width="1px" label-position="left">
      <el-form-item label="" prop="hintContent" class="m-b">
        <el-input type="textarea" v-model="promptForm.hintContent" rows="10" :readonly="true" ></el-input>
      </el-form-item>
      <el-form-item label="" prop="makeSure">
        <el-checkbox v-model="makeSureState" @change="checkChange" ><span class="tip-text">{{languageSource.RuleSettingLang.ruleTip}}</span></el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc" :disabled="!(makeSureState)">{{languageSource.CommonLang.confirm}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'infoDialog',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      'dialogVisible': false,
      'promptForm': {
        makeSure: false
      },
      'makeSureState': false
    };
  },
  methods: {
    //查询方法
    getInfo () {
      this.$http.get(this.config.api.getRulePrompt)
        .then(res => {
          this.promptForm = res;
        });
    },
    //确定
    submitFunc () {
      this.$refs.promptForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.$emit('makeSure');
        }
      });
    },
    //
    checkChange (value) {
      this.makeSureState = value;
    },
    clear () {
      this.makeSureState = false;
      this.$refs.promptForm.resetFields();
    }
  }
};
</script>

<style scoped>
.tip-text {
  color: #F56C6C
}
.tip-align {
  text-align: center;
}
</style>
