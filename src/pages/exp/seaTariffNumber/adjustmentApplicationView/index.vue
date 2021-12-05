<template>
  <el-page>
    <!-- 调整申请查看 -->
    <template slot="header">
      <view-dialog :api="api" @reload="onResetQuery" ref="viewDialog" />
      <!--查询按钮栏-->
      <kindo-box :title="source.language.applicationView" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.year">
            <el-date-picker v-model="queryParams.numberEffective.year" type="year" :placeholder="source.language.selectPlaceholder + source.language.year" class="inputclass" :editable="false" value-format="yyyy" format="yyyy" :clearable='false'>
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="source.language.commodityCode">
            <el-input v-model="queryParams.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable v-model="queryParams.numberEffective.codeDesc" class="inputclass"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>

        <el-form slot="more" :model="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.extension">
            <el-select v-model="queryParams.numberEffective.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionArea">
            <el-select v-model="queryParams.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table :cell-style="isCenter" :url="api.get" ref="tableData" :queryParam="form">
            <el-table-column prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="initiator" :label="source.language.enterprise" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column prop="numberEffective.assortType" :label="source.language.type" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.numberEffective.assortType)}"></el-table-column>
            <el-table-column prop="numberEffective.revisionType" :label="source.language.category" min-width="140" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.numberEffective.revisionType)}" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
            </el-table-column>
            <el-table-column prop="numberEffective.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}">
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('view')" @click="onAction('view','view',scope.row)">{{source.language.view}}</el-button>
              </template>
            </el-table-column>
             <div slot="control">
              <el-button type="primary" v-if="right('export')" @click="onExport(queryParams)" size="small">{{source.language.export}}</el-button>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'adjustmentApplicationView',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'viewDialog': () => import('./components/viewDialog')
  },
  data() {
    return {
      pageId: 'adjustmentApplicationView',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/apply/getAreaApplyListPage",  // 获取申请查看列表数据
        getViewData: kindo.config.api.expUrl + "/api/exp/tariff/apply/get",   // 获取审核数据
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog", // 待审核界面 查看日志
        export: kindo.config.api.expUrl + "/api/exp/tariff/apply/export"  // 导出
      },
      queryParams: {
        numberEffective: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          proposedExtension: null
        },
        areaCode: null
      },
      selectedData: []
    };
  },
  async created() {
    // 读取数据字典
    // this.source.languageSelection = await kindo.dictionary.get('languageType');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.tableData.reloadData();
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
        numberEffective: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          proposedExtension: null
        },
        areaCode: null
      };
      this.$nextTick(function () {
        this.$refs.tableData.reloadData();
      });
    }
  },
  watch: {
    "queryParams.numberEffective.year"(v) {
      this.queryParams.numberEffective.year = kindo.util.formatDate(v, "yyyy");
    },
    "queryParams.areaCode"(v) {
      this.queryParams.areaCode ? this.queryParams.areaCode = this.queryParams.areaCode : this.queryParams.areaCode = null;
    },
    "queryParams.numberEffective": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scope>
.theme-blue .el-tabs__content {
  padding: 0 !important;
}

.theme-red .el-tabs__content {
  padding: 0 !important;
}
</style>