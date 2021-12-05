<template>
  <el-page ref="exhSiteManage">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="api" @reload="onResetQuery" ref="childDialog" :language="source.language" />
      <!--查尋-->
      <kindo-box :title="source.language.exhibitionVenueManagement" icon="fa-search">
        <el-form :model="queryParams" @submit.native.prevent @keyup.enter.native="onQuery" inline label-width="90px">
          <el-form-item :label="source.language.hall">
            <el-select v-model="queryParams.pavilionCode" :placeholder="source.language.selectPlaceholder" clearable class="inputclass">
              <el-option v-for="item in source.pavilionCode" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exphall">
            <el-input :placeholder="source.language.inputPlaceholder" v-model="queryParams.exhibitionHallCode" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionHallType">
            <el-select v-model="queryParams.exhibitionHallType" :placeholder="source.language.selectPlaceholder" clearable class="inputclass">
              <el-option v-for="item in source.exhibitionHallType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery" icon="el-icon-search">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
           <kindo-table :cell-style="isCenter" :url="api.get" :queryParam="form" ref="multipleTable"
            @selection-change="handleSelectionChange">
            <el-table-column width="50" type="selection" header-align="center">
            </el-table-column>
            <el-table-column prop="pavilionCode" :label="source.language.hall" header-align="center" min-width="100" show-overflow-tooltip
             :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.pavilionCode,row.pavilionCode)}">
            </el-table-column>
            <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="floorNum" :label="source.language.floor" header-align="center" min-width="120" show-overflow-tooltip
             :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.floorNums, row.floorNum)}">
            </el-table-column>
            <el-table-column prop="pavilienRegion" :label="source.language.exhibitionRegion" header-align="center" show-overflow-tooltip 
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.pavilienRegion,row.pavilienRegion)}" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="exhibitionHallType" :label="source.language.exhibitionHallType" header-align="center"  show-overflow-tooltip
             :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionHallType,row.exhibitionHallType)}" min-width="100">
            </el-table-column>
            <el-table-column prop="area" :label="source.language.area" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="length" :label="source.language.long" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="height" :label="source.language.height" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="width" :label="source.language.wide" header-align="center" min-width="60" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" :label="source.language.operation" header-align="center" min-width="60">
              <template slot-scope="scope">
                <el-button v-if="right('edit')" type="text" @click="onAction('edit',scope.row)">{{source.language.edit}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button v-if="right('add')" type="primary" icon="el-icon-plus" @click="onAction('add')">{{source.language.add}}</el-button>
              <el-button v-if="right('delete')" type="primary" icon="el-icon-delete" @click="del">{{source.language.delete}}</el-button>
          </div>
          </kindo-table>
          
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: "exhSiteManage",
    mixins: [listPageBase],
    components: {
      'childDialog': () => import('./components/childDialog')
    },
    data() {
      return {
        pageId: 'exhSiteManage',
        api: {
          get: kindo.config.api.expUrl + "/api/exp/fairground/getListPage",
          delete: kindo.config.api.expUrl + "/api/exp/fairground/deleteBatch",
          add: kindo.config.api.expUrl + "/api/exp/fairground/add",
          update: kindo.config.api.expUrl + "/api/exp/fairground/update"
        },
        queryParams: {
          pavilionCode: '',
          exhibitionHallCode: '',
          exhibitionHallType: ''
        },
        source: {
          language: {},
          exhibitionHallType: [],
          pavilionCode: [],
          pavilienRegion: [],
          floorNums: []
        },
        tableDataOptions: []
      };
    },
    mounted() {
      this.$nextTick(function () {
        this.onQuery();
      });
    },
    async created() {
       // 读取国际化
      this.source.language = kindo.util.getLanguage('ExtensionLang');
      this._queryParams = Object.assign({}, this.queryParams);
      this.source.exhibitionHallType = await kindo.dictionary.get('typeOfExhibitionHall'); // 展厅类型
      this.source.pavilionCode = await kindo.dictionary.get('numberOfPavilion');       // 展馆
      this.source.pavilienRegion = await kindo.dictionary.get('regionOfExhibition');  // 展馆区域
      this.source.floorNums = await kindo.dictionary.get('floorsOfPavilion');         // 楼层
    },
    methods: {
      // 根据条件查询
      onQuery() {
        this.$refs.multipleTable.reloadData();
      },
      onResetQuery() {
        this.queryParams = Object.assign({}, this._queryParams);
        this.$nextTick(function () {
          this.$refs.multipleTable.reloadData();
        });
      },
      isCenter({ row, column, rowIndex, columnIndex }) {
        return "text-align: center";
      },
      onAction(action, row) {
        this.$refs.childDialog.action = action;
        this.$refs.childDialog.childVisible = true;
        if (row) {
          this.$refs.childDialog.rowData = row;
        }
      },
      handleSelectionChange(vals) {
        this.tableDataOptions = vals;
      },
      // 删除
      del() {
        if (this.tableDataOptions.length === 0) {
          return this.$message(this.source.language.dataDelete);
        }
        let ids = [];
        this.tableDataOptions.forEach(el => {
          ids.push(el.id);
        });
        this.$confirm(this.source.language.deleteConfirm, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          // 执行删除操作
          this.queryParams = Object.assign({}, this._queryParams);
          this.$http.postJson(this.api.delete, ids).then(res => {
            this.$refs.multipleTable.reloadData();
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
      }
    },
    computed: {
      form: function () {
        return {
          queryParams: this.queryParams
        };
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>