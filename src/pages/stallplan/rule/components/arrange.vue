<template>
  <div class="arrange">
    <kindo-box>
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="68px"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName">
          <el-input v-model="searchForm.enterpriseName" clearable placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item prop="exhibitionType" :label="languageSource.RuleSettingLang.exhibitionPositionType">
          <el-select v-model="searchForm.exhibitionType" clearable placeholder="请选择展位类型">
            <el-option
              v-for="nature in natures"
              :key="nature.value"
              :label="nature.label"
              :value="nature.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea">
          <el-select v-model="searchForm.exhibitionArea" clearable placeholder="请选择展区">
            <el-option
              v-for="area in areas"
              :key="area.value"
              :label="area.label"
              :value="area.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          <el-button type="primary" @click="onCreate">{{languageSource.CommonLang.add}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="table"
        :url="config.api.getPreArrangedEnterprise"
        :queryParam="form"
      >
        <el-table-column prop="positionNumber" :label="languageSource.RuleSettingLang.exhibitionPositionNumber" header-align="center" align="center" min-width="208"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea" header-align="center" align="center" min-width="204"></el-table-column>
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" header-align="center" align="center" min-width="204"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.RuleSettingLang.exhibitionPositionType" header-align="center" align="center" min-width="204"></el-table-column>
        <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="204">
          <template slot-scope="scope">
            <confirm-button message="是否移除该企业？" button-type="text" @remove="handleRemove(scope.row.id)">移除</confirm-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <arrange-dialog
      :natures="natures"
      :areas="areas"
      @ok="ok"
      :languageSource="languageSource"
      ref="arrangeDialog"/>
  </div>
</template>

<script>
import config from './index';
import arrangeDialog from './arrangeDialog';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'arrange',
  mixins: [listPageBase],
  components: {
    arrangeDialog
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
      config,
      //接口地址
      'searchForm': {
        enterpriseName: '',
        exhibitionType: '',
        exhibitionArea: ''
      },
      '_forms': {}
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
    // 移除
    handleRemove (id) {
      this.$http.postJson(this.config.api.removePreArrangedEnterprise, [id])
        .then(res => {
          this.$refs.table.loadData();
        });
    },
    //新增
    onCreate () {
      this.$refs.arrangeDialog.dialogVisible = true;
      this.$refs.arrangeDialog.onResetQuery(); //调用表格查询方法
    },
    ok () {
      this.searchForm = {};
      this.$refs.searchForm.resetFields();
      this.$refs.table.reloadData();
    }
  }
};
</script>

<style scoped>
.m-b {
  margin-bottom: 18px;
}
</style>
