<template>
  <el-dialog
    :title="languageSource.LocationLang.showInfo"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <!-- <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" label-width="83px">
          <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <el-form-item prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegation" label-width="68px">
          <el-input v-model="searchForm.businessDelegation" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <el-form-item prop="boothCode" :label="languageSource.AdjustmentApply.boothCode" label-width="68px">
          <el-input v-model="searchForm.boothCode" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form> -->
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="8" >
          <el-checkbox v-model="modelOne" @change="firstChange" >模式一</el-checkbox>
          <img src="@/../static/img/stallplan/plan14.png" class="img-style" />
        </el-col>
        <el-col :span="8" >
          <el-checkbox v-model="modelTwo" @change="secondChange">模式二</el-checkbox>
          <img src="@/../static/img/stallplan/plan15.jpg" class="img-style" />
          <el-checkbox v-model="modelTwoTips" :disabled="tipsState">显示标准展位信息</el-checkbox>
        </el-col>
      </el-row>
    </kindo-box>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc">{{languageSource.CommonLang.confirm}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'showBoothInfo',
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
      'searchForm': {},
      'modelOne': false,
      'modelTwo': false,
      'modelTwoTips': false,
      'tipsState': false,
      'currentType': 0
    };
  },
  methods: {
    //查询方法
    onQuery () {
      // this.$http.get(this.config.api.getRulePrompt)
      //   .then(res => {

      //   });
    },
    //重置查询
    onResetQuery () {

    },
    //确定
    submitFunc () {
      // this.$refs.searchForm.validate(valid => {
      //   if (valid) {
      if (!this.modelOne && !this.modelTwo) {
        this.$message.error(this.languageSource.RuleSettingLang.selectOneMsg);
        return false;
      }
      this.$emit('boothInfo', this.currentType);
      this.dialogVisible = false;
      //   }
      // });
    },
    clear () {
      // this.$refs.searchForm.resetFields();
      this.searchForm = {};
      this.modelOne = false;
      this.modelTwo = false;
      this.modelTwoTips = false;
      this.tipsState = false;
    },
    cancel () {
      this.dialogVisible = false;
    },
    //模式一改变方法
    firstChange (val) {
      if (val) {
        this.modelTwo = false;
        this.modelTwoTips = false;
        this.tipsState = true;
        this.currentType = '1';
      }
    },
    //模式二改变方法
    secondChange (val) {
      if (val) {
        this.modelOne = false;
        this.tipsState = false;
        this.currentType = '2';
      }
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
.common-style {
  width: 180px;
}
.img-style {
  width: 300px;
  height: 260px;
}
</style>
