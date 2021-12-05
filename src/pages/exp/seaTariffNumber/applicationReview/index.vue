<template>
  <el-page>
    <!-- 调整申请查看 -->
    <template slot="header">
      <review-dialog :api="api" @reload="onResetQuery" ref="reviewDialog" />
      <!--查询按钮栏-->
      <kindo-box :title="source.language.application" icon="fa-search">
        <!-- <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="80px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.commodityCode">
            <el-input v-model="queryParams.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.codeDesc" clearable class="inputclass"></el-input>
          </el-form-item>

          <el-form-item :label="source.language.extension">
            <el-select v-model="queryParams.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>

        <el-form slot="more" :model="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.exhibitionArea">
            <el-select v-model="queryParams.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
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
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
            </el-table-column>
            <el-table-column prop="numberEffective.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}">
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}">
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('review')" @click="onAction('review','review',scope.row)">{{source.language.review}}</el-button>
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
  name: 'applicationReview',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'reviewDialog': () => import('./components/reviewDialog')
  },
  data() {
    return {
      pageId: 'applicationReview',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/apply/getAreaApplyAuditListPage",  // 获取审核列表数据
        getReviewData: kindo.config.api.expUrl + "/api/exp/tariff/apply/get",   // 获取待审核数据
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog", // 待审核界面 查看日志
        auditAreaApply: kindo.config.api.expUrl + "/api/exp/tariff/apply/auditAreaApply"   // 审核 提交
      },
      queryParams: {
        // year: (new Date()).getFullYear().toString(),
        // code: '',
        // codeDesc: '',
        // proposedExtension: '',
        // areaCode: ''
      },
      selectedData: []
    };
  },
  async created() {
    this._queryParams = Object.assign({}, this.queryParams);
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
      this.queryParams = Object.assign({}, this._queryParams);
      this.$nextTick(function () {
        this.$refs.tableData.reloadData();
      });
    }
  },
  watch: {
    // "queryParams.year"(v) {
    //   if (v) {
    //     this.queryParams.year = kindo.util.formatDate(v, "yyyy");
    //   }
    // }
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