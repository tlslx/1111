<template>
  <div class="warrant">
    <kindo-box>
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="businessDelegationName" :label="languageSource.RuleSettingLang.businessDelegationName">
          <el-input v-model="searchForm.businessDelegationName" clearable placeholder="交易团名称"></el-input>
        </el-form-item>
        <el-form-item prop="drawNumber" :label="languageSource.RuleSettingLang.drawNumber">
          <el-input v-model="searchForm.drawNumber" clearable placeholder="抽签号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          <el-button type="primary" @click="onImport">{{languageSource.LocationLang.import}}</el-button>
          <el-button type="danger" @click="openMesBox" :disabled="!deleteRowsState">{{languageSource.RuleSettingLang.allDelete}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="table"
        :url="config.api.getDrawResultListPage"
        :queryParam="form"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
        <el-table-column prop="businessDelegationName" :label="languageSource.RuleSettingLang.businessDelegationName" header-align="center" align="center" min-width="326"></el-table-column>
        <el-table-column prop="drawNumber" :label="languageSource.RuleSettingLang.drawNumber" header-align="center" align="center" min-width="325"></el-table-column>
        <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="325">
          <template slot-scope="scope" >
            <confirm-button button-type="text" :message="languageSource.CommonLang.confirmDeletionAllSelect" @remove="handleRemove(scope.row.id)">{{languageSource.CommonLang.delete}}</confirm-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <sortition-dialog ref="sortitionDialog" @uploadReload="reloadTable" :languageSource="languageSource"/>
  </div>
</template>

<script>
import sortitionDialog from './sortitionDialog';
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'sortition',
  mixins: [listPageBase],
  components: {
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
      //接口地址
      config,
      searchForm: {
        businessDelegationName: '',
        drawNumber: ''
      },
      selectIds: [],
      deleteRowsState: false
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  async created () {
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
      this.$refs.table.loadData();
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
      let deleteData = { ids: ids };
      this.$http.get(this.config.api.deleteDrawResultBatchById, deleteData)
        .then(res => {
          this.$refs.table.loadData();
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
      this.$msgbox({
        title: '友情提示',
        type: 'danger',
        message: '是否批量删除？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleRemove(this.selectIds.join(','));
      }).catch(() => {

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
