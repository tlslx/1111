<template>
  <el-page>
    <!-- 外贸司审核 -->
    <template slot="header">
      <!--查询按钮栏-->
      <kindo-box :title="source.language.foreign" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.commodityCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.numberEffective.code" class="inputclass" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.productName">
            <el-input v-model="queryParams.numberEffective.codeDesc" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.catalogClassification">
            <el-select v-model="queryParams.numberEffective.assortType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.assortTypes" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="queryParams" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery" size="small">
          <el-form-item :label="source.language.category">
            <el-select v-model="queryParams.numberEffective.revisionType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.revisionType" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
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
          <kindo-table :cell-style="isCenter" :url="api.get" ref="foreignTable" :queryParam="form">
            <el-table-column prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="initiator" :label="source.language.enterprise" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="numberEffective.assortType" :label="source.language.catalogClassification" min-width="160" show-overflow-tooltip header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.numberEffective.assortType)}"></el-table-column>
            <el-table-column prop="revisionType" :label="source.language.category" min-width="160" show-overflow-tooltip header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.numberEffective.revisionType)}"></el-table-column>
            <el-table-column prop="numberEffective.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip header-align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="numberEffective.originCode" :label="source.language.originalCode" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="numberEffective.originName" :label="source.language.originalName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="numberEffective.proposedExtension" :label="source.language.extension" min-width="120" show-overflow-tooltip header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}"></el-table-column>
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}">
            </el-table-column>
          </kindo-table>

        </kindo-box>

        <kindo-box class="paddingclass">
          <p class="m-b">{{source.language.statistics}}</p>
          <kindo-table :cell-style="isCenter" ref="countTable" :pagination="false" :height="120">
            <el-table-column prop="countAll" :label="source.language.total" min-width="160" header-align="center"></el-table-column>
            <el-table-column prop="newCodeCount" :label="source.language.newCodeNumber" min-width="160" header-align="center"></el-table-column>
            <el-table-column prop="changeCodeCount" :label="source.language.editCodeNumber" min-width="160" header-align="center"></el-table-column>
            <el-table-column prop="deleteCodeCount" :label="source.language.deleteCodeNumber" header-align="center" min-width="120">
            </el-table-column>
          </kindo-table>
        </kindo-box>

        <kindo-box class="paddingclass">
          <el-form :model="foreignForm" ref="foreignForm" label-position="right" size="small" label-width="150px" :rules="rules" @submit.native.prevent @keyup.enter.native="onQuery">
            <el-form-item :label="source.language.review" prop='auditResult'>
              <el-select v-model="foreignForm.auditResult" :placeholder="source.language.selectPlaceholder" style="width: 50%">
                <el-option v-for="item in source.auditResult" :key="item.id" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="source.language.opinion" prop="opinion">
              <el-input type="textarea" :rows="4" :placeholder="source.language.inputPlaceholder" v-model="foreignForm.opinion" style="width: 50%" class="m-t"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="right('submit')" @click="onSubmit('foreignForm')" size="small">{{source.language.submit}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'foreignTradeDivisionReview',
  mixins: [seaTariffNumber, listPageBase],
  data() {
    return {
      pageId: 'foreignTradeDivisionReview',
      api: {
        getStatistical: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit/getStatistical",  // 统计信息
        get: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit/getTradeAuditListPage",
        pass: kindo.config.api.expUrl + "/api/exp/tariff/dept/audit/pass"  // 提交   
      },
      queryParams: {
        numberEffective: {
          code: null,
          codeDesc: null,
          assortType: null,
          revisionType: null,
          proposedExtension: null
        },
        areaCode: null
      },
      foreignForm: {
        auditResult: 'true',
        opinion: ''
      },
      rules: {
        auditResult: [],
        opinion: []
      },
      source: {
        auditResult: [],
        assortTypes: []
      }
    };
  },
  async created() {
    // this._queryParams = Object.assign({}, this.queryParams);
    // 读取数据字典
    // this.source.languageSelection = await kindo.dictionary.get('languageType');
    this.source.auditResult = [
      { id: "1", value: "true", label: this.source.language.pass }
      // { id: "0", value: "false", label: this.source.language.refuse }
    ];
    this.source.assortTypes = [
      { id: "1", value: "1", label: this.source.language.commodity }  // 商品
    ];
    this.rules.auditResult = [
      { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.opinion = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
      this.getStatisticalData();
    });
  },
  methods: {
    onQuery() {
      this.$refs.foreignTable.reloadData();
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
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
        this.$refs.foreignTable.reloadData();
      });
    },
    // 提交
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if (this.foreignForm.auditResult === 'false' && !this.foreignForm.opinion) {
          //   this.$message({
          //     type: 'warning',
          //     message: this.source.language.explainRequired
          //   });
          //   return;
          // }
          this.$http.post(this.api.pass).then(res => {
            this.$message({
              type: 'success',
              message: this.source.language.submitWait
            });
           
          }).then(_ => {
            setTimeout(() => {
              this.onResetQuery();
            }, 500);
          });
        }
      });
    },
    // 查询统计数据
    getStatisticalData() {
      this.$http.get(this.api.getStatistical).then(res => {
        let dataset = [];
        dataset.push(res);
        this.$refs.countTable.internalData = dataset;
      });
    }
  },
  watch: {
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
.paddingclass {
  padding: 0 20px !important;
}
</style>