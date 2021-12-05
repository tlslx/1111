<template>
  <el-dialog
    :title="languageSource.LocationLang.createTable"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <kindo-table
        ref="singleTable"
        :url="config.api.getUnPreArrangedEnterprise"
      >
        <el-table-column prop="enterpriseName" :label="languageSource.LocationLang.exhibitionAreaTable" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.LocationLang.exhibitionHall" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.floor"  header-align="center" align="center" width="80px" ></el-table-column>
        <el-table-column prop="relevantCommerce" :label="languageSource.LocationLang.score"  header-align="center" align="center" ></el-table-column>
      </kindo-table>
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
  name: 'createTable',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    },
    'exhibitionPeriodNum': {
      'type': Array
    }
  },
  data () {
    return {
      config,
      'dialogVisible': false
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
      this.dialogVisible = false;
    },
    //关闭弹框清除方法
    clear () {

    },
    cancel () {
      this.dialogVisible = false;
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
</style>
