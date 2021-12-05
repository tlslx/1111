<template>
  <el-page>
    <!-- 部门审核 -->
    <template slot="header">
      <review-dialog :api="api" :tabIndex="tabIndex" @reload="onResetQuery" ref="reviewDialog" />
      <!--查询按钮栏-->
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="source.language.suggestion" name="first">
              <kindo-box>
                <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParams.seaTariffNumber.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.seaTariffNumber.codeDesc" class="inputclass" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.catalogClassification">
                    <el-select v-model="queryParams.seaTariffNumber.assortType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
                    <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
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
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.getAuditFeedback" ref="tableData" :queryParam="form">
                  <el-table-column prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="initiator" :label="source.language.initiator" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.assortType" :label="source.language.catalogClassification" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.seaTariffNumber.assortType)}"></el-table-column>
                  <el-table-column prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}"></el-table-column>
                  <el-table-column prop="seaTariffNumber.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="seaTariffNumber.originCode" :label="source.language.originalCode" header-align="center" min-width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.originName" :label="source.language.originalName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.revisionDesc" :label="source.language.opinion" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('refuse')" @click="onAction('review','review',scope.row)">{{source.language.refuse}}</el-button>
                    </template>
                  </el-table-column>
                  <div slot="control">
                    <el-button type="primary" @click="onSubmit">{{source.language.submit}}</el-button>
                  </div>
                </kindo-table>
              </kindo-box>
            </el-tab-pane>
            <el-tab-pane :label="source.language.application" name="second">
              <kindo-box>
                <el-form :model="queryParamData" ref="queryParamData" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParamData.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParamData.numberEffective.codeDesc" class="inputclass" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.exhibitionArea">
                    <el-select v-model="queryParamData.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
                    <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
                  </el-form-item>

                  <el-form-item :label="source.language.extension">
                    <el-select v-model="queryParamData.numberEffective.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.getAudit" ref="adjustmentTable" :queryParam="form">
                  <el-table-column prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="initiator" :label="source.language.enterprise" header-align="center" min-width="160">
                  </el-table-column>
                  <el-table-column prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160">
                  </el-table-column>
                  <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>  {return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
                  </el-table-column>
                  <el-table-column prop="numberEffective.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return   kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}">
                  </el-table-column>
                  <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('review')" @click="onAction('review', 'review', scope.row)">{{source.language.review}}</el-button>
                    </template>
                  </el-table-column>
                  <div slot="control">
                    <el-button type="primary" v-if="right('submit')" @click="onSubmit" size="small">{{source.language.submit}}</el-button>
                  </div>
                </kindo-table>
              </kindo-box>
            </el-tab-pane>
          </el-tabs>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'departmentReview',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'reviewDialog': () => import('./components/reviewDialog')
  },
  data() {
    return {
      pageId: 'departmentReview',
      api: {
        getAuditFeedback: kindo.config.api.expUrl + "/api/exp/tariff/feedback/getAuditFeedbackListPage",  //  建议反馈列表
        getAudit: kindo.config.api.expUrl + "/api/exp/tariff/apply/getAreaApplyAuditListPage", // 调整申请列表
        getFeedbackData: kindo.config.api.expUrl + "/api/exp/tariff/feedback/get",    // 获取建议反馈待审核数据
        getApplyData: kindo.config.api.expUrl + "/api/exp/tariff/apply/get",  // 调整申请 待审核数据
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog", // 待审核界面 查看日志
        auditReject: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit",   // 建议反馈拒绝
        auditApplyReject: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit/apply",  // 调整申请拒绝
        pass: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit/pass"  // 提交
      },
      queryParams: {
        seaTariffNumber: {
          code: null,
          codeDesc: null,
          assortType: null,
          revisionType: null,
          proposedExtension: null
        },
        areaCode: null
      },
      queryParamData: {
        numberEffective: {
          code: null,
          codeDesc: null,
          assortType: null,
          revisionType: null,
          proposedExtension: null
        },
        areaCode: null
      },
      activeName: 'first',
      tabIndex: '0',
      feedbackData: [],        // 建议反馈列表数据
      areaApplyAuditData: []   // 调整申请列表数据
    };
  },
  async created() {
    // this._queryParams = Object.assign({}, this.queryParams);
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
      this.tabIndex === '0' ? this.$refs.tableData.reloadData() : this.$refs.adjustmentTable.reloadData();
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
        seaTariffNumber: {
          code: null,
          codeDesc: null,
          assortType: null,
          revisionType: null,
          proposedExtension: null
        },
        areaCode: null
      };
      this.queryParamData = {
        numberEffective: {
          code: null,
          codeDesc: null,
          assortType: null,
          revisionType: null,
          proposedExtension: null
        },
        areaCode: null
      };
      this.$nextTick(function () {
        this.tabIndex === '0' ? this.$refs.tableData.reloadData() : this.$refs.adjustmentTable.reloadData();
      });
    },
    // 提交
    onSubmit() {
      this.$http.get(this.api.getAuditFeedback).then(res => {
        this.feedbackData = res.records;
      }).then(() => {
        this.$http.get(this.api.getAudit).then(data => {
          this.areaApplyAuditData = data.records;
        }).then(y => {
          if (!this.feedbackData.length && !this.areaApplyAuditData.length) {
            this.$message({
              type: 'warning',
              message: this.source.language.notSubmit
            });
            return;
          }
          this.$http.post(this.api.pass).then(r => {
            this.$message({
              type: 'success',
              message: this.source.language.submitWait
            });
          }).then(_ => {
            setTimeout(() => {
              this.onResetQuery();
            }, 500);
          });
        });
      });
    }
  },
  watch: {
    "queryParams.areaCode"(v) {
      this.queryParams.areaCode ? this.queryParams.areaCode = this.queryParams.areaCode : this.queryParams.areaCode = null;
    },
    "queryParamData.areaCode"(v) {
      this.queryParamData.areaCode ? this.queryParamData.areaCode = this.queryParamData.areaCode : this.queryParamData.areaCode = null;
    },
    "queryParams.seaTariffNumber": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null 
      },
      deep: true
    },
    "queryParamData.numberEffective": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true
    }
  },
  computed: {
    form: function () {
      if (this.tabIndex === '0') {
        return {
          queryParams: this.queryParams
        };
      } else {
        return {
          queryParams: this.queryParamData
        };
      }
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