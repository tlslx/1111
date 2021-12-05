<template>
  <el-page>
    <template slot="header">
      <!-- 新增弹框 -->
      <sortition-dialog ref="sortitionDialog" @uploadReload="reloadTable" :languageSource="languageSource"/>
      <rule-tabs
        :title="languageSource.RuleSettingLang.lastView"
        :languageSource="languageSource"
        activeName="import"
        @ruleTabsClick='handleClick'
      />
      <kindo-box>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="82px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="businessDelegationName" :label="languageSource.RuleSettingLang.businessDelegationNameTable">
            <!-- :placeholder="languageSource.RuleSettingLang.businessDelegationNameTips" -->
            <el-input v-model="searchForm.businessDelegationName" clearable  :maxlength="255" class="common-style"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable">
            <!-- :placeholder="languageSource.RuleSettingLang.drawNumberTips" -->
            <el-input v-model="searchForm.exhibitionPeriod" clearable :maxlength="255" class="common-style"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body" >
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getDrawResultListPage"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
          <el-table-column prop="businessDelegationName" :label="languageSource.RuleSettingLang.businessDelegationNameTable" header-align="center" align="center" min-width="256"></el-table-column>
          <el-table-column prop="drawNumber" :label="languageSource.RuleSettingLang.drawNumberTable" header-align="center" align="center" min-width="256"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" header-align="center" align="center" min-width="256"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="256">
            <template slot-scope="scope" >
              <el-button type="text" @click="handleRemove(scope.row.id)" >{{languageSource.CommonLang.delete}}</el-button>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" @click="onImport" v-if="right('lotteryImport')">{{languageSource.LocationLang.import}}</el-button>
            <el-button type="primary" @click="downLoadFunc" v-if="right('lotteryDownload')" :loading="downloadLoading">{{languageSource.LocationLang.downloadExcel}}</el-button>
            <el-button type="danger" @click="openMesBox" :disabled="!deleteRowsState" v-if="right('lotteryDeleteLot')">{{languageSource.RuleSettingLang.allDelete}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>
    </template>

  </el-page>
</template>

<script>
import sortitionDialog from './sortitionDialog';
import config from './index';
import axios from 'axios';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'sortition',
  mixins: [listPageBase],
  components: {
    'ruleTabs': () => import('./ruleTabs.vue'),
    sortitionDialog
  },
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'areas': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'pageId': 'rule',
      //接口地址
      config,
      searchForm: {
        businessDelegationName: '',
        exhibitionPeriod: ''
      },
      selectIds: [],
      deleteRowsState: false,
      downloadLoading: false
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.table.reloadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.table.reloadData();
      });
    },
    //导入按钮点击
    onImport () {
      this.$refs.sortitionDialog.dialogVisible = true;
    },
    //删除
    handleRemove (ids) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.CommonLang.confirmDelete, languageSource.CommonLang.tips, "warning", async () => {
        let deleteData = { ids: ids };
        this.$http.get(this.config.api.deleteDrawResultBatchById, deleteData)
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.CommonLang.deleteSuccess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    // 多选
    handleSelectionChange (val) {
      let idsArray = [];
      for (let i = 0; i < val.length; i++) {
        idsArray.push(val[i].id);
      }
      this.selectIds = idsArray;
      this.deleteRowsState = idsArray.length > 0;
    },
    //导入成功重新加载表格
    reloadTable () {
      this.$refs.searchForm.resetFields();
      this.$refs.table.reloadData();
    },
    //重置方法
    clearForm () {
      this.$refs.searchForm.resetFields();
    },
    //打开批量删除消息提示
    openMesBox () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.RuleSettingLang.deleteAllMsg, languageSource.CommonLang.tips, "warning", async () => {
        let deleteData = { ids: this.selectIds.join(',') };
        this.$http.get(this.config.api.deleteDrawResultBatchById, deleteData)
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.CommonLang.deleteSuccess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    //tab点击
    handleClick(tab) {
      this.$emit('tabClick', tab);
    },
    //下载方法
    downLoadFunc () {
      const http = axios.create({
        headers: { Token: localStorage.getItem('USER_TOKEN') },
        responseType: 'blob',
        timeout: 60000
      });
      this.downloadLoading = true;
      http.get(this.config.api.downloadModel)
        .then(res => {
          this.downloadLoading = false;
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          if (window.navigator.msSaveOrOpenBlob) {
            //如果是ie浏览器
            navigator.msSaveBlob(blob, '导入抽签结果模板.xls'); //下载路径为默认路径
          } else {
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '导入抽签结果模板.xls'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
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
.common-style {
  width: 180px;
}
</style>
