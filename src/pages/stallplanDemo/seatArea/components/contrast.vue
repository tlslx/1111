<template>
  <el-dialog
    :title="languageSource.LocationLang.schemeComparison"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="schemeName" :label="languageSource.LocationLang.programNameTable">
          <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips" -->
          <el-input v-model="searchForm.schemeName" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <!--<el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" >
          &lt;!&ndash; :placeholder="languageSource.LocationLang.exhibitionAreaTip" &ndash;&gt;
          <el-select v-model="searchForm.exhibitionAreaName" clearable class="common-style" placeholder="" >
            <el-option
              v-for="area in regionOfExhibition"
              :key="area.value"
              :label="area.label"
              :value="area.label">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="contrastTable"
        :url="config.api.getSchemeForCompare"
        :queryParam="form"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="schemeName" :label="languageSource.LocationLang.programNameTable" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="association" :label="languageSource.AdjustmentApply.associationLabel" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable"  header-align="center" align="center" ></el-table-column>
        <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable"  header-align="center" align="center" ></el-table-column>
      </kindo-table>
    </kindo-box>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc" :loading="loadingState">{{languageSource.LocationLang.startCompared}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import config from './index';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'contrast',
    mixins: [listPageBase],
    props: ['languageSource', 'regionOfExhibition', 'scopeRow', 'type'],
    data () {
      return {
        config,
        'dialogVisible': false,
        'searchForm': {
          "schemeName": ""
        },
        '_forms': {},
        'currentRow': {},
        'loadingState': false
      };
    },
    computed: {
      form: function () {
        let searchForm = this.searchForm;
        if (this.type === 'seatArea') { //插件页面
          let scopeRow = this.$route.query.scopeRow || {};
          return {
            queryParams: { schemeId: scopeRow.schemeId, exhibitionAreaName: scopeRow.exhibitionAreaName, ...searchForm }
          };
        } else {
          let scopeRow = this.scopeRow ? this.scopeRow : {};
          return {
            queryParams: { schemeId: scopeRow.schemeId, exhibitionAreaName: scopeRow.exhibitionAreaName, ...searchForm }
          };
        }
      }
    },
    created () {
      this._forms = Object.assign({}, this.searchForm);
    },
    methods: {
      //查询方法
      onQuery () {
        this.$refs.contrastTable.reloadData();
      },
      //重置查询
      onResetQuery () {
        this.searchForm = Object.assign({}, this._forms);
        this.$nextTick(function() {
          this.$refs.contrastTable.reloadData();
        });
      },
      //确定
      submitFunc () {
        let currentRow = this.currentRow;
        if (!currentRow.schemeId) {
          this.$message.error(this.languageSource.RuleSettingLang.selectOneMsg);
          return false;
        }
        let params = { 'json': { "schemeId": currentRow.schemeId }};
        this.loadingState = true;
        this.$http.get(this.config.api.getApproveDetails, params)
          .then((res) => {
            this.dialogVisible = false;
            if (this.type === 'seatArea') { //插件页面
              this.$emit('contrast', res.schema);
            } else {
              this.$router.push({ path: '/stallplanDemo/seatArea?primarycolor=2b579a',
                query: { scopeRow: this.scopeRow, schemaValue: res.schema, tag: 'contrast', right: 'seatApplyView', pluginBtnState: false, addState: false, notValidateArray: [] }});
            }
            this.loadingState = false;
          });
      },
      clear () {
        this.$refs.searchForm.resetFields();
        this.searchForm = {};
      },
      cancel () {
        this.dialogVisible = false;
      },
      //单选方法
      handleCurrentChange (val) {
        this.currentRow = val;
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
