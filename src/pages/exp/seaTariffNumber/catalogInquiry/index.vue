<template>
  <el-page>
    <!-- 商品目录查询 -->
    <template slot="header">
      <child-dialog :api="api" :tabIndex="tabIndex" @reload="onResetQuery" ref="childDialog" />
    </template>
    <!--数据区域-->
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="source.language.catalogInquiry" name="first">
              <kindo-box>
                <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParams.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.numberEffective.codeDesc" class="inputclass" clearable></el-input>
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

                  <el-form-item :label="source.language.exhibitionArea">
                    <el-select v-model="queryParams.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>

              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.get" ref="tableData" :queryParam="form">
                  <el-table-column prop="year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.assortType)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="originCode" :label="source.language.originalCode" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="originName" :label="source.language.originalName" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column prop="proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.proposedExtension)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="revisionDesc" :label="source.language.reason" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="100" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('view')" @click="onAction('child','view',scope.row)">{{source.language.view}}</el-button>
                    </template>
                  </el-table-column>
                </kindo-table>
              </kindo-box>
            </el-tab-pane>

            <el-tab-pane :label="source.language.exclude" name="second">
              <kindo-box>
                <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParams.numberEffective.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.numberEffective.codeDesc" class="inputclass" clearable></el-input>
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

              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.get" ref="excludingTable" :queryParam="form">
                  <el-table-column prop="year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.assortType)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="originCode" :label="source.language.originalCode" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="originName" :label="source.language.originalName" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column prop="proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.proposedExtension)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="revisionDesc" :label="source.language.reason" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="100" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('view')" @click="onAction('child','view',scope.row)">{{source.language.view}}</el-button>
                    </template>
                  </el-table-column>
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
  name: 'catalogInquiry',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog')
  },
  data() {
    return {
      pageId: 'catalogInquiry',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/effective/getEffectiveListPage",  // 目录管理列表数据
        getEffective: kindo.config.api.expUrl + "/api/exp/tariff/effective/getEffective"
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
      activeName: 'first',
      tabIndex: '0'
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
      if (this.tabIndex === '0') {
        this.queryParams.numberEffective.assortType = '1';
        this.$refs.tableData.reloadData();
      } else {
        this.queryParams.numberEffective.assortType = '0';
        this.$refs.excludingTable.reloadData();
      }
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
        numberEffective: {
          code: null,
          codeDesc: null,
          assortType: '1',
          proposedExtension: null
        },
        areaCode: null
      };
      this.$nextTick(function () {
        if (this.tabIndex === '0') {
          this.queryParams.numberEffective.assortType = '1';
          this.$refs.tableData.reloadData();
        } else {
          this.queryParams.numberEffective.assortType = '0';
          this.$refs.excludingTable.reloadData();
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