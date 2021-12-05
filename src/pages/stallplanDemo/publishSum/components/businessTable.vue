<template>
  <el-page class="main">
    <template slot="header">
      <el-row type="flex" justify="center">
        <div class="title" :style="{ color: colorValue }">
          <span>{{title}}</span>
        </div>
      </el-row>
      </template>
    <template slot="body">
      <el-row type="flex" justify="center" v-loading.fullscreen.lock="ladingState">
        <kindo-table
          ref="businessTable"
          :pagination='false'
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="46" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaNameTable" header-align="center" align="center" min-width="208"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.extensionNum" header-align="center" align="center" min-width="204"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="204">
            <template slot-scope="scope">
              <el-button type="text" @click="download(scope.row.id)" size="mini" >{{languageSource.AdjustmentApply.download}}</el-button>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" @click="download" :disabled="multipleSelection.length <= 0">{{languageSource.LocationLang.mergeDownload}}</el-button>
            <el-button @click="backMain" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
            <el-row class="tips" :style="{ color: colorValue }">
              <span>{{languageSource.LocationLang.businessPartTips}}</span>
            </el-row>
          </div>
        </kindo-table>
      </el-row>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './index';
export default {
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    },
    'colorValue': {
      'type': String
    },
    'item': {
      'type': Object
    },
    'currentType': {
      'type': String
    }
  },
  data() {
    return {
      config,
      title: '',
      multipleSelection: [], //多选值
      ladingState: false
    };
  },
  mounted() {
    let param = { sessionNumber: this.item.sessionNumber };
    if (this.currentType === 'business') {
      // this.title = this.item + this.languageSource.LocationLang.businessPageTips;
      let businessItemRow = this.item.businessDelegation.split(',');
      this.title = businessItemRow[0] + '交易团的展位图纸';
      param.businessDelegation = businessItemRow[0];
      param.businessDelegationId = businessItemRow[1];
    } else {
      // this.title = this.item + this.languageSource.LocationLang.pageTips;
      this.title = this.item.companyNameCh + '的展位图纸';
      param.companyNameCh = this.item.companyNameCh;
    }
    this.ladingState = true;
    this.$http.get(this.config.api.getPublishDrawList, param)
      .then(res => {
        this.ladingState = false;
        this.$refs.businessTable.internalData = res;
      });
  },
  methods: {
    //返回到主页面
    backMain () {
      this.$emit('back', this.currentType);
    },
    //下载
    download (item) {

    },
    //多选方法
    handleSelectionChange (val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0 auto;
}
.title {
  font-size: 22px;
  font-weight: 500;
  color: rgb(45, 146, 236);
  text-align: center;
  line-height: 220%;
  margin: 15px 0;
  font-family: "Microsoft Yahei";
}
.tips {
  margin-top: 5px;
}
</style>
