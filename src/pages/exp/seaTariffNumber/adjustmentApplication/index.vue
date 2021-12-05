<template>
  <el-page>
    <!-- 调整申请 -->
    <template slot="header">
      <child-dialog :api="api" @reload="onResetQuery" ref="childDialog" />
      <view-dialog :api="api" @reload="onResetQuery" ref="viewDialog" />
      <!--查询按钮栏-->
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="source.language.seaTariffInquiry" name="first">
              <kindo-box>
                <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="80px" @submit.native.prevent @keyup.enter.native="onQuery">

                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParams.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.numberEffective.codeDesc" clearable class="inputclass"></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.extension">
                    <el-select v-model="queryParams.numberEffective.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
                    <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
                  </el-form-item>
                </el-form>
                <el-button type="text" v-if="isTime" icon="el-icon-warning" class="timeclass">{{source.language.isDeadline}} {{time}}</el-button>
              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.get" ref="tableData" :queryParam="form">
                  <el-table-column prop="year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="code" :label="source.language.commodityCode" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.proposedExtension)}">
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('view')" @click="onAction('child','view',scope.row)">{{source.language.view}}</el-button>
                      <el-button type="text" v-if="right('add')" @click="onApplication('child','add',scope.row)">{{source.language.applyBtn}}</el-button>
                    </template>
                  </el-table-column>
                </kindo-table>

              </kindo-box>
            </el-tab-pane>
            <el-tab-pane :label="source.language.applicationView" name="second">
              <kindo-box>
                <el-form :model="queryParamData" ref="queryParamData" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.year">
                    <el-date-picker v-model="queryParamData.numberEffective.year" type="year" :placeholder="source.language.selectPlaceholder + source.language.year" class="inputclass" :editable="false" value-format="yyyy" format="yyyy" :clearable='false'>
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParamData.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParamData.numberEffective.codeDesc" class="inputclass" clearable></el-input>
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
                  <el-form-item :label="source.language.exhibitionArea">
                    <el-select v-model="queryParamData.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.getAreaApply" ref="applicationViewTable" :queryParam="form">
                  <el-table-column prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="initiator" :label="source.language.enterprise" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
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
                    <el-button type="primary" v-if="right('export')" @click="onExport(queryParamData)" size="small">{{source.language.export}}</el-button>
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
  name: 'adjustmentApplication',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'viewDialog': () => import('./components/viewDialog')
  },
  data() {
    return {
      pageId: 'adjustmentApplication',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/effective/getEffectiveListPage", // 海关税则号查询
        add: kindo.config.api.expUrl + "/api/exp/tariff/apply/add",   // 申请展区 提交
        getAreaApply: kindo.config.api.expUrl + "/api/exp/tariff/apply/getAreaApplyListPage",  // 获取申请查看列表数据
        // getById: kindo.config.api.expUrl + "/api/exp/tariff/effective/getEffective",
        getById: kindo.config.api.expUrl + '/api/exp/tariff/apply/getNumberAndApply', // 获取调整申请查看详情数据
        getViewData: kindo.config.api.expUrl + "/api/exp/tariff/apply/get",   // 获取待审核数据
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog", // 待审核界面 查看日志
        getByCode: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getEffectiveByCode", // 新增、编辑时根据编码的改变查询是否有已存在的编码数据
        getAuthAreas: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/getAuthAreas",  // 获取展区
        setTime: kindo.config.api.expUrl + "/api/exp/setting/get",  // 获取设置的截止时间
        export: kindo.config.api.expUrl + "/api/exp/tariff/apply/export"  // 导出
      },
      queryParams: {
        numberEffective: {
          code: null,
          codeDesc: null,
          assortType: '1',
          proposedExtension: null
        },
        areaCode: null
      },
      queryParamData: {
        numberEffective: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          proposedExtension: null
        },
        areaCode: null
      },
      activeName: 'first',
      tabIndex: '0',
      isTime: false,
      time: null
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
      this.$http.get(this.api.setTime, { item: 'seaTariffNumberEndDate' }).then(res => {
        if (res) {
          this.time = res;
          this.isTime = true;
        }
      });
    });
  },
  methods: {
    onQuery() {
      if (this.tabIndex === '0') {
        this.$refs.tableData.reloadData();
      } else {
        this.$refs.applicationViewTable.reloadData();
      }
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
        numberEffective: {
          code: null,
          codeDesc: null,
          proposedExtension: null,
          assortType: '1'
        },
        areaCode: null
      };
      this.queryParamData = {
        numberEffective: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          proposedExtension: null
        },
        areaCode: null
      };
      this.$nextTick(function () {
        if (this.tabIndex === '0') {
          this.$refs.tableData.reloadData();
        } else {
          this.$refs.applicationViewTable.reloadData();
        }
      });
    }
  },
  watch: {
    "queryParams.numberEffective": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true
    },
    "queryParams.areaCode"(v) {
      this.queryParams.areaCode ? this.queryParams.areaCode = this.queryParams.areaCode : this.queryParams.areaCode = null;
    },
    "queryParamData.numberEffective.year"(v) {
      this.queryParamData.numberEffective.year = kindo.util.formatDate(v, "yyyy");
    },
    "queryParamData.areaCode"(v) {
      this.queryParamData.areaCode ? this.queryParamData.areaCode = this.queryParamData.areaCode : this.queryParamData.areaCode = null;
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
.timeclass {
  color: #e6a23c !important;
  height: 20px !important;
}
</style>