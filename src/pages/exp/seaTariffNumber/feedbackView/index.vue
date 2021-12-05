<template>
  <el-page>
    <!-- 调整建议 -->
    <template slot="header">
      <view-dialog :api="api" ref="viewDialog" />
      <!--查询按钮栏-->
      <kindo-box :title="source.language.feedbackView" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.year">
            <el-date-picker v-model="queryParams.seaTariffNumber.year" type="year" :placeholder="source.language.selectPlaceholder + source.language.year" class="inputclass" :editable="false" value-format="yyyy" format="yyyy" :clearable='false'>
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="source.language.commodityCode">
            <el-input v-model="queryParams.seaTariffNumber.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.seaTariffNumber.codeDesc" class="inputclass" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="queryParams" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery" size="small">
          <el-form-item :label="source.language.catalogClassification">
            <el-select v-model="queryParams.seaTariffNumber.assortType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.category">
            <el-select v-model="queryParams.seaTariffNumber.revisionType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.revisionType" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.extension">
            <el-select v-model="queryParams.seaTariffNumber.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
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
          <kindo-table :cell-style="isCenter" :url="api.get" ref="suggestionViewTable" :queryParam="form">
            <el-table-column prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="initiator" :label="source.language.initiator" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.seaTariffNumber.assortType)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="140" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seaTariffNumber.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seaTariffNumber.originCode" :label="source.language.originalCode" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.originName" :label="source.language.originalName" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.revisionDesc" :label="source.language.reason" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('view')" @click="onAction('view','view',scope.row)">{{source.language.view}}</el-button>
              </template>
            </el-table-column>
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
  name: 'feedbackView',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'viewDialog': () => import('./components/viewDialog')
  },
  data() {
    return {
      pageId: 'feedbackView',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/feedback/getHistoryFeedbackListPage",  // 获取列表数据
        getViewData: kindo.config.api.expUrl + "/api/exp/tariff/feedback/get",  // 建议反馈待审核记录查看
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog" // 建议反馈待审核 查看日志
      },
      queryParams: {
        seaTariffNumber: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          assortType: null,        // 目录分类
          revisionType: null,       // 调整类别
          proposedExtension: null // 建议展期
        },
        areaCode: null            // 建议展区
      }
    };
  },
  async created() {
  },
  watch: {
    "queryParams.seaTariffNumber.year"(v) {
      if (v) {
        this.queryParams.seaTariffNumber.year = kindo.util.formatDate(v, "yyyy");
      }
    },
    "queryParams.areaCode"(v) {
      this.queryParams.areaCode ? this.queryParams.areaCode = this.queryParams.areaCode : this.queryParams.areaCode = null;
    },
    "queryParams.seaTariffNumber": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.suggestionViewTable.reloadData();
    },
    // 重置
    onResetQuery() {
      let date = new Date();
      let newYear = kindo.util.formatDate(date.getFullYear().toString(), "yyyy");
      this.queryParams = {
        seaTariffNumber: {
          year: newYear,
          code: null,
          codeDesc: null,
          assortType: null,        // 目录分类
          revisionType: null,       // 调整类别
          proposedExtension: null // 建议展期
        },
        areaCode: null            // 建议展区
      };
      this.$nextTick(function () {
        this.$refs.suggestionViewTable.reloadData();
      });
    }
  }
};
</script>
<style lang="scss" scope>
</style>