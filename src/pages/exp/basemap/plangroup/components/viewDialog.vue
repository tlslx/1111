<template>
  <div>
    <!--生成方案框-->
    <el-dialog :title="language.schemegroupresult" :close-on-click-modal="false" top="15px" :visible.sync="viewVisible" width="70%">
      <kindo-box>
        <el-form :model="view" ref="view" size="small" label-position="right" label-width="90px" :disabled="true" inline>
          <el-form-item :label="language.schemegroupname" prop="schemeGroupName">
            <el-input v-model="rowdata.schemeGroupName" class="inpWidth"></el-input>
          </el-form-item>
          <el-form-item :label="language.expnum" prop="exhibitionNum">
            <el-select v-model="rowdata.exhibitionNum"  class="inpWidth"></el-select>
          </el-form-item>
          <el-form-item :label="language.expcode" prop="exhibitionPeriodCode">
            <el-select v-model="rowdata.exhibitionPeriodCode" class="inpWidth">
              <el-option v-for="item in exhibitionPeriodCode" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.boothscale" prop="boothsNumber">
            <el-input v-model="rowdata.boothsNumber" class="inpWidth"></el-input>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <el-table :pagination="false" :data="view.schemeGroupDetails" :header-cell-style="{background:'#f5f5f5'}" border stripe>
          <el-table-column :label="language.scheme" min-width="60px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{language.schemeOne}}</span>
              <span v-if="scope.$index==1">{{language.schemeTwo}}</span>
              <span v-if="scope.$index==2">{{language.schemeThree}}</span>
            </template>
          </el-table-column>
          <template v-for='(col,index) in view.exhibitionHallColumns'>
          <el-table-column
            :show-overflow-tooltip="true"
            :prop="col.prop"
            :label="col.title+language.exphall"
            :key="index"
            min-width="40px">
          </el-table-column>
          </template>
          <el-table-column :label="language.boothtotal" prop="boothsNum" min-width="50px" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <!-- <kindo-table ref="viewTable" :pagination="false" :internalData="view.schemeGroupDetails">
          <el-table-column label="方案" min-width="100px" show-overflow-tooltip header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">方案一</span>
              <span v-if="scope.$index==1">方案二</span>
              <span v-if="scope.$index==2">方案三</span>
            </template>
          </el-table-column>
          <template v-for='(col,index) in view.exhibitionHallColumns'>
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.prop"
            :label="col.title"
            :key="index"
            width="124px">
          </el-table-column>
          </template>
          <el-table-column label="展位总数" prop="boothsNum" min-width="50px" show-overflow-tooltip header-align="center">
          </el-table-column>
        </kindo-table> -->
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClose"><i class="glyphicon glyphicon-floppy-disk"></i>{{language.confirm}}</el-button>
        <el-button @click="onClose"><i class="glyphicon glyphicon-remove"></i>{{language.cancel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'viewdialog',
  mixins: [tableMixIn],
  props: {
    childApi: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      editexp: 1, // 默认展期统计数
      action: "",
      rowdata: {},
      exhibitionPeriodCode: [],
      // 弹出框
      view: {
        exhibitionHallColumns: [],
        schemeGroupDetails: []
      },
      viewVisible: false,
      isFetching: false
    };
  },
  async created () {
    this._view = Object.assign({}, this.view);
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    onClose() {
      this.viewVisible = false;
      this.isFetching = false;
    }
  },
  watch: {
    "isFetching"(value) {
      if (value) { // 查看页面一显示则查询方案详情
        this.viewVisible = false;
        this.$http.get(this.childApi.getbyid, { schemeGroupId: this.rowdata['schemeGroupId'] }).then((res) => {
          let data = res;
          this.viewVisible = true;
          this.view.schemeGroupDetails = data['schemeGroupDetails'];
          this.view.exhibitionHallColumns = data['exhibitionHallColumns'];
        });
        this.isFetching = false;
      }
    }
  }
};
</script>

<style lang="scss">
  .el-table th {
    padding: 9px 0;
    background-color: #f5f5f5;
  }
  .el-table th > .cell {
    text-align: center;
  }
  .el-table td {
    padding: 8px 0;
  }
  .mian-control {
    margin: 5px 0 0 8px;
    float: left;
  }
  .el-table--border {
    .rowNumber {
      .cell {
        padding: 0 2px;
      }
    }
  }
  .inpWidth {
    width: 150px;
  }
</style>
