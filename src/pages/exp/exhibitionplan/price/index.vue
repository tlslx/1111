<template>
  <el-page ref="price">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :apis="api" :language="source.language" @reload="onResetQuery" ref="childDialog" />
      <!--按钮栏-->
      <kindo-box :title="source.language.boothPriceSetting" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" inline label-width="90px"
          @submit.native.prevent @keyup.enter.native="onQuery" :rules="queryRules">
          <!-- <el-form-item :label="source.language.exhibitionNum" prop="exhibitionNum">
             <el-input v-model="queryParams.exhibitionNum" class="inputclass" :placeholder="source.language.inputPlaceholder" clearable @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item> -->
          <el-form-item :label="source.language.exhibitionNum">
            <el-select v-model="queryParams.exhibitionNum" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionPeriodCode">
            <el-select v-model="queryParams.exhibitionPeriodNum" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.exhibitionPeriodNum" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.schemeName">
            <el-input v-model="queryParams.schemeName" class="inputclass" :placeholder="source.language.inputPlaceholder" clearable @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
         <el-form :model="queryParams" slot="more" inline label-width="90px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.schemeStatus">
            <el-select v-model="queryParams.state" :placeholder="source.language.selectPlaceholder" clearable class="inputclass">
              <el-option v-for="item in source.state" :key="item.id" :label="item.label" :value="item.value">
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
          <kindo-table :cell-style="isCenter" :url="api.get" ref="priceTable" :queryParam="form">
            <el-table-column prop="exhibitionNum" :label="source.language.exhibitionNum" header-align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="exhibitionPeriodNum" :label="source.language.exhibitionPeriodCode" header-align="center" min-width="80"
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionPeriodNum,row.exhibitionPeriodNum)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="schemeName" :label="source.language.schemeName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="creatorName" :label="source.language.creatorName" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createDate" :label="source.language.createDate" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state" :label="source.language.schemeStatus" header-align="center"
            show-overflow-tooltip>
              <template slot-scope="scope">
                <span :style="{ color: scope.row.state.toString() === '0'? '#E6A23C' : '#67C23A' }">
                {{kindo.dictionary.getLabel(source.state, scope.row.state)}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="250" align="center">
              <template slot-scope="scope">
                <el-button v-if="right('edit')" type="text" @click="onAction('edit',scope.row)" v-show="scope.row.state.toString() !=='1'">{{source.language.edit}}</el-button>
                <el-button v-if="right('view')" type="text" @click="onAction('view',scope.row)">
                  {{source.language.view}}</el-button>
                <el-button v-if="right('clone')" type="text" @click="onAction('clone',scope.row)">
                  {{source.language.copy}}</el-button>
                <el-button v-if="right('delete')" type="text" @click="del(scope.row)" v-show="scope.row.state.toString() !=='1'">{{source.language.delete}}</el-button>
                <el-button v-if="right('selected')" type="text" @click="selectedState(scope.row)" v-show="scope.row.state.toString() !=='1'">{{source.language.selected}}</el-button>
              </template>
            </el-table-column>
             <div slot="control">
              <el-button v-if="right('add')" icon="el-icon-plus" @click="onAction('add')" type="primary" size="small">{{source.language.add}}</el-button>
             </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
  import listPageBase from '@/components/framework/mixins/listPageBase';
  import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
  export default {
    name: "price",
    mixins: [listPageBase, exhibitionPeriod],
    components: {
      'childDialog': () => import('./components/childDialog')
    },
    data() {
      return {
        pageId: 'price',
        api: {
          get: kindo.config.api.expUrl + "/api/exp/expScheme/getExpSchemeList",
          add: kindo.config.api.expUrl + "/api/exp/expPrice/addbatch",
          update: kindo.config.api.expUrl + "/api/exp/expPrice/update",
          getbyid: kindo.config.api.expUrl + "/api/exp/expScheme/getDetail",
          delete: kindo.config.api.expUrl + "/api/exp/expPrice/delById",
          selected: kindo.config.api.expUrl + "/api/exp/expScheme/selected"
        },
        source: {
          // language: {},
          state: [
            // { id: '1', value: '0', label: '未选定' },
            // { id: '2', value: '1', label: '已选定' }
          ]
        }
      };
    },
    async created() {
       // 读取国际化
      // this.source.language = kindo.util.getLanguage('ExtensionLang');
      this._queryParams = Object.assign({}, this.queryParams);
      this.source.state = [
        { id: '1', value: '0', label: this.source.language.unSelected },
        { id: '2', value: '1', label: this.source.language.haveSelected }
      ];
    },
    mounted() {
      // this.queryParams = Object.assign({}, this._queryParams);
      this.queryParams = {};
      // this.queryParams.exhibitionNum = '';
      this.$nextTick(function () {
        this.onQuery();
        this.getExhibitionNum();
      });
    },
    methods: {
      onQuery() {
        this.$refs.priceTable.reloadData();
      },
      // 重置条件为空查询
      onResetQuery() {
        // this.queryParams = Object.assign({}, this._queryParams);
        this.queryParams = {};
        // this.queryParams.exhibitionNum = '';
        this.$nextTick(function () {
          this.$refs.priceTable.reloadData();
        });
      },
      del(row) {
        this.$confirm(this.source.language.deleteConfirm, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          this.queryParams = {};
          this.$http.get(this.api.delete, { schemeId: row.schemeId }).then(res => {
            this.$refs.priceTable.reloadData();
            this.$message({
              type: 'success',
              message: this.source.language.deleteSussess
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.source.language.undelete
          });
        });
      },
      // 状态选定 一届一期只能选定一个
      selectedState(row) {
        this.$confirm(this.source.language.changeStatus, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          this.$http.get(this.api.selected, { schemeId: row.schemeId }).then(res => {
            this.$refs.priceTable.reloadData();
            this.isState = true;
            this.$message({
              type: 'success',
              message: this.source.language.statusSuccessfully
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.source.language.canceledChanges
          });
        });
      }
    }
  };
</script>
<style scoped>
</style>